'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        await new Promise(r => setTimeout(r, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col font-outfit">

            {/* Header section */}
            <section className="text-center max-w-3xl mx-auto mb-20 relative">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-6 shadow-glow-primary">
                        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Get In Touch</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight text-white">
                        Let's build your <span className="gradient-text">legacy</span> together.
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                        Whether you have questions about Enterprise pricing, custom API integrations, or general support, our team is ready to assist you.
                    </p>
                </motion.div>
            </section>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

                {/* Info Column */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-2 flex flex-col gap-10"
                >
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Contact Information</h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">
                            Reach out to us through any of these channels. We aim to respond to all inquiries within 24 hours.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4 p-6 glass-card group">
                                <div className="p-3 bg-white/5 rounded-xl text-indigo-400 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Email Us</h3>
                                    <p className="text-slate-400 text-sm">support@rootconnect.app</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 glass-card group">
                                <div className="p-3 bg-white/5 rounded-xl text-emerald-400 border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Headquarters</h3>
                                    <p className="text-slate-400 text-sm">123 Hierarchy Blvd, Suite 400<br />San Francisco, CA 94105</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form Column */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="lg:col-span-3"
                >
                    <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        <h3 className="text-2xl font-bold tracking-tight text-white mb-8 flex items-center gap-3">
                            <MessageSquare className="text-indigo-400" /> Send a Message
                        </h3>

                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center p-12 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                            >
                                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-glow-primary">
                                    <Send size={28} />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                                <p className="text-emerald-200/80 font-light">We've received your inquiry and will be in touch shortly.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-8 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
                                >
                                    Send Another
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Full Name</label>
                                        <input
                                            type="text" id="name" required
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="px-4 py-3 bg-[#0B0F1A]/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white outline-none"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email" id="email" required
                                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="px-4 py-3 bg-[#0B0F1A]/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white outline-none"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Your Message</label>
                                    <textarea
                                        id="message" required rows={5}
                                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="px-4 py-3 bg-[#0B0F1A]/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white outline-none resize-none"
                                        placeholder="How can we help you today?"
                                    />
                                </div>

                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="gradient-button w-full py-4 rounded-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Send Inquiry <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
