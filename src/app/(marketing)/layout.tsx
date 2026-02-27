'use client';

import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen font-outfit relative overflow-hidden bg-[#0B0F1A] text-slate-50 selection:bg-indigo-500/30">

            {/* Global Ambient Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[60vh] bg-cyan-600/5 rounded-full blur-[150px]" />
            </div>

            <Navbar className="sticky top-0" />

            {/* Page Content */}
            <main className="flex-1 w-full relative z-10">
                {children}
            </main>

            {/* Global Minimal Footer */}
            <footer className="py-12 border-t border-white/5 text-center flex flex-col items-center justify-center gap-6 text-slate-500 text-sm z-10 bg-[#0B0F1A]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                    <Network className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex gap-6 font-medium text-slate-400">
                    <Link href="/about" className="hover:text-white transition-colors">About</Link>
                    <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                </div>
                <p className="font-light mt-4">© {new Date().getFullYear()} RootConnect Inc. All rights reserved.</p>
            </footer>
        </div>
    );
}
