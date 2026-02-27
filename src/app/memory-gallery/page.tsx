'use client';

import { PageHeader, GradientButton, SubtleButton } from '@/components/ui/LayoutBlocks';
import { EmptyState } from '@/components/ui/EmptyState';
import { Camera, ImagePlus, Calendar, X, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Temporary Mock Data
const MOCK_MEMORIES = [
    { id: 1, url: 'https://images.unsplash.com/photo-1541603517407-3eec5280b2a9?auto=format&fit=crop&q=80', caption: 'Verma Family Reunion 2018', date: '2018', tags: ['Gathering', 'Mumbai'] },
    { id: 2, url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80', caption: 'Grandpa’s 80th Birthday', date: '2020', tags: ['Celebration'] },
    { id: 3, url: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&q=80', caption: 'Old Ancestral Home', date: '1995', tags: ['Heritage'] },
    { id: 4, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80', caption: 'Diwali at Home', date: '2022', tags: ['Festival'] },
];

export default function MemoryGalleryPage() {
    const [memories, setMemories] = useState(MOCK_MEMORIES);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Upload form state
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadCaption, setUploadCaption] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadFile || !uploadCaption) return;

        setIsUploading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newMemory = {
                id: Date.now(),
                url: URL.createObjectURL(uploadFile),
                caption: uploadCaption,
                date: uploadDate || new Date().getFullYear().toString(),
                tags: ['New']
            };

            setMemories([newMemory, ...memories]);
            setIsUploadModalOpen(false);
            setUploadFile(null);
            setUploadCaption('');
            setUploadDate('');
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0B0F1A] text-white overflow-y-auto">
            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="p-6 md:p-12 max-w-7xl mx-auto flex flex-col gap-10">
                <PageHeader
                    badge={<><Camera size={14} /> Legacy Vault</>}
                    title="Family Memory Gallery"
                    description="Preserve the moments that define your legacy. Upload photos and tag them to build your generational archive."
                    action={
                        <GradientButton onClick={() => setIsUploadModalOpen(true)}>
                            <ImagePlus size={18} /> Upload Memory
                        </GradientButton>
                    }
                />

                {/* Filters */}
                {memories.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                        <SubtleButton className="!bg-white/10 !text-white text-sm">All Time</SubtleButton>
                        <SubtleButton className="text-sm">2020s</SubtleButton>
                        <SubtleButton className="text-sm">2010s</SubtleButton>
                        <SubtleButton className="text-sm">Pre-2000</SubtleButton>
                    </div>
                )}

                {/* Masonry Grid */}
                {memories.length === 0 ? (
                    <div>
                        <EmptyState
                            icon={<Camera className="w-10 h-10 text-indigo-400" />}
                            title="Your Vault is Empty"
                            description="Start building your visual legacy by uploading old family photos or recent gatherings."
                            actionLabel="Upload First Memory"
                            actionIcon={<ImagePlus size={16} />}
                            actionHref="#"
                        />
                        <div className="flex justify-center -mt-8 relative z-20">
                            <GradientButton onClick={() => setIsUploadModalOpen(true)}>
                                <ImagePlus size={18} /> Upload Memory
                            </GradientButton>
                        </div>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {memories.map((mem, i) => (
                            <motion.div
                                key={mem.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group break-inside-avoid relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-white/5"
                                onClick={() => setSelectedImage(mem)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                                <img
                                    src={mem.url}
                                    alt={mem.caption}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{mem.caption}</h3>
                                    <div className="flex items-center gap-2 text-sm text-indigo-200 font-medium">
                                        <Calendar size={14} /> {mem.date}
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {mem.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-white/20 backdrop-blur-md text-white border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B0F1A]"
                        >
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.caption}
                                className="w-full h-auto max-h-[70vh] object-contain bg-black/50"
                            />
                            <div className="p-6 bg-[#0B0F1A] border-t border-white/10">
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.caption}</h2>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <span className="flex items-center gap-1.5"><Calendar size={16} /> {selectedImage.date}</span>
                                    <div className="flex gap-2">
                                        {selectedImage.tags.map((tag: string) => (
                                            <span key={tag} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/5 text-slate-300 border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="w-full max-w-md bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <ImagePlus size={20} className="text-indigo-400" />
                                    New Memory
                                </h2>
                                <button
                                    onClick={() => !isUploading && setIsUploadModalOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors"
                                    disabled={isUploading}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleUpload} className="p-6 flex flex-col gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Photo File</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${uploadFile ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-white/10 hover:border-indigo-400/50 bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        {uploadFile ? (
                                            <>
                                                <Camera className="text-indigo-400 mb-1" size={24} />
                                                <span className="text-sm font-medium text-indigo-200">{uploadFile.name}</span>
                                                <span className="text-xs text-indigo-400/70">Click to change</span>
                                            </>
                                        ) : (
                                            <>
                                                <ImagePlus className="text-slate-400 mb-1" size={24} />
                                                <span className="text-sm font-medium text-slate-300">Click to browse or drag image</span>
                                                <span className="text-xs text-slate-500">JPG, PNG up to 10MB</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Caption</label>
                                    <input
                                        type="text"
                                        required
                                        value={uploadCaption}
                                        onChange={(e) => setUploadCaption(e.target.value)}
                                        placeholder="E.g. Diwali at Grandma's House"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Year (Optional)</label>
                                    <input
                                        type="text"
                                        value={uploadDate}
                                        onChange={(e) => setUploadDate(e.target.value)}
                                        placeholder="YYYY"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                    />
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        disabled={!uploadFile || !uploadCaption || isUploading}
                                        className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-glow-primary transition-all"
                                    >
                                        {isUploading ? (
                                            <><Loader2 size={18} className="animate-spin" /> Processing...</>
                                        ) : (
                                            'Save to Vault'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
