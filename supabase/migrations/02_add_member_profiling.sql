-- Phase 12: Extended Member Profiling & Health Forms
-- This migration expands the family_members table to support a comprehensive set of profile, contact, and medical fields.

-- Contact Info
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS address TEXT;

-- Professional Info
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS education TEXT;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS profession TEXT;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS workplace TEXT;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS skills TEXT;

-- Health Info
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS height_cm NUMERIC;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS weight_kg NUMERIC;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS allergies TEXT;

-- Medical History (boolean fields)
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS diabetes BOOLEAN DEFAULT FALSE;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS heart_disease BOOLEAN DEFAULT FALSE;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS cancer BOOLEAN DEFAULT FALSE;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS blood_pressure BOOLEAN DEFAULT FALSE;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS thyroid BOOLEAN DEFAULT FALSE;

-- Lifestyle (boolean fields)
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS smoking BOOLEAN DEFAULT FALSE;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS alcohol BOOLEAN DEFAULT FALSE;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS exercise BOOLEAN DEFAULT FALSE;

-- Note: The following columns already exist, but are listed for reference:
-- first_name
-- last_name
-- birth_date (used to be date_of_birth, but we mapped it to birth_date in the latest updates)
-- death_date
-- gender
-- blood_group
-- place_of_birth
-- bio
-- parent_id
-- tree_id
