-- 1. Create vault_documents table
CREATE TABLE public.vault_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tree_id UUID REFERENCES public.family_trees(id) ON DELETE SET NULL,
  member_id UUID REFERENCES public.family_members(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  size_bytes BIGINT DEFAULT 0,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.vault_documents ENABLE ROW LEVEL SECURITY;

-- 3. Create Row Level Security Policies for vault_documents table
CREATE POLICY "Users can select their own documents"
  ON public.vault_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON public.vault_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
  ON public.vault_documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
  ON public.vault_documents FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Create private storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vault_documents', 'vault_documents', false)
ON CONFLICT (id) DO NOTHING;

-- 5. Create Storage Policies for the vault_documents bucket
CREATE POLICY "Authenticated users can upload to their own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'vault_documents' AND 
    auth.role() = 'authenticated' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can read their own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'vault_documents' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'vault_documents' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users cannot delete other users' files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'vault_documents' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );
