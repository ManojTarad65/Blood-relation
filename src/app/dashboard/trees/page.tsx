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
        <div className="min-h-screen bg-[#0B0F19] text-white px-8 py-16">

            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between gap-6">

                    <div>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <TreePine className="text-indigo-400" />
                            My Forests
                        </h1>
                        <p className="text-slate-400 mt-2">
                            Manage all your family trees.
                        </p>
                    </div>

                    <div className="flex gap-4">

                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search trees..."
                                className="pl-9 bg-[#111827] border border-white/10 rounded-lg px-4 py-2 text-sm"
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-500 transition flex items-center gap-2"
                        >
                            <Plus size={16} /> New Tree
                        </button>

                    </div>
                </div>

                {/* GRID */}
                {filteredTrees.length === 0 ? (
                    <div className="text-center py-32 border border-white/10 rounded-xl bg-[#111827]">
                        <TreePine className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                        <p className="text-slate-400">No trees found</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTrees.map((tree) => (
                            <motion.div
                                key={tree.id}
                                whileHover={{ y: -6 }}
                                onClick={() => router.push(`/dashboard/trees/${tree.id}`)}
                                className="bg-[#111827] border border-white/10 rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:border-indigo-500/30 hover:bg-white/[0.02] transition-all"
                            >
                                <div className="flex justify-between mb-4">
                                    <TreePine className="text-indigo-400" />
                                    <div className="flex gap-2">

                                        {/* EDIT */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEdit(tree);
                                            }}
                                            className="text-indigo-400 hover:text-indigo-300"
                                        >
                                            <Edit3 size={16} />
                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(tree.id);
                                            }}
                                            className="text-rose-400 hover:text-rose-300"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {tree.name}
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2">
                                        {tree.description || 'No description'}
                                    </p>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <ArrowRight className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-[#111827] p-8 rounded-2xl w-full max-w-md border border-white/10"
                        >
                            <div className="flex justify-between mb-6">
                                <h2 className="text-xl font-bold">
                                    {editingTree ? 'Edit Tree' : 'Create Tree'}
                                </h2>
                                <button onClick={resetModal}>
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Tree Name"
                                    className="bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-2"
                                />

                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                    className="bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-2"
                                />

                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-indigo-600 py-2 rounded-lg mt-2 flex items-center justify-center"
                                >
                                    {saving ? (
                                        <Loader2 className="animate-spin" />
                                    ) : editingTree ? 'Update' : 'Create'}
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}