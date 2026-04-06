'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Network, TreePine, LayoutDashboard, Settings, UserCircle, LogOut, Activity, Camera, Image as ImageIcon, DollarSign, ShieldCheck, MessageSquare, Stethoscope, Dna, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import RouteTransition from '@/components/layout/RouteTransition'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [userDisplay, setUserDisplay] = useState<string>('Loading...')
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [userInitial, setUserInitial] = useState<string>('')
    const pathname = usePathname()

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const name = user.user_metadata?.full_name || 'User'
                setUserDisplay(name)
                // Use first letter of name, fallback to first letter of email
                const init = user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'
                setUserInitial(init.toUpperCase())
            } else {
                setUserDisplay('User')
                setUserInitial('U')
            }
        }
        fetchUser()
    }, [])

    return (
        <div className="flex h-screen overflow-hidden bg-[#0B0F1A] font-outfit text-white relative selection:bg-white/20 overflow-x-hidden">

            {/* Mobile Blur Overlay */}
            {isMobileOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-[4px] z-40 transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#05070A]/95 backdrop-blur-[12px] border-r border-white/5 transition-all duration-300 ease-in-out transform shadow-sm
                ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
                md:relative md:translate-x-0 md:w-20 lg:w-64`}
            >
                <div className="flex items-center justify-between px-4 py-4 h-14 shrink-0 border-b border-white/5 md:hidden">
                    <span className="text-sm font-bold tracking-widest text-white/70 uppercase">RootConnect</span>
                    <button onClick={() => setIsMobileOpen(false)} className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Drop-zone */}
                <nav className="flex-1 px-3 flex flex-col gap-[2px] overflow-y-auto pb-6 styled-scrollbar mt-4 md:mt-2 lg:mt-4 transition-all duration-200">
                    <div className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] mt-6 mb-2 block md:hidden lg:block">Platform</div>
                    <SidebarItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" active={pathname === '/dashboard'} onClick={() => setIsMobileOpen(false)} />
                    <SidebarItem href="/dashboard/trees" icon={<TreePine size={18} />} label="My Trees" active={pathname.startsWith('/dashboard/trees')} onClick={() => setIsMobileOpen(false)} />

                    <div className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] mt-6 mb-2 block md:hidden lg:block">Intelligence</div>
                    <SidebarItem href="/dashboard/health" icon={<Activity size={18} />} label="Health Insights" active={pathname === '/dashboard/health'} onClick={() => setIsMobileOpen(false)} />
                    <SidebarItem href="/dashboard/memory-gallery" icon={<ImageIcon size={18} />} label="Memory Gallery" active={pathname === '/dashboard/memory-gallery'} onClick={() => setIsMobileOpen(false)} />
                    <SidebarItem href="/dashboard/archive" icon={<Camera size={18} />} label="Cultural Archive" active={pathname === '/dashboard/archive'} onClick={() => setIsMobileOpen(false)} />

                    <div className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] mt-6 mb-2 block md:hidden lg:block">AI Features</div>
                    <SidebarItem href="/dashboard/ai/chatbot" icon={<MessageSquare size={18} />} label="AI Chatbot" active={pathname.startsWith('/dashboard/ai/chatbot')} onClick={() => setIsMobileOpen(false)} />
                    <SidebarItem href="/dashboard/ai/health" icon={<Dna size={18} />} label="Health Predictor" active={pathname.startsWith('/dashboard/ai/health')} onClick={() => setIsMobileOpen(false)} />
                    <SidebarItem href="/dashboard/ai/advisor" icon={<Stethoscope size={18} />} label="Medical Advisor" active={pathname.startsWith('/dashboard/ai/advisor')} onClick={() => setIsMobileOpen(false)} />

                    <div className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] mt-6 mb-2 block md:hidden lg:block">Account</div>
                    <SidebarItem href="/pricing" icon={<DollarSign size={18} />} label="Pricing" active={pathname === '/dashboard/pricing' || pathname === '/pricing'} onClick={() => setIsMobileOpen(false)} />
                    <SidebarItem href="/dashboard/profile" icon={<UserCircle size={18} />} label="Profile" active={pathname === '/dashboard/profile'} onClick={() => setIsMobileOpen(false)} />
                    <SidebarItem href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" active={pathname === '/dashboard/settings'} onClick={() => setIsMobileOpen(false)} />
                </nav>

                <div className="p-3 mt-auto shrink-0 mb-4 mx-auto w-full md:w-auto lg:w-full">
                    <Link href="/dashboard/profile" className="flex items-center gap-3 p-[10px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-pointer mb-2 overflow-hidden group justify-center md:bg-transparent md:border-transparent lg:bg-white/[0.04] lg:border-white/[0.08]">
                        <div className="w-8 h-8 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-white/80 font-bold border border-white/10 transition-transform group-hover:scale-105">
                            {userInitial}
                        </div>
                        <div className="flex flex-col overflow-hidden min-w-0 transition-opacity block md:hidden lg:block">
                            <span className="text-sm font-medium text-white truncate">{userDisplay}</span>
                            <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase mt-0.5 block truncate">Free Plan</span>
                        </div>
                    </Link>

                    <form action="/auth/signout" method="post">
                        <button className="flex w-full items-center justify-center md:justify-center lg:justify-start gap-3 p-[10px] text-white/50 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all text-sm font-medium group cursor-pointer outline-none mb-1">
                            <LogOut size={18} className="shrink-0 transition-transform group-hover:scale-105" />
                            <span className="block md:hidden lg:block">Sign Out</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 w-full">
                
                {/* Mobile Header Toggle */}
                <header className="md:hidden flex items-center justify-between h-14 px-4 border-b border-white/5 bg-[#05070A]/90 backdrop-blur-md shrink-0">
                    <button onClick={() => setIsMobileOpen(true)} className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors -ml-2">
                        <Menu size={22} />
                    </button>
                    <span className="text-sm font-bold tracking-widest text-white/80 uppercase">RootConnect</span>
                    <div className="w-[44px]" />
                </header>

                <main className="flex-1 overflow-y-auto relative w-full">
                    <RouteTransition>
                        {children}
                    </RouteTransition>
                </main>
            </div>
            
            {/* Custom slim scrollbars for sidebar inside scope */}
            <style jsx global>{`
                .styled-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }
                .styled-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .styled-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(255,255,255,0.05);
                  border-radius: 4px;
                }
                .styled-scrollbar:hover::-webkit-scrollbar-thumb {
                  background: rgba(255,255,255,0.1);
                }
            `}</style>
        </div>
    )
}

function SidebarItem({ href, icon, label, active, onClick }: { href: string, icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
    return (
        <Link
            href={href}
            prefetch={true}
            onClick={onClick}
            className={`group flex items-center gap-[10px] px-[14px] min-h-[44px] rounded-xl transition-all duration-200 text-sm font-medium relative outline-none
        ${active
                    ? 'bg-white/[0.08] text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]'
                    : 'text-white/60 bg-transparent hover:bg-white/[0.04] hover:text-white'
                }
        md:justify-center lg:justify-start
      `}
        >
            <span className={`shrink-0 transition-all duration-200 group-hover:scale-105 ${active ? 'text-white opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                {icon}
            </span>
            <span className={`whitespace-nowrap transition-opacity block md:hidden lg:block`}>
                {label}
            </span>

            {/* Tablet Tooltip (Only visible on md screens when hovering the icon) */}
            <span className="absolute left-[70px] bg-[#0B0F1A] border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 md:block lg:hidden hidden z-50 whitespace-nowrap shadow-xl backdrop-blur-md">
                {label}
            </span>
        </Link>
    )
}
