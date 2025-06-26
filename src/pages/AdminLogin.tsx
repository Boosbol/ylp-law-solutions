
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get admin user by email
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !adminUser) {
        toast({
          title: "Error",
          description: "Email atau password salah",
          variant: "destructive",
        });
        return;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, adminUser.password_hash);
      
      if (!isValidPassword) {
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
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Default: admin@yasminelisasih.com / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
