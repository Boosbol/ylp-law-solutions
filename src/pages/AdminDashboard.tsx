import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, Images, FileText } from 'lucide-react';
import { AdminUser } from '@/types/admin';
import UserManagement from '@/components/UserManagement';
import GalleryManagement from '@/components/admin/GalleryManagement';
import CaseStudyManagement from '@/components/admin/CaseStudyManagement';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const verify = async (userId: string, email: string) => {
      const { data: roleRow } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (!active) return;
      if (!roleRow) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      const { data: profile } = await supabase
        .from('admin_users')
        .select('id, name, email')
        .eq('user_id', userId)
        .maybeSingle();

      setAdminUser({
        id: profile?.id ?? userId,
        email: profile?.email ?? email,
        name: profile?.name ?? email,
      });
      setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) navigate('/admin/login');
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate('/admin/login');
        return;
      }
      verify(session.user.id, session.user.email ?? '');
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Selamat datang, {adminUser?.name}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gallery">
              <Images className="h-4 w-4 mr-2" />
              Manajemen Galeri
            </TabsTrigger>
            <TabsTrigger value="cases">
              <FileText className="h-4 w-4 mr-2" />
              Studi Kasus
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Manajemen User
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <GalleryManagement adminUser={adminUser} />
          </TabsContent>

          <TabsContent value="cases">
            <CaseStudyManagement adminUser={adminUser} />
          </TabsContent>

          <TabsContent value="users">
            {adminUser && <UserManagement currentUserId={adminUser.id} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
