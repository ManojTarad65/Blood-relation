import Link from 'next/link'
import { login } from '../actions'
import { Network } from 'lucide-react'

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
    return (
        <div className="glass-card p-10 flex flex-col w-full text-slate-50 relative overflow-hidden">
            {/* Decorative pulse */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand opacity-80" />

            <div className="flex flex-col items-center mb-8">
                <Network className="w-12 h-12 text-indigo-400 mb-4" />
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-brand">Welcome Back</h1>
                <p className="text-slate-400 text-sm mt-2">Sign in to your RootConnect account</p>
            </div>

            <form className="animate-in flex flex-col w-full justify-center gap-4 text-slate-200">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-400" htmlFor="email">Email</label>
                    <input
                        className="rounded-xl px-4 py-3 bg-slate-900/50 border border-slate-700/50 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-600"
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="text-sm text-slate-400" htmlFor="password">Password</label>
                    <input
                        className="rounded-xl px-4 py-3 bg-slate-900/50 border border-slate-700/50 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-600"
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
                    formAction={login}
                    className="mt-6 font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-4 py-3 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                >
                    Sign In
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-400">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                    Create an account
                </Link>
            </div>
        </div>
    )
}
