'use client';

import { Settings, ShieldAlert, Bell, Moon, DownloadCloud, Trash2, AlertTriangle, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
        <div className="min-h-screen pb-12 p-6 md:p-8">
            <div className="max-w-4xl mx-auto flex flex-col gap-10">
                
                {/* Unified Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 pb-6 border-b border-white/5 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-white/60">
                            <Settings size={14} />
                            <span className="text-xs uppercase tracking-widest font-bold">Global Preferences</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Account Settings</h1>
                        <p className="text-sm text-white/50">Manage platform settings, privacy controls, alerts, and your data.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Appearance */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                <Monitor className="w-5 h-5 text-white/70" />
                                <h2 className="text-xl font-bold text-white">Appearance</h2>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
                                <div>
                                    <h3 className="text-white font-medium text-sm">Theme Preference</h3>
                                    <p className="text-sm text-white/50 mt-1">Select your interface color scheme.</p>
                                </div>
                                <div className="flex items-center p-1 bg-white/[0.04] rounded-xl border border-white/10 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-medium text-white/40 hover:text-white transition-colors">Light</button>
                                    <button className="flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-medium bg-white/10 text-white shadow-sm border border-white/10">Dark</button>
                                    <button className="flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-medium text-white/40 hover:text-white transition-colors">System</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notifications */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                <Bell className="w-5 h-5 text-white/70" />
                                <h2 className="text-xl font-bold text-white">Notifications</h2>
                            </div>
                            <ToggleSetting title="Email Digests" description="Receive weekly summaries of AI insights and tree activities." active={toggles.emailDigests} onClick={() => handleToggle('emailDigests')} />
                            <div className="w-full h-px bg-white/5 my-0.5" />
                            <ToggleSetting title="Correction Requests" description="Get notified when editors suggest node changes." active={toggles.correctionRequests} onClick={() => handleToggle('correctionRequests')} />
                            <div className="w-full h-px bg-white/5 my-0.5" />
                            <ToggleSetting title="Marketing & Updates" description="Platform news and feature updates." active={toggles.marketingUpdates} onClick={() => handleToggle('marketingUpdates')} />
                        </div>
                    </motion.div>

                    {/* Data & Security */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                <ShieldAlert className="w-5 h-5 text-white/70" />
                                <h2 className="text-xl font-bold text-white">Data & Privacy</h2>
                            </div>

                            <ToggleSetting title="Public Profile Visibility" description="Allow search engines and non-members to find your profile." active={toggles.profileVisibility} onClick={() => handleToggle('profileVisibility')} />
                            <div className="w-full h-px bg-white/5 my-0.5" />
                            <ToggleSetting title="AI Data Sharing" description="Anonymize and share tree data to improve our generational intelligence models." active={toggles.dataSharing} onClick={() => handleToggle('dataSharing')} />
                            <div className="w-full h-px bg-white/5 my-0.5" />

                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 border-b border-white/5 pb-6">
                                <div>
                                    <h3 className="text-white font-medium text-sm flex items-center gap-2">Export Data <DownloadCloud size={14} className="text-white/40" /></h3>
                                    <p className="text-sm text-white/50 mt-1">Download your raw family JSON structure.</p>
                                </div>
                                <button className="text-sm font-semibold px-6 py-2.5 bg-white/[0.04] border border-white/10 hover:bg-white/10 text-white rounded-xl transition-all w-full md:w-auto">
                                    Export JSON
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 pt-2">
                                <div>
                                    <h3 className="text-red-400 font-medium text-sm flex items-center gap-2">Delete Account <Trash2 size={14} /></h3>
                                    <p className="text-sm text-white/40 mt-1">Permanently delete all trees and associated data.</p>
                                </div>
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="px-6 py-2.5 w-full md:w-auto bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-colors font-bold text-sm"
                                >
                                    Delete Data
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {isDeleteModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                className="w-full max-w-md bg-[#0B0F1A] border border-red-500/30 rounded-3xl shadow-2xl p-8 relative flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 relative">
                                    <AlertTriangle className="w-8 h-8 text-red-500 relative z-10" />
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Erase Everything?</h2>
                                <p className="text-white/50 text-sm leading-relaxed mb-8">
                                    You are about to permanently delete your account, family trees, and all associated media. This action is irreversible and cannot be undone.
                                </p>

                                <div className="flex flex-col gap-3 w-full">
                                    <button
                                        className="w-full py-3.5 rounded-xl font-bold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all text-sm active:scale-95"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                    >
                                        Yes, Delete My Data
                                    </button>
                                    <button 
                                        onClick={() => setIsDeleteModalOpen(false)} 
                                        className="w-full py-3.5 rounded-xl font-semibold bg-white/[0.04] border border-white/10 hover:bg-white/10 text-white transition-all text-sm active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ToggleSetting({ title, description, active, onClick }: { title: string, description: string, active: boolean, onClick: () => void }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
            <div>
                <h3 className="text-white font-medium text-sm">{title}</h3>
                <p className="text-sm text-white/50 mt-1 max-w-sm">{description}</p>
            </div>
            <button
                onClick={onClick}
                className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 flex-shrink-0 ${active ? 'bg-white/80' : 'bg-white/10 border border-white/5'}`}
            >
                <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${active ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white/70'}`} />
            </button>
        </div>
    );
}
