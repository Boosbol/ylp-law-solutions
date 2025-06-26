
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, LogOut, Users, Images } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import UserManagement from '@/components/UserManagement';

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  date_taken: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    image_url: '',
    date_taken: new Date().toISOString().split('T')[0]
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem('adminUser');
      if (!stored) {
        navigate('/admin/login');
        return;
      }
      setAdminUser(JSON.parse(stored));
    };

    checkAuth();
    fetchPhotos();
  }, [navigate]);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data foto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .insert([{
          title: newPhoto.title,
          description: newPhoto.description || null,
          image_url: newPhoto.image_url,
          date_taken: newPhoto.date_taken,
          uploaded_by: adminUser?.id
        }]);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Foto berhasil ditambahkan",
      });

      setNewPhoto({
        title: '',
        description: '',
        image_url: '',
        date_taken: new Date().toISOString().split('T')[0]
      });
      setIsAddDialogOpen(false);
      fetchPhotos();
    } catch (error) {
      console.error('Error adding photo:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan foto",
        variant: "destructive",
      });
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus foto ini?')) return;

    try {
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Foto berhasil dihapus",
      });

      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus foto",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">
              <Images className="h-4 w-4 mr-2" />
              Manajemen Galeri
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Manajemen User
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Galeri Foto</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Foto
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Foto Baru</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddPhoto} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Judul</Label>
                      <Input
                        id="title"
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        value={newPhoto.description}
                        onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image_url">URL Gambar</Label>
                      <Input
                        id="image_url"
                        value={newPhoto.image_url}
                        onChange={(e) => setNewPhoto({...newPhoto, image_url: e.target.value})}
                        placeholder="/lovable-uploads/filename.jpg"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="date_taken">Tanggal</Label>
                      <Input
                        id="date_taken"
                        type="date"
                        value={newPhoto.date_taken}
                        onChange={(e) => setNewPhoto({...newPhoto, date_taken: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Tambah Foto
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <Card key={photo.id} className="group">
                  <div className="relative">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{photo.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(photo.date_taken).toLocaleDateString('id-ID')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
