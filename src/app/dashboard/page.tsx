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
  Sparkles,
  ArrowRight
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
    <div className="relative min-h-screen bg-[#0B0F19] text-white px-8 py-12 overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px]" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">

        {/* HERO */}
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, {userName}
            </h1>
            <p className="text-slate-400 mt-3 text-lg">
              Your generational intelligence dashboard is online.
            </p>
          </div>

          <Link
            href="/trees"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            <Plus size={16} />
            New Tree
          </Link>
        </section>

        {/* AI MAIN PANEL */}
        <section className="relative bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
          <div className="absolute inset-0 rounded-3xl border border-indigo-500/20 pointer-events-none" />

          <div className="flex items-center gap-4 mb-6">
            <Brain size={28} className="text-indigo-400" />
            <h2 className="text-2xl font-semibold">AI Intelligence Engine</h2>
          </div>

          <p className="text-slate-300 max-w-2xl mb-8">
            Analyze hereditary patterns, detect genetic anomalies, and build predictive health models across generations.
          </p>
          <Link href="/dashboard/pricing">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition">
              Unlock AI Analysis
            </button>
          </Link>
        </section>

        {/* METRICS */}
        <section className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Active Trees",
              value: trees.length,
              icon: <TreePine size={20} />
            },
            {
              title: "Family Members",
              value: membersCount,
              icon: <Users size={20} />
            },
            {
              title: "Health Flags",
              value: 0,
              icon: <Activity size={20} />
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111827]/60 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-indigo-500/40 transition-all shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">{item.title}</span>
                <div className="text-indigo-400">{item.icon}</div>
              </div>
              <h3 className="text-3xl font-bold">{item.value}</h3>
            </motion.div>
          ))}

        </section>

        {/* TREES SECTION */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Legacy Clusters</h2>
            <Link href="/dashboard/trees" className="text-indigo-400 flex items-center gap-2">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trees.map((tree, i) => (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/trees/${tree.id}`}>
                  <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all hover:-translate-y-2 shadow-lg hover:shadow-indigo-500/20">
                    <h3 className="text-lg font-semibold mb-2">{tree.name}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {tree.description || 'No description provided.'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}