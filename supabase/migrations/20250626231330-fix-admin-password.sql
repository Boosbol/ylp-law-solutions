
-- Fix admin user passwords with correct bcrypt hash for "admin123"
UPDATE public.admin_users 
SET password_hash = '$2b$10$K7/XRvLDaIjx6OpZJfxbC.Hl5SnKGnzQyRBPvQdF9Qs5xvCWvmDRq'
WHERE email = 'admin@yasminelisasih.com';

UPDATE public.admin_users 
SET password_hash = '$2b$10$K7/XRvLDaIjx6OpZJfxbC.Hl5SnKGnzQyRBPvQdF9Qs5xvCWvmDRq'
WHERE email = 'learntofly844@gmail.com';

-- If users don't exist, insert them with correct hash
INSERT INTO public.admin_users (email, name, password_hash)
VALUES (
  'admin@yasminelisasih.com',
  'Administrator',
  '$2b$10$K7/XRvLDaIjx6OpZJfxbC.Hl5SnKGnzQyRBPvQdF9Qs5xvCWvmDRq'
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash;

INSERT INTO public.admin_users (email, name, password_hash)
VALUES (
  'learntofly844@gmail.com',
  'Admin User',
  '$2b$10$K7/XRvLDaIjx6OpZJfxbC.Hl5SnKGnzQyRBPvQdF9Qs5xvCWvmDRq'
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash;
