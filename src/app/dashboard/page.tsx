// 'use client';

// import { createClient } from '@/lib/supabase/client'
// import { Plus, Activity, Users, TreePine, ArrowRight, Zap } from 'lucide-react'
// import Link from 'next/link'
// import { useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// export default function DashboardPage() {
//     const [trees, setTrees] = useState<any[]>([])
//     const [userEmail, setUserEmail] = useState<string>('')
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         async function loadData() {
//             const supabase = createClient()
//             const { data: { user } } = await supabase.auth.getUser()
//             if (user) {
//                 setUserEmail(user.user_metadata?.full_name || user.email?.split('@')[0])
//                 const { data } = await supabase.from('family_trees').select('*').eq('owner_id', user.id)
//                 if (data) setTrees(data)
//             }
//             setLoading(false)
//         }
//         loadData()
//     }, [])

//     const treeCount = trees.length

//     if (loading) return null; // Or a subtle premium loader

//     return (
//         <div className="p-10 max-w-7xl mx-auto flex flex-col gap-10 font-outfit">

//             {/* Animated Header */}
//             <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
//                 <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6, ease: "easeOut" }}
//                     className="relative z-10"
//                 >
//                     <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-xs font-medium text-indigo-300">
//                         <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,1)] animate-pulse" />
//                         System Online
//                     </div>
//                     <h1 className="text-4xl font-bold text-white tracking-tight">
//                         Welcome back, <span className="gradient-text">{userEmail}</span>
//                     </h1>
//                     <p className="text-slate-400 mt-2 max-w-lg text-lg font-light leading-relaxed">
//                         Your family intelligence dashboard is ready. Analyze patterns or continue building your legacy.
//                     </p>
//                 </motion.div>

//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
//                 >
//                     <Link
//                         href="/trees"
//                         className="group gradient-button flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide"
//                     >
//                         <Plus size={18} />
//                         Initialize New Tree
//                     </Link>
//                 </motion.div>
//             </header>

//             {/* Premium Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <StatCard
//                     icon={<TreePine className="text-white" size={20} />}
//                     iconBg="from-indigo-500 to-indigo-600 shadow-glow-primary"
//                     title="Active Forests"
//                     value={treeCount.toString()}
//                     trend="+1 generated this cycle"
//                     delay={0.1}
//                 />
//                 <StatCard
//                     icon={<Users className="text-white" size={20} />}
//                     iconBg="from-cyan-500 to-cyan-600 shadow-glow-accent"
//                     title="Digital Relatives"
//                     value="0"
//                     trend="0 instances mapped"
//                     delay={0.2}
//                 />
//                 <StatCard
//                     icon={<Activity className="text-white" size={20} />}
//                     iconBg="from-purple-500 to-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
//                     title="Health Anomalies"
//                     value="Wait"
//                     trend="Insufficient data points"
//                     delay={0.3}
//                 />
//             </div>

//             {/* Recent Trees Area */}
//             <section className="mt-4">
//                 <div className="flex items-center justify-between mb-8">
//                     <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
//                         <Zap className="text-indigo-400 w-5 h-5" />
//                         Active Legacy Clusters
//                     </h2>
//                     <Link href="/trees" className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1">
//                         View All <ArrowRight size={14} />
//                     </Link>
//                 </div>

//                 {treeCount === 0 ? (
//                     <EmptyState />
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         <AnimatePresence>
//                             {trees.map((tree, i) => (
//                                 <motion.div
//                                     key={tree.id}
//                                     initial={{ opacity: 0, scale: 0.95 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     transition={{ duration: 0.4, delay: i * 0.1 }}
//                                 >
//                                     <Link href={`/trees/${tree.id}`} className="glass-card p-6 flex flex-col items-start group min-h-[220px]">
//                                         <div className="w-full flex justify-between items-start mb-6">
//                                             <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-500">
//                                                 <TreePine className="text-indigo-400" size={24} />
//                                             </div>
//                                             <span className="text-[10px] font-mono font-semibold text-slate-400 group-hover:text-indigo-300 uppercase tracking-widest bg-white/[0.02] border border-white/5 px-2 py-1 rounded">
//                                                 Admin Access
//                                             </span>
//                                         </div>

//                                         <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-white transition-colors tracking-tight line-clamp-1">{tree.name}</h3>
//                                         <p className="text-sm text-slate-400 mb-auto line-clamp-2 font-light">{tree.description || 'No description provided.'}</p>

//                                         <div className="w-full h-px bg-white/5 my-4 group-hover:bg-indigo-500/20 transition-colors" />

//                                         <div className="w-full flex items-center justify-between">
//                                             <div className="flex items-center gap-2 text-xs font-medium text-slate-500 group-hover:text-emerald-400 transition-colors">
//                                                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
//                                                 Sync Active
//                                             </div>
//                                             <ArrowRight size={16} className="text-slate-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
//                                         </div>
//                                     </Link>
//                                 </motion.div>
//                             ))}
//                         </AnimatePresence>
//                     </div>
//                 )}
//             </section>
//         </div>
//     )
// }

// function StatCard({ icon, iconBg, title, value, trend, delay }: { icon: React.ReactNode, iconBg: string, title: string, value: string, trend: string, delay: number }) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
//             className="glass-card p-6 flex justify-between group overflow-hidden relative"
//         >
//             <div className="absolute top-0 right-0 p-24 bg-white/[0.01] rounded-full blur-[40px] group-hover:bg-white/[0.03] transition-colors duration-700" />

//             <div className="flex flex-col justify-between z-10 w-full">
//                 <div className="text-slate-400 text-sm font-semibold tracking-wide uppercase mb-4">{title}</div>
//                 <div className="flex items-end justify-between w-full">
//                     <div>
//                         <div className="text-5xl font-black text-white tracking-tighter mb-1">{value}</div>
//                         <div className="text-xs text-slate-500 font-mono">{trend}</div>
//                     </div>
//                     <div className={`p-3 rounded-2xl bg-gradient-to-br ${iconBg} mb-1 group-hover:scale-110 transition-transform duration-500 ease-out`}>
//                         {icon}
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     )
// }

