
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminUser, NewPhoto } from '@/types/admin';

interface AddPhotoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  adminUser: AdminUser | null;
  onPhotoAdded: () => void;
}

const AddPhotoDialog = ({ isOpen, onClose, adminUser, onPhotoAdded }: AddPhotoDialogProps) => {
  const [newPhoto, setNewPhoto] = useState<NewPhoto>({
    title: '',
    description: '',
    date_taken: new Date().toISOString().split('T')[0]
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Hanya file gambar yang diperbolehkan",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Silakan pilih file gambar",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      console.log('Starting photo upload process...');
      
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      console.log('File converted to base64, saving to database...');

      const { error: dbError } = await supabase
        .from('gallery_photos')
        .insert([{
          title: newPhoto.title,
          description: newPhoto.description || null,
          image_url: `data:${selectedFile.type};base64,${base64}`,
          date_taken: newPhoto.date_taken,
          uploaded_by: adminUser?.id
        }]);

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw dbError;
      }

      console.log('Photo saved successfully to database');

      toast({
        title: "Berhasil",
        description: "Foto berhasil ditambahkan",
      });

      setNewPhoto({
        title: '',
        description: '',
        date_taken: new Date().toISOString().split('T')[0]
      });
      setSelectedFile(null);
      onClose();
      onPhotoAdded();
    } catch (error) {
      console.error('Error adding photo:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan foto",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Foto Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="file-upload">Upload File Gambar</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex-1"
                required
              />
              <Upload className="h-4 w-4" />
            </div>
            {selectedFile && (
              <p className="text-sm text-green-600 mt-1">
                File dipilih: {selectedFile.name}
              </p>
            )}
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
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Mengupload..." : "Tambah Foto"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPhotoDialog;
