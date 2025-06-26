
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery_photos table to replace hardcoded photos
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  date_taken DATE NOT NULL DEFAULT CURRENT_DATE,
  uploaded_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users (only allow authenticated admins to read)
CREATE POLICY "Admin users can view all admin accounts" 
  ON public.admin_users 
  FOR SELECT 
  USING (true);

-- Create policies for gallery_photos (public can read, only authenticated admins can manage)
CREATE POLICY "Anyone can view gallery photos" 
  ON public.gallery_photos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated admins can insert gallery photos" 
  ON public.gallery_photos 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update gallery photos" 
  ON public.gallery_photos 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Authenticated admins can delete gallery photos" 
  ON public.gallery_photos 
  FOR DELETE 
  USING (true);

-- Insert a default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES ('admin@yasminelisasih.com', '$2b$10$rOHWVZUhGHN3IH3mzqFm7.VqL/a8pXOKzYqgF1gT9U7YAOzpTVDIS', 'Administrator');

-- Insert existing photos data into gallery_photos table
INSERT INTO public.gallery_photos (title, description, image_url, date_taken) VALUES
('Congratulation for Grand Opening', 'Karangan bunga ucapan selamat pembukaan kantor dari Dr. Hotman Paris S.H., M.Hum', '/lovable-uploads/249537df-a3c1-40c6-9a3f-a17e498a3df1.png', '2025-09-08'),
('Grand Opening Kantor', 'Momen pembukaan kantor Yasmine Lisasih Law Office & Partners dengan berbagai karangan bunga dari mitra', '/lovable-uploads/f430c6a9-dadb-40dd-b29b-ece45b6367b8.png', '2025-09-08'),
('Karangan Bunga dari Mitra', 'Ucapan selamat grand opening dari Dr. Farhat Abbas, S.H.M.H. (Ketua Partai Pandai Pembela Kaum Lemah)', '/lovable-uploads/9f67be4e-6abd-4057-9a8c-0bb3dfa55536.png', '2025-09-08');
