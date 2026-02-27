'use client';

import { motion } from 'framer-motion';
import { Target, Heart, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';

const VALUES = [
    {
        icon: <Target className="w-6 h-6 text-indigo-400" />,
        title: "Generational Continuity",
        description: "We believe a family's history shouldn't be lost to time or scattered across dusty albums. We map the past to inform the future.",
        gradient: "from-indigo-500/20 to-transparent"
    },
    {
        icon: <Heart className="w-6 h-6 text-purple-400" />,
        title: "Cultural Preservation",
        description: "Lineage is more than names. It's the recipes, the lullabies, and the stories. Our platform treats your culture with the highest reverence.",
        gradient: "from-purple-500/20 to-transparent"
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
        title: "Absolute Privacy",
        description: "Your genetic markers and family data are yours. End-to-end data isolation and strict Row Level Security guarantee nobody else sees it.",
        gradient: "from-emerald-500/20 to-transparent"
    },
    {
        icon: <Zap className="w-6 h-6 text-cyan-400" />,
        title: "AI Health Intelligence",
        description: "By connecting the dots across generations, we use advanced pattern recognition to give your family a fighting chance against hereditary risks.",
        gradient: "from-cyan-500/20 to-transparent"
    }
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col font-outfit">

            {/* Header section */}
            <section className="text-center max-w-3xl mx-auto mb-32 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[80px] -z-10 rounded-full" />

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight text-white">
                        We are the <span className="gradient-text">architects</span> of your family's legacy.
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                        RootConnect was founded at a global hackathon with one simple mission: to build a beautiful, secure, and intelligent platform that bridges the gap between our ancestors and our descendants.
                    </p>
                </motion.div>
            </section>

            {/* Story section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
                >
                    <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay group-hover:bg-transparent transition-all duration-700 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Family Generations"
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 origin-center grayscale group-hover:grayscale-0"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col gap-6"
                >
                    <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-2 shadow-glow-primary">
                        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Our Story</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        Born from the need to remember.
                    </h2>
                    <p className="text-lg text-slate-400 font-light leading-relaxed">
                        We realized that while we have tools to manage our finances, our projects, and our social lives, we lack a dedicated, secure space to manage the most important thing of all: our bloodline.
                    </p>
                    <p className="text-lg text-slate-400 font-light leading-relaxed">
                        Paper trees degrade. Oral histories fade. And standard DNA kits sell your data. We wanted to build a SaaS platform that puts you in complete control, utilizing Next-gen AI to actively improve your family's health outcomes while preserving your rich history intact.
                    </p>
                </motion.div>
            </section>

            {/* Values Grid */}
            <section className="mb-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Core Principles</h2>
                    <p className="text-slate-400 text-lg">The foundational rules that govern our product development.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {VALUES.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="glass-card p-8 group relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl w-fit mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight relative z-10">{value.title}</h3>
                            <p className="text-slate-400 leading-relaxed font-light relative z-10">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
