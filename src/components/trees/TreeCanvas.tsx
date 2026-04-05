'use client'

import React from 'react';

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
import { Plus, X, HeartPulse, UserCircle, TreeDeciduous } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const nodeTypes = {
    member: MemberNode
}

const TreeCanvas = React.memo(function TreeCanvas({ treeId, members, onRefresh }: { treeId: string, members: any[], onRefresh: () => void }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    // Drawer State
    const [selectedNodeData, setSelectedNodeData] = useState<any>(null)

    useEffect(() => {
        if (!members || members.length === 0) {
            setNodes([]);
            setEdges([]);
            return;
        }

        const childrenMap = new Map();
        const rootNodes: any[] = [];

        // Build hierarchy map
        members.forEach(m => {
            if (m.parent_id) {
                if (!childrenMap.has(m.parent_id)) childrenMap.set(m.parent_id, []);
                childrenMap.get(m.parent_id).push(m);
            } else {
                rootNodes.push(m);
            }
        });

        const generatedNodes: any[] = [];
        const generatedEdges: any[] = [];

        const NODE_WIDTH = 224; // w-56 in tailwind
        const X_PADDING = 40;   // min distance horizontally between nodes
        const Y_SPACING = 280;  // vertical gap between generations
        const MIN_SUBTREE_WIDTH = NODE_WIDTH + X_PADDING;

        // Pass 1: Compute Subtree Widths
        const subtreeWidths = new Map<string, number>();

        function computeWidths(node: any): number {
            const children = childrenMap.get(node.id) || [];
            if (children.length === 0) {
                subtreeWidths.set(node.id, MIN_SUBTREE_WIDTH);
                return MIN_SUBTREE_WIDTH;
            }

            let totalChildrenWidth = 0;
            children.forEach((child: any) => {
                totalChildrenWidth += computeWidths(child);
            });

            const finalWidth = Math.max(MIN_SUBTREE_WIDTH, totalChildrenWidth);
            subtreeWidths.set(node.id, finalWidth);
            return finalWidth;
        }

        rootNodes.forEach(root => computeWidths(root));

        // Handle isolated nodes that might have broken parent references
        members.forEach(m => {
            if (m.parent_id && !members.find(x => x.id === m.parent_id)) {
                if (!rootNodes.find(r => r.id === m.id)) {
                    rootNodes.push(m);
                    computeWidths(m);
                }
            }
        });

        // Pass 2: Assign Positions Top-Down
        let globalRootXOffset = 0;

        function assignPositions(node: any, depth: number, startX: number) {
            const width = subtreeWidths.get(node.id) || MIN_SUBTREE_WIDTH;
            const centerX = startX + (width / 2);

            generatedNodes.push({
                id: node.id,
                type: 'member',
                position: { x: centerX - (NODE_WIDTH / 2), y: depth * Y_SPACING },
                data: node
            });

            const children = childrenMap.get(node.id) || [];
            let childStartX = startX;

            children.forEach((child: any) => {
                const childWidth = subtreeWidths.get(child.id) || MIN_SUBTREE_WIDTH;

                generatedEdges.push({
                    id: `e-${node.id}-${child.id}`,
                    source: node.id,
                    target: child.id,
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: 'rgba(255,255,255,0.15)', strokeWidth: 2 }
                });

                assignPositions(child, depth + 1, childStartX);
                childStartX += childWidth;
            });
        }

        rootNodes.forEach(root => {
            const rootWidth = subtreeWidths.get(root.id) || MIN_SUBTREE_WIDTH;
            assignPositions(root, 0, globalRootXOffset);
            globalRootXOffset += rootWidth + X_PADDING * 2; // Extra gap between distinct trees
        });

        setNodes(generatedNodes);
        setEdges(generatedEdges);
    }, [members, setNodes, setEdges])

    const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
        setSelectedNodeData(node.data)
    }, [])

    if (!members || members.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center z-10 relative">
                <div className="w-20 h-20 rounded-full bg-white/[0.04] flex items-center justify-center mb-6 border border-white/10">
                    <TreeDeciduous size={36} className="text-white/40" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">This Canvas is Empty</h2>
                <p className="text-white/50 mb-8 max-w-sm">
                    No nodes mapped yet. Initialize the root to begin building the relationship graph.
                </p>
                <Link
                    href={`/dashboard/trees/${treeId}/member/new`}
                    className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-white rounded-xl hover:bg-slate-200 transition-all shadow-sm active:scale-95 text-sm"
                >
                    <Plus size={18} /> Initialize First Relative
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full h-[calc(100vh-64px)] relative bg-transparent">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                className="bg-transparent"
            >
                <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.06)" />
                <Controls showInteractive={false} className="shadow-2xl border-white/10 fill-white bg-[#0B0F1A]/80 backdrop-blur-md rounded-xl overflow-hidden" />
                <MiniMap zoomable pannable nodeClassName="bg-white/20 rounded-sm" maskColor="rgba(11,15,26,0.8)" className="border-white/10 shadow-2xl bg-[#0B0F1A]" />
            </ReactFlow>

            {/* Floating Action Button */}
            <Link href={`/dashboard/trees/${treeId}/member/new`} className="absolute bottom-10 right-6 md:bottom-10 md:right-10 z-30 group">
                <button className="w-14 h-14 bg-white border border-white/10 rounded-full text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center relative z-10 hover:-translate-y-1 transition-all active:scale-95">
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
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 right-0 w-full sm:w-96 h-full bg-[#0B0F1A] border-l border-white/10 z-50 shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                                    <UserCircle className="text-white/60" /> Member Details
                                </h2>
                                <button
                                    onClick={() => setSelectedNodeData(null)}
                                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">

                                {/* Header Profile */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 overflow-hidden mb-4 shadow-sm flex items-center justify-center relative backdrop-blur-md">
                                        {selectedNodeData.photo_url ? (
                                            <img src={selectedNodeData.photo_url} className="w-full h-full object-cover" />
                                        ) : (
                                            <UserCircle size={40} className="text-white/30" />
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{selectedNodeData.first_name} {selectedNodeData.last_name}</h3>
                                    <div className="text-[10px] font-bold text-white/60 mt-2 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-md border border-white/10">
                                        {selectedNodeData.parent_id ? 'Descendant' : 'Root Node'}
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl flex flex-col items-center text-center">
                                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Born</span>
                                        <span className="text-white text-sm font-medium">{selectedNodeData.birth_date ? new Date(selectedNodeData.birth_date).toLocaleDateString() : 'Unknown'}</span>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl flex flex-col items-center text-center">
                                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Status</span>
                                        <span className={`tracking-widest uppercase text-[10px] font-bold px-2 py-0.5 rounded border mt-1 ${selectedNodeData.death_date ? 'bg-white/10 text-white/60 border-white/10' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                            {selectedNodeData.death_date ? 'Deceased' : 'Living'}
                                        </span>
                                    </div>
                                    <div className="col-span-2 bg-white/[0.03] border border-white/5 p-4 rounded-xl flex flex-col items-center text-center">
                                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Blood Group</span>
                                        <span className="text-white text-sm font-medium">{selectedNodeData.blood_group || 'Unrecorded'}</span>
                                    </div>
                                </div>

                                {/* Health Data Container */}
                                {selectedNodeData.health && selectedNodeData.health.flags?.length > 0 ? (
                                    <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl">
                                        <h4 className="flex items-center gap-2 text-red-500 font-bold mb-3 uppercase tracking-widest text-[10px]">
                                            <HeartPulse size={14} className="animate-pulse" /> Health Flags
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedNodeData.health.flags.map((flag: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-white/[0.04] border border-red-500/10 text-red-400 font-medium text-xs rounded-lg shadow-sm">
                                                    {flag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/50 font-medium text-xs">
                                        <HeartPulse size={14} className="text-white/30" /> No recorded health anomalies
                                    </div>
                                )}

                                {selectedNodeData.bio && (
                                    <div className="mt-2 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                                        <h4 className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Biography</h4>
                                        <p className="text-white/60 text-sm leading-relaxed font-medium">{selectedNodeData.bio}</p>
                                    </div>
                                )}

                            </div>

                            <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                                <button className="w-full py-3 bg-white/[0.04] hover:bg-white/10 text-white rounded-xl font-semibold transition-colors border border-white/10 text-sm shadow-sm active:scale-95">
                                    Edit Core Details
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
})

export default TreeCanvas;
