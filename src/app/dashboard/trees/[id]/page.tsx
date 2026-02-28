'use client'

import { createClient } from '@/lib/supabase/client'
import { TreePine, ArrowLeft, Settings, Share2, Download, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import TreeCanvas from '@/components/trees/TreeCanvas'
import { motion } from 'framer-motion'
import { ReactFlowProvider } from 'reactflow'
import { PrimaryButton } from '@/components/ui/LayoutBlocks'
import { isDevMode, DEMO_TREES, DEMO_MEMBERS } from '@/lib/mockData'

export default function TreeViewerPage({ params }: { params: { id: string } }) {
    const [tree, setTree] = useState<any>(null)
    const [members, setMembers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user && !isDevMode()) {
                setError("Authentication required to view this tree.")
                setLoading(false)
                return
            }

            // Step 1: Safely assert existence of tree
            const { data: treeData, error: treeError } = await supabase
                .from('family_trees')
                .select('*')
                .eq('id', params.id)
                .single()

            if (!treeData && isDevMode()) {
                // Return mock tree if id somewhat matches or just forcefully override
                const mockTree = DEMO_TREES.find(t => t.id === params.id) || DEMO_TREES[0];
                setTree(mockTree);
                setMembers(DEMO_MEMBERS);
                setLoading(false);
                return;
            }

            if (treeError || !treeData) {
                console.error("Tree Fetch Error:", treeError)
                setError("Tree not found or access denied.")
                setLoading(false)
                return
            }

            // Step 2: Fetch members
            const { data: membersData, error: membersError } = await supabase
                .from('family_members')
                .select('*')
                .eq('tree_id', params.id)

            if (membersError) {
                console.error("Members Fetch Error:", membersError)
            }

            setTree(treeData)

            if (membersData && membersData.length > 0) {
                setMembers(membersData)
            } else if (isDevMode()) {
                setMembers(DEMO_MEMBERS); // show mock members even if real tree is empty during dev
            }

        } catch (err: any) {
            console.error("Unhandled exception loading tree:", err)
            setError("An unexpected error occurred while loading the tree.")
        } finally {
            setLoading(false)
        }
    }, [params.id])

    useEffect(() => {
        loadData()
    }, [loadData])

    // State 1: Loading
    if (loading) return (
        <div className="flex flex-col gap-4 h-screen w-full items-center justify-center bg-[#0B0F1A]">
            <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin" />
            <p className="text-sm font-medium text-slate-400">Loading Legacy Cluster...</p>
        </div>
    );

    // State 2: Error UI (Tree Not Found / Unauth)
    if (error || !tree) return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0F172A] font-outfit p-4">
            <div className="flex flex-col items-center justify-center text-center p-10 max-w-lg w-full bg-[#111827] border border-white/10 rounded-2xl shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                    <AlertCircle size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">Access Denied</h1>
                <p className="text-slate-400 mb-8 max-w-xs">{error || "This tree does not exist or you don't have permission to view it."}</p>
                <PrimaryButton href="/trees">
                    Return to My Forests
                </PrimaryButton>
            </div>
        </div>
    );

    // State 3: Success
    return (
        <div className="flex flex-col h-screen w-full font-outfit relative overflow-hidden bg-[#0B0F1A] text-slate-50">

            {/* Modern Top Toolbar - Floating */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-5xl h-16 flex items-center justify-between px-4 sm:px-5 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-xl z-40 shadow-xl"
            >
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link href="/trees" className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden sm:block mx-1" />
                    <div className="hidden sm:flex p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <TreePine size={18} className="text-indigo-400" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-semibold text-white text-sm sm:text-base leading-tight tracking-tight">{tree.name}</h1>
                        <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">
                            {members.length} Nodes
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 text-sm">
                    {/* Action Buttons */}
                    <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 transition-colors font-medium">
                        <Download size={14} /> Export
                    </button>
                    <button className="flex items-center gap-2 md:px-4 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm ml-1">
                        <Share2 size={14} /> Share
                    </button>
                    <div className="h-6 w-px bg-white/10 mx-1 sm:mx-2" />
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </motion.header>

            {/* Infinite Canvas Workspace */}
            <div className="flex-1 relative w-full h-full bg-[#0F172A]">
                <div className="absolute inset-0 z-10 w-full h-full">
                    <ReactFlowProvider>
                        <TreeCanvas treeId={tree.id} members={members} onRefresh={loadData} />
                    </ReactFlowProvider>
                </div>
            </div>

        </div>
    )
}
