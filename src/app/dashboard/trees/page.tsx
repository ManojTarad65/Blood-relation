'use client';

import { createClient } from '@/lib/supabase/client';
import {
    TreePine,
    Plus,
    Search,
    ArrowRight,
    Trash2,
    Edit3,
    X,
    Loader2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function TreesPage() {

    const supabase = createClient();
    const router = useRouter();

    const [trees, setTrees] = useState<any[]>([]);
    const [filteredTrees, setFilteredTrees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTree, setEditingTree] = useState<any>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);

    // LOAD TREES
    useEffect(() => {
        async function loadTrees() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            setUserId(user.id);

            const { data } = await supabase
                .from('family_trees')
                .select('*')
                .eq('owner_id', user.id)
                .order('created_at', { ascending: false });

            if (data) {
                setTrees(data);
                setFilteredTrees(data);
            }

            setLoading(false);
        }

        loadTrees();
    }, []);

    // SEARCH FILTER
    useEffect(() => {
        if (!search) {
            setFilteredTrees(trees);
        } else {
            setFilteredTrees(
                trees.filter(tree =>
                    tree.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, trees]);

    // CREATE / UPDATE
    const handleSave = async () => {
        if (!name || !userId) return;

        setSaving(true);

        try {
            if (editingTree) {
                const { data } = await supabase
                    .from('family_trees')
                    .update({ name, description })
                    .eq('id', editingTree.id)
                    .select()
                    .single();

                const updated = trees.map(t =>
                    t.id === editingTree.id ? data : t
                );

                setTrees(updated);
            } else {
                const { data } = await supabase
                    .from('family_trees')
                    .insert([{
                        owner_id: userId,
                        name,
                        description
                    }])
                    .select()
                    .single();

                setTrees([data, ...trees]);
            }

            resetModal();

        } catch (err) {
            console.error(err);
        }

        setSaving(false);
    };

    // DELETE
    const handleDelete = async (treeId: string) => {
        if (!confirm('Delete this tree permanently?')) return;

        await supabase.from('family_trees').delete().eq('id', treeId);
        setTrees(trees.filter(t => t.id !== treeId));
    };

    const openEdit = (tree: any) => {
        setEditingTree(tree);
        setName(tree.name);
        setDescription(tree.description || '');
        setIsModalOpen(true);
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setEditingTree(null);
        setName('');
        setDescription('');
    };

    if (loading) return null;

    return (
        <div className="min-h-screen pb-12 p-6 md:p-8">

            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* HEADER UNIFIED */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 pb-6 border-b border-white/5 gap-6">

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Forests</h1>
                        <p className="text-sm text-white/50">Manage all your family tree models and records.</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search trees..."
                                className="w-full pl-9 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium"
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white hover:bg-white/90 text-black px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold active:scale-95 whitespace-nowrap"
                        >
                            <Plus size={16} /> New Tree
                        </button>
                    </div>
                </div>

                {/* GRID OR EMPTY */}
                {filteredTrees.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                        <TreePine className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <h3 className="text-white/80 font-semibold mb-1 text-lg">No Trees Identified</h3>
                        <p className="text-white/40 text-sm">Start by cataloguing your first ancestral branch.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTrees.map((tree) => (
                            <motion.div
                                key={tree.id}
                                whileHover={{ y: -6 }}
                                onClick={() => router.push(`/dashboard/trees/${tree.id}`)}
                                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] group min-h-[180px]"
                            >
                                <div className="flex justify-between mb-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-white/10 group-hover:text-white transition-all">
                                        <TreePine size={18} />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEdit(tree);
                                            }}
                                            className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(tree.id);
                                            }}
                                            className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white group-hover:text-white mb-2">
                                        {tree.name}
                                    </h3>
                                    <p className="text-sm text-white/50 font-medium line-clamp-2">
                                        {tree.description || 'No description added'}
                                    </p>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <ArrowRight className="text-white/20 group-hover:text-white/80 transition-colors" size={16} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>

            {/* MODAL UNIFIED */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#0B0F1A] p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold tracking-tight text-white">
                                    {editingTree ? 'Edit Branch' : 'New Branch'}
                                </h2>
                                <button onClick={resetModal} className="text-white/40 hover:text-white transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-2 block">Tree Node</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="E.g. Maternal Lineage"
                                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-2 block">Descriptor</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Optional node details..."
                                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all min-h-[100px] resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-white text-black font-semibold py-3.5 rounded-xl mt-4 flex items-center justify-center hover:bg-slate-200 transition-colors disabled:opacity-50 active:scale-95"
                                >
                                    {saving ? (
                                        <Loader2 className="animate-spin text-black" size={20} />
                                    ) : editingTree ? 'Update Record' : 'Establish Framework'}
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}