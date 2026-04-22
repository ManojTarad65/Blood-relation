'use client';

import { motion } from 'framer-motion';
import { Check, Network, Zap, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    tag: 'Free Forever',
    description:
      'For individuals beginning their digital legacy journey.',
    features: [
      'Up to 3 Family Trees',
      'Max 40 Members per Tree',
      'Basic Tree Visualization',
      'Community Support',
    ],
    cta: 'Start Free',
    highlight: false,
  },
  {
    id: 'premium',
    name: 'Premium AI',
    price: { monthly: 99, yearly: 999 },
    tag: 'Most Popular',
    description:
      'For families who want AI-powered hereditary intelligence & predictive insights.',
    features: [
      'Unlimited Trees & Members',
      'AI Health Pattern Detection',
      'Cultural Archive Storage',
      'Priority Support',
      'Downloadable Health Reports ($1 add-on)',
    ],
    cta: 'Upgrade to Premium',
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Dynasty Enterprise',
    price: { monthly: 99, yearly: 79 },
    tag: 'For Institutions',
    description:
      'For researchers, large families & healthcare partnerships.',
    features: [
      'Everything in Premium',
      'Advanced Role-Based Access (RBAC)',
      'Custom API Integrations',
      'Dedicated Account Manager',
      'SLA & Enterprise Support',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async (tier: any) => {
    if(tier.id !== 'premium') return;

    try {
      setLoading(true);

      const res = await fetch("/api/payment/create-order", {
        method: "POST"
      });

      if (!res.ok) {
        console.error("Failed to create Razorpay Order on server");
        setLoading(false);
        return;
      }

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "RootConnect",
        description: "Premium Plan",
        order_id: order.id,
        handler: async function (response: any) {
          console.log("Processing success handler:", response);
          try {
            const verify = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(response)
            });

            const data = await verify.json();

            if (data.success) {
              alert("Payment successful 🎉");
              window.location.reload();
            } else {
              console.error("Verification failed remotely");
            }
          } catch(e) {
            console.error("Error executing backend verification:", e);
          }
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        console.error("Payment Failure Debug:", response.error);
        alert("Payment failed: " + response.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error("Checkout initiation caught error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white px-6 md:px-12 py-32 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px]" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Transparent Pricing for
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {" "}AI-Powered Genealogy
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            Blood Relation  monetizes through subscription tiers and AI-based
            predictive health reports.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mb-20 bg-white/5 p-2 rounded-xl border border-white/10">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              !isYearly ? 'bg-white text-black' : 'text-slate-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isYearly ? 'bg-white text-black' : 'text-slate-400'
            }`}
          >
            Yearly <span className="text-xs ml-2 text-emerald-400">Save 20%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-10 w-full">

          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 backdrop-blur-xl border ${
                tier.highlight
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 shadow-2xl'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-xs font-bold px-4 py-1 rounded-full">
                  {tier.tag}
                </div>
              )}

              {!tier.highlight && (
                <div className="text-xs text-slate-400 mb-4">{tier.tag}</div>
              )}

              <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>

              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black">
                  ${isYearly ? tier.price.yearly : tier.price.monthly}
                </span>
                <span className="text-slate-400 mb-2">/month</span>
              </div>

              {isYearly && tier.price.yearly > 0 && (
                <p className="text-sm text-emerald-400 mb-6">
                  Billed ${tier.price.yearly * 12} annually
                </p>
              )}

              <p className="text-slate-400 text-sm mb-8 min-h-[60px]">
                {tier.description}
              </p>

              {tier.highlight ? (
                <button
                  onClick={() => handleUpgrade(tier)}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold text-center block transition bg-white text-black hover:bg-slate-200 disabled:opacity-50`}
                >
                  {loading ? 'Processing...' : tier.cta}
                </button>
              ) : (
                <Link
                  href="/register"
                  className={`w-full py-3 rounded-xl font-semibold text-center block transition bg-white/10 hover:bg-white/20`}
                >
                  {tier.cta}
                </Link>
              )}

              <div className="mt-10 border-t border-white/10 pt-8">
                <ul className="flex flex-col gap-4 text-sm text-slate-300">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3">
                      <Check size={18} className="text-indigo-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Revenue Explanation Section */}
        <div className="mt-24 text-center max-w-3xl">
          <h3 className="text-2xl font-bold mb-6">Revenue Model</h3>
          <p className="text-slate-400 leading-relaxed">
            RootConnect follows a hybrid SaaS model combining recurring
            subscriptions and AI-based predictive health analysis charges.
            Additional revenue streams include enterprise integrations and
            healthcare partnerships.
          </p>
        </div>

      </div>
    </div>
  );
}