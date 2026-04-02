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
      case 'HIGH': return 'text-rose-400 bg-rose-500/10 border-rose-500/20'
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    }
  }

  const getRiskGradient = (risk: string) => {
    switch(risk) {
        case 'LOW': return 'from-emerald-500/20 to-transparent'
        case 'MEDIUM': return 'from-amber-500/20 to-transparent'
        case 'HIGH': return 'from-rose-500/20 to-transparent'
        default: return 'from-slate-500/20 to-transparent'
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-white px-8 py-12 relative overflow-hidden flex flex-col items-center">
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 flex flex-col gap-10">

        {/* Header */}
        <section className="flex flex-col gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 w-fit transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-3">
             <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
               <Activity size={28} />
             </div>
             <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Genetic Risk Timeline
                </h1>
                <p className="text-slate-400 mt-1 flex items-center gap-2">
                   <Sparkles size={14} className="text-indigo-400" />
                   AI predicts how hereditary risks evolve across your life stages.
                </p>
             </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-20 bg-[#0E1320]/50 backdrop-blur-xl border border-white/5 rounded-3xl min-h-[400px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8 relative"
            >
               <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full" />
               <Brain size={48} className="text-indigo-400 relative z-10" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Analyzing Genomic Patterns</h3>
            <p className="text-slate-400">Processing family health history and projecting future timelines...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-4 text-rose-200">
             <ShieldAlert className="text-rose-400 shrink-0" size={24} />
             <div>
               <h4 className="font-semibold text-rose-300">Analysis Failed</h4>
               <p className="mt-1">{error}</p>
             </div>
          </div>
        )}

        {/* Timeline View */}
        {!loading && !error && timeline.length > 0 && (
          <div className="relative">
             
             {/* The line itself */}
             <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-rose-500/50 -translate-x-1/2 rounded-full" />

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
                        <div className={`bg-[#0E1320]/70 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl relative overflow-hidden w-full max-w-sm group border-t-white/10 hover:border-white/20 transition-all ${isEven ? 'md:ml-6' : 'md:mr-6'}`}>
                           
                           {/* Decorative background glow based on risk */}
                           <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-full h-32 bg-gradient-to-b ${getRiskGradient(point.risk)} opacity-30 pointer-events-none transition-opacity group-hover:opacity-50`} />

                           <div className="flex justify-between items-start mb-4 relative z-10">
                              <div className="flex items-center gap-2">
                                 <CalendarPlus size={18} className="text-slate-400" />
                                 <h3 className="text-xl font-bold">Age {point.age}</h3>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getRiskColor(point.risk)}`}>
                                 {point.risk === 'HIGH' && <ShieldAlert size={12} />}
                                 {point.risk} RISK
                              </div>
                           </div>

                           <div className="relative z-10">
                              <p className="text-slate-300 leading-relaxed">
                                {point.insight}
                              </p>
                           </div>

                        </div>
                     </div>

                     {/* Center Node */}
                     <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#070B14] border-4 border-[#0E1320] shadow-[0_0_15px_rgba(99,102,241,0.3)] z-20">
                        <div className={`w-4 h-4 rounded-full ${point.risk === 'HIGH' ? 'bg-rose-500 animate-pulse' : point.risk === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
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
          <div className="p-12 bg-[#0E1320]/50 backdrop-blur-xl border border-white/5 rounded-3xl text-center">
            <User className="text-slate-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">No Timeline Data</h3>
            <p className="text-slate-400">We couldn't generate a genetic history timeline for you at this time.</p>
          </div>
        )}

      </div>
    </div>
  )
}
