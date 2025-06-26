
-- Enable Row Level Security on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated admin users to view all admin users
CREATE POLICY "Admin users can view all admin users" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated admin users to insert new admin users
CREATE POLICY "Admin users can insert new admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow authenticated admin users to update admin users
CREATE POLICY "Admin users can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (true);

-- Create policy to allow authenticated admin users to delete admin users
CREATE POLICY "Admin users can delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (true);

-- Add unique constraint on email if it doesn't exist
ALTER TABLE public.admin_users ADD CONSTRAINT unique_admin_email UNIQUE (email);
