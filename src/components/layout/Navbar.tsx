import { Network, UserCircle, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { logout } from '@/app/auth/actions';
import Image from 'next/image';

export default async function Navbar({ className = "sticky top-0" }: { className?: string }) {

    // Check if user is logged in natively on the Server
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className={`${className} w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center bg-[#0B0F1A]/50 backdrop-blur-xl border-b border-white/5 transition-all`}>

            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <Image src="/images/logo.png" alt="Logo" width={24} height={24} className='invert'/>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">RootConnect</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
                <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            </div>

            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <div className="hidden md:flex items-center gap-2 mr-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                            <UserCircle className="w-4 h-4 text-indigo-400" />
                            <span className="text-sm font-medium text-slate-300">
                                Hello, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'User'}
                            </span>
                        </div>

                        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>

                        <form action={logout}>
                            <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors ml-2">
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <Link href="/auth/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link
                            href="/auth/register"
                            className="group relative px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            Get Started
                            <div className="absolute inset-0 rounded-full border border-white/40 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
