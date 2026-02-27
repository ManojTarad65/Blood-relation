'use client';

import { createClient } from '@/lib/supabase/client';
import { Camera, Mail, User, ShieldCheck, Zap, UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) return null;

    return (
        <div className="p-10 max-w-5xl mx-auto flex flex-col gap-10 font-outfit">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 border-b border-white/5 pb-8"
            >
                <div className="p-4 rounded-2xl bg-gradient-brand shadow-glow-primary">
                    <User className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Account Profile</h1>
                    <p className="text-slate-400 mt-1">Manage your identity and subscription data.</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Identity Column */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 flex flex-col gap-6"
                >
                    <div className="glass-card p-8 flex flex-col items-center text-center">

                        <div className="relative group cursor-pointer mb-6">
                            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[20px] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="w-32 h-32 rounded-full border-4 border-[#0B0F1A] bg-indigo-900 overflow-hidden relative z-10 flex items-center justify-center">
                                {user?.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-bold text-indigo-300">{user?.email?.charAt(0).toUpperCase()}</span>
                                )}
                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Camera className="w-6 h-6 text-white mb-1" />
                                    <span className="text-xs font-semibold">Change</span>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">{user?.user_metadata?.full_name || 'Anonymous Platform User'}</h2>
                        <div className="text-sm text-slate-400 flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" /> {user?.email}
                        </div>

                        <div className="mt-8 w-full border-t border-white/5 pt-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-lg border border-emerald-500/20 w-full justify-center">
                                <ShieldCheck className="w-4 h-4" /> Account Verified
                            </div>
                        </div>

                    </div>

                    {/* Plan Summary */}
                    <div className="glass-card p-6 border-indigo-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[30px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Current Plan</h3>
                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-4xl font-bold text-white flex items-center gap-2">
                                <Zap className="text-indigo-400 w-8 h-8" /> Free
                            </span>
                        </div>
                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors border border-white/10 text-sm">
                            Upgrade to Premium Hub
                        </button>
                    </div>
                </motion.div>

                {/* Form Column */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 glass-card p-8 flex flex-col gap-6"
                >
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                        <h3 className="text-xl font-bold text-white">General Information</h3>
                        <button className="gradient-button px-6 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm">
                            <UploadCloud size={16} /> Save Changes
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Full Name</label>
                            <input
                                defaultValue={user?.user_metadata?.full_name}
                                className="px-4 py-3 bg-[#0B0F1A]/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white outline-none"
                                placeholder="Steve Jobs"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Email Address</label>
                            <input
                                disabled
                                defaultValue={user?.email}
                                className="px-4 py-3 bg-[#0B0F1A]/50 border border-white/5 rounded-xl text-slate-500 outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Public Biography</label>
                        <textarea
                            rows={4}
                            className="px-4 py-3 bg-[#0B0F1A]/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white outline-none resize-none"
                            placeholder="Write a short summary about your lineage..."
                        />
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <h3 className="text-xl font-bold text-white mb-6">Security</h3>
                        <div className="flex flex-col gap-2 w-full max-w-sm">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">New Password</label>
                            <input
                                type="password"
                                className="px-4 py-3 bg-[#0B0F1A]/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <button className="mt-4 subtle-button rounded-xl text-sm">
                            Update Password
                        </button>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
