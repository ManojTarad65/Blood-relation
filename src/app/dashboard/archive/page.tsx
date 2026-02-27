'use client'

import { Camera, Image as ImageIcon, Mic, BookHeart, Plus, Clock } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MOCK_ARCHIVES = [
    {
        id: 1,
        year: '1985',
        title: 'Grandparents Wedding',
        type: 'photo',
        description: 'A beautiful summer wedding at the old estate.',
        date: 'August 14, 1985'
    },
    {
        id: 2,
        year: '1992',
        title: 'Family Recipe: Nonna\'s Pasta',
        type: 'tradition',
        description: 'The secret ingredient is always a pinch of nutmeg and hours of patience.',
        date: 'December 24, 1992'
    },
    {
        id: 3,
        year: '2001',
        title: 'Dad singing lullaby',
        type: 'audio',
        description: 'A digitized tape recording from the old camcorder.',
        date: 'May 5, 2001'
    }
]

export default function CulturalArchivePage() {
    const [activeTab, setActiveTab] = useState('all')

    return (
        <div className="p-10 max-w-5xl mx-auto flex flex-col gap-10 font-outfit min-h-screen relative">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8 relative z-20">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                            <BookHeart className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Cultural Archive</h1>
                            <p className="text-slate-400 mt-1">Preserving memories, traditions, and voices across time.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="gradient-button bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                >
                    <Plus size={16} /> Add Memory
                </motion.button>
            </header>

            {/* Modern Filter Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="flex gap-2 p-1 bg-white/[0.03] rounded-xl w-fit border border-white/5"
            >
                {['all', 'photo', 'tradition', 'audio'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all relative ${activeTab === tab
                                ? 'text-white'
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTabIndicator"
                                className="absolute inset-0 bg-white/10 rounded-lg shadow-sm border border-white/10"
                            />
                        )}
                        <span className="relative z-10">{tab === 'all' ? 'Timeline' : tab + 's'}</span>
                    </button>
                ))}
            </motion.div>

            {/* Timeline View */}
            <div className="relative pl-8 md:pl-12 border-l border-white/10 ml-4 md:ml-6 pb-24 mt-4">
                <AnimatePresence>
                    {MOCK_ARCHIVES
                        .filter(a => activeTab === 'all' || a.type === activeTab)
                        .map((item, i) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
                                key={item.id}
                                className="relative mb-16 group"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute -left-[41px] md:-left-[57px] top-6 w-5 h-5 rounded-full bg-[#0B0F1A] border-4 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover:scale-125 group-hover:bg-amber-400 transition-all duration-300 z-10" />

                                <div className="glass-card p-8 border-white/5 hover:border-amber-500/30 overflow-hidden relative">

                                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-700 -translate-y-1/2 translate-x-1/2" />

                                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white/5 rounded-xl text-amber-400 border border-white/5 shadow-inner">
                                                {item.type === 'photo' && <ImageIcon size={20} />}
                                                {item.type === 'tradition' && <BookHeart size={20} />}
                                                {item.type === 'audio' && <Mic size={20} />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl text-white tracking-tight">{item.title}</h3>
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">
                                                    <Clock size={12} /> {item.date}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-1.5 bg-amber-500/10 text-amber-500 font-mono text-sm font-bold rounded-lg border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                            {item.year}
                                        </div>
                                    </div>

                                    <p className="text-slate-300 leading-relaxed font-light text-lg mb-8 max-w-2xl relative z-10">
                                        {item.description}
                                    </p>

                                    {/* Media Renderers */}
                                    <div className="relative z-10">
                                        {item.type === 'photo' && (
                                            <div className="w-full h-80 bg-[#0B0F1A]/80 rounded-2xl border border-white/5 overflow-hidden relative group-hover:border-amber-500/20 transition-colors flex items-center justify-center">
                                                <Camera size={48} className="text-slate-800" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                            </div>
                                        )}

                                        {item.type === 'audio' && (
                                            <div className="w-full max-w-md flex items-center gap-4 bg-[#0B0F1A]/80 p-4 rounded-2xl border border-white/5 shadow-inner group-hover:border-amber-500/20 transition-colors">
                                                <button className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                                                    <div className="w-0 h-0 border-t-6 border-t-transparent border-l-[8px] border-l-white border-b-6 border-b-transparent ml-1" />
                                                </button>
                                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: "33%" }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className="absolute top-0 left-0 h-full bg-amber-500 rounded-full shadow-glow-accent"
                                                    />
                                                </div>
                                                <span className="text-xs text-slate-400 font-mono font-medium">1:24</span>
                                            </div>
                                        )}

                                        {item.type === 'tradition' && (
                                            <div className="w-full p-6 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl border border-amber-500/10 text-amber-200/80 italic font-light leading-relaxed border-l-4 border-l-amber-500/50">
                                                "We gather every year to prepare this together, ensuring the youngest in the family learns the exact fold for the dough."
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>

        </div>
    )
}
