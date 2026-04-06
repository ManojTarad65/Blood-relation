'use client'

import { Camera, Image as ImageIcon, Mic, BookHeart, Plus, Clock, X, FileImage, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ArchiveItem = {
    id: number;
    year: string;
    title: string;
    type: string;
    description: string;
    date: string;
    imageUrl?: string | null;
}

const MOCK_ARCHIVES: ArchiveItem[] = [
    {
        id: 1,
        year: '1985',
        title: 'Grandparents Wedding',
        type: 'photo',
        description: 'A beautiful summer wedding at the old estate. The dress was hand-stitched over three months.',
        date: 'August 14, 1985',
        imageUrl: null // No image to trigger placeholder
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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [memories, setMemories] = useState(MOCK_ARCHIVES)

    const filteredMemories = memories.filter(a => activeTab === 'all' || a.type === activeTab)

    return (
        <div className="min-h-screen pb-12 p-4 sm:p-6 md:p-8">
            <div className="max-w-5xl mx-auto flex flex-col gap-10 relative">

                {/* Unified Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[rgba(255,255,255,0.05)] pb-8 relative z-20">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                            <Sparkles className="text-white/60 w-6 h-6" />
                            Cultural Archive
                        </h1>
                        <p className="text-sm text-white/50">Your emotional timeline: Preserving memories, traditions, and voices across generations.</p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white hover:brightness-110 text-black px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-medium active:scale-95 text-sm shrink-0 shadow-lg hover:shadow-xl w-full sm:w-auto"
                    >
                        <Plus size={18} /> Add Memory
                    </motion.button>
                </header>

                {/* Modern Pill Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-2 w-fit"
                >
                    {['all', 'photo', 'tradition', 'audio'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-300 relative overflow-hidden"
                            style={{
                                backgroundColor: activeTab === tab ? 'rgba(255,255,255,0.12)' : 'transparent',
                                color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.5)',
                            }}
                        >
                            <span className="relative z-10">{tab === 'all' ? 'Timeline' : tab + 's'}</span>
                            {activeTab !== tab && (
                                <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Timeline View */}
                {filteredMemories.length > 0 ? (
                    <div className="relative pl-6 sm:pl-8 md:pl-12 border-l border-[rgba(255,255,255,0.1)] ml-3 sm:ml-4 md:ml-6 pb-24 mt-4">
                        <AnimatePresence>
                            {filteredMemories.map((item, i) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    key={item.id}
                                    className="relative mb-12 group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[33px] sm:-left-[41px] md:-left-[57px] top-6 w-4 h-4 rounded-full bg-[#0D1323] border border-[rgba(255,255,255,0.3)] group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 z-10" />

                                    {/* Memory Card */}
                                    <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-5 md:p-[24px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-[5px] transition-all duration-300 overflow-hidden relative group/card w-full">

                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4 relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 bg-white/5 rounded-xl text-white/70 border border-white/10 group-hover/card:bg-white/10 transition-colors">
                                                    {item.type === 'photo' && <ImageIcon size={20} />}
                                                    {item.type === 'tradition' && <BookHeart size={20} />}
                                                    {item.type === 'audio' && <Mic size={20} />}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg sm:text-xl text-white tracking-tight">{item.title}</h3>
                                                    <div className="flex items-center gap-1.5 text-xs text-white/40 mt-1 uppercase tracking-wider font-medium">
                                                        <Clock size={12} /> {item.date}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-[rgba(255,255,255,0.1)] text-white text-xs font-semibold rounded-full border border-white/5 absolute top-0 right-0 sm:relative">
                                                {item.year}
                                            </div>
                                        </div>

                                        <p className="text-white/60 leading-relaxed text-sm sm:text-base mb-6 max-w-2xl relative z-10">
                                            {item.description}
                                        </p>

                                        {/* Media Preview Section */}
                                        <div className="relative z-10 overflow-hidden rounded-xl bg-white/[0.02] border border-[rgba(255,255,255,0.05)]">
                                            {item.type === 'photo' && (
                                                item.imageUrl ? (
                                                    <div className="w-full aspect-video sm:aspect-[21/9] overflow-hidden group/image cursor-pointer">
                                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover/image:scale-[1.05] transition-transform duration-500" />
                                                    </div>
                                                ) : (
                                                    <div className="w-full py-14 flex flex-col items-center justify-center text-[rgba(255,255,255,0.4)] border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl group-hover/card:border-[rgba(255,255,255,0.2)] transition-colors">
                                                        <FileImage size={32} className="mb-3 opacity-50" />
                                                        <span className="text-sm font-medium">No media added yet</span>
                                                    </div>
                                                )
                                            )}

                                            {item.type === 'audio' && (
                                                <div className="w-full flex flex-col sm:flex-row items-center gap-4 bg-white/[0.03] p-4 sm:p-5 rounded-xl border border-white/5 m-3 sm:m-4 w-[calc(100%-24px)] sm:w-[calc(100%-32px)]">
                                                    <button className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all">
                                                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent ml-1" />
                                                    </button>
                                                    <div className="flex-1 w-full flex flex-col gap-2">
                                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                                                            <div className="absolute top-0 left-0 h-full bg-white rounded-full w-1/3" />
                                                        </div>
                                                        <div className="flex justify-between text-xs text-white/40 font-mono">
                                                            <span>0:00</span>
                                                            <span>1:24</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {item.type === 'tradition' && (
                                                <div className="w-full p-5 sm:p-6 text-[rgba(255,255,255,0.7)] italic leading-relaxed border-l-2 border-l-[rgba(255,255,255,0.2)] bg-white/[0.02] m-3 sm:m-4 w-[calc(100%-24px)] sm:w-[calc(100%-32px)] rounded-r-xl">
                                                    "The ritual is as important as the outcome. Gathering the ingredients signifies unity."
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-5 mt-6 pt-5 border-t border-[rgba(255,255,255,0.05)] text-sm font-medium">
                                            <button className="text-white/40 hover:text-white transition-colors">Edit</button>
                                            <button className="text-white/40 hover:text-white transition-colors">Share</button>
                                            <button className="text-white/40 hover:text-red-400 transition-colors ml-auto">Delete</button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="py-24 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-6 drop-shadow-lg">
                            <BookHeart size={32} className="text-[rgba(255,255,255,0.4)]" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No memories added yet</h3>
                        <p className="text-[rgba(255,255,255,0.4)] max-w-sm mb-8 text-sm">Start building your cultural timeline by adding a photo, audio, or tradition.</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white border border-[rgba(255,255,255,0.2)] px-6 py-2.5 rounded-lg transition-all font-medium active:scale-95 text-sm"
                        >
                            Add your first memory
                        </button>
                    </div>
                )}
            </div>

            {/* Add Memory Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-lg bg-[#0F1424] border border-[rgba(255,255,255,0.1)] rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.1)]">
                                <h2 className="text-xl font-semibold text-white">Add New Memory</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors p-1">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 flex flex-col gap-5">
                                <div>
                                    <label className="text-sm font-medium text-[rgba(255,255,255,0.7)] block mb-1.5">Title</label>
                                    <input type="text" className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:border-[rgba(255,255,255,0.3)] focus:shadow-[0_0_15px_rgba(255,255,255,0.05)] outline-none transition-all placeholder:text-[rgba(255,255,255,0.2)]" placeholder="E.g., Summer Trip '95" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-[rgba(255,255,255,0.7)] block mb-1.5">Date</label>
                                        <input type="date" className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:border-[rgba(255,255,255,0.3)] focus:shadow-[0_0_15px_rgba(255,255,255,0.05)] outline-none transition-all block" style={{ colorScheme: 'dark' }} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[rgba(255,255,255,0.7)] block mb-1.5">Type</label>
                                        <select className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white outline-none transition-all appearance-none cursor-pointer">
                                            <option value="photo" className="bg-[#0F1424]">Photo</option>
                                            <option value="audio" className="bg-[#0F1424]">Audio</option>
                                            <option value="tradition" className="bg-[#0F1424]">Tradition</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[rgba(255,255,255,0.7)] block mb-1.5">Description</label>
                                    <textarea rows={3} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:border-[rgba(255,255,255,0.3)] focus:shadow-[0_0_15px_rgba(255,255,255,0.05)] outline-none transition-all placeholder:text-[rgba(255,255,255,0.2)] resize-none" placeholder="Tell the story behind this memory..."></textarea>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[rgba(255,255,255,0.7)] block mb-1.5">Media (Optional)</label>
                                    <div className="w-full border border-dashed border-[rgba(255,255,255,0.2)] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                                        <Camera className="w-8 h-8 text-[rgba(255,255,255,0.3)] mb-2 group-hover:text-[rgba(255,255,255,0.5)] transition-colors" />
                                        <span className="text-sm text-[rgba(255,255,255,0.5)] group-hover:text-[rgba(255,255,255,0.7)] text-center">Click to upload image or audio</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 border-t border-[rgba(255,255,255,0.1)] flex justify-end gap-3 bg-[rgba(255,255,255,0.02)]">
                                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-[rgba(255,255,255,0.6)] hover:text-white hover:bg-white/5 font-medium transition-colors text-sm">Cancel</button>
                                <button 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:brightness-110 active:scale-95 transition-all text-sm shadow-md"
                                >
                                    Save Memory
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
