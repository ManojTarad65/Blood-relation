'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Container for authenticated app pages (sets max width and padding)
export function AppContainer({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`p-6 md:p-10 lg:p-12 max-w-7xl mx-auto w-full ${className}`}>
            {children}
        </div>
    );
}

// Minimal Page Header (replaces the glowing PageHeader)
export function SectionHeader({ title, description, badge, action }: { title: string | React.ReactNode, description?: string, badge?: React.ReactNode, action?: React.ReactNode }) {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 w-full">
            <div className="flex flex-col gap-1">
                {badge && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-md bg-indigo-500/10 text-[11px] font-semibold text-indigo-400 uppercase tracking-wider border border-indigo-500/20 w-fit">
                        {badge}
                    </div>
                )}
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {title}
                </h1>
                {description && (
                    <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <div className="w-full sm:w-auto">
                    {action}
                </div>
            )}
        </header>
    );
}

// Alias for backwards compatibility during rolling updates
export const PageHeader = SectionHeader;

// Clean Primary Button (replaces GradientButton)
export function PrimaryButton({ children, href, onClick, className = '' }: any) {
    const baseClasses = `group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${className}`;
    const primaryClasses = "bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm active:scale-[0.98]";

    if (href) {
        return (
            <Link href={href} className={`${baseClasses} ${primaryClasses}`}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${baseClasses} ${primaryClasses}`}>
            <span>{children}</span>
        </button>
    );
}

export const GradientButton = PrimaryButton; // Alias

export function SubtleButton({ children, href, onClick, className = '' }: any) {
    const baseClasses = `inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-white/10 bg-[#111827] text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-200 shadow-sm ${className}`;

    if (href) {
        return <Link href={href} className={baseClasses}>{children}</Link>;
    }
    return <button onClick={onClick} className={baseClasses}>{children}</button>;
}
