'use client';

import { motion } from 'framer-motion';
import { PrimaryButton } from './LayoutBlocks';

export function EmptyState({ title, description, icon, actionLabel, actionHref, actionOnClick, actionIcon }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-12 md:p-20 rounded-xl border border-white/5 bg-[#111827] shadow-sm max-w-3xl mx-auto w-full"
        >
            <div className="w-16 h-16 bg-slate-800/50 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-slate-400">
                {icon}
            </div>

            <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight text-white">
                {title}
            </h3>

            <p className="text-slate-400 max-w-sm mx-auto mb-8 text-sm md:text-base">
                {description}
            </p>

            {actionHref ? (
                <PrimaryButton href={actionHref}>
                    {actionLabel} {actionIcon}
                </PrimaryButton>
            ) : actionOnClick ? (
                <PrimaryButton onClick={actionOnClick}>
                    {actionLabel} {actionIcon}
                </PrimaryButton>
            ) : null}
        </motion.div>
    );
}
