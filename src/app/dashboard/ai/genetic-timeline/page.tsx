'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowLeft, Brain, CalendarPlus, HeartPulse, ShieldAlert, Sparkles, User, UserPlus } from 'lucide-react'
import Link from 'next/link'

interface TimelinePoint {
  age: number
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  insight: string
}

export default function GeneticTimelinePage() {

  const [loading, setLoading] = useState(true)
  const [timeline, setTimeline] = useState<TimelinePoint[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await fetch('/api/ai/genetic-timeline', {
          method: 'POST'
        })
        
        if (!res.ok) throw new Error('Failed to generate timeline.')

        const data = await res.json()
        setTimeline(data.timeline || [])
      } catch (err: any) {
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    fetchTimeline()
  }, [])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      case 'MEDIUM': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
      case 'HIGH': return 'text-red-400 bg-red-500/10 border-red-500/20'
      default: return 'text-white/50 bg-white/5 border-white/10'
    }
  }

  const getRiskNodeColor = (risk: string) => {
    switch (risk) {
        case 'LOW': return 'bg-emerald-500/60'
        case 'MEDIUM': return 'bg-amber-500/60'
        case 'HIGH': return 'bg-red-500/80 animate-pulse'
        default: return 'bg-white/40'
    }
  }

  return (
    <div className="min-h-screen pb-12 p-6 md:p-8">
      
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col gap-10">

        {/* Unified Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 pb-6 border-b border-white/5 gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Genetic Risk Timeline</h1>
                <p className="text-sm text-white/50">AI predicts how hereditary risks evolve across your life stages.</p>
            </div>
            <Link href="/dashboard" className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                <ArrowLeft size={16} /> Dashboard
            </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-20 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl min-h-[400px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8 relative"
            >
               <Brain size={48} className="text-white/40 relative z-10" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-white/80">Analyzing Genomic Patterns</h3>
            <p className="text-white/50">Processing family health history and projecting future timelines...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-6 bg-white/5 border border-red-500/30 rounded-2xl flex items-start gap-4 text-red-300">
             <ShieldAlert className="text-red-500/80 shrink-0" size={24} />
             <div>
               <h4 className="font-semibold text-red-400">Analysis Failed</h4>
               <p className="mt-1">{error}</p>
             </div>
          </div>
        )}

        {/* Timeline View */}
        {!loading && !error && timeline.length > 0 && (
          <div className="relative pt-8">
             
             {/* The line itself */}
             <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2" />

             <div className="flex flex-col gap-12 relative z-10">
               {timeline.map((point, index) => {
                 
                 const isEven = index % 2 === 0;

                 return (
                   <motion.div 
                     key={point.age}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.15, type: 'spring', bounce: 0.4 }}
                     className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                   >
                     
                     {/* Content Card */}
                     <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                        <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden w-full max-w-sm group hover:-translate-y-1 hover:border-white/20 transition-all duration-300 ${isEven ? 'md:ml-6' : 'md:mr-6'}`}>
                           
                           <div className="flex justify-between items-start mb-4 relative z-10">
                              <div className="flex items-center gap-2">
                                 <CalendarPlus size={18} className="text-white/40" />
                                 <h3 className="text-xl font-bold text-white/90">Age {point.age}</h3>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${getRiskColor(point.risk)}`}>
                                 {point.risk === 'HIGH' && <ShieldAlert size={12} />}
                                 {point.risk} RISK
                              </div>
                           </div>

                           <div className="relative z-10 text-white/65 text-sm">
                              <p className="leading-relaxed">
                                {point.insight}
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Center Node */}
                     <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#0D1323] border border-white/20 shadow-xl z-20 transition-transform group-hover:scale-110">
                        <div className={`w-3 h-3 rounded-full ${getRiskNodeColor(point.risk)}`} />
                     </div>

                     {/* Empty Space for opposing side (Desktop only) */}
                     <div className="hidden md:block w-1/2" />
                     
                   </motion.div>
                 )
               })}
             </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && timeline.length === 0 && (
          <div className="p-12 border border-dashed border-white/10 rounded-3xl text-center bg-white/[0.02]">
            <User className="text-white/30 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2 text-white/80">No Timeline Data</h3>
            <p className="text-white/50 text-sm">We couldn't generate a genetic history timeline for you at this time.</p>
          </div>
        )}

      </div>
    </div>
  )
}
