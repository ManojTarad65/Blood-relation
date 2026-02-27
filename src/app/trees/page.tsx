'use client';

import { createClient } from '@/lib/supabase/client';
import { TreePine, Plus, Search, MoreVertical, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TreesPage() {
    const [trees, setTrees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTrees() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('family_trees').select('*').eq('owner_id', user.id).order('created_at', { ascending: false });
                if (data) setTrees(data);
            }
            setLoading(false);
        }
        loadTrees();
    }, []);

    if (loading) return null;

    return (
        <div className="p-10 max-w-7xl mx-auto flex flex-col gap-10 font-outfit min-h-screen">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative border-b border-white/5 pb-8"
            >
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-glow-primary border border-white/10">
                        <TreePine className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">My Forests</h1>
                        <p className="text-slate-400 mt-1">Manage all your isolated family graphs.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            placeholder="Search trees..."
                            className="w-full bg-[#0B0F1A]/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>
                    <Link
                        href="/trees/new"
                        className="gradient-button flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap"
                    >
                        <Plus size={16} /> New Tree
                    </Link>
                </div>
            </motion.div>

            {/* Grid */}
            {trees.length === 0 ? (
                <div className="glass-card p-16 flex flex-col items-center justify-center text-center">
                    <TreePine className="w-16 h-16 text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Forests Found</h3>
                    <p className="text-slate-400 mb-6">Initialize a new tree to begin charting your family.</p>
                    <Link href="/trees/new" className="gradient-button px-6 py-2 rounded-xl text-sm">Create One</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {trees.map((tree, i) => (
                            <motion.div
                                key={tree.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <Link href={`/trees/${tree.id}`} className="glass-card p-6 flex flex-col items-start group min-h-[220px]">

                                    <div className="w-full flex justify-between items-start mb-6">
                                        <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-500">
                                            <TreePine className="text-indigo-400" size={24} />
                                        </div>
                                        <button className="p-2 text-slate-500 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-white transition-colors tracking-tight line-clamp-1">{tree.name}</h3>
                                    <p className="text-sm text-slate-400 mb-auto line-clamp-2 font-light">{tree.description || 'No description provided.'}</p>

                                    <div className="w-full h-px bg-white/5 my-4 group-hover:bg-indigo-500/20 transition-colors" />

                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 group-hover:text-white transition-colors">
                                            Updated Recently
                                        </div>
                                        <ArrowRight size={16} className="text-slate-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                                    </div>

                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

        </div>
    )
}
