
-- Insert default admin user
INSERT INTO public.admin_users (email, name, password_hash)
VALUES (
  'admin@yasminelisasih.com',
  'Administrator',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
) ON CONFLICT (email) DO NOTHING;

-- Insert additional admin user for the email you're trying to use
INSERT INTO public.admin_users (email, name, password_hash)
VALUES (
  'learntofly844@gmail.com',
  'Admin User',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
) ON CONFLICT (email) DO NOTHING;
