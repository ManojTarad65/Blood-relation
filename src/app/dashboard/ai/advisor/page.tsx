'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, FileText, HeartPulse, Loader2, AlertCircle, Info } from 'lucide-react'

type AdvisorResult = {
    healthAdvice: string
    recommendedTests: string[]
    lifestyleRecommendations: string[]
}

export default function MedicalAdvisorPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<AdvisorResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const generateAdvice = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/ai/medical-advisor', { method: 'POST' })
            if (!res.ok) throw new Error('Failed to generate medical advice')
            const data = await res.json()
            setResult(data)
        } catch (err: any) {
            setError(err.message || 'An error occurred.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen pb-12 p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Unified Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/5 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Medical Advisor</h1>
                        <p className="text-sm text-white/50">Get personalized health advice, recommended screenings, and lifestyle improvements based on your family's health lineage.</p>
                    </div>

                    <button
                        onClick={generateAdvice}
                        disabled={loading}
                        className="px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-[1px] active:scale-95"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Stethoscope size={16} />}
                        {loading ? 'Consulting AI...' : 'Generate New Advice'}
                    </button>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex gap-4 text-white/70 text-sm">
                    <Info size={20} className="shrink-0 mt-0.5 text-white/40" />
                    <div>
                        <strong className="block text-white mb-1">Disclaimer</strong>
                        This tool uses an AI to generate insights based on provided family history. It is for educational purposes only and DOES NOT substitute professional medical advice, diagnosis, or treatment. Always consult a certified healthcare professional.
                    </div>
                </div>

                {error && (
                    <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -10 }} className="p-4 bg-white/5 border border-red-500/30 rounded-2xl flex items-start gap-3 text-red-300">
                        <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-500/80" />
                        <p className="text-sm">{error}</p>
                    </motion.div>
                )}

                {!result && !loading && !error && (
                    <div className="h-64 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-white/40 gap-4 bg-white/[0.02]">
                        <FileText size={48} className="opacity-30" />
                        <p className="text-sm px-4 text-center">Click "Generate New Advice" to compile your personalized AI medical insights panel.</p>
                    </div>
                )}

                {loading && (
                    <div className="h-64 border border-white/5 rounded-3xl flex flex-col items-center justify-center text-white gap-6 bg-white/[0.03] shadow-xl overflow-hidden relative">
                        <Loader2 size={48} className="animate-spin text-white/40" />
                        <div className="space-y-1 text-center relative z-10">
                            <p className="font-medium text-white/80">Evaluating Health Profile</p>
                            <p className="text-xs text-white/40 uppercase tracking-widest">Generating Insights</p>
                        </div>
                    </div>
                )}

                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* Overall Advice Panel */}
                        <div className="md:col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden">
                            <h3 className="text-white font-semibold mb-4 text-lg">General Health Advice</h3>
                            <p className="text-white/65 leading-relaxed text-sm">
                                {result.healthAdvice}
                            </p>
                        </div>

                        {/* Recommended Tests */}
                        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col">
                            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                                <FileText size={18} className="text-white/70" />
                                Recommended Screenings & Tests
                            </h3>
                            {result.recommendedTests.length > 0 ? (
                                <ul className="space-y-4 flex-1">
                                    {result.recommendedTests.map((test, idx) => (
                                        <li key={idx} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-white/10 text-white/80 flex items-center justify-center shrink-0">
                                                <Stethoscope size={14} />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-sm font-medium text-white/90">{test}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-white/40 flex-1 flex items-center">No specific screenings recommended currently.</p>
                            )}
                        </div>

                        {/* Lifestyle Improvements */}
                        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col">
                            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                                <HeartPulse size={18} className="text-white/70" />
                                Lifestyle Improvements
                            </h3>
                            {result.lifestyleRecommendations.length > 0 ? (
                                <ul className="space-y-4 flex-1">
                                    {result.lifestyleRecommendations.map((rec, idx) => (
                                        <li key={idx} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-white/10 text-white/80 flex items-center justify-center shrink-0">
                                                <HeartPulse size={14} />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-sm font-medium text-white/90">{rec}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-white/40 flex-1 flex items-center">Maintain your current healthy lifestyle routines.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
