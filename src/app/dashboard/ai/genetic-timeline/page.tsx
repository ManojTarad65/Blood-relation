'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Brain, CalendarPlus, ShieldAlert, UserPlus, RotateCw, Plus, HeartPulse, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface TimelinePoint {
  ageRange: string
  risks: string[]
  advice: string
}

export default function GeneticTimelinePage() {
  const [loading, setLoading] = useState(true)
  const [timeline, setTimeline] = useState<TimelinePoint[]>([])
  const [error, setError] = useState('')

  const generateTimeline = useCallback(async () => {
    setLoading(true)
    setError('')
    
    try {
      const supabase = createClient()
      const { data: familyData, error: dbError } = await supabase.from('family_members').select('*')
      
      if (dbError) throw new Error('Could not retrieve family data.')
      
      const res = await fetch('/api/genetic-timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyData: familyData || [] })
      })
      
      if (!res.ok) {
        throw new Error('Failed to generate timeline.')
      }

      const data = await res.json()
      setTimeline(data.timeline || [])
    } catch (err: any) {
      console.error('Timeline Generation Error:', err)
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    generateTimeline()
  }, [generateTimeline])

  const getRiskNodeColor = (hasHighRisks: boolean) => {
    return hasHighRisks 
      ? 'bg-red-500/40 border-red-400/60 animate-pulse'
      : 'bg-emerald-500/30 border-emerald-400/50'
  }

  return (
    <div className="min-h-screen pb-12 p-6 md:p-8">
      
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col gap-10">

        {/* Unified Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 pb-6 border-b border-[rgba(255,255,255,0.05)] gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Genetic Risk Timeline</h1>
                <p className="text-sm text-[rgba(255,255,255,0.5)]">AI predicts how hereditary risks evolve across your life stages.</p>
            </div>
            <Link 
                href="/dashboard" 
                className={`px-5 py-2.5 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 w-fit ${loading ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <ArrowLeft size={16} /> Dashboard
            </Link>
        </div>

        <AnimatePresence mode="wait">
            {/* Loading State */}
            {loading && (
            <motion.div 
                key="loading"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center p-20 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-3xl min-h-[400px]"
            >
                <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="mb-8 relative"
                >
                <Brain size={48} className="text-[rgba(255,255,255,0.4)] relative z-10" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-[rgba(255,255,255,0.8)]">Analyzing your genetic data...</h3>
                <p className="text-[rgba(255,255,255,0.4)] text-sm">This may take a few seconds</p>
            </motion.div>
            )}

            {/* Error State */}
            {!loading && error && (
            <motion.div 
                key="error"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-10 border border-[rgba(255,0,0,0.3)] rounded-3xl flex flex-col items-center text-center justify-center min-h-[350px]"
                style={{ background: 'rgba(255,255,255,0.04)' }}
            >
                <ShieldAlert className="text-[rgba(255,255,255,0.5)] mb-5" size={48} />
                <h3 className="text-2xl font-semibold text-white mb-2">Something went wrong</h3>
                <p className="text-[rgba(255,255,255,0.5)] text-base mb-8 max-w-md">We couldn’t generate your timeline. Please try again.</p>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="px-5 py-2.5 bg-transparent border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] text-white rounded-lg text-sm font-medium transition-all active:scale-95">
                        Go Back
                    </Link>
                    <button 
                        onClick={generateTimeline} 
                        className="px-6 py-2.5 bg-white text-black hover:brightness-110 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <RotateCw size={16} /> Retry Analysis
                    </button>
                </div>
            </motion.div>
            )}

            {/* Empty State */}
            {!loading && !error && timeline.length === 0 && (
            <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-16 border border-dashed border-[rgba(255,255,255,0.1)] rounded-3xl text-center bg-[rgba(255,255,255,0.02)] min-h-[400px] flex flex-col items-center justify-center"
            >
                <div className="w-20 h-20 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl flex items-center justify-center mb-6">
                    <UserPlus className="text-[rgba(255,255,255,0.3)]" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[rgba(255,255,255,0.9)]">No data available yet</h3>
                <p className="text-[rgba(255,255,255,0.4)] text-base mb-8 max-w-sm">Add family health data to generate insights and predictions.</p>
                <Link 
                    href="/dashboard/trees" 
                    className="px-8 py-3 bg-white text-black hover:brightness-110 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-md flex items-center gap-2"
                >
                    <Plus size={18} /> Add Data
                </Link>
            </motion.div>
            )}

            {/* Timeline View */}
            {!loading && !error && timeline.length > 0 && (
            <motion.div 
                key="timeline"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative pt-8 pb-12"
            >
                {/* The line itself */}
                <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-px bg-[rgba(255,255,255,0.1)] -translate-x-1/2" />

                <div className="flex flex-col gap-12 relative z-10">
                {timeline.map((point, index) => {
                    const isEven = index % 2 === 0;
                    const isHighRisk = point.risks.some(r => r.toLowerCase().includes('high') || r.toLowerCase().includes('severe') || point.risks.length >= 3);

                    return (
                        <motion.div 
                            key={point.ageRange}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, type: 'spring', bounce: 0.4 }}
                            className={`flex flex-col md:flex-row items-start md:items-center w-full relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Center Node */}
                            <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#0D1323] border border-[rgba(255,255,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 transition-transform group-hover:scale-110">
                                <div className={`w-3 h-3 rounded-full border ${getRiskNodeColor(isHighRisk)}`} />
                            </div>

                            {/* Content Card container */}
                            <div className={`w-full flex pl-[70px] md:pl-0 md:w-1/2 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                                <div className={`bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative overflow-hidden w-full max-w-md group hover:-translate-y-1 hover:border-[rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 ${isEven ? 'md:ml-12 md:mr-0' : 'md:mr-12 md:ml-0'}`}>
                                
                                    <div className="flex justify-between items-start mb-6 relative z-10 gap-2 border-b border-[rgba(255,255,255,0.05)] pb-4">
                                        <div className="flex items-center gap-2">
                                            <CalendarPlus size={20} className="text-[rgba(255,255,255,0.4)] shrink-0" />
                                            <h3 className="text-xl font-bold text-white/90">Ages {point.ageRange}</h3>
                                        </div>
                                        <div className="px-3 py-1 bg-[rgba(255,255,255,0.05)] rounded-full text-xs font-semibold border border-[rgba(255,255,255,0.1)] flex items-center gap-1.5 shrink-0 text-white/70">
                                            Stage Overview
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex flex-col gap-5">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3">
                                                <HeartPulse size={16} className="text-red-400" /> Detected Risks
                                            </h4>
                                            <ul className="flex flex-col gap-2">
                                                {point.risks && point.risks.length > 0 ? point.risks.map((risk, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-[rgba(255,255,255,0.6)]">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/50 mt-1.5 shrink-0" />
                                                        {risk}
                                                    </li>
                                                )) : (
                                                    <li className="text-sm text-[rgba(255,255,255,0.4)] italic">No significant risks flagged.</li>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="p-4 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.04)]">
                                            <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2">
                                                <ShieldCheck size={16} className="text-emerald-400" /> Actionable Advice
                                            </h4>
                                            <p className="text-[rgba(255,255,255,0.65)] text-sm leading-relaxed">
                                                {point.advice}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Empty Space for opposing side (Desktop only) */}
                            <div className="hidden md:block w-1/2" />
                            
                        </motion.div>
                    )
                })}
                </div>
            </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  )
}
