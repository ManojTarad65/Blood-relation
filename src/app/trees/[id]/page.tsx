'use client'

import { createClient } from '@/lib/supabase/client'
import { TreePine, ArrowLeft, Settings, Share2, Plus, Download } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import TreeCanvas from '@/components/trees/TreeCanvas'
import { motion } from 'framer-motion'
import {
    ReactFlowProvider,
} from 'reactflow'

export default function TreeViewerPage({ params }: { params: { id: string } }) {
    const [tree, setTree] = useState<any>(null)
    const [members, setMembers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = useCallback(async () => {
        const supabase = createClient()
        const [{ data: treeData }, { data: membersData }] = await Promise.all([
            supabase.from('family_trees').select('*').eq('id', params.id).single(),
            supabase.from('family_members').select('*').eq('tree_id', params.id)
        ])

        setTree(treeData)
        if (membersData) setMembers(membersData)
        setLoading(false)
    }, [params.id])

    useEffect(() => {
        loadData()
    }, [loadData])

    if (loading) return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0B0F1A]">
            <div className="w-8 h-8 rounded-full bg-indigo-500 animate-pulse blur-[10px]" />
        </div>
    );

    if (!tree) return <div className="p-10 text-white font-outfit">Tree not found or access denied.</div>

    return (
        <div className="flex flex-col h-screen w-full font-outfit relative overflow-hidden bg-[#0B0F1A] text-slate-50">

            {/* Modern Top Toolbar - Floating */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-5xl h-16 flex items-center justify-between px-4 sm:px-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl z-40 shadow-2xl"
            >
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link href="/trees" className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="h-8 w-px bg-white/10 hidden sm:block mx-1" />
                    <div className="hidden sm:flex p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-500/30 shadow-inner">
                        <TreePine size={18} className="text-indigo-400" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-white text-sm sm:text-base leading-tight tracking-tight">{tree.name}</h1>
                        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                            {members.length} Nodes Rendered
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 text-sm">
                    {/* Action Buttons */}
                    <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition-colors">
                        <Download size={14} /> Export
                    </button>
                    <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl text-indigo-100 border border-indigo-500/50 bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors shadow-glow-primary">
                        <Share2 size={14} /> Share
                    </button>
                    <div className="h-6 w-px bg-white/10 mx-1 sm:mx-2" />
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </motion.header>

            {/* Infinite Canvas Workspace */}
            <div className="flex-1 relative w-full h-full bg-[#0B0F1A]">
                {/* Ambient Background Glow for Canvas */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

                <div className="absolute inset-0 z-10 w-full h-full">
                    <ReactFlowProvider>
                        <TreeCanvas treeId={tree.id} members={members} onRefresh={loadData} />
                    </ReactFlowProvider>
                </div>
            </div>

        </div>
    )
}
