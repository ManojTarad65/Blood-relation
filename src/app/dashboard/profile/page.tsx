'use client';

import { createClient } from '@/lib/supabase/client';
import { Camera, Mail, Loader2, Save } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [fullName, setFullName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setFullName(user?.user_metadata?.full_name || '');
      setLoading(false);
    }
    load();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate upload delay
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

  const handleUpdateProfile = async () => {
      setIsSaving(true);
      // Simulate save
      await new Promise(r => setTimeout(r, 800));
      setIsSaving(false);
  };

  if (loading) return (
      <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-white/50" />
      </div>
  );

  return (
    <div className="min-h-screen pb-12 p-6 md:p-8 flex justify-center w-full">

      <div className="w-full max-w-3xl flex flex-col gap-10">

        {/* HEADER */}
        <div className="flex flex-col gap-2 pb-6 border-b border-white/5">
            <h1 className="text-3xl font-bold tracking-tight text-white">Profile</h1>
            <p className="text-sm text-white/50">Manage your account details</p>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-8"
        >

          {/* PROFILE CARD */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm">
            <div
              className="relative group cursor-pointer shrink-0"
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              <div className="relative w-28 h-28 rounded-full border border-white/10 overflow-hidden flex items-center justify-center bg-white/5 transition-all duration-200 group-hover:brightness-110">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-white/60" />
                ) : user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white/60">
                    {fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                  </span>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-sm">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>

              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
              />
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 w-full mt-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                    {fullName || 'Anonymous User'}
                </h2>
                <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                    <Mail size={14} /> {user?.email}
                </div>
                <div className="px-3 py-1.5 bg-white/[0.04] text-white/60 text-[10px] uppercase tracking-widest font-bold rounded-lg border border-white/10 mt-3 inline-flex w-fit">
                    Standard Plan
                </div>
            </div>
          </div>

          {/* EDIT SECTION */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8 shadow-sm flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] tracking-widest font-bold text-white/50 uppercase ml-1">
                        Full Name
                    </label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm font-medium focus:outline-none focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-200 placeholder:text-white/20"
                    />
                </div>

                <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] tracking-widest font-bold text-white/50 uppercase ml-1">
                        Email Address
                    </label>
                    <input
                        readOnly
                        value={user?.email || ''}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-white/40 text-sm font-medium cursor-not-allowed outline-none"
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-4 w-full sm:w-auto mt-2">
                <button 
                  onClick={handleUpdateProfile}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-xl hover:brightness-90 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm disabled:opacity-50"
                >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Update Profile
                </button>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}