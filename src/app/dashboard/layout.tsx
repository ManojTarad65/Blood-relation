'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Network, TreePine, LayoutDashboard, Settings, UserCircle, LogOut, Activity, Camera, Image as ImageIcon, DollarSign, ShieldCheck, MessageSquare, Stethoscope, Dna } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import RouteTransition from '@/components/layout/RouteTransition'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [userDisplay, setUserDisplay] = useState<string>('Loading...')
    const pathname = usePathname()

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
                setUserDisplay(name)
            }
        }
        fetchUser()
    }, [])

    return (
        <div className="flex h-screen overflow-hidden bg-[#0F172A] font-outfit text-slate-50 relative selection:bg-indigo-500/30">

            {/* Sidebar - Desktop (Hidden on Mobile) */}
            <aside className="hidden md:flex w-64 bg-[#111827] border-r border-white/5 flex-col transition-all z-20 shadow-sm">

                {/* Brand Area */}
                <div className="px-6 py-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-brand flex justify-center items-center shadow-glow-primary">
                        <Network className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">RootConnect</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
                    <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-4">Platform</div>
                    <SidebarItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" active={pathname === '/dashboard'} />
                    <SidebarItem href="/dashboard/trees" icon={<TreePine size={18} />} label="My Trees" active={pathname.startsWith('/dashboard/trees')} />

                    <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-8">Intelligence</div>
                    <SidebarItem href="/dashboard/health" icon={<Activity size={18} />} label="Health Insights" active={pathname === '/dashboard/health'} />
                    <SidebarItem href="/dashboard/memory-gallery" icon={<ImageIcon size={18} />} label="Memory Gallery" active={pathname === '/dashboard/memory-gallery'} />
                    <SidebarItem href="/dashboard/archive" icon={<Camera size={18} />} label="Cultural Archive" active={pathname === '/dashboard/archive'} />

                    <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-8">AI Features</div>
                    <SidebarItem href="/dashboard/ai/chatbot" icon={<MessageSquare size={18} />} label="AI Chatbot" active={pathname.startsWith('/dashboard/ai/chatbot')} />
                    <SidebarItem href="/dashboard/ai/health" icon={<Dna size={18} />} label="Health Risk Predictor" active={pathname.startsWith('/dashboard/ai/health')} />
                    <SidebarItem href="/dashboard/ai/advisor" icon={<Stethoscope size={18} />} label="Medical Advisor" active={pathname.startsWith('/dashboard/ai/advisor')} />


                    <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-8">Account</div>
                    <SidebarItem href="/dashboard/pricing" icon={<DollarSign size={18} />} label="Pricing" active={pathname === '/dashboard/pricing'} />
                    <SidebarItem href="/dashboard/profile" icon={<UserCircle size={18} />} label="Profile" active={pathname === '/dashboard/profile'} />
                    <SidebarItem href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" active={pathname === '/dashboard/settings'} />
                </nav>

                <div className="p-4 mt-auto">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors cursor-pointer mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                            {userDisplay.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-slate-200 truncate">{userDisplay}</span>
                            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase mt-0.5">Free Plan</span>
                        </div>
                    </div>

                    <form action="/auth/signout" method="post">
                        <button className="flex w-full items-center gap-3 px-3 py-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors text-sm font-medium">
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 overflow-y-auto relative z-10 w-full pb-20 md:pb-0">
                <RouteTransition>
                    {children}
                </RouteTransition>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#111827] border-t border-white/10 z-50 px-6 py-3 flex items-center justify-between pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.2)]">
                <MobileNavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Home" active={pathname === '/dashboard'} />
                <MobileNavItem href="/dashboard/trees" icon={<TreePine size={20} />} label="Trees" active={pathname.startsWith('/dashboard/trees')} />
                <MobileNavItem href="/dashboard/memory-gallery" icon={<ImageIcon size={20} />} label="Gallery" active={pathname === '/dashboard/memory-gallery'} />
                <MobileNavItem href="/dashboard/profile" icon={<UserCircle size={20} />} label="Profile" active={pathname === '/dashboard/profile'} />
            </nav>
        </div>
    )
}

function MobileNavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link
            href={href}
            className={`flex flex-col items-center gap-1.5 transition-all p-2
                ${active ? 'text-indigo-400 scale-110' : 'text-slate-500 hover:text-slate-300'}
            `}
        >
            {icon}
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
        </Link>
    )
}

function SidebarItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link
            href={href}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium relative overflow-hidden
        ${active
                    ? 'text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }
      `}
        >
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-full shadow-glow-primary" />
            )}
            <span className={`${active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
                {icon}
            </span>
            {label}
        </Link>
    )
}
