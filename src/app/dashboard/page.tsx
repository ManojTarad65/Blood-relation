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

    <div className="relative min-h-screen bg-[#070B14] text-white px-8 py-12 overflow-hidden">

      {/* glow background */}

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px]" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">

        {/* HEADER */}

        <section className="flex justify-between items-center">

          <div>

            <div className="flex items-center gap-2 text-indigo-400 mb-3">

              <Sparkles size={16} />

              <span className="text-sm uppercase tracking-wider">
                RootConnect Dashboard
              </span>

            </div>

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



        {/* QUICK ACTIONS */}

        <section className="grid md:grid-cols-3 gap-8">

          <ActionCard
            icon={<Brain />}
            title="AI Chatbot"
            desc="Ask questions about ancestry, lineage and genetics."
            link="/dashboard/ai/chatbot"
          />

          <ActionCard
            icon={<HeartPulse />}
            title="Health Risk Predictor"
            desc="AI analyzes inherited health risks from family data."
            link="/dashboard/ai/health"
          />

          <ActionCard
            icon={<ImageIcon />}
            title="Memory Gallery"
            desc="Store photos, documents and cultural family memories."
            link="/dashboard/memory-gallery"
          />

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
              className="group relative bg-[#0E1320]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-indigo-500/40 transition-all shadow-lg hover:shadow-indigo-500/20"
            >

              <div className="flex justify-between items-center mb-4">

                <span className="text-slate-400">
                  {item.title}
                </span>

                <div className="text-indigo-400 group-hover:scale-110 transition">
                  {item.icon}
                </div>

              </div>

              <h3 className="text-3xl font-bold">
                {item.value}
              </h3>

            </motion.div>

          ))}

        </section>



        {/* TREES */}

        <section>

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-2xl font-semibold">
              Legacy Clusters
            </h2>

            <Link
              href="/dashboard/trees"
              className="text-indigo-400 flex items-center gap-2"
            >

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

                  <div className="group bg-[#0E1320]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all hover:-translate-y-2 shadow-lg hover:shadow-indigo-500/30">

                    <div className="flex items-center gap-3 mb-3">

                      <TreePine size={18} className="text-indigo-400" />

                      <h3 className="text-lg font-semibold">
                        {tree.name}
                      </h3>

                    </div>

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



/* ACTION CARD */

function ActionCard({ icon, title, desc, link }: any) {

  return (

    <Link href={link}>

      <motion.div
        whileHover={{ y: -6 }}
        className="group relative p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-xl border border-white/10 hover:border-indigo-400/40 transition-all shadow-xl cursor-pointer"
      >

        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-indigo-500/10 blur-xl transition" />

        <div className="text-indigo-400 mb-4">
          {icon}
        </div>

        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>

        <p className="text-slate-400 text-sm">
          {desc}
        </p>

      </motion.div>

    </Link>

  )

}