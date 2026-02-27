'use client';

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { Shield, Activity, Network, ArrowRight, CheckCircle2, Lock, Users, ChevronDown, Check, Star, Database } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";

// Local component for animated counter
function AnimatedCounter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.floor(value).toLocaleString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration, suffix]);

  return <span ref={ref}>{from}{suffix}</span>;
}

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen font-outfit relative overflow-hidden bg-[#0B0F1A]" ref={containerRef}>

      {/* Premium Ambient Background (Floating Orbs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ x: [-50, 50, -50], y: [-20, 30, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-indigo-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [50, -50, 50], y: [30, -20, 30] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[-10%] w-[40vw] h-[60vh] bg-cyan-600/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vh] bg-purple-600/15 rounded-full blur-[130px]"
        />
      </div>

      <Navbar className="fixed top-0" />

      {/* ================================================
          1. HERO SECTION (Upgraded)
          ================================================ */}
      <section className="flex flex-col items-center justify-center pt-40 pb-20 px-6 text-center relative z-10 w-full max-w-6xl mx-auto">
        <motion.div style={{ y, opacity }} className="flex flex-col items-center w-full">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 shadow-2xl"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Trusted by 2,000+ Families Worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.05] text-white"
          >
            Reconnect Generations. <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x">
              Predict Health.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-slate-400 mb-10 max-w-3xl leading-relaxed font-light"
          >
            The premium intelligence platform to build interactive family trees, uncover AI-powered hereditary insights, and securely preserve your cultural legacy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6"
          >
            <Link
              href="/register"
              className="group relative flex justify-center items-center gap-2 px-8 py-4 w-full sm:w-auto overflow-hidden bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#how-it-works"
              className="px-8 py-4 subtle-button rounded-full text-lg w-full sm:w-auto text-center backdrop-blur-md"
            >
              View Demo
            </Link>
          </motion.div>

          {/* Stat Line under buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xs font-mono font-medium text-slate-500 uppercase tracking-[0.2em] mb-12 flex justify-center gap-4"
          >
            <span>Secure</span>
            <span className="text-indigo-500/50">•</span>
            <span>Private</span>
            <span className="text-indigo-500/50">•</span>
            <span>AI-Powered</span>
          </motion.div>

          {/* Suble Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mock Dashboard Preview */}
      <section className="px-6 md:px-12 pb-32 relative z-20 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden shadow-glow-primary border border-white/10 group bg-[#0B0F1A]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent z-10 opacity-60" />
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
            alt="Dashboard Preview"
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-[2s] sepia-[0.3] hue-rotate-180 brightness-75 contrast-125"
          />
          {/* Overlay Gradient for blending */}
          <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-0" />
        </motion.div>
      </section>

      {/* ================================================
          2. TRUST / SOCIAL PROOF SECTION
          ================================================ */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-300 mb-16 tracking-tight">
            Trusted by Modern Families & Healthcare Advisors
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter shadow-sm">
                <AnimatedCounter from={0} to={2000} suffix="+" />
              </div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">Active Families</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                <AnimatedCounter from={0} to={25000} suffix="+" />
              </div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">Members Documented</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                <AnimatedCounter from={0} to={98} suffix="%" />
              </div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">Satisfaction Rate</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                <AnimatedCounter from={0} to={99.9} duration={1.5} suffix="%" />
              </div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">Uptime Security</div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================
          3. HOW IT WORKS SECTION
          ================================================ */}
      <section id="how-it-works" className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-6">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Platform Features</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Built for the future of families.
            </h2>
          </div>

          <div className="flex flex-col gap-32">
            {/* Step 1 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                className="order-2 lg:order-1 flex flex-col gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-2xl mb-2">1</div>
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Build Your Tree</h3>
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                  Add relatives with rich profiles, photos, and life events using our elegant infinite canvas architecture. Drag, pan, and visualize your entire lineage instantly.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 rounded-2xl overflow-hidden glass-card p-2"
              >
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop" alt="Build Tree" className="w-full h-[400px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            </div>

            {/* Step 2 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                className="rounded-2xl overflow-hidden glass-card p-2"
              >
                <img src="https://images.unsplash.com/photo-1581090700227-4c4f50cdb6ef?q=80&w=1200&auto=format&fit=crop" alt="AI health" className="w-full h-[400px] object-cover rounded-xl filter contrast-125 sepia-[0.2] hover:sepia-0 transition-all duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                className="flex flex-col gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-2xl mb-2">2</div>
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Unlock AI Health Intelligence</h3>
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                  Detect hereditary risks using intelligent pattern recognition across generations. Enable your family to be proactive about future health outcomes.
                </p>
              </motion.div>
            </div>

            {/* Step 3 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                className="order-2 lg:order-1 flex flex-col gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-2xl mb-2">3</div>
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Preserve Cultural Legacy</h3>
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                  Store traditions, voice stories, and generational memories forever in a secure, immutable vault crafted specifically for families.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 rounded-2xl overflow-hidden glass-card p-2"
              >
                <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop" alt="Cultural Legacy" className="w-full h-[400px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          4. SECURITY SECTION (Premium Feel)
          ================================================ */}
      <section className="py-32 px-6 relative border-y border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }}
            className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-10 shadow-glow-primary"
          >
            <Shield className="w-10 h-10 text-emerald-400" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
            Bank-Level Security. <br /> <span className="text-emerald-400">Family-Level Privacy.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4 w-full mt-8 text-left">
            <div className="flex items-center gap-4 glass-card p-6">
              <Lock className="w-6 h-6 text-emerald-400" />
              <span className="text-white font-medium">Supabase Row Level Security</span>
            </div>
            <div className="flex items-center gap-4 glass-card p-6">
              <Database className="w-6 h-6 text-emerald-400" />
              <span className="text-white font-medium">End-to-End Encrypted Storage</span>
            </div>
            <div className="flex items-center gap-4 glass-card p-6">
              <Users className="w-6 h-6 text-emerald-400" />
              <span className="text-white font-medium">Role-Based Access Control</span>
            </div>
            <div className="flex items-center gap-4 glass-card p-6">
              <Network className="w-6 h-6 text-emerald-400" />
              <span className="text-white font-medium">Private Family Invitations</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          5. TESTIMONIAL SECTION
          ================================================ */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Built for families that care.</h2>
          <p className="text-xl text-slate-400">Don't just take our word for it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card p-8 flex flex-col gap-6">
            <div className="flex gap-1 text-amber-400"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div>
            <p className="text-lg text-slate-300 font-light leading-relaxed flex-1">"RootConnect helped our family reconnect after years apart. It’s more than an app — it’s emotional infrastructure."</p>
            <div>
              <div className="text-white font-bold">Dr. Ananya Mehta</div>
              <div className="text-sm text-slate-500">Family Physician</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card p-8 flex flex-col gap-6">
            <div className="flex gap-1 text-amber-400"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div>
            <p className="text-lg text-slate-300 font-light leading-relaxed flex-1">"The AI health insight feature gave us awareness about hereditary risks we never discussed before. Invaluable."</p>
            <div>
              <div className="text-white font-bold">Rahul Verma</div>
              <div className="text-sm text-slate-500">Entrepreneur</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="glass-card p-8 flex flex-col gap-6">
            <div className="flex gap-1 text-amber-400"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div>
            <p className="text-lg text-slate-300 font-light leading-relaxed flex-1">"My grandparents’ stories are now preserved forever. This platform feels absolute magical to use."</p>
            <div>
              <div className="text-white font-bold">Priya Sharma</div>
              <div className="text-sm text-slate-500">Designer</div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================================================
          6. PRICING PREVIEW SECTION
          ================================================ */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Transparent Pricing.</h2>
            <p className="text-slate-400 text-lg">Scale your lineage effortlessly.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* Free Tier */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">Starter Root</h3>
              <div className="text-3xl font-black text-white mb-6">$0<span className="text-sm text-slate-500 font-medium">/ forever</span></div>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-500" /> Up to 20 members</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-500" /> Basic React flow tree</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-500" /> Limited storage</li>
              </ul>
              <Link href="/register" className="subtle-button text-center w-full">Get Started</Link>
            </motion.div>

            {/* Premium Tier */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8 flex flex-col relative border-indigo-500/50 shadow-glow-primary">
              <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl pointer-events-none" />
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">Recommended</div>

              <h3 className="text-xl font-bold text-white mb-2 relative z-10">Premium Hub</h3>
              <div className="text-3xl font-black text-white mb-6 relative z-10">$19<span className="text-sm text-slate-500 font-medium">/ month</span></div>
              <ul className="flex flex-col gap-4 mb-8 flex-1 relative z-10">
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-indigo-400" /> Unlimited members</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-indigo-400" /> AI health pattern insights</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-indigo-400" /> Unlimited cultural archives</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-indigo-400" /> PDF Graphic Export</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-indigo-400" /> Priority technical support</li>
              </ul>
              <Link href="/pricing" className="gradient-button py-3 text-center w-full rounded-xl text-sm z-10">View All Plans</Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================================================
          7. FINAL CTA SECTION
          ================================================ */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] to-indigo-950/20 -z-10" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            Start Building Your <br /> <span className="gradient-text">Family Intelligence</span> Today.
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Reconnect generations. Protect future health. Preserve legacy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/register" className="gradient-button px-10 py-4 w-full sm:w-auto rounded-full font-bold text-lg text-center shadow-glow-primary">
              Start Free Trial
            </Link>
            <Link href="#how-it-works" className="px-10 py-4 subtle-button rounded-full text-lg w-full sm:w-auto text-center border-white/20 bg-white/5 hover:bg-white/10">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-12 border-t border-white/5 text-center flex flex-col items-center justify-center gap-6 text-slate-500 text-sm z-10 bg-[#0B0F1A]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
          <Network className="w-4 h-4 text-indigo-400" />
        </div>
        <p>© {new Date().getFullYear()} RootConnect Inc. Premium SaaS Edition.</p>
      </footer>
    </div>
  );
}
