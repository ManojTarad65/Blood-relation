'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, FileText, HeartPulse, Loader2, Info, UserPlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function MedicalAdvisorPage() {
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [advice, setAdvice] = useState<string | null>(null)
    const [familyData, setFamilyData] = useState<any[]>([])
    const [isLoadingData, setIsLoadingData] = useState(true)

    // Load family data on mount
    useEffect(() => {
        async function loadFamilyData() {
            const { data } = await supabase.from('family_members').select('*')
            if (data) {
                setFamilyData(data)
            }
            setIsLoadingData(false)
        }
        loadFamilyData()
    }, [])

    const generateAdvice = async () => {
        setLoading(true)
        setAdvice(null)
        try {
            const res = await fetch('/api/ai/medical-advisor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ familyData }),
            })

            const data = await res.json()
            setAdvice(data.advice || 'AI insights are currently limited. Showing general recommendations: Maintain a balanced diet, exercise regularly, and consult a doctor for personalized care.')
        } catch (err: any) {
            setAdvice('AI insights are currently limited. Showing general recommendations: Maintain a balanced diet, exercise regularly, and consult a doctor for personalized care.')
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
                        <p className="text-sm text-white/50">Get personalized health advice, recommended screenings, and lifestyle improvements based on your family&apos;s health lineage.</p>
                    </div>

                    <button
                        onClick={generateAdvice}
                        disabled={loading || isLoadingData || familyData.length === 0}
                        className="px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-[1px] active:scale-95 whitespace-nowrap"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Stethoscope size={16} />}
                        {loading ? 'Analyzing...' : 'Generate New Advice'}
                    </button>
                </div>

                {/* Disclaimer */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex gap-4 text-white/70 text-sm">
                    <Info size={20} className="shrink-0 mt-0.5 text-white/40" />
                    <div>
                        <strong className="block text-white mb-1">Disclaimer</strong>
                        This tool uses an AI to generate insights based on provided family history. It is for educational purposes only and DOES NOT substitute professional medical advice, diagnosis, or treatment. Always consult a certified healthcare professional.
                    </div>
                </div>

                {/* Loading data spinner */}
                {isLoadingData && (
                    <div className="h-40 flex items-center justify-center">
                        <Loader2 size={32} className="animate-spin text-white/30" />
                    </div>
                )}

                {/* Empty state — prompt to generate */}
                {!advice && !loading && !isLoadingData && familyData.length > 0 && (
                    <div className="h-64 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-white/40 gap-4 bg-white/[0.02]">
                        <FileText size={48} className="opacity-30" />
                        <p className="text-sm px-4 text-center">Click &quot;Generate New Advice&quot; to compile your personalized AI medical insights panel.</p>
                    </div>
                )}

                {/* NO DATA FALLBACK */}
                {!isLoadingData && familyData.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-64 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-white gap-4 bg-white/[0.02] shadow-xl relative overflow-hidden"
                    >
                        <div className="w-16 h-16 bg-white/5 flex items-center justify-center rounded-2xl border border-white/10 mb-2">
                            <Info size={32} className="text-white/50" />
                        </div>
                        <p className="font-medium text-white/90">No family data found.</p>
                        <p className="text-sm text-white/50 mb-2">Add members to get personalized insights.</p>
                        <a
                            href="/dashboard/tree"
                            className="px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-lg"
                        >
                            <UserPlus size={16} />
                            Add Family Member
                        </a>
                    </motion.div>
                )}

                {/* Loading spinner (generating advice) */}
                {loading && (
                    <div className="h-64 border border-white/5 rounded-3xl flex flex-col items-center justify-center text-white gap-6 bg-white/[0.03] shadow-xl overflow-hidden relative">
                        <Loader2 size={48} className="animate-spin text-white/40" />
                        <div className="space-y-1 text-center relative z-10">
                            <p className="font-medium text-white/80">Evaluating Health Profile</p>
                            <p className="text-xs text-white/40 uppercase tracking-widest">Generating Insights</p>
                        </div>
                    </div>
                )}

                {/* AI Output */}
                {advice && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden">
                            <h3 className="text-white font-semibold mb-6 text-xl flex items-center gap-3">
                                <HeartPulse size={24} className="text-white/70" />
                                Expert AI Advisor Output
                            </h3>
                            <div className="text-white/70 leading-relaxed text-[15px] whitespace-pre-wrap">
                                {advice}
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    )
}
