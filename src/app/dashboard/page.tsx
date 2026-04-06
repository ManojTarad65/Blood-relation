'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import {
  Plus,
  TreePine,
  Users,
  Activity,
  Brain,
  ImageIcon,
  HeartPulse,
  Sparkles,
  ArrowRight,
  Compass
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [userName, setUserName] = useState('User')
  const [trees, setTrees] = useState<any[]>([])
  const [membersCount, setMembersCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUserName(
          user.user_metadata?.full_name ||
          user.email?.split('@')[0] ||
          'User'
        )

        const { data: treeData } = await supabase
          .from('family_trees')
          .select('*')
          .eq('owner_id', user.id)

        const { count } = await supabase
          .from('family_members')
          .select('*', { count: 'exact', head: true })

        setTrees(treeData || [])
        setMembersCount(count || 0)
      }

      setLoading(false)
    }

    load()
  }, [])

  if (loading) return null

  return (
    <div className="relative min-h-screen text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-x-hidden bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.03),transparent_50%),linear-gradient(180deg,#0B0F1A_0%,#0D1323_100%)] shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]">
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16">

        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center relative mt-8">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-[100px] rounded-[100%] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/70 mb-6 drop-shadow-sm">
            <Sparkles size={14} className="text-white/80" />
            <span className="text-xs uppercase tracking-widest font-semibold">Welcome back, {userName}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4 sm:mb-6 drop-shadow-sm">
            Your Family Intelligence Hub
          </h1>

          <p className="text-white/50 text-base sm:text-lg md:text-xl font-medium max-w-2xl mb-8 sm:mb-10">
            Track lineage, health insights, and memories in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/dashboard/trees"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/[0.1] border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-white/[0.15] transition-all duration-300 shadow-lg min-h-[44px]"
            >
              <Plus size={18} />
              Create New Tree
            </Link>

            <Link
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white/70 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-white/[0.03] hover:text-white transition-all duration-300 min-h-[44px]"
            >
              <Compass size={18} />
              Explore Insights
            </Link>
          </div>
        </section>

        {/* SUMMARY STRIP */}
        <section className="flex flex-wrap justify-center gap-4">
          {[
            { title: "Active Trees", value: trees.length, icon: <TreePine size={16} /> },
            { title: "Family Members", value: membersCount, icon: <Users size={16} /> },
            { title: "Health Risks", value: 0, icon: <Activity size={16} /> }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-[10px] border border-white/[0.06] rounded-full px-5 py-2.5 hover:border-white/15 hover:bg-white/[0.05] transition-all cursor-default shadow-sm"
            >
              <div className="text-white/60">
                {item.icon}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-white leading-none">{item.value}</span>
                <span className="text-xs font-medium text-white/50">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* FEATURE CARDS */}
        <section id="features" className="pt-4">
          <div className="text-center mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Explore Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ActionCard
              icon={<Brain size={20} />}
              title="AI Chatbot"
              desc="Ask questions about ancestry and genetics."
              link="/dashboard/ai/chatbot"
            />
            <ActionCard
              icon={<HeartPulse size={20} />}
              title="Health Predictor"
              desc="AI analyzes inherited structural health risks."
              link="/dashboard/ai/health"
            />
            <ActionCard
              icon={<ImageIcon size={20} />}
              title="Memory Gallery"
              desc="Store photos and cultural family memories."
              link="/dashboard/memory-gallery"
            />
            <ActionCard
              icon={<Activity size={20} />}
              title="Genetic Timeline"
              desc="Predict how health risks evolve across ages."
              link="/dashboard/ai/genetic-timeline"
            />
          </div>
        </section>

        {/* TREES (Legacy Clusters) */}
        <section className="pt-4 pb-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 border-b border-white/5 pb-4 gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">Legacy Clusters</h2>
              <p className="text-sm text-white/50 mt-1">Your structured family records.</p>
            </div>
            <Link
              href="/dashboard/trees"
              className="text-white/50 text-sm font-medium flex items-center gap-1.5 hover:text-white transition-colors"
            >
              View All Directory <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {trees.map((tree, i) => (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/trees/${tree.id}`}>
                  <div className="group h-full bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-1 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-white/10 group-hover:text-white transition-all">
                        <TreePine size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                        {tree.name}
                      </h3>
                    </div>
                    <p className="text-sm text-white/50 font-medium line-clamp-2">
                      {tree.description || 'No description provided.'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {/* Empty state shortcut if no trees */}
            {trees.length === 0 && (
               <Link href="/dashboard/trees">
                 <div className="h-full min-h-[140px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-white/40 hover:text-white/70 hover:border-white/20 transition-all hover:bg-white/[0.02]">
                    <Plus size={24} className="mb-2" />
                    <span className="text-sm font-medium">Create First Tree</span>
                 </div>
               </Link>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}

/* ACTION CARD */
function ActionCard({ icon, title, desc, link }: any) {
  return (
    <Link href={link} className="block group">
      <div className="relative h-full p-6 rounded-2xl bg-white/[0.02] backdrop-blur-[10px] border border-white/[0.06] overflow-hidden transition-all duration-300 shadow-sm group-hover:-translate-y-[6px] group-hover:scale-[1.02] group-hover:border-white/20 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
        
        {/* Soft background gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/60 mb-5 group-hover:bg-white/10 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300">
            {icon}
          </div>

          <h3 className="text-lg font-bold text-white mb-2">
            {title}
          </h3>

          <p className="text-white/50 text-sm font-medium leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  )
}