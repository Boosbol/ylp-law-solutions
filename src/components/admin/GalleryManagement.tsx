
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Images } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminUser, GalleryPhoto } from '@/types/admin';
import PhotoCard from './PhotoCard';
import AddPhotoDialog from './AddPhotoDialog';

interface GalleryManagementProps {
  adminUser: AdminUser | null;
}

const GalleryManagement = ({ adminUser }: GalleryManagementProps) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Galeri Foto</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Foto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onDelete={handleDeletePhoto}
          />
        ))}
      </div>

      <AddPhotoDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        adminUser={adminUser}
        onPhotoAdded={fetchPhotos}
      />
    </div>
  );
};

export default GalleryManagement;
