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
            const res = await fetch('/api/ai/health-risk', { method: 'POST' })
            if (!res.ok) throw new Error('Failed to analyze health data')
            const data = await res.json()
            setResult(data)
        } catch (err: any) {
            setError(err.message || 'An error occurred during analysis.')
        } finally {
            setLoading(false)
        }
    }

    // Semantic health state coloring (muted to fit dark theme)
    const getScoreColor = (score: number) => {
        if (score < 30) return 'text-emerald-400/80 stroke-emerald-400/80 text-shadow-sm'
        if (score < 70) return 'text-amber-400/80 stroke-amber-400/80 text-shadow-sm'
        return 'text-red-400/80 stroke-red-400/80 text-shadow-sm'
    }

    return (
        <div className="min-h-screen pb-12 p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Unified Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/5 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Health Risk Predictor</h1>
                        <p className="text-sm text-white/50">Analyze your family's documented health history to detect potential hereditary risks and actionable insights.</p>
                    </div>

                    <button
                        onClick={runAnalysis}
                        disabled={loading}
                        className="px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-[1px] active:scale-95 shrink-0"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Activity size={16} />}
                        {loading ? 'Analyzing Lineage...' : 'Run Analysis'}
                    </button>
                </div>

                {error && (
                    <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -10 }} className="p-4 bg-white/5 border border-red-500/30 rounded-2xl flex items-start gap-3 text-red-300">
                        <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-500/80" />
                        <p className="text-sm">{error}</p>
                    </motion.div>
                )}

                {!result && !loading && !error && (
                    <div className="h-64 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-white/40 gap-4 bg-white/[0.02]">
                        <ShieldAlert size={48} className="opacity-30" />
                        <p className="text-sm px-4 text-center">Click "Run Analysis" to generate your personalized health risk report based on your family tree.</p>
                    </div>
                )}

                {loading && (
                    <div className="h-64 border border-white/5 rounded-3xl flex flex-col items-center justify-center text-white gap-6 bg-white/[0.03] shadow-xl overflow-hidden relative">
                        <Loader2 size={48} className="animate-spin text-white/40" />
                        <div className="space-y-1 text-center relative z-10">
                            <p className="font-medium text-white/80">Scanning genetic markers</p>
                            <p className="text-xs text-white/40 uppercase tracking-widest">Processing Family Members</p>
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
                        <div className="lg:col-span-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center min-h-[300px] relative">
                            
                            <h3 className="text-white/50 font-medium text-sm mb-6 w-full text-center tracking-wide uppercase">Overall Risk Score</h3>

                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" className="stroke-white/5 stroke-[8] fill-none" />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        className={`stroke-[8] fill-none transition-all duration-1000 ease-out ${getScoreColor(result.riskScore).split(' ')[1]}`}
                                        strokeDasharray="439.8"
                                        strokeDashoffset={439.8 - (439.8 * result.riskScore) / 100}
                                        strokeLinecap="round"
                                        /* stroke="currentColor" inherited via class */
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className={`text-5xl font-bold tracking-tighter ${getScoreColor(result.riskScore).split(' ')[0]}`}>
                                        {result.riskScore}
                                    </span>
                                    <span className="text-xs text-white/40 mt-1">out of 100</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <Info size={14} className="text-white/60" />
                                <span className="text-xs font-medium text-white/50">
                                    Confidence: <span className="text-white">{result.confidenceLevel}</span>
                                </span>
                            </div>
                        </div>

                        {/* Details Area */}
                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {/* Detected Risks */}
                            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-white/70" />
                                    Detected Hereditary Risks
                                </h3>

                                {result.detectedDiseases.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {result.detectedDiseases.map((disease, idx) => (
                                            <div key={idx} className="bg-white/[0.04] border border-white/10 text-white/90 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                                                {disease}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-white/50">No significant hereditary diseases detected in the provided history.</p>
                                )}
                            </div>

                            {/* Recommendations */}
                            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex-1">
                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-white/70" />
                                    AI Recommendations
                                </h3>

                                {result.recommendations.length > 0 ? (
                                    <ul className="space-y-3">
                                        {result.recommendations.map((rec, idx) => (
                                            <li key={idx} className="flex gap-3 text-sm text-white/65 items-start">
                                                <div className="w-5 h-5 rounded-full bg-white/10 text-white/80 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-[10px] font-bold">{idx + 1}</span>
                                                </div>
                                                <p className="leading-relaxed">{rec}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-white/50">No specific recommendations at this time.</p>
                                )}
                            </div>

                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