// function EmptyState() {
//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="glass-card p-16 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]"
//         >
//             <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

//             {/* Floating Network Animation */}
//             <motion.div
//                 animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
//                 transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
//                 className="relative z-10 mb-8"
//             >
//                 <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[40px] opacity-30 animate-pulse-slow" />
//                 <div className="w-20 h-20 bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center relative">
//                     <TreePine className="w-10 h-10 text-indigo-400" />
//                 </div>
//             </motion.div>

//             <h3 className="text-2xl font-bold tracking-tight text-white mb-3">No Active Branches</h3>
//             <p className="text-slate-400 max-w-sm mb-8 font-light text-lg">
//                 Your genealogy workspace is empty. Initialize a new tree cluster to begin your AI analysis flow.
//             </p>

//             <Link
//                 href="/trees"
//                 className="gradient-button px-8 py-3 rounded-xl flex items-center gap-2"
//             >
//                 Initialize Cluster <Plus size={16} />
//             </Link>
//         </motion.div>
//     )
// }
'use client'

import { createClient } from '@/lib/supabase/client'
import {
    Plus,
    Activity,
    Users,
    TreePine,
    ArrowRight,
    Zap,
    ImagePlus
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, GradientButton } from '@/components/ui/LayoutBlocks'
import { StatCard } from '@/components/ui/Cards'
import { EmptyState } from '@/components/ui/EmptyState'

