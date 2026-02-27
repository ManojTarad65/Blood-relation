-- Supabase Schema for RootConnect

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family Trees table
CREATE TABLE public.family_trees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family Members table
CREATE TABLE public.family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tree_id UUID REFERENCES public.family_trees(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  date_of_death DATE,
  place_of_birth TEXT,
  gender TEXT,
  blood_group TEXT,
  health_history JSONB DEFAULT '{}'::JSONB,
  life_events JSONB DEFAULT '[]'::JSONB,
  notes TEXT,
  photo_url TEXT,
  
  -- Relationships (Self-referencing)
  mother_id UUID REFERENCES public.family_members(id) ON DELETE SET NULL,
  father_id UUID REFERENCES public.family_members(id) ON DELETE SET NULL,
  spouse_id UUID REFERENCES public.family_members(id) ON DELETE SET NULL,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tree Roles table (for sharing access)
CREATE TABLE public.tree_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tree_id UUID REFERENCES public.family_trees(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tree_id, user_id)
);

-- Correction Requests table
CREATE TABLE public.correction_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tree_id UUID REFERENCES public.family_trees(id) ON DELETE CASCADE,
  member_id UUID REFERENCES public.family_members(id) ON DELETE CASCADE,
  requested_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
  suggested_changes JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Row Level Security (RLS) Setup
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tree_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.correction_requests ENABLE ROW LEVEL SECURITY;

-- 1. Users can view and update their own profiles
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- 2. Family Trees (Owner access)
CREATE POLICY "Users can view trees they own" ON public.family_trees FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can insert trees" ON public.family_trees FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own trees" ON public.family_trees FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own trees" ON public.family_trees FOR DELETE USING (auth.uid() = owner_id);

-- 3. Shared Trees Access via tree_roles
CREATE POLICY "Users can view shared trees" ON public.family_trees FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tree_roles WHERE tree_id = public.family_trees.id AND user_id = auth.uid())
);

-- 4. Family Members Access
CREATE POLICY "Users can view members of their trees" ON public.family_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.family_trees WHERE id = public.family_members.tree_id AND (owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.tree_roles WHERE tree_id = public.family_trees.id AND user_id = auth.uid())))
);

CREATE POLICY "Users can insert members if owner or editor" ON public.family_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.family_trees WHERE id = public.family_members.tree_id AND (owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.tree_roles WHERE tree_id = public.family_trees.id AND user_id = auth.uid() AND role IN ('admin', 'editor'))))
);

CREATE POLICY "Users can update members if owner or editor" ON public.family_members FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.family_trees WHERE id = public.family_members.tree_id AND (owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.tree_roles WHERE tree_id = public.family_trees.id AND user_id = auth.uid() AND role IN ('admin', 'editor'))))
);

CREATE POLICY "Users can delete members if owner or admin" ON public.family_members FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.family_trees WHERE id = public.family_members.tree_id AND (owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.tree_roles WHERE tree_id = public.family_trees.id AND user_id = auth.uid() AND role = 'admin')))
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER family_trees_updated_at BEFORE UPDATE ON public.family_trees FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER family_members_updated_at BEFORE UPDATE ON public.family_members FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Auto-create public.user upon auth.user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
