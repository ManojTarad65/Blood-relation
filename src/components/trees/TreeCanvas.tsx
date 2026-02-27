'use client'

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    BackgroundVariant
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useCallback, useEffect, useState } from 'react'
import MemberNode from './MemberNode'
import { Plus, X, HeartPulse, UserCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const nodeTypes = {
    member: MemberNode
}

export default function TreeCanvas({ treeId, members, onRefresh }: { treeId: string, members: any[], onRefresh: () => void }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    // Drawer State
    const [selectedNodeData, setSelectedNodeData] = useState<any>(null)

    useEffect(() => {
        // Generate nodes
        const generatedNodes = members.map((m, index) => {
            return {
                id: m.id,
                type: 'member',
                position: { x: (index % 3) * 300, y: Math.floor(index / 3) * 200 },
                data: m
            }
        })

        // Generate edges automatically assuming 'parent_1_id' and 'parent_2_id'
        const generatedEdges: any[] = []
        members.forEach(m => {
            if (m.parent_1_id) {
                generatedEdges.push({
                    id: `e-${m.parent_1_id}-${m.id}`,
                    source: m.parent_1_id,
                    target: m.id,
                    animated: true,
                    style: { stroke: 'rgba(99,102,241,0.5)', strokeWidth: 2 }
                })
            }
            if (m.parent_2_id) {
                generatedEdges.push({
                    id: `e-${m.parent_2_id}-${m.id}`,
                    source: m.parent_2_id,
                    target: m.id,
                    animated: true,
                    style: { stroke: 'rgba(99,102,241,0.5)', strokeWidth: 2 }
                })
            }
        })

        setNodes(generatedNodes)
        setEdges(generatedEdges)
    }, [members, setNodes, setEdges])

    const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
        setSelectedNodeData(node.data)
    }, [])

    return (
        <div className="w-full h-[calc(100vh-64px)] relative bg-[#0B0F1A]">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                className="bg-transparent"
            >
                <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.05)" />
                <Controls showInteractive={false} className="shadow-2xl border-white/10 fill-white bg-[#0B0F1A]/80 backdrop-blur-md" />
                <MiniMap zoomable pannable nodeClassName="bg-indigo-500 rounded-sm" maskColor="rgba(11,15,26,0.8)" className="border-white/10 shadow-2xl" />
            </ReactFlow>

            {/* Floating Action Button (Premium SaaS standard) */}
            <Link href={`/trees/${treeId}/member/new`} className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 group">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[20px] opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                <button className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full text-white shadow-glow-primary flex items-center justify-center relative z-10 transform group-hover:scale-110 group-active:scale-95 transition-all">
                    <Plus size={24} />
                </button>
            </Link>

            {/* Glass Profile Drawer */}
            <AnimatePresence>
                {selectedNodeData && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedNodeData(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-40"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 right-0 w-full sm:w-96 h-full bg-[#0B0F1A]/95 backdrop-blur-3xl border-l border-white/10 z-50 shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                                    <UserCircle className="text-indigo-400" /> Member Details
                                </h2>
                                <button
                                    onClick={() => setSelectedNodeData(null)}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">

                                {/* Header Profile */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-indigo-900 border-4 border-indigo-500/30 overflow-hidden mb-4 shadow-glow-primary flex items-center justify-center relative group">
                                        {selectedNodeData.photo_url ? (
                                            <img src={selectedNodeData.photo_url} className="w-full h-full object-cover" />
                                        ) : (
                                            <UserCircle size={40} className="text-indigo-400" />
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{selectedNodeData.name}</h3>
                                    <div className="text-sm font-mono text-indigo-400 mt-1 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                                        {selectedNodeData.relationship_to_root || 'Root Node'}
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass-card p-4 border-white/5 flex flex-col items-center text-center">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Born</span>
                                        <span className="text-white font-mono">{new Date(selectedNodeData.birth_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="glass-card p-4 border-white/5 flex flex-col items-center text-center">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Status</span>
                                        <span className="text-emerald-400 font-mono tracking-widest uppercase text-sm font-bold bg-emerald-500/10 px-2 rounded border border-emerald-500/20">
                                            {selectedNodeData.death_date ? 'Deceased' : 'Living'}
                                        </span>
                                    </div>
                                </div>

                                {/* Health Data Container */}
                                {selectedNodeData.health && selectedNodeData.health.flags?.length > 0 ? (
                                    <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                        <h4 className="flex items-center gap-2 text-amber-500 font-bold mb-3 uppercase tracking-widest text-xs">
                                            <HeartPulse size={14} className="animate-pulse" /> Health Flags
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedNodeData.health.flags.map((flag: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-[#0B0F1A]/50 border border-amber-500/30 text-amber-200 text-sm rounded-lg shadow-inner">
                                                    {flag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-2 text-emerald-400 font-medium text-sm">
                                        <HeartPulse size={16} /> No known health anomalies.
                                    </div>
                                )}

                                {selectedNodeData.bio && (
                                    <div className="mt-2">
                                        <h4 className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Biography</h4>
                                        <p className="text-slate-300 font-light leading-relaxed">{selectedNodeData.bio}</p>
                                    </div>
                                )}

                            </div>

                            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                                <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors border border-white/10 text-sm">
                                    Edit Details
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
