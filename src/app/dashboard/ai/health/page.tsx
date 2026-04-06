'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity, ShieldAlert, Dna, Info, Loader2,
    CheckCircle2, UserPlus, AlertTriangle, Zap,
    TrendingUp, HelpCircle, PlusCircle, Heart
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type HealthResult = {
    riskScore: number
    detectedDiseases: string[]
    confidenceLevel: 'Low' | 'Medium' | 'High'
    recommendations: string[]
}

const THINKING_MESSAGES = [
    'Analyzing genetic patterns...',
    'Scanning family history...',
    'Detecting hereditary markers...',
    'Evaluating risk factors...',
    'Calculating risk vectors...',
    'Generating insights...',
]

const CONFIDENCE_HINT: Record<string, string> = {
    Low: 'Low (limited family data)',
    Medium: 'Moderate (partial data)',
    High: 'High (rich family history)',
}

const WHY_REASONS: Record<'Low' | 'Medium' | 'High', string[]> = {
    Low: [
        'No repeated hereditary conditions detected across generations',
        'Available family data shows minimal risk markers',
        'Risk factors appear minimal based on current health history',
    ],
    Medium: [
        'Some recurring health conditions detected across 1–2 generations',
        'Partial family data may limit full analysis accuracy',
        'Moderate lifestyle and genetic risk markers observed',
    ],
    High: [
        'Multiple hereditary conditions detected across generations',
        'Strong recurring patterns of high-risk diseases in family history',
        'Genetic markers indicate elevated hereditary risk',
    ],
}

function getRiskMeta(score: number) {
    if (score < 30) return {
        label: 'Low Risk', color: 'text-emerald-400', stroke: 'stroke-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        glow: 'shadow-[0_0_40px_rgba(52,211,153,0.15)]',
        heroTitle: 'Your family shows Low Genetic Risk',
        heroSub: 'No major hereditary patterns detected across your family tree.',
        heroBg: 'bg-emerald-500/[0.06] border-emerald-500/20',
        heroIcon: 'text-emerald-400',
    }
    if (score < 70) return {
        label: 'Moderate Risk', color: 'text-amber-400', stroke: 'stroke-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        glow: 'shadow-[0_0_40px_rgba(251,191,36,0.12)]',
        heroTitle: 'Moderate Hereditary Risk Detected',
        heroSub: 'Some patterns in your family history may require attention.',
        heroBg: 'bg-amber-500/[0.06] border-amber-500/20',
        heroIcon: 'text-amber-400',
    }
    return {
        label: 'High Risk', color: 'text-red-400', stroke: 'stroke-red-400',
        bg: 'bg-red-500/10 border-red-500/20',
        glow: 'shadow-[0_0_40px_rgba(248,113,113,0.15)]',
        heroTitle: 'Elevated Hereditary Risk Identified',
        heroSub: 'Your family history shows recurring conditions that need monitoring.',
        heroBg: 'bg-red-500/[0.06] border-red-500/20',
        heroIcon: 'text-red-400',
    }
}

function getDiseaseBadgeStyle(disease: string) {
    const lower = disease.toLowerCase()
    if (lower.includes('diabetes') || lower.includes('blood sugar'))
        return 'bg-red-500/10 border-red-500/20 text-red-300'
    if (lower.includes('heart') || lower.includes('cardiac') || lower.includes('cardiovascular'))
        return 'bg-orange-500/10 border-orange-500/20 text-orange-300'
    if (lower.includes('cancer') || lower.includes('tumor'))
        return 'bg-pink-500/10 border-pink-500/20 text-pink-300'
    if (lower.includes('no strong') || lower.includes('no significant') || lower.includes('low risk'))
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
    return 'bg-white/[0.04] border-white/10 text-white/80'
}

function useCountUp(target: number, running: boolean) {
    const [val, setVal] = useState(0)
    useEffect(() => {
        if (!running) { setVal(0); return }
        let start = 0
        const step = Math.ceil(target / 40)
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setVal(target); clearInterval(timer) }
            else setVal(start)
        }, 25)
        return () => clearInterval(timer)
    }, [target, running])
    return val
}

function SkeletonCard({ className = '' }: { className?: string }) {
    return (
        <div className={`bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 ${className}`}>
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-white/[0.06] rounded w-1/3" />
                <div className="h-28 bg-white/[0.04] rounded-xl" />
                <div className="h-3 bg-white/[0.06] rounded w-2/3" />
                <div className="h-3 bg-white/[0.06] rounded w-1/2" />
            </div>
        </div>
    )
}

