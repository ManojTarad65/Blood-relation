'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Central animation timing registry for the UI kit - Minimalist now
export const UI_ANIMATION = {
    CARD_HOVER: { y: -2, transition: { duration: 0.2 } },
    CARD_TAP: { scale: 0.99 },
    FADE_IN_UP: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 }
    }
};

/**
 * Animated number counter component
 */
export function AnimatedNumber({ from = 0, to, duration = 1.5, suffix = '' }: { from?: number, to: number, duration?: number, suffix?: string }) {
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
 * Standard Minimal Card Wrapper (replaces GlassCard)
 */
export function Card({ children, className = '', ...props }: React.ComponentProps<typeof motion.div>) {
    return (
        <motion.div
            className={`p-6 md:p-8 rounded-xl border border-white/10 bg-[#111827] shadow-sm relative overflow-hidden group ${className}`}
            whileHover={UI_ANIMATION.CARD_HOVER}
            {...props}
        >
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}

// Alias for backwards compatibility with previous pages
export const GlassCard = Card;

export function StatCard({ title, value, numericValue, trend, icon, delay = 0, suffix = '' }: any) {
    return (
        <Card
            initial={UI_ANIMATION.FADE_IN_UP.initial}
            animate={UI_ANIMATION.FADE_IN_UP.animate}
            transition={{ ...UI_ANIMATION.FADE_IN_UP.transition, delay }}
            className="flex flex-col justify-between"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="text-sm text-slate-400 font-medium">
                    {title}
                </div>
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {icon}
                </div>
            </div>

            <div className="text-4xl font-semibold mb-2 tracking-tight text-white flex items-baseline">
                {numericValue !== undefined ? (<AnimatedNumber to={numericValue} suffix={suffix} /> as any) : value}
            </div>

            <div className="text-sm text-slate-500">
                {trend}
            </div>
        </Card>
    );
}

/**
 * Section Title Component
 */
export function SectionTitle({ title, icon, action }: { title: string, icon?: React.ReactNode, action?: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 w-full">
            <h2 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
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
