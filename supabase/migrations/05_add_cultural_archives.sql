-- 1. Add fields from Cultural Archive to memories
ALTER TABLE public.memories
ADD COLUMN title TEXT,
ADD COLUMN date TEXT,
ADD COLUMN type TEXT,
ADD COLUMN description TEXT,
ADD COLUMN media_url TEXT;

-- 2. Make previous fields optional since the old Memory Vault might not provide all and Cultural Archive doesn't provide them
ALTER TABLE public.memories
ALTER COLUMN image_url DROP NOT NULL,
ALTER COLUMN caption DROP NOT NULL;
