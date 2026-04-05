'use client'

import { createClient } from '@/lib/supabase/client'
import { Activity, Beaker, Heart, ShieldAlert, Zap, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HealthInsightsPage() {

    const supabase = createClient()

    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [treeId, setTreeId] = useState<string | null>(null)

    useEffect(() => {
        async function loadTree() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data } = await supabase
                .from('family_trees')
                .select('id')
                .eq('owner_id', user.id)
                .limit(1)
                .single()

            if (data) setTreeId(data.id)
        }

        loadTree()
    }, [])

    const handleAnalyze = async () => {
        if (!treeId) return

        setAnalyzing(true)
        setError(null)

        try {

            // Fetch members from Supabase
            const { data: members } = await supabase
                .from('family_members')
                .select('*')
                .eq('tree_id', treeId)

            const res = await fetch('/api/analyze-health', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    treeId,
                    members
                })
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message || 'AI failed')

            setResult(data.analysis)

            // OPTIONAL: Save analysis to DB
            await supabase.from('health_reports').insert([{
                tree_id: treeId,
                result: data.analysis
            }])

        } catch (err: any) {
            setError(err.message)
        } finally {
            setAnalyzing(false)
        }
    }

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto text-white min-h-screen flex flex-col gap-10">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
                        <Activity className="w-6 h-6 text-white/80" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI Health Intelligence</h1>
                        <p className="text-white/40 text-sm font-medium mt-1">Multi-generational hereditary pattern recognition</p>
                    </div>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={analyzing || !treeId}
                    className="bg-white text-black px-6 py-3.5 rounded-xl font-semibold hover:bg-slate-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all text-sm w-full md:w-auto"
                >
                    {analyzing ? <Loader2 className="animate-spin w-5 h-5" /> : <Beaker className="w-5 h-5" />}
                    {analyzing ? 'Processing Data...' : 'Run Analysis Sequence'}
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 flex items-center gap-3 font-medium text-sm">
                    <ShieldAlert size={18} /> {error}
                </div>
            )}

            <AnimatePresence mode="wait">
                {result ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid lg:grid-cols-3 gap-8"
                    >

                        {/* LEFT */}
                        <div className="lg:col-span-2 flex flex-col gap-8">

                            {/* Patterns */}
                            <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/[0.08] shadow-sm">
                                <h3 className="text-lg font-bold mb-6 tracking-tight">Identifiable Patterns</h3>

                                {result.patterns.map((p: any, i: number) => (
                                    <div key={i} className="mb-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex justify-between items-center group">
                                        <div>
                                            <h4 className="font-semibold text-white group-hover:text-white transition-colors">{p.disease}</h4>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mt-1">
                                                {p.affected_count} cases in lineage
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-white text-lg font-bold tracking-tight">
                                                {Math.round(p.confidence * 100)}%
                                            </div>
                                            <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                                                Confidence
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Insights */}
                            <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/[0.08] shadow-sm">
                                <h3 className="text-lg font-bold mb-6 tracking-tight">AI Synthesized Insights</h3>
                                <ul className="space-y-4">
                                    {result.insights.map((ins: string, i: number) => (
                                        <li key={i} className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 text-white/70 font-medium text-sm leading-relaxed">
                                            {ins}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col gap-8">

                            <div className="bg-white/[0.02] p-10 rounded-3xl border border-white/[0.08] text-center shadow-sm relative overflow-hidden group">
                                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
                                <ShieldAlert className="w-10 h-10 text-white/20 mx-auto mb-4 relative z-10" />
                                <p className="text-white/40 uppercase text-[10px] font-bold tracking-widest mb-1 relative z-10">Aggregate Risk Score</p>
                                <h2 className="text-7xl font-black tracking-tighter text-white relative z-10">
                                    {result.overall_risk_score}
                                </h2>
                            </div>

                            <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/[0.08] shadow-sm">
                                <h3 className="text-lg font-bold mb-5 tracking-tight flex items-center gap-2">
                                    <Zap size={16} className="text-white/40" /> Recommended Actions
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {result.recommendations.map((rec: string, i: number) => (
                                        <div key={i} className="p-4 bg-white/[0.03] rounded-xl border border-white/5 text-sm font-medium text-white/60 hover:text-white transition-colors">
                                            {rec}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center bg-white/[0.02] rounded-3xl border border-white/5 shadow-sm">
                        <Beaker className="w-12 h-12 text-white/10 mb-6" />
                        <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">System Awaiting Input</h2>
                        <p className="text-white/40 max-w-sm text-sm font-medium">
                            Execute the generic analysis sequence to scan hereditary health patterns across your designated graph.
                        </p>
                    </div>
                )}
            </AnimatePresence>

        </div>
    )
}