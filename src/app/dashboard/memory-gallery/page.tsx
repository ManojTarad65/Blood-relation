'use client';

import { createClient } from '@/lib/supabase/client';
import {
  Camera,
  ImagePlus,
  Calendar,
  Trash2,
  Edit3,
  X,
  Loader2,
  Search
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryGalleryPage() {
  const supabase = createClient();

  const [memories, setMemories] = useState<any[]>([]);
  const [filteredMemories, setFilteredMemories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<any>(null);

  const [isUploading, setIsUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [year, setYear] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data } = await supabase
        .from('memories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setMemories(data);
        setFilteredMemories(data);
      }

      setLoading(false);
    }

    load();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let temp = [...memories];

    if (search) {
      temp = temp.filter(m =>
        m.caption.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (yearFilter) {
      temp = temp.filter(m => m.year === yearFilter);
    }

    if (tagFilter) {
      temp = temp.filter(m =>
        m.tags?.toLowerCase().includes(tagFilter.toLowerCase())
      );
    }

    setFilteredMemories(temp);
  }, [search, yearFilter, tagFilter, memories]);

  // CREATE
  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!file || !caption || !userId) return;

    setIsUploading(true);

    try {
      const path = `${userId}/${Date.now()}-${file.name}`;

      await supabase.storage.from('memory_gallery').upload(path, file);

      const { data: { publicUrl } } = supabase.storage
        .from('memory_gallery')
        .getPublicUrl(path);

      const { data } = await supabase
        .from('memories')
        .insert([{
          user_id: userId,
          image_url: publicUrl,
          caption,
          year,
          tags
        }])
        .select()
        .single();

      setMemories([data, ...memories]);
      setIsUploadOpen(false);
      resetForm();

    } catch (err: any) {
      alert(err.message);
    }

    setIsUploading(false);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editingMemory) return;

    const { data } = await supabase
      .from('memories')
      .update({
        caption,
        year,
        tags
      })
      .eq('id', editingMemory.id)
      .select()
      .single();

    const updated = memories.map(m =>
      m.id === editingMemory.id ? data : m
    );

    setMemories(updated);
    setIsEditOpen(false);
    setEditingMemory(null);
    resetForm();
  };

  // DELETE
  const handleDelete = async (memory: any) => {
    if (!confirm('Delete this memory?')) return;

    await supabase.from('memories').delete().eq('id', memory.id);

    setMemories(memories.filter(m => m.id !== memory.id));
  };

  const openEdit = (memory: any) => {
    setEditingMemory(memory);
    setCaption(memory.caption);
    setYear(memory.year);
    setTags(memory.tags);
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setFile(null);
    setCaption('');
    setYear('');
    setTags('');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen pb-12 p-6 md:p-8">

      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* HEADER UNIFIED */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 pb-6 border-b border-white/5 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Memory Vault</h1>
            <p className="text-sm text-white/50">Organize and manage your ancestral image archives.</p>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="bg-white hover:bg-white/90 text-black px-6 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold active:scale-95 whitespace-nowrap text-sm shrink-0"
          >
            <ImagePlus size={16} />
            Add Memory
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">

          <div className="relative flex-1 md:w-64 md:flex-none">
            <Search size={14} className="absolute left-3 top-3.5 text-white/30" />
            <input
              placeholder="Search caption..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all font-medium"
            />
          </div>

          <input
            placeholder="Filter by year (e.g. 1995)"
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all w-full md:w-auto font-medium"
          />

          <input
            placeholder="Filter by tag"
            value={tagFilter}
            onChange={e => setTagFilter(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all w-full md:w-auto font-medium"
          />

        </div>

        {/* GRID */}
        {filteredMemories.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                <Camera className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-white/80 font-semibold mb-1 text-lg">No Memories Found</h3>
                <p className="text-white/40 text-sm">Upload visual records to begin populating your vault.</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMemories.map(mem => (
                <motion.div
                key={mem.id}
                whileHover={{ y: -6 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden shadow-lg group hover:border-white/20 transition-all duration-300 flex flex-col"
                >
                <div className="relative w-full h-48 bg-white/5 border-b border-white/[0.08]">
                    <img src={mem.image_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 text-xs font-semibold text-white flex items-center gap-1.5 drop-shadow-md bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-md">
                    <Calendar size={12} /> {mem.year || 'Unknown Year'}
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1 gap-4">
                    <h3 className="font-bold text-white text-base leading-snug line-clamp-2 flex-1">{mem.caption}</h3>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <button
                        onClick={() => openEdit(mem)}
                        className="text-white/40 hover:text-white text-sm flex items-center gap-1.5 transition-colors font-medium"
                    >
                        <Edit3 size={14} /> Edit
                    </button>

                    <button
                        onClick={() => handleDelete(mem)}
                        className="text-white/40 hover:text-red-400 text-sm flex items-center gap-1.5 transition-colors font-medium"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        )}

      </div>

      {/* CREATE MODAL */}
      <AnimatePresence>
        {isUploadOpen && (
          <Modal title="Upload Vault Item" onClose={() => setIsUploadOpen(false)}>
            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <div className="w-full relative">
                 <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-white/50 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/[0.08] file:text-white hover:file:bg-white/10" />
              </div>
              <input placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-medium" />
              <div className="flex gap-4">
                 <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} className="w-1/2 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-medium" />
                 <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="w-1/2 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-medium" />
              </div>

              <button className="bg-white text-black font-semibold py-3.5 rounded-xl mt-2 flex items-center justify-center hover:bg-slate-200 transition-colors active:scale-95 text-sm">
                {isUploading ? <Loader2 className="animate-spin" size={20} /> : 'Save Memory'}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditOpen && (
          <Modal title="Edit Record" onClose={() => setIsEditOpen(false)}>
            <div className="flex flex-col gap-4">
              <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption" className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-medium" />
              <div className="flex gap-4">
                 <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" className="w-1/2 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-medium" />
                 <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags" className="w-1/2 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all font-medium" />
              </div>

              <button
                onClick={handleUpdate}
                className="bg-white text-black font-semibold py-3.5 rounded-xl mt-2 flex items-center justify-center hover:bg-slate-200 transition-colors active:scale-95 text-sm"
              >
                Update Item
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

    </div>
  );
}

// Reusable Modal Unified
function Modal({ title, children, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-[#0B0F1A] p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl relative"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        {children}
      </motion.div>
    </motion.div>
  );
}