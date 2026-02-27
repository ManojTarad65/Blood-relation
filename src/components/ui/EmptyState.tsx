'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function EmptyState({ title, description, icon, actionLabel, actionHref, actionIcon }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-12 md:p-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl text-center flex flex-col items-center"
        >
            <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                className="relative z-10 mb-8"
            >
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[40px] opacity-20 animate-pulse-slow" />
                <div className="w-20 h-20 bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center relative shadow-glow-primary">
                    {icon}
                </div>
            </motion.div>

            <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">
                {title}
            </h3>

            <p className="text-slate-400 max-w-md mx-auto mb-10 text-lg font-light">
                {description}
            </p>

            {actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-glow-primary hover:shadow-glow-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                    {actionLabel} {actionIcon}
                </Link>
            )}
        </motion.div>
    );
}
