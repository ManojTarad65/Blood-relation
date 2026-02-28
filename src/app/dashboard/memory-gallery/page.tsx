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
    <div className="min-h-screen bg-[#0B0F19] text-white px-8 py-20">

      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Memory Vault</h1>
            <p className="text-slate-400">Manage your family memories.</p>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-500 transition"
          >
            <ImagePlus size={16} className="inline mr-2" />
            Add Memory
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">

          <div className="relative">
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
            <input
              placeholder="Search caption..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 bg-[#111827] border border-white/10 px-4 py-2 rounded-lg"
            />
          </div>

          <input
            placeholder="Filter by year"
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="bg-[#111827] border border-white/10 px-4 py-2 rounded-lg"
          />

          <input
            placeholder="Filter by tag"
            value={tagFilter}
            onChange={e => setTagFilter(e.target.value)}
            className="bg-[#111827] border border-white/10 px-4 py-2 rounded-lg"
          />

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredMemories.map(mem => (
            <motion.div
              key={mem.id}
              whileHover={{ y: -5 }}
              className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={mem.image_url} className="w-full h-60 object-cover" />

              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold">{mem.caption}</h3>

                <div className="text-xs text-indigo-300 flex items-center gap-2">
                  <Calendar size={12} /> {mem.year}
                </div>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => openEdit(mem)}
                    className="text-indigo-400 text-sm flex items-center gap-1"
                  >
                    <Edit3 size={14} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(mem)}
                    className="text-rose-400 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* CREATE MODAL */}
      <AnimatePresence>
        {isUploadOpen && (
          <Modal title="Add Memory" onClose={() => setIsUploadOpen(false)}>
            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
              <input placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} />
              <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
              <input placeholder="Tags" value={tags} onChange={e => setTags(e.target.value)} />

              <button className="bg-indigo-600 py-2 rounded-lg">
                {isUploading ? <Loader2 className="animate-spin mx-auto" /> : 'Save'}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditOpen && (
          <Modal title="Edit Memory" onClose={() => setIsEditOpen(false)}>
            <div className="flex flex-col gap-4">
              <input value={caption} onChange={e => setCaption(e.target.value)} />
              <input value={year} onChange={e => setYear(e.target.value)} />
              <input value={tags} onChange={e => setTags(e.target.value)} />

              <button
                onClick={handleUpdate}
                className="bg-indigo-600 py-2 rounded-lg"
              >
                Update
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

    </div>
  );
}

// Reusable Modal
function Modal({ title, children, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-[#111827] p-8 rounded-2xl w-full max-w-md border border-white/10"
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {children}
      </motion.div>
    </motion.div>
  );
}