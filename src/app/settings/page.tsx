'use client';

import { Settings, ShieldAlert, Bell, Moon, Smartphone, DownloadCloud, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    return (
        <div className="p-10 max-w-5xl mx-auto flex flex-col gap-10 font-outfit">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 border-b border-white/5 pb-8"
            >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl border border-white/10">
                    <Settings className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Preferences</h1>
                    <p className="text-slate-400 mt-1">Manage platform settings, theme, and data controls.</p>
                </div>
            </motion.div>

            <div className="flex flex-col gap-8">

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-8 flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Moon className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-xl font-bold text-white">Appearance</h2>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-medium">Theme Preference</h3>
                            <p className="text-sm text-slate-400">Select your interface color scheme.</p>
                        </div>
                        <div className="flex items-center p-1 bg-black/50 rounded-lg border border-white/10">
                            <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">Light</button>
                            <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-white/10 text-white shadow shadow-black border border-white/5">Dark</button>
                            <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors">System</button>
                        </div>
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8 flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Bell className="w-5 h-5 text-purple-400" />
                        <h2 className="text-xl font-bold text-white">Notifications</h2>
                    </div>

                    <ToggleSetting title="Email Digests" description="Receive weekly summaries of AI insights and tree activities." active={false} />
                    <ToggleSetting title="Correction Requests" description="Get notified when editors suggest node changes." active={true} />
                    <ToggleSetting title="Marketing & Updates" description="Platform news and feature updates." active={false} />
                </motion.div>

                {/* Data & Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-8 flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <ShieldAlert className="w-5 h-5 text-cyan-400" />
                        <h2 className="text-xl font-bold text-white">Data & Privacy</h2>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <div>
                            <h3 className="text-white font-medium flex items-center gap-2">Export Data <DownloadCloud size={14} /></h3>
                            <p className="text-sm text-slate-400">Download your raw family JSON structure.</p>
                        </div>
                        <button className="subtle-button text-sm px-4 py-2">Export JSON</button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <div>
                            <h3 className="text-rose-400 font-medium flex items-center gap-2">Delete Account <Trash2 size={14} /></h3>
                            <p className="text-sm text-slate-400">Permanently delete all trees and associated data.</p>
                        </div>
                        <button className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-colors font-medium text-sm">Delete Data</button>
                    </div>

                </motion.div>

            </div>
        </div>
    )
}

function ToggleSetting({ title, description, active }: { title: string, description: string, active: boolean }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <h3 className="text-white font-medium">{title}</h3>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
            <button className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${active ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    )
}
