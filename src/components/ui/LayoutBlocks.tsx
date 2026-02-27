'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function PageHeader({ title, description, badge, action }: { title: string | React.ReactNode, description: string, badge?: React.ReactNode, action?: React.ReactNode }) {
    return (
        <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16"
        >
            <div>
                {badge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-indigo-300">
                        {badge}
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                    {title}
                </h1>

                <p className="text-slate-400 mt-4 max-w-xl text-lg leading-relaxed">
                    {description}
                </p>
            </div>

            {action && (
                <div>
                    {action}
                </div>
            )}
        </motion.header>
    );
}

export function GradientButton({ children, href, onClick, className = '' }: any) {
    const baseClasses = `group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${className}`;
    const gradientClasses = "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-glow-primary hover:shadow-glow-accent hover:scale-[1.02] active:scale-[0.98]";

    if (href) {
        return (
            <Link href={href} className={`${baseClasses} ${gradientClasses}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none rounded-xl" />
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${baseClasses} ${gradientClasses} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
}

export function SubtleButton({ children, href, onClick, className = '' }: any) {
    const baseClasses = `px-5 py-2.5 font-medium rounded-xl border border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] hover:text-white transition-all duration-300 ${className}`;

    if (href) {
        return <Link href={href} className={baseClasses}>{children}</Link>;
    }
    return <button onClick={onClick} className={baseClasses}>{children}</button>;
}
