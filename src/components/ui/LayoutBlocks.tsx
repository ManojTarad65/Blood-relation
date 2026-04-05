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

// Minimal Page Header
export function SectionHeader({ title, description, badge, action }: { title: string | React.ReactNode, description?: string, badge?: React.ReactNode, action?: React.ReactNode }) {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 w-full">
            <div className="flex flex-col gap-1">
                {badge && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-md bg-white/5 text-[10px] font-bold text-white/50 uppercase tracking-widest border border-white/10 w-fit">
                        {badge}
                    </div>
                )}
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {title}
                </h1>
                {description && (
                    <p className="text-white/40 text-sm mt-1 max-w-2xl font-medium">
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

// Clean Primary Button
export function PrimaryButton({ children, href, onClick, className = '', disabled=false }: any) {
    const baseClasses = `group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${className} ${disabled ? 'opacity-50 pointer-events-none' : 'active:scale-95'}`;
    const primaryClasses = "bg-white text-black hover:bg-slate-200 shadow-sm";

    if (href) {
        return (
            <Link href={href} className={`${baseClasses} ${primaryClasses}`}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${primaryClasses}`}>
            <span>{children}</span>
        </button>
    );
}

export const GradientButton = PrimaryButton; // Alias

export function SubtleButton({ children, href, onClick, className = '', disabled=false }: any) {
    const baseClasses = `inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.08] hover:text-white transition-all duration-200 shadow-sm ${className} ${disabled ? 'opacity-50 pointer-events-none' : 'active:scale-95'}`;

    if (href) {
        return <Link href={href} className={baseClasses}>{children}</Link>;
    }
    return <button onClick={onClick} disabled={disabled} className={baseClasses}>{children}</button>;
}
