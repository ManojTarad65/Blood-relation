-- 1. Create memories table
CREATE TABLE public.memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  year TEXT,
  tags TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

-- 3. Create Row Level Security Policies for memories table
CREATE POLICY "Users can select their own memories"
  ON public.memories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memories"
  ON public.memories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memories"
  ON public.memories FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Create public storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('memory_gallery', 'memory_gallery', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Create Storage Policies for the memory_gallery bucket
CREATE POLICY "Authenticated users can upload to their own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'memory_gallery' AND 
    auth.role() = 'authenticated' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can read their own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'memory_gallery' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users cannot delete other users' files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'memory_gallery' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );
