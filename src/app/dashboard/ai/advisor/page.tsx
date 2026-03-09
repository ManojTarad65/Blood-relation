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
        <div className="min-h-full bg-[#0F172A] p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-2">
                            <Stethoscope size={14} />
                            <span>AI Intelligence Core</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Medical Advisor</h1>
                        <p className="text-slate-400 max-w-2xl">Get personalized health advice, recommended screenings, and lifestyle improvements based on your family's health lineage.</p>
                    </div>

                    <button
                        onClick={generateAdvice}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-glow-primary active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Stethoscope size={18} />}
                        {loading ? 'Consulting AI...' : 'Generate New Advice'}
                    </button>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex gap-4 text-blue-400/90 text-sm">
                    <Info size={20} className="shrink-0 mt-0.5" />
                    <div>
                        <strong className="block text-blue-300 mb-1">Disclaimer</strong>
                        This tool uses an AI to generate insights based on provided family history. It is for educational purposes only and DOES NOT substitute professional medical advice, diagnosis, or treatment. Always consult a certified healthcare professional.
                    </div>
                </div>

                {error && (
                    <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -10 }} className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-400">
                        <AlertCircle size={20} className="mt-0.5 shrink-0" />
                        <p className="text-sm">{error}</p>
                    </motion.div>
                )}

                {!result && !loading && !error && (
                    <div className="h-64 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-slate-500 gap-4 bg-white/[0.02]">
                        <FileText size={48} className="opacity-50" />
                        <p className="text-sm px-4 text-center">Click "Generate New Advice" to compile your personalized AI medical insights panel.</p>
                    </div>
                )}

                {loading && (
                    <div className="h-64 border border-white/5 rounded-3xl flex flex-col items-center justify-center text-indigo-400 gap-6 bg-white/[0.02] shadow-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-brand opacity-5 animate-pulse" />
                        <Loader2 size={48} className="animate-spin" />
                        <div className="space-y-1 text-center relative z-10">
                            <p className="font-medium text-slate-200">Evaluating Health Profile</p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Generating Insights</p>
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
                        <div className="md:col-span-2 bg-[#111827] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
                            <h3 className="text-slate-200 font-semibold mb-4 text-lg">General Health Advice</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {result.healthAdvice}
                            </p>
                        </div>

                        {/* Recommended Tests */}
                        <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col">
                            <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
                                <FileText size={18} className="text-indigo-400" />
                                Recommended Screenings & Tests
                            </h3>
                            {result.recommendedTests.length > 0 ? (
                                <ul className="space-y-4 flex-1">
                                    {result.recommendedTests.map((test, idx) => (
                                        <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                                                <Stethoscope size={14} />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-sm font-medium text-slate-200">{test}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-500 flex-1 flex items-center">No specific screenings recommended currently.</p>
                            )}
                        </div>

                        {/* Lifestyle Improvements */}
                        <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col">
                            <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
                                <HeartPulse size={18} className="text-emerald-400" />
                                Lifestyle Improvements
                            </h3>
                            {result.lifestyleRecommendations.length > 0 ? (
                                <ul className="space-y-4 flex-1">
                                    {result.lifestyleRecommendations.map((rec, idx) => (
                                        <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                                <HeartPulse size={14} />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-sm font-medium text-slate-200">{rec}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-500 flex-1 flex items-center">Maintain your current healthy lifestyle routines.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
