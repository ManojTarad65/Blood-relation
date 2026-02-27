'use client';

import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import Link from 'next/link';

export default function Navbar({ className = "sticky top-0" }: { className?: string }) {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${className} w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center bg-[#0B0F1A]/50 backdrop-blur-xl border-b border-white/5 transition-all`}
        >
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-glow-primary">
                    <Network className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">RootConnect</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
                <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            </div>

            <div className="flex gap-4 items-center">
                <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Sign In
                </Link>
                <Link
                    href="/register"
                    className="group relative px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                    Get Started
                    <div className="absolute inset-0 rounded-full border border-white/40 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                </Link>
            </div>
        </motion.nav>
    );
}
