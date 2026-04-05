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
        <div className="min-h-screen pb-12 p-6 md:p-8">
            <div className="max-w-5xl mx-auto flex flex-col gap-10 relative">

                {/* Unified Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8 relative z-20">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Cultural Archive</h1>
                        <p className="text-sm text-white/50">Preserving memories, traditions, and voices across time.</p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-white hover:bg-white/90 text-black px-6 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold active:scale-95 text-sm shrink-0"
                    >
                        <Plus size={16} /> Add Memory
                    </motion.button>
                </header>

                {/* Modern Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="flex gap-2 p-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl w-fit"
                >
                    {['all', 'photo', 'tradition', 'audio'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-xl text-sm font-semibold capitalize transition-all relative ${activeTab === tab
                                    ? 'text-black'
                                    : 'text-white/40 hover:text-white/80'
                                }`}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
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
                                    <div className="absolute -left-[41px] md:-left-[57px] top-6 w-4 h-4 rounded-full bg-[#0D1323] border border-white/30 group-hover:scale-125 group-hover:bg-white transition-all duration-300 z-10" />

                                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative shadow-lg">

                                        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/5 rounded-xl text-white/70 border border-white/10">
                                                    {item.type === 'photo' && <ImageIcon size={20} />}
                                                    {item.type === 'tradition' && <BookHeart size={20} />}
                                                    {item.type === 'audio' && <Mic size={20} />}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-xl text-white tracking-tight">{item.title}</h3>
                                                    <div className="flex items-center gap-2 text-xs font-medium text-white/40 mt-1 uppercase tracking-widest">
                                                        <Clock size={12} /> {item.date}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-1.5 bg-white/10 text-white text-sm font-bold rounded-lg border border-white/10">
                                                {item.year}
                                            </div>
                                        </div>

                                        <p className="text-white/60 leading-relaxed text-base md:text-lg mb-8 max-w-2xl relative z-10">
                                            {item.description}
                                        </p>

                                        {/* Media Renderers */}
                                        <div className="relative z-10">
                                            {item.type === 'photo' && (
                                                <div className="w-full h-80 bg-white/[0.02] rounded-2xl border border-dashed border-white/10 flex items-center justify-center">
                                                    <Camera size={48} className="text-white/10" />
                                                </div>
                                            )}

                                            {item.type === 'audio' && (
                                                <div className="w-full max-w-md flex items-center gap-4 bg-white/[0.04] p-4 rounded-2xl border border-white/10">
                                                    <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-slate-200 active:scale-95 transition-all">
                                                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent ml-1" />
                                                    </button>
                                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: "33%" }}
                                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                                            className="absolute top-0 left-0 h-full bg-white rounded-full"
                                                        />
                                                    </div>
                                                    <span className="text-xs text-white/50 font-mono font-medium">1:24</span>
                                                </div>
                                            )}

                                            {item.type === 'tradition' && (
                                                <div className="w-full p-6 bg-white/[0.02] rounded-2xl border border-white/5 text-white/70 italic leading-relaxed border-l-2 border-l-white/20">
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
        </div>
    )
}
