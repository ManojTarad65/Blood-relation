'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, ShieldAlert, Dna, Info, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

type HealthResult = {
    riskScore: number
    detectedDiseases: string[]
    confidenceLevel: 'Low' | 'Medium' | 'High'
    recommendations: string[]
}

export default function HealthPredictorPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<HealthResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const runAnalysis = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/ai/health-predictor', { method: 'POST' })
            if (!res.ok) throw new Error('Failed to analyze health data')
            const data = await res.json()
            setResult(data)
        } catch (err: any) {
            setError(err.message || 'An error occurred during analysis.')
        } finally {
            setLoading(false)
        }
    }

    const getScoreColor = (score: number) => {
        if (score < 30) return 'text-emerald-400'
        if (score < 70) return 'text-amber-400'
        return 'text-rose-400'
    }

    const getScoreBg = (score: number) => {
        if (score < 30) return 'bg-emerald-500'
        if (score < 70) return 'bg-amber-500'
        return 'bg-rose-500'
    }

    return (
        <div className="min-h-full bg-[#0F172A] p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-2">
                            <Dna size={14} />
                            <span>AI Intelligence Core</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Health Risk Predictor</h1>
                        <p className="text-slate-400 max-w-2xl">Analyze your family's documented health history to detect potential hereditary risks and actionable insights.</p>
                    </div>

                    <button
                        onClick={runAnalysis}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-glow-primary active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Activity size={18} />}
                        {loading ? 'Analyzing Lineage...' : 'Run Analysis'}
                    </button>
                </div>

                {error && (
                    <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -10 }} className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-400">
                        <AlertCircle size={20} className="mt-0.5 shrink-0" />
                        <p className="text-sm">{error}</p>
                    </motion.div>
                )}

                {!result && !loading && !error && (
                    <div className="h-64 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-slate-500 gap-4 bg-white/[0.02]">
                        <ShieldAlert size={48} className="opacity-50" />
                        <p className="text-sm px-4 text-center">Click "Run Analysis" to generate your personalized health risk report based on your family tree.</p>
                    </div>
                )}

                {loading && (
                    <div className="h-64 border border-white/5 rounded-3xl flex flex-col items-center justify-center text-indigo-400 gap-6 bg-white/[0.02] shadow-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-brand opacity-5 animate-pulse" />
                        <Loader2 size={48} className="animate-spin" />
                        <div className="space-y-1 text-center relative z-10">
                            <p className="font-medium text-slate-200">Scanning genetic markers</p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Processing Family Members</p>
                        </div>
                    </div>
                )}

                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        {/* Risk Score Card */}
                        <div className="lg:col-span-1 bg-[#111827] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />

                            <h3 className="text-slate-400 font-medium text-sm mb-6 w-full text-center tracking-wide uppercase">Overall Risk Score</h3>

                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" className="stroke-white/5 stroke-[8] fill-none" />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        className={`stroke-[8] fill-none transition-all duration-1000 ease-out ${getScoreColor(result.riskScore)}`}
                                        strokeDasharray="439.8"
                                        strokeDashoffset={439.8 - (439.8 * result.riskScore) / 100}
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className={`text-5xl font-bold tracking-tighter ${getScoreColor(result.riskScore)}`}>
                                        {result.riskScore}
                                    </span>
                                    <span className="text-xs text-slate-500 mt-1">out of 100</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <Info size={14} className="text-indigo-400" />
                                <span className="text-xs font-medium text-slate-300">
                                    Confidence: <span className="text-white">{result.confidenceLevel}</span>
                                </span>
                            </div>
                        </div>

                        {/* Details Area */}
                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {/* Detected Risks */}
                            <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 shadow-xl">
                                <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-amber-400" />
                                    Detected Hereditary Risks
                                </h3>

                                {result.detectedDiseases.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {result.detectedDiseases.map((disease, idx) => (
                                            <div key={idx} className="bg-amber-500/10 border border-amber-500/20 text-amber-300 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                {disease}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">No significant hereditary diseases detected in the provided history.</p>
                                )}
                            </div>

                            {/* Recommendations */}
                            <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 shadow-xl flex-1">
                                <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-emerald-400" />
                                    AI Recommendations
                                </h3>

                                {result.recommendations.length > 0 ? (
                                    <ul className="space-y-3">
                                        {result.recommendations.map((rec, idx) => (
                                            <li key={idx} className="flex gap-3 text-sm text-slate-300 items-start">
                                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-[10px] font-bold">{idx + 1}</span>
                                                </div>
                                                <p className="leading-relaxed">{rec}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-slate-500">No specific recommendations at this time.</p>
                                )}
                            </div>

                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
