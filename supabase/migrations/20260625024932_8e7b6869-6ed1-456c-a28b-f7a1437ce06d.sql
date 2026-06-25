
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anyone can view gallery photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Authenticated admins can delete gallery photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Authenticated admins can insert gallery photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Authenticated admins can update gallery photos" ON public.gallery_photos;

DROP POLICY IF EXISTS "Anyone can view case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Authenticated admins can delete case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Authenticated admins can insert case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Authenticated admins can update case studies" ON public.case_studies;

DROP POLICY IF EXISTS "Admin users can delete admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can insert new admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can view all admin accounts" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can view all admin users" ON public.admin_users;

ALTER TABLE public.admin_users
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.admin_users DROP COLUMN IF EXISTS password_hash;
CREATE UNIQUE INDEX IF NOT EXISTS admin_users_user_id_key ON public.admin_users(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS admin_users_email_lower_key ON public.admin_users(lower(email));

CREATE POLICY "Public can view gallery photos" ON public.gallery_photos
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert gallery photos" ON public.gallery_photos
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery photos" ON public.gallery_photos
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery photos" ON public.gallery_photos
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view case studies" ON public.case_studies
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert case studies" ON public.case_studies
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update case studies" ON public.case_studies
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete case studies" ON public.case_studies
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view admin profiles" ON public.admin_users
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert admin profiles" ON public.admin_users
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update admin profiles" ON public.admin_users
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete admin profiles" ON public.admin_users
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

REVOKE INSERT, UPDATE, DELETE ON public.admin_users FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.gallery_photos FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.case_studies FROM anon;
REVOKE SELECT ON public.admin_users FROM anon;
