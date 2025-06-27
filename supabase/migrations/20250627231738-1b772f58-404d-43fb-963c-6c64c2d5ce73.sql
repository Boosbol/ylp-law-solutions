
-- Create storage bucket for gallery photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-photos', 
  'gallery-photos', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]
);

-- Create policy to allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'gallery-photos' AND
  auth.role() = 'authenticated'
);

-- Create policy to allow public read access
CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery-photos');

-- Create policy to allow users to delete their own uploads
CREATE POLICY "Allow delete own files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'gallery-photos' AND
  auth.role() = 'authenticated'
);
