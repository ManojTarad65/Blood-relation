'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Central animation timing registry for the UI kit
export const UI_ANIMATION = {
    CARD_HOVER: { scale: 1.02, transition: { duration: 0.3 } },
    CARD_TAP: { scale: 0.98 },
    FADE_IN_UP: {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }
};

/**
 * Animated number counter component
 */
export function AnimatedNumber({ from = 0, to, duration = 2, suffix = '' }: { from?: number, to: number, duration?: number, suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView && ref.current) {
            const controls = animate(from, to, {
                duration,
                ease: "easeOut",
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = Math.floor(value).toLocaleString() + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, from, to, duration, suffix]);

    return <span ref={ref}>{from}{suffix}</span>;
}

/**
 * Standard Glass Card Wrapper
 */
export function GlassCard({ children, className = '', ...props }: React.ComponentProps<typeof motion.div>) {
    return (
        <motion.div
            className={`p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden group ${className}`}
            whileHover={UI_ANIMATION.CARD_HOVER}
            {...props}
        >
            <div className="absolute top-0 right-0 p-24 bg-white/[0.01] rounded-full blur-[40px] group-hover:bg-white/[0.03] transition-colors duration-700" />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}

export function StatCard({ title, value, numericValue, trend, icon, iconBg, delay = 0, suffix = '' }: any) {
    return (
        <GlassCard
            initial={UI_ANIMATION.FADE_IN_UP.initial}
            animate={UI_ANIMATION.FADE_IN_UP.animate}
            transition={{ ...UI_ANIMATION.FADE_IN_UP.transition, delay }}
            className="flex flex-col justify-between"
        >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-8">
                <div className="text-sm text-slate-400 uppercase tracking-wide font-medium">
                    {title}
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${iconBg || 'from-indigo-500 to-purple-600'} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
            </div>

            <div className="text-5xl font-extrabold mb-2 tracking-tight text-white">
                {numericValue !== undefined ? (<AnimatedNumber to={numericValue} suffix={suffix} /> as any) : value}
            </div>

            <div className="text-sm text-slate-500">
                {trend}
            </div>
        </GlassCard>
    );
}

/**
 * Section Title Component
 */
export function SectionTitle({ title, icon, action }: { title: string, icon?: React.ReactNode, action?: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 w-full">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                {icon}
                {title}
            </h2>
            {action && (
                <div className="text-sm font-medium text-slate-400">
                    {action}
                </div>
            )}
        </div>
    );
}
