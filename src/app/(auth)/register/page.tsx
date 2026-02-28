import Link from 'next/link'
import { signup } from '../actions'
import { Network } from 'lucide-react'

export default function RegisterPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
    return (
        <div className="glass-card p-10 flex flex-col w-full text-slate-50 relative overflow-hidden">
            {/* Decorative pulse */}
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-brand opacity-80" />

            <div className="flex flex-col items-center mb-8">
                <Network className="w-12 h-12 text-purple-400 mb-4" />
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-brand">Join RootConnect</h1>
                <p className="text-slate-400 text-sm mt-2">Start documenting your family legacy</p>
            </div>

            <form className="animate-in flex flex-col w-full justify-center gap-4 text-slate-200">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-400" htmlFor="full_name">Full Name</label>
                    <input
                        className="rounded-xl px-4 py-3 bg-slate-900/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-600"
                        name="full_name"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="text-sm text-slate-400" htmlFor="email">Email</label>
                    <input
                        className="rounded-xl px-4 py-3 bg-slate-900/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-600"
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="text-sm text-slate-400" htmlFor="password">Password</label>
                    <input
                        className="rounded-xl px-4 py-3 bg-slate-900/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-600"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {searchParams?.error && (
                    <p className="mt-2 p-3 bg-red-900/20 text-red-400 text-sm text-center border border-red-900/50 rounded-xl">
                        {searchParams.error}
                    </p>
                )}

                {searchParams?.message && (
                    <p className="mt-2 p-3 bg-emerald-900/20 text-emerald-400 text-sm text-center border border-emerald-900/50 rounded-xl">
                        {searchParams.message}
                    </p>
                )}

                <button
                    formAction={signup}
                    className="mt-6 font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-3 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                >
                    Sign Up Free
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                    Sign in
                </Link>
            </div>
        </div>
    )
}
