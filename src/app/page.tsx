"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Brain, Network, HeartPulse, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
export default function Page() {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [hue, setHue] = useState(220)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {

        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)

    }, [])

    useEffect(() => {

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resize()
        window.addEventListener("resize", resize)

        let t = 0

        const draw = () => {

            if (!ctx) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < 3; i++) {

                ctx.strokeStyle = `hsl(${hue},100%,70%)`
                ctx.lineWidth = 2

                ctx.beginPath()

                let x = canvas.width / 2 + Math.sin(t + i) * 200
                let y = 0

                ctx.moveTo(x, y)

                for (let j = 0; j < 20; j++) {

                    x += Math.random() * 40 - 20
                    y += canvas.height / 20

                    ctx.lineTo(x, y)

                }

                ctx.stroke()

            }

            t += 0.02
            requestAnimationFrame(draw)

        }

        draw()

    }, [hue])

    return (

        <div className="bg-black text-white overflow-x-hidden">

            {/* NAVBAR injected via layout.tsx */}

            {/* HERO */}

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-screen opacity-50"
            />

            <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">

                <p className="text-white/40 text-sm mb-2">
                    Adjust Lightning Hue
                </p>

                <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="w-64 mb-6"
                />

                <div className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 text-sm">

                    AI Powered Family Intelligence →

                </div>

                <h1 className="text-6xl md:text-7xl font-light">
                    Blood Relation
                </h1>

                <h2 className="text-4xl md:text-5xl text-white/70 mt-4">
                    Discover Your Family Legacy
                </h2>

                <p className="mt-6 max-w-xl text-white/60">

                    Explore your ancestry, build interactive family trees,
                    analyze inherited health insights and preserve
                    generational memories with AI.

                </p>

                <div className="flex gap-4 mt-10">

                    <Link href="/dashboard" className="px-7 py-3 bg-white/10 rounded-full hover:bg-white/20 transition">
                        Start Exploring
                    </Link>

                    <Link href="/dashboard/demo" className="px-7 py-3 border border-white/20 rounded-full hover:bg-white/10 transition">
                        View Demo
                    </Link>

                </div>

                {/* floating feature labels */}

                <div className="hidden md:block">

                    <div className="absolute left-16 top-[60%] text-white/70">
                        • Family Tree
                        <p className="text-white/40 text-sm">interactive generations</p>
                    </div>

                    <div className="absolute left-[25%] top-[40%] text-white/70">
                        • AI Chatbot
                        <p className="text-white/40 text-sm">ancestry questions</p>
                    </div>

                    <div className="absolute right-[25%] top-[40%] text-white/70">
                        • Memory Gallery
                        <p className="text-white/40 text-sm">store family history</p>
                    </div>

                    <div className="absolute right-16 top-[60%] text-white/70">
                        • Health Insights
                        <p className="text-white/40 text-sm">genetic risk analysis</p>
                    </div>

                </div>

                <div className="absolute bottom-[-250px] w-[700px] h-[700px] rounded-full bg-gradient-to-b from-blue-900/40 to-black blur-xl"></div>

            </section>


            {/* FEATURES */}

            {/* FEATURES */}

            <section className="relative py-36 px-6 overflow-hidden">

                {/* glow background */}
                <div className="absolute w-[700px] h-[700px] bg-blue-600/10 blur-[180px] rounded-full left-1/2 -translate-x-1/2 -top-40"></div>

                <div className="max-w-6xl mx-auto relative">

                    {/* badge */}
                    <div className="flex justify-center mb-6">
                        <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/70 backdrop-blur-md">
                            ⚡ Platform Capabilities
                        </div>
                    </div>

                    {/* heading */}
                    <h2 className="text-5xl font-semibold text-center mb-6">

                        Everything You Need To

                        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">

                            Explore Your Heritage

                        </span>

                    </h2>

                    {/* subtitle */}
                    <p className="text-center text-white/60 max-w-2xl mx-auto mb-20">

                        RootConnect provides powerful tools powered by AI to help you
                        understand your ancestry, preserve memories, and discover
                        hidden family connections.

                    </p>

                    {/* features grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <Feature
                            icon={<Network />}
                            title="Family Tree Builder"
                            text="Create and visualize generations of your family with an interactive and dynamic family tree."
                        />

                        <Feature
                            icon={<Brain />}
                            title="AI Ancestry Chatbot"
                            text="Ask AI questions about lineage, genealogy insights, and family history discoveries."
                        />

                        <Feature
                            icon={<ImageIcon />}
                            title="Memory Gallery"
                            text="Store and organize family photos, documents, and cultural memories in one place."
                        />

                        <Feature
                            icon={<HeartPulse />}
                            title="Health Risk Predictor"
                            text="AI analyzes inherited health patterns to help predict potential genetic risks."
                        />

                    </div>

                </div>

            </section>


            {/* AI TOOLS */}


            <section className="relative py-36 px-6 overflow-hidden">

                {/* background glow */}
                <div className="absolute w-[700px] h-[700px] bg-purple-600/10 blur-[180px] rounded-full left-1/2 -translate-x-1/2 -top-40"></div>

                <div className="max-w-6xl mx-auto text-center relative">

                    {/* badge */}
                    <div className="inline-flex px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-white/70">
                        🤖 AI Powered Intelligence
                    </div>

                    {/* heading */}
                    <h2 className="text-5xl font-semibold mb-6">

                        Smart AI Tools For

                        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">

                            Family Insights

                        </span>

                    </h2>

                    {/* subtitle */}
                    <p className="text-white/60 max-w-2xl mx-auto mb-16">

                        RootConnect uses powerful AI to analyze your ancestry, predict health risks,
                        preserve cultural memories, and uncover hidden family connections.

                    </p>

                    {/* cards */}
                    <div className="grid md:grid-cols-3 gap-10">

                        <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300">

                            <div className="text-purple-400 text-3xl mb-4">🧠</div>

                            <h3 className="text-xl font-semibold mb-3">
                                Medical Advisor
                            </h3>

                            <p className="text-white/60 text-sm">
                                AI analyzes family medical history and suggests
                                preventive health measures for future generations.
                            </p>

                        </div>


                        <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/10 transition-all duration-300">

                            <div className="text-blue-400 text-3xl mb-4">📜</div>

                            <h3 className="text-xl font-semibold mb-3">
                                Cultural Archive
                            </h3>

                            <p className="text-white/60 text-sm">
                                Preserve traditions, languages, stories,
                                and family heritage using digital AI archives.
                            </p>

                        </div>


                        <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300">

                            <div className="text-purple-400 text-3xl mb-4">🌳</div>

                            <h3 className="text-xl font-semibold mb-3">
                                Smart Genealogy
                            </h3>

                            <p className="text-white/60 text-sm">
                                AI automatically detects hidden lineage
                                connections and expands your family tree.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="relative py-40 flex justify-center items-center overflow-hidden">

                {/* background glow */}
                <div className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[180px] rounded-full -top-40"></div>
                <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[180px] rounded-full bottom-0"></div>

                {/* container */}
                <div className="relative max-w-4xl mx-auto px-6 text-center">

                    {/* badge */}
                    <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-white/70">
                        🚀 Join the Future of Family Intelligence
                    </div>

                    {/* title */}
                    <h2 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">

                        Start Discovering Your

                        <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">

                            Family Roots Today

                        </span>

                    </h2>

                    {/* subtitle */}
                    <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">

                        RootConnect helps you explore your ancestry, build interactive family trees,
                        analyze inherited health insights, and preserve generational memories
                        using powerful AI tools.

                    </p>

                    {/* buttons */}
                    <div className="flex flex-col md:flex-row justify-center gap-4">

                        <Link href="/dashboard/trees/new" className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/20 text-white text-center">
                            Create Your Family Tree
                        </Link>

                        <Link href="/dashboard/ai" className="px-10 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition text-center text-white">
                            Explore AI Features
                        </Link>

                    </div>

                    {/* trust text */}
                    <p className="mt-8 text-sm text-white/40">
                        Trusted by innovators exploring their family heritage worldwide
                    </p>

                </div>

            </section>

        </div>

    )

}

function Feature({ icon, title, text }: any) {

    return (

        <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/5 border border-white/10 rounded-xl"
        >

            <div className="mb-4 text-purple-400">
                {icon}
            </div>

            <h3 className="text-lg mb-2">
                {title}
            </h3>

            <p className="text-white/60 text-sm">
                {text}
            </p>

        </motion.div>

    )

}

function Card({ title, text }: any) {

    return (

        <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 border border-white/10 rounded-xl"
        >

            <h3 className="text-xl mb-3">
                {title}
            </h3>

            <p className="text-white/60">
                {text}
            </p>

        </motion.div>

    )

}