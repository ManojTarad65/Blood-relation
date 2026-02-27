'use client'

import { Activity, Beaker, Heart, ShieldAlert, Zap } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HealthInsightsPage() {
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAnalyze = async () => {
        setAnalyzing(true)
        try {
            const res = await fetch('/api/analyze-health', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ treeId: 'mock', members: [] })
            })
            const data = await res.json()
            setResult(data.analysis)
        } catch (e) {
            console.error(e)
        } finally {
            setAnalyzing(false)
        }
    }

    return (
        <div className="p-10 max-w-6xl mx-auto flex flex-col gap-10 font-outfit text-slate-50 min-h-screen">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8 relative">
                <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                            <Activity className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">AI Health Intelligence</h1>
                            <p className="text-slate-400 mt-1">Multi-generational hereditary pattern recognition.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
                >
                    {analyzing ? (
                        <>
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            <Zap className="w-5 h-5 animate-pulse" /> Processing Genetics...
                        </>
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <Beaker className="w-5 h-5" /> Run AI Analysis
                        </>
                    )}
                </motion.button>
            </header>

            <AnimatePresence mode="wait">
                {result ? (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >

                        <div className="lg:col-span-2 flex flex-col gap-8">
                            <div className="glass-card p-8 border-indigo-500/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-[50px] group-hover:bg-indigo-500/10 transition-colors duration-700 pointer-events-none" />
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg"><Heart className="text-indigo-400 w-5 h-5" /></div>
                                    Identifiable Patterns
                                </h3>
                                <div className="flex flex-col gap-4 relative z-10">
                                    {result.patterns.map((p: any, i: number) => (
                                        <div key={i} className="bg-[#0B0F1A]/50 p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/10 transition-colors">
                                            <div>
                                                <span className="font-bold text-white text-lg tracking-tight block">{p.disease}</span>
                                                <span className="text-sm text-slate-400">{p.affected_count} identified cases in lineage</span>
                                            </div>
                                            <div className="flex flex-col md:items-end w-full md:w-auto">
                                                <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase mb-2">Confidence Level</span>
                                                <div className="w-full md:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${p.confidence * 100}%` }}
                                                        transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full shadow-glow-primary"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-card p-8 border-emerald-500/20">
                                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/20 rounded-lg"><Zap className="text-emerald-400 w-5 h-5" /></div>
                                    AI Synthesized Insights
                                </h3>
                                <ul className="space-y-4">
                                    {result.insights.map((ins: string, i: number) => (
                                        <li key={i} className="flex gap-4 text-slate-300 items-start p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                            <span className="leading-relaxed">{ins}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="glass-card p-8 flex flex-col items-center justify-center border-amber-500/20 text-center relative overflow-hidden py-12">
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
                                <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-6 relative">
                                    <ShieldAlert className="w-8 h-8 text-amber-500" />
                                    <div className="absolute inset-0 bg-amber-500 rounded-2xl blur-[20px] opacity-20 animate-pulse" />
                                </div>
                                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Aggregate Risk Score</h3>
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
                                    className="text-7xl font-black text-white tracking-tighter mb-2"
                                >
                                    {result.overall_risk_score}
                                </motion.div>
                                <div className="h-1 w-12 bg-amber-500/50 rounded-full mx-auto" />
                            </div>

                            <div className="glass-card p-8 border-white/5">
                                <h3 className="text-lg font-bold mb-6 text-white">Recommended Actions</h3>
                                <div className="flex flex-col gap-3">
                                    {result.recommendations.map((rec: string, i: number) => (
                                        <div key={i} className="p-4 bg-[#0B0F1A]/50 rounded-xl text-sm text-slate-300 border border-white/5 font-medium hover:bg-white/5 transition-colors cursor-default">
                                            <span className="text-indigo-400 mr-2 opacity-50">0{i + 1}.</span> {rec}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-32 glass-card relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
                        <div className="p-6 bg-slate-900 rounded-3xl border border-white/5 shadow-2xl mb-6 relative">
                            <Beaker className="w-12 h-12 text-slate-500" />
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500/20 rounded-full blur-[10px] animate-pulse-slow" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white tracking-tight">System Awaiting Input</h2>
                        <p className="text-slate-400 max-w-md text-center text-lg font-light leading-relaxed">
                            Initialize the AI engine above to cross-reference multi-generational branches for hereditary anomalies.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
