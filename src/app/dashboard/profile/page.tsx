'use client';

import { createClient } from '@/lib/supabase/client';
import {
  Camera,
  Mail,
  ShieldCheck,
  Zap,
  Loader2,
  Lock,
  Save
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    load();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await new Promise(r => setTimeout(r, 1500));

    const newUrl = URL.createObjectURL(file);
    setUser({
      ...user,
      user_metadata: {
        ...user?.user_metadata,
        avatar_url: newUrl
      }
    });

    setIsUploading(false);
  };

  if (loading) return null;

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white px-6 md:px-12 py-24 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px]" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Account Profile
          </h1>
          <p className="text-slate-400">
            Manage your identity, security and subscription.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >

            {/* Identity Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl">

              <div
                className="relative group cursor-pointer mb-6"
                onClick={() => !isUploading && fileInputRef.current?.click()}
              >
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition" />
                <div className="relative w-32 h-32 rounded-full border border-white/20 overflow-hidden flex items-center justify-center bg-indigo-900">

                  {isUploading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                  ) : user?.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-indigo-300">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>

                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                />
              </div>

              <h2 className="text-2xl font-semibold mb-1">
                {user?.user_metadata?.full_name || 'Anonymous User'}
              </h2>

              <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                <Mail size={14} /> {user?.email}
              </div>

              <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20 flex items-center gap-2">
                <ShieldCheck size={14} /> Verified Account
              </div>
            </div>

            {/* Plan Card */}
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-indigo-400" />
                <span className="text-lg font-semibold">Free Plan</span>
              </div>

              <p className="text-slate-300 text-sm mb-6">
                Upgrade to Premium AI to unlock predictive health intelligence and unlimited family mapping.
              </p>

              <button className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition">
                Upgrade Plan
              </button>
            </div>

          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl flex flex-col gap-12"
          >

            {/* General Info */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                General Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate-400 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    defaultValue={user?.user_metadata?.full_name}
                    className="px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate-400 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    disabled
                    defaultValue={user?.email}
                    className="px-4 py-3 bg-[#0F172A] border border-white/5 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                </div>

              </div>

              <div className="mt-8 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Lock size={18} /> Security
              </h3>

              <div className="flex gap-4">
                <input
                  type="password"
                  placeholder="New password"
                  className="flex-1 px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
                <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition">
                  Update
                </button>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}