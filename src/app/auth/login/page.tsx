import Link from 'next/link'
import { login } from '../actions'
import { Network } from 'lucide-react'

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
    return (
        <div 
            className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8"
            style={{
                background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.05), transparent 40%), linear-gradient(180deg, #0B0F1A, #0D1323)'
            }}
        >
            <div className="w-full max-w-md flex flex-col items-center">
                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-sm">
                        <Network className="w-6 h-6 text-white" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center tracking-tight">
                    Sign in to your account
                </h1>
                <p className="text-slate-400 text-sm md:text-base text-center mb-8">
                    Access your family intelligence dashboard
                </p>

                {/* Auth Card */}
                <div 
                    className="w-full rounded-2xl p-7 shadow-2xl"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <form className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-slate-300 font-medium" htmlFor="email">Email</label>
                            <input
                                className="w-full rounded-lg px-4 py-3 bg-transparent border border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.05)] focus:ring-1 focus:ring-white/30 outline-none transition-all duration-200"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-slate-300 font-medium" htmlFor="password">Password</label>
                            <input
                                className="w-full rounded-lg px-4 py-3 bg-transparent border border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.05)] focus:ring-1 focus:ring-white/30 outline-none transition-all duration-200"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {searchParams?.error && (
                            <p className="mt-2 p-3 bg-red-500/10 text-red-400 text-sm text-center border border-red-500/20 rounded-lg">
                                {searchParams.error}
                            </p>
                        )}

                        {searchParams?.message && (
                            <p className="mt-2 p-3 bg-emerald-500/10 text-emerald-400 text-sm text-center border border-emerald-500/20 rounded-lg">
                                {searchParams.message}
                            </p>
                        )}

                        <button
                            formAction={login}
                            className="mt-2 w-full font-medium bg-white text-black rounded-lg px-4 py-3 transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Footer Text */}
                <div className="mt-8 text-center text-sm text-slate-400">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-white hover:text-white/80 transition-colors font-medium">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    )
}
