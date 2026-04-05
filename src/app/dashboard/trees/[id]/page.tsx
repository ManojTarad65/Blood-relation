'use client'

import { createClient } from '@/lib/supabase/client'
import { TreePine, ArrowLeft, Settings, Share2, Download, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import TreeCanvas from '@/components/trees/TreeCanvas'
import { motion } from 'framer-motion'
import { ReactFlowProvider } from 'reactflow'
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
                notFound() // Force Next.js 404 page boundary
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
        <div className="flex flex-col gap-4 h-[calc(100vh-4rem)] w-full items-center justify-center bg-transparent">
            <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-white/50 animate-spin" />
            <p className="text-sm font-medium text-white/40 tracking-widest uppercase">Initializing Canvas</p>
        </div>
    );

    // State 2: Error UI (Tree Not Found / Unauth)
    if (error || !tree) return (
        <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center  p-4 relative">
            <div className="flex flex-col items-center justify-center text-center p-10 max-w-lg w-full bg-white/[0.02] border border-white/[0.08] rounded-3xl shadow-xl backdrop-blur-xl relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
                    <AlertCircle size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">Access Denied</h1>
                <p className="text-white/50 mb-8 max-w-xs">{error || "This tree does not exist or you don't have permission to view it."}</p>
                <Link href="/dashboard/trees" className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors w-full active:scale-95 text-sm">
                    Return to Forests
                </Link>
            </div>
        </div>
    );

    // State 3: Success
    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] w-full font-outfit relative overflow-hidden bg-transparent text-white">

            {/* Modern Top Toolbar - Floating */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-5xl h-16 flex items-center justify-between px-4 sm:px-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl z-40 shadow-xl"
            >
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link href="/dashboard/trees" className="p-2 -ml-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden sm:block mx-1" />
                    <div className="hidden sm:flex p-2 rounded-xl bg-white/10 border border-white/10 text-white">
                        <TreePine size={18} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-white text-sm sm:text-base leading-tight tracking-tight">{tree.name}</h1>
                        <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase mt-0.5">
                            {members.length} Nodes Rendered
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 text-sm">
                    {/* Action Buttons */}
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-colors font-medium">
                        <Download size={14} /> Export
                    </button>
                    <button className="flex items-center gap-2 md:px-5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-black bg-white hover:bg-slate-200 transition-colors shadow-sm ml-1 active:scale-95">
                        <Share2 size={14} /> Share
                    </button>
                    <div className="h-6 w-px bg-white/10 mx-1 sm:mx-2" />
                    <button className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </motion.header>

            {/* Infinite Canvas Workspace */}
            <div className="flex-1 relative w-full h-full">
                <div className="absolute inset-0 z-10 w-full h-full rounded-2xl overflow-hidden mt-2 border-t border-white/5">
                    <ReactFlowProvider>
                        <TreeCanvas treeId={tree.id} members={members} onRefresh={loadData} />
                    </ReactFlowProvider>
                </div>
            </div>

        </div>
    )
}
