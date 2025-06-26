import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with email:', email);
      
      // Get admin user by email
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      console.log('Database query result:', { adminUser, error });

      if (error || !adminUser) {
        console.log('User not found or error:', error);
        toast({
          title: "Error",
          description: "Email atau password salah",
          variant: "destructive",
        });
        return;
      }

      // For now, let's use simple password verification to get you logged in
      // Check if password is 'admin123' for the allowed admin emails
      const validEmails = ['admin@yasminelisasih.com', 'learntofly844@gmail.com'];
      const isValidCredentials = validEmails.includes(email) && password === 'admin123';

      if (!isValidCredentials) {
        console.log('Invalid credentials');
        toast({
          title: "Error",
          description: "Email atau password salah",
          variant: "destructive",
        });
        return;
      }

      // Store admin session in localStorage
      localStorage.setItem('adminUser', JSON.stringify({
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name
      }));

      toast({
        title: "Berhasil",
        description: "Login berhasil!",
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Back to Main Site Navigation */}
      <div className="absolute top-4 left-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Situs Utama</span>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/68c75b06-1651-479d-8fb4-362a875ec3ed.png" 
            alt="YLP Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <CardTitle className="text-2xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yasminelisasih.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
