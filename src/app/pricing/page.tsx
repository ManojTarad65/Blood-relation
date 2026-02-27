'use client';

import { motion } from 'framer-motion';
import { Check, Network, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const TIERS = [
    {
        id: 'starter',
        name: 'Starter Root',
        price: { monthly: 0, yearly: 0 },
        description: 'Perfect for individuals beginning to map their family history.',
        icon: <Network className="w-6 h-6 text-slate-400" />,
        features: [
            'Up to 3 Family Trees',
            'Max 50 Relatives per Tree',
            'Basic React Flow Visualization',
            'Standard Support'
        ],
        buttonText: 'Start for Free',
        isPopular: false,
        gradient: 'from-slate-600 to-slate-800'
    },
    {
        id: 'premium',
        name: 'Premium Hub',
        price: { monthly: 19, yearly: 15 },
        description: 'Advanced AI health intelligence and unlimited genealogy mapping.',
        icon: <Zap className="w-6 h-6 text-indigo-400" />,
        features: [
            'Unlimited Family Trees',
            'Unlimited Relatives & Nodes',
            'AI Health Pattern Synthesis',
            'Cultural Archive Uploads',
            'Priority Email Support'
        ],
        buttonText: 'Upgrade to Premium',
        isPopular: true,
        gradient: 'from-indigo-500 via-purple-500 to-cyan-500'
    },
    {
        id: 'enterprise',
        name: 'Dynasty',
        price: { monthly: 99, yearly: 79 },
        description: 'For large extended families, historians, and genetic researchers.',
        icon: <Shield className="w-6 h-6 text-emerald-400" />,
        features: [
            'Everything in Premium Hub',
            'Custom API Integrations',
            'Dedicated Account Manager',
            'Advanced Custom RBAC Roles',
            'SLA Uptime Guarantee'
        ],
        buttonText: 'Contact Sales',
        isPopular: false,
        gradient: 'from-emerald-600 to-teal-800'
    }
];

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(true);

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-3xl mb-16"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-6 shadow-glow-primary">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Pricing Plans</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight text-white">
                    Simple pricing for <span className="gradient-text">infinite</span> lineage.
                </h1>
                <p className="text-xl text-slate-400 font-light leading-relaxed">
                    Choose a plan that scales with your generations. All plans include secure end-to-end data isolation.
                </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 mb-20 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
            >
                <button
                    onClick={() => setIsYearly(false)}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${!isYearly ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setIsYearly(true)}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${isYearly ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}
                >
                    Annually <span className={`${isYearly ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-500/20 text-indigo-300'} px-2 py-0.5 rounded-full text-xs font-bold`}>Save 20%</span>
                </button>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center relative z-10">
                {TIERS.map((tier, i) => (
                    <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                        className={`relative group ${tier.isPopular ? 'md:-translate-y-8 z-20' : 'z-10'}`}
                    >
                        {/* Popular Glow Indicator */}
                        {tier.isPopular && (
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl blur-[50px] pointer-events-none -z-10 animate-pulse-slow" />
                        )}

                        <div className={`
              flex flex-col h-full bg-[#0B0F1A]/80 backdrop-blur-3xl rounded-3xl p-8 
              border transition-all duration-500 overflow-hidden relative
              ${tier.isPopular ? 'border-indigo-500/50 shadow-glow-primary' : 'border-white/10 hover:border-white/20 hover:shadow-2xl'}
            `}>

                            {/* Card Background Gradient */}
                            <div className="absolute top-0 right-0 p-32 bg-white/[0.02] rounded-full blur-[40px] pointer-events-none group-hover:bg-white/[0.04] transition-colors duration-700 -translate-y-1/2 translate-x-1/2" />
                            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${tier.gradient}`} />

                            {tier.isPopular && (
                                <div className="absolute top-6 right-8 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-500/30 shadow-[inset_0_1px_0_0_rgba(99,102,241,0.5)]">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6 flex gap-4 items-center">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border ${tier.isPopular ? 'border-indigo-500/30' : 'border-white/10'}`}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">{tier.name}</h3>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-5xl font-black text-white tracking-tighter">${isYearly ? tier.price.yearly : tier.price.monthly}</span>
                                    <span className="text-slate-500 font-medium mb-2">/ month</span>
                                </div>
                                {isYearly && tier.price.yearly > 0 && (
                                    <div className="text-sm font-semibold text-emerald-400 mt-1">Billed ${tier.price.yearly * 12} yearly</div>
                                )}
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed mb-8 h-10">{tier.description}</p>

                            <Link
                                href={tier.isPopular ? "/register" : "/contact"}
                                className={`w-full py-4 rounded-xl font-bold text-sm text-center flex items-center justify-center transition-all ${tier.isPopular
                                        ? 'gradient-button shadow-xl'
                                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                                    }`}
                            >
                                {tier.buttonText}
                            </Link>

                            <div className="mt-8 pt-8 border-t border-white/10 flex-1">
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">What's included</div>
                                <ul className="flex flex-col gap-4">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-slate-300">
                                            <Check size={18} className={tier.isPopular ? 'text-indigo-400' : 'text-slate-500'} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
