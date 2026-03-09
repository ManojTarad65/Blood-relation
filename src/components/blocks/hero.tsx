"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import Image from "next/image";

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const
        }
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

// 3D Tilt Card Component for the Product Preview
function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useMotionTemplate`${mouseYSpring}deg`;
    const rotateY = useMotionTemplate`${mouseXSpring}deg`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct * 15); // max rotation 15deg
        y.set(yPct * -15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px"
            }}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden group w-full"
        >
            {children}
        </motion.div>
    );
}

export function Hero() {
    return (
        <section className="relative pt-40 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-background overflow-hidden">
                {/* Deep background color */}
                <div className="absolute inset-0 bg-[#030014]" />

                {/* Glow 1: Top Center Purple */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25)_0%,transparent_60%)] opacity-80" />

                {/* Glow 2: Left Blue */}
                <div className="absolute top-[20%] -left-[10%] w-[50%] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0%,transparent_50%)] blur-[80px]" />

                {/* Glow 3: Right Cyan */}
                <div className="absolute top-[30%] -right-[10%] w-[50%] h-[500px] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15)_0%,transparent_50%)] blur-[80px]" />

                {/* Subtle noise/grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                />

                {/* Bottom fade out to background */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="max-w-6xl mx-auto px-6 text-center z-10 w-full">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="flex flex-col items-center"
                >
                    {/* Announcement Badge */}
                    <motion.div variants={fadeIn} className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-md opacity-20 animate-pulse" />
                        <div className="relative inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-200 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="font-medium tracking-wide">🚀 Introducing AI Automation</span>
                            <ArrowRight className="w-4 h-4 ml-1 text-zinc-400" />
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeIn}
                        className="text-6xl md:text-7xl xl:text-8xl font-extrabold tracking-tighter text-white leading-[1.1]"
                    >
                        Build Modern Products <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent pb-2 block">
                            Faster Than Ever
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeIn}
                        className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Build powerful applications using modern tools,
                        AI workflows, and scalable infrastructure.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_30px_rgba(124,58,237,0.3)] border-0 text-white transition-all">
                                Get Started
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white transition-all shadow-lg">
                                View Demo
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* 3D Product Preview */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-24 w-full relative perspective-[2000px]"
                    >
                        <TiltCard>
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none z-10" />
                            {/* Product screenshot */}
                            <div style={{ transform: "translateZ(10px)" }} className="relative w-full h-auto min-h-[400px]">
                                <Image
                                    src="/images/dashboard.png"
                                    alt="Product Dashboard Preview"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Trusted Companies */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-32 w-full pt-10 relative z-10"
                    >
                        <p className="text-sm font-medium text-zinc-500 mb-8 uppercase tracking-[0.2em]">
                            Trusted by teams worldwide
                        </p>
                        <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center">
                            {['OpenAI', 'GitHub', 'Stripe', 'Vercel', 'Nvidia'].map((company) => (
                                <div
                                    key={company}
                                    className="text-xl md:text-2xl font-bold text-zinc-400 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 transform hover:-translate-y-1 cursor-default"
                                >
                                    {company}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}