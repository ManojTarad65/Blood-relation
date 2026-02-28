'use client';

import { Settings, ShieldAlert, Bell, Moon, DownloadCloud, Trash2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PageHeader, SubtleButton } from '@/components/ui/LayoutBlocks';
import { GlassCard } from '@/components/ui/Cards';

export default function SettingsPage() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [toggles, setToggles] = useState({
        emailDigests: false,
        correctionRequests: true,
        marketingUpdates: false,
        profileVisibility: true,
        dataSharing: false
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-10 font-outfit relative">
            <PageHeader
                badge={<><Settings size={14} /> Global Preferences</>}
                title="Account Settings"
                description="Manage platform settings, privacy controls, alerts, and your data."
            />

            <div className="flex flex-col gap-8">
                {/* Appearance */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <GlassCard className="flex flex-col gap-6 !p-8">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                            <Moon className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-xl font-bold text-white">Appearance</h2>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-white font-medium">Theme Preference</h3>
                                <p className="text-sm text-slate-400">Select your interface color scheme.</p>
                            </div>
                            <div className="flex items-center p-1 bg-[#0B0F1A] rounded-xl border border-white/10 shadow-inner w-full md:w-auto">
                                <button className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors">Light</button>
                                <button className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-white shadow shadow-black/50 border border-white/5">Dark</button>
                                <button className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors">System</button>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Notifications */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <GlassCard className="flex flex-col gap-6 !p-8">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                            <Bell className="w-5 h-5 text-purple-400" />
                            <h2 className="text-xl font-bold text-white">Notifications</h2>
                        </div>
                        <ToggleSetting title="Email Digests" description="Receive weekly summaries of AI insights and tree activities." active={toggles.emailDigests} onClick={() => handleToggle('emailDigests')} />
                        <div className="w-full h-px bg-white/5 my-1" />
                        <ToggleSetting title="Correction Requests" description="Get notified when editors suggest node changes." active={toggles.correctionRequests} onClick={() => handleToggle('correctionRequests')} />
                        <div className="w-full h-px bg-white/5 my-1" />
                        <ToggleSetting title="Marketing & Updates" description="Platform news and feature updates." active={toggles.marketingUpdates} onClick={() => handleToggle('marketingUpdates')} />
                    </GlassCard>
                </motion.div>

                {/* Data & Security */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <GlassCard className="flex flex-col gap-6 !p-8">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                            <ShieldAlert className="w-5 h-5 text-teal-400" />
                            <h2 className="text-xl font-bold text-white">Data & Privacy</h2>
                        </div>

                        <ToggleSetting title="Public Profile Visibility" description="Allow search engines and non-members to find your profile." active={toggles.profileVisibility} onClick={() => handleToggle('profileVisibility')} />
                        <div className="w-full h-px bg-white/5 my-1" />
                        <ToggleSetting title="AI Data Sharing" description="Anonymize and share tree data to improve our generational intelligence models." active={toggles.dataSharing} onClick={() => handleToggle('dataSharing')} />
                        <div className="w-full h-px bg-white/5 my-1" />

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 border-b border-white/5 pb-6">
                            <div>
                                <h3 className="text-white font-medium flex items-center gap-2">Export Data <DownloadCloud size={14} className="text-teal-400" /></h3>
                                <p className="text-sm text-slate-400">Download your raw family JSON structure.</p>
                            </div>
                            <SubtleButton className="text-sm px-6 w-full md:w-auto">Export JSON</SubtleButton>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 pt-2">
                            <div>
                                <h3 className="text-rose-400 font-medium flex items-center gap-2">Delete Account <Trash2 size={14} /></h3>
                                <p className="text-sm text-slate-400">Permanently delete all trees and associated data.</p>
                            </div>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="px-6 py-2.5 w-full md:w-auto bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-colors font-semibold text-sm shadow-inner"
                            >
                                Delete Data
                            </button>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="w-full max-w-md bg-[#0B0F1A] border border-rose-500/30 rounded-2xl shadow-2xl overflow-hidden relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />

                            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20 relative group">
                                    <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-md animate-pulse" />
                                    <AlertTriangle className="w-8 h-8 text-rose-500 relative z-10" />
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Erase Everything?</h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    You are about to permanently delete your account, family trees, and all associated media. This action is irreversible and cannot be undone.
                                </p>

                                <div className="flex flex-col gap-3 w-full">
                                    <button
                                        className="w-full py-3 rounded-xl font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-glow-accent ring-1 ring-rose-400/50"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                    >
                                        Yes, Delete My Data
                                    </button>
                                    <SubtleButton onClick={() => setIsDeleteModalOpen(false)} className="w-full py-3 border-transparent bg-white/5 hover:bg-white/10 !text-white">
                                        Cancel
                                    </SubtleButton>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ToggleSetting({ title, description, active, onClick }: { title: string, description: string, active: boolean, onClick: () => void }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
            <div>
                <h3 className="text-white font-medium">{title}</h3>
                <p className="text-sm text-slate-400 pr-4">{description}</p>
            </div>
            <button
                onClick={onClick}
                className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 flex-shrink-0 ${active ? 'bg-indigo-500 shadow-glow-primary' : 'bg-white/10 border border-white/5'}`}
            >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
        </div>
    );
}