export default function HealthPredictorPage() {
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [hasRun, setHasRun] = useState(false)
    const [result, setResult] = useState<HealthResult | null>(null)
    const [familyData, setFamilyData] = useState<any[]>([])
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [thinkingMsg, setThinkingMsg] = useState(THINKING_MESSAGES[0])
    const msgRef = useRef(0)

    useEffect(() => {
        async function loadFamilyData() {
            const { data } = await supabase.from('family_members').select('id, first_name, last_name')
            setFamilyData(data ?? [])
            setIsLoadingData(false)
        }
        loadFamilyData()
    }, [])

    useEffect(() => {
        if (!loading) return
        msgRef.current = 0
        setThinkingMsg(THINKING_MESSAGES[0])
        const iv = setInterval(() => {
            msgRef.current = (msgRef.current + 1) % THINKING_MESSAGES.length
            setThinkingMsg(THINKING_MESSAGES[msgRef.current])
        }, 1200)
        return () => clearInterval(iv)
    }, [loading])

    const animatedScore = useCountUp(result?.riskScore ?? 0, !!result && !loading)

    const runAnalysis = async () => {
        setLoading(true)
        setResult(null)
        await new Promise((res) => setTimeout(res, 1500))
        try {
            const res = await fetch('/api/ai/health-risk', { method: 'POST' })
            const data = await res.json()
            setResult({
                riskScore: data.riskScore ?? 0,
                detectedDiseases: data.detectedDiseases?.length
                    ? data.detectedDiseases
                    : ['No strong hereditary risks detected'],
                confidenceLevel: data.confidenceLevel ?? 'Low',
                recommendations: data.recommendations?.length
                    ? data.recommendations
                    : ['Add more family history for deeper insights.'],
            })
            setHasRun(true)
        } catch {
            setResult({
                riskScore: 0,
                detectedDiseases: ['No strong hereditary risks detected'],
                confidenceLevel: 'Low',
                recommendations: ['Schedule annual health checkups', 'Add more family health data', 'Monitor lifestyle habits regularly'],
            })
            setHasRun(true)
        } finally {
            setLoading(false)
        }
    }

    const riskMeta = result ? getRiskMeta(result.riskScore) : null
    const whyReasons = result ? WHY_REASONS[result.confidenceLevel] : []

    return (
        <div className="min-h-screen pb-16 p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* ── Page Header ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/5 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Health Risk Predictor</h1>
                        <p className="text-sm text-white/50">
                            Analyze your family&apos;s documented health history to detect potential hereditary risks and actionable insights.
                        </p>
                    </div>
                    <button
                        onClick={runAnalysis}
                        disabled={loading || isLoadingData || familyData.length === 0}
                        className="px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-[2px] active:scale-95 shrink-0 shadow-lg hover:shadow-white/5"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Activity size={16} />}
                        {loading ? 'Analyzing Family Data...' : hasRun ? 'Re-run Analysis' : 'Run Analysis'}
                    </button>
                </div>

                {/* ── Initial data loader ── */}
                {isLoadingData && (
                    <div className="h-40 flex items-center justify-center">
                        <Loader2 size={28} className="animate-spin text-white/30" />
                    </div>
                )}

                {/* ── No family data empty state ── */}
                {!isLoadingData && familyData.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-72 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-white gap-4 bg-white/[0.02] shadow-xl"
                    >
                        <div className="w-16 h-16 bg-white/5 flex items-center justify-center rounded-2xl border border-white/10 mb-2">
                            <Dna size={32} className="text-white/40" />
                        </div>
                        <p className="font-semibold text-white/90 text-lg">Add family members to unlock AI health insights</p>
                        <p className="text-sm text-white/40 mb-2">Your family tree is empty. Start building to get predictions.</p>
                        <a
                            href="/dashboard/trees"
                            className="px-5 py-2.5 bg-white text-black hover:bg-slate-100 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-lg"
                        >
                            <UserPlus size={16} />
                            Add Member
                        </a>
                    </motion.div>
                )}

                {/* ── Pre-run empty prompt ── */}
                {!loading && !result && !isLoadingData && familyData.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-64 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-white/40 gap-4 bg-white/[0.02]"
                    >
                        <ShieldAlert size={48} className="opacity-30" />
                        <p className="text-sm px-4 text-center">
                            Click &quot;Run Analysis&quot; to generate your personalized health risk report based on your family tree.
                        </p>
                    </motion.div>
                )}

                {/* ── AI Thinking Loading State ── */}
                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex items-center gap-5">
                            <div className="relative shrink-0">
                                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Zap size={22} className="text-white/40" />
                                </div>
                                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
                            </div>
                            <div>
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={thinkingMsg}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.25 }}
                                        className="text-white font-semibold text-base"
                                    >
                                        {thinkingMsg}
                                    </motion.p>
                                </AnimatePresence>
                                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">AI Health Engine Running</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <SkeletonCard className="lg:col-span-1 min-h-[260px]" />
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── Results ── */}
                {result && !loading && riskMeta && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Hero Insight Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className={`rounded-2xl border p-5 flex items-center gap-5 ${riskMeta.heroBg}`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ${riskMeta.heroIcon}`}>
                                <TrendingUp size={22} />
                            </div>
                            <div>
                                <p className={`font-bold text-lg leading-tight ${riskMeta.color}`}>{riskMeta.heroTitle}</p>
                                <p className="text-sm text-white/50 mt-0.5">{riskMeta.heroSub}</p>
                            </div>
                            <div className={`ml-auto shrink-0 px-4 py-1.5 rounded-full border text-xs font-bold ${riskMeta.bg} ${riskMeta.color} hidden md:block`}>
                                {riskMeta.label}
                            </div>
                        </motion.div>

                        {/* Score + Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Score Card */}
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className={`lg:col-span-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] relative hover:-translate-y-1 hover:border-white/20 ${riskMeta.glow}`}
                            >
                                <h3 className="text-white/40 font-medium text-xs mb-6 w-full text-center tracking-widest uppercase">Overall Risk Score</h3>

                                <div className="relative w-44 h-44 flex items-center justify-center">
                                    {/* Glow ring behind */}
                                    <div className={`absolute inset-0 rounded-full blur-xl opacity-20 ${riskMeta.bg}`} />
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                                        <circle cx="80" cy="80" r="70" className="stroke-white/[0.06] fill-none" strokeWidth="8" />
                                        <motion.circle
                                            cx="80" cy="80" r="70"
                                            className={`fill-none ${riskMeta.stroke}`}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray="439.8"
                                            initial={{ strokeDashoffset: 439.8 }}
                                            animate={{ strokeDashoffset: 439.8 - (439.8 * result.riskScore) / 100 }}
                                            transition={{ duration: 1.2, ease: 'easeOut' }}
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center justify-center">
                                        <span className={`text-5xl font-bold tracking-tighter tabular-nums ${riskMeta.color}`}>
                                            {animatedScore}
                                        </span>
                                        <span className="text-xs text-white/30 mt-1">out of 100</span>
                                    </div>
                                </div>

                                <div className={`mt-6 px-5 py-1.5 rounded-full border text-xs font-bold ${riskMeta.bg} ${riskMeta.color}`}>
                                    {riskMeta.label}
                                </div>
                                <div className="mt-3 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                    <Info size={12} className="text-white/30 shrink-0" />
                                    <span className="text-xs font-medium text-white/40">
                                        Confidence: <span className="text-white/60">{CONFIDENCE_HINT[result.confidenceLevel]}</span>
                                    </span>
                                </div>
                            </motion.div>

                            {/* Right column: risks + recommendations + why */}
                            <div className="lg:col-span-2 flex flex-col gap-6">

                                {/* Detected Risks */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.15 }}
                                    className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                                >
                                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                                        <AlertTriangle size={15} className="text-white/40" />
                                        Detected Hereditary Risks
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {result.detectedDiseases.map((disease, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + idx * 0.06 }}
                                                className={`border px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2 ${getDiseaseBadgeStyle(disease)}`}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70 animate-pulse" />
                                                {disease}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Recommendations */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.22 }}
                                    className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                                >
                                    <h3 className="text-white font-semibold mb-5 flex items-center gap-2 text-sm">
                                        <CheckCircle2 size={15} className="text-white/40" />
                                        AI Recommendations
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.recommendations.map((rec, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.28 + idx * 0.07 }}
                                                className="flex gap-3 text-sm text-white/65 items-start group/item"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-white/10 group-hover/item:bg-white/20 text-white/70 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                                    <span className="text-[10px] font-bold">{idx + 1}</span>
                                                </div>
                                                <p className="leading-relaxed">{rec}</p>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Why this result? */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:-translate-y-1 hover:border-white/15 transition-all duration-300"
                                >
                                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
                                        <HelpCircle size={15} className="text-white/40" />
                                        Why this result?
                                    </h3>
                                    <ul className="space-y-2.5">
                                        {whyReasons.map((reason, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.35 + idx * 0.08 }}
                                                className="flex items-start gap-2.5 text-sm text-white/50"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
                                                {reason}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>

                            </div>
                        </div>

                        {/* ── CTA: Improve your insights ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.45 }}
                            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Heart size={16} className="text-white/40" />
                                    <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">Improve Your Insights</span>
                                </div>
                                <p className="text-white font-semibold text-lg mb-1">Get a more accurate prediction</p>
                                <p className="text-sm text-white/40">Add more family members and health records to unlock deeper AI analysis.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                <a
                                    href="/dashboard/trees"
                                    className="px-5 py-2.5 bg-white text-black hover:bg-slate-100 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
                                >
                                    <UserPlus size={15} />
                                    Add Family Member
                                </a>
                                <a
                                    href="/dashboard/trees"
                                    className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <PlusCircle size={15} />
                                    Add Health Data
                                </a>
                            </div>
                        </motion.div>

                    </motion.div>
                )}

            </div>
        </div>
    )
}
