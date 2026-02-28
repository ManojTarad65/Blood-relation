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
        <div className="p-10 max-w-7xl mx-auto text-white min-h-screen flex flex-col gap-10">

            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">AI Health Intelligence</h1>
                        <p className="text-slate-400">Multi-generational hereditary pattern recognition</p>
                    </div>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                >
                    {analyzing ? <Loader2 className="animate-spin w-5 h-5" /> : <Beaker className="w-5 h-5" />}
                    {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400">
                    {error}
                </div>
            )}

            <AnimatePresence mode="wait">
                {result ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid lg:grid-cols-3 gap-8"
                    >

                        {/* LEFT */}
                        <div className="lg:col-span-2 flex flex-col gap-8">

                            {/* Patterns */}
                            <div className="bg-[#111827] p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-6">Identifiable Patterns</h3>

                                {result.patterns.map((p: any, i: number) => (
                                    <div key={i} className="mb-4 p-4 bg-[#0B0F1A] rounded-xl border border-white/5">
                                        <div className="flex justify-between">
                                            <div>
                                                <h4 className="font-semibold">{p.disease}</h4>
                                                <p className="text-sm text-slate-400">
                                                    {p.affected_count} cases in lineage
                                                </p>
                                            </div>
                                            <div className="text-indigo-400 text-sm font-mono">
                                                {Math.round(p.confidence * 100)}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Insights */}
                            <div className="bg-[#111827] p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-6">AI Synthesized Insights</h3>
                                <ul className="space-y-4">
                                    {result.insights.map((ins: string, i: number) => (
                                        <li key={i} className="bg-[#0B0F1A] p-4 rounded-xl border border-white/5">
                                            {ins}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col gap-8">

                            <div className="bg-[#111827] p-10 rounded-2xl border border-white/10 text-center">
                                <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                                <p className="text-slate-400 uppercase text-xs mb-2">Aggregate Risk Score</p>
                                <h2 className="text-6xl font-black">
                                    {result.overall_risk_score}
                                </h2>
                            </div>

                            <div className="bg-[#111827] p-8 rounded-2xl border border-white/10">
                                <h3 className="text-lg font-bold mb-4">Recommended Actions</h3>
                                {result.recommendations.map((rec: string, i: number) => (
                                    <div key={i} className="p-3 mb-3 bg-[#0B0F1A] rounded-lg border border-white/5">
                                        {rec}
                                    </div>
                                ))}
                            </div>

                        </div>

                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-[#111827] rounded-2xl border border-white/10">
                        <Beaker className="w-12 h-12 text-slate-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">System Awaiting Input</h2>
                        <p className="text-slate-400 max-w-md">
                            Click "Run AI Analysis" to scan hereditary health patterns across your family tree.
                        </p>
                    </div>
                )}
            </AnimatePresence>

        </div>
    )
}