export default function DashboardPage() {
    const [trees, setTrees] = useState<any[]>([])
    const [userName, setUserName] = useState<string>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                setUserName(
                    user.user_metadata?.full_name ||
                    user.email?.split('@')[0] ||
                    'User'
                )

                const { data } = await supabase
                    .from('family_trees')
                    .select('*')
                    .eq('owner_id', user.id)

                if (data) setTrees(data)
            }

            setLoading(false)
        }

        loadData()
    }, [])

    if (loading) return null

    const treeCount = trees.length

    return (
        <div className="relative min-h-screen bg-[#0B0F1A] text-white overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
            </div>

            <div className="p-12 max-w-7xl mx-auto flex flex-col gap-16">

                {/* Welcome Section */}
                <PageHeader
                    badge={<><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> System Online</>}
                    title={<>Welcome back, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{userName}</span></>}
                    description="Monitor your generational intelligence, analyze hereditary insights, and expand your digital legacy network."
                    action={
                        <GradientButton href="/trees">
                            <Plus size={18} /> Initialize New Tree
                        </GradientButton>
                    }
                />

                {/* Stats Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard
                        title="Active Forests"
                        value={treeCount}
                        trend="+1 generated this cycle"
                        icon={<TreePine size={20} />}
                        delay={0.1}
                    />
                    <StatCard
                        title="Digital Relatives"
                        numericValue={0}
                        trend="0 instances mapped"
                        icon={<Users size={20} className="text-white" />}
                        iconBg="from-cyan-500 to-cyan-600"
                        delay={0.2}
                    />
                    <StatCard
                        title="Health Anomalies"
                        value="Pending"
                        trend="Insufficient data points"
                        icon={<Activity size={20} />}
                        delay={0.3}
                    />
                </section>

                {/* Active Trees */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                            <Zap className="text-indigo-400 w-5 h-5" />
                            Active Legacy Clusters
                        </h2>

                        <Link
                            href="/trees"
                            className="text-sm text-slate-400 hover:text-indigo-400 transition flex items-center gap-1"
                        >
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    {treeCount === 0 ? (
                        <EmptyState
                            icon={<TreePine className="w-10 h-10 text-indigo-400" />}
                            title="Your Legacy Starts Here"
                            description="Initialize your first family tree and begin mapping generational intelligence with AI-powered insights."
                            actionLabel="Initialize First Tree"
                            actionIcon={<Plus size={16} />}
                            actionHref="/trees"
                        />
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {trees.map((tree, i) => (
                                    <motion.div
                                        key={tree.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={`/trees/${tree.id}`}
                                            className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col gap-6"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                                                    <TreePine size={22} />
                                                </div>
                                                <span className="text-xs text-slate-400 uppercase tracking-wider">
                                                    Admin
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition">
                                                    {tree.name}
                                                </h3>
                                                <p className="text-sm text-slate-400 line-clamp-2">
                                                    {tree.description || 'No description provided.'}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between text-sm text-slate-500 mt-auto">
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                    Sync Active
                                                </span>
                                                <ArrowRight
                                                    size={16}
                                                    className="group-hover:translate-x-1 transition-transform"
                                                />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </section>

                {/* Recent Activity Feed */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                            <Activity className="text-indigo-400 w-5 h-5" />
                            Recent Intelligence Activity
                        </h2>
                    </div>

                    <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl flex flex-col gap-6 relative overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Mock Activity Item 1 */}
                        <div className="flex gap-5 items-start relative z-10">
                            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 mt-1 ring-1 ring-indigo-500/20 shadow-glow-primary">
                                <TreePine size={18} />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-white">System Initialization</h4>
                                    <span className="text-xs text-slate-500 bg-white/5 border border-white/10 px-2 py-1 rounded-md">2h ago</span>
                                </div>
                                <p className="text-sm text-slate-400">Began mapping new legacy nodes for Verma Family Tree.</p>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                        {/* Mock Activity Item 2 */}
                        <div className="flex gap-5 items-start relative z-10">
                            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 mt-1 ring-1 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                <ImagePlus size={18} />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-white">Memory Vault Expanded</h4>
                                    <span className="text-xs text-slate-500 bg-white/5 border border-white/10 px-2 py-1 rounded-md">5h ago</span>
                                </div>
                                <p className="text-sm text-slate-400">Added 3 new multimedia assets to the generational archive.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}