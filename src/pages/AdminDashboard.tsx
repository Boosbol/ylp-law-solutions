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
import { Trash2, Plus, LogOut, Users, Images, FileText, Edit2, Upload } from 'lucide-react';
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

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  dispute_value: string;
  status: string;
  case_number: string;
  description: string;
  results: string[];
  challenges: string[];
  solutions: string[];
  created_at: string;
}

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddCaseDialogOpen, setIsAddCaseDialogOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    date_taken: new Date().toISOString().split('T')[0]
  });
  const [newCase, setNewCase] = useState({
    title: '',
    category: '',
    client: '',
    year: new Date().getFullYear().toString(),
    duration: '',
    dispute_value: '',
    status: '',
    case_number: '',
    description: '',
    results: '',
    challenges: '',
    solutions: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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
    fetchCaseStudies();
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
    }
  };

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface with proper type conversion
      const transformedData: CaseStudy[] = data?.map(item => ({
        ...item,
        results: Array.isArray(item.results) ? item.results.map(String) : [],
        challenges: Array.isArray(item.challenges) ? item.challenges.map(String) : [],
        solutions: Array.isArray(item.solutions) ? item.solutions.map(String) : []
      })) || [];
      
      setCaseStudies(transformedData);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data studi kasus",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Hanya file gambar yang diperbolehkan",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
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

  const uploadFileToSupabase = async (file: File): Promise<string> => {
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop() || 'jpg';
      const fileName = `gallery/${timestamp}-${randomString}.${fileExtension}`;
      
      console.log('Uploading file to Supabase Storage:', fileName);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('gallery-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase storage error:', error);
        throw error;
      }

      console.log('File uploaded successfully:', data);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('gallery-photos')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;
      console.log('Public URL:', publicUrl);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Gagal mengupload file ke storage');
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
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
      
      // Upload file to Supabase Storage
      const imageUrl = await uploadFileToSupabase(selectedFile);
      
      console.log('Saving photo with URL:', imageUrl);

      // Save photo data to database
      const { error } = await supabase
        .from('gallery_photos')
        .insert([{
          title: newPhoto.title,
          description: newPhoto.description || null,
          image_url: imageUrl,
          date_taken: newPhoto.date_taken,
          uploaded_by: adminUser?.id
        }]);

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      toast({
        title: "Berhasil",
        description: "Foto berhasil ditambahkan",
      });

      // Reset form
      setNewPhoto({
        title: '',
        description: '',
        date_taken: new Date().toISOString().split('T')[0]
      });
      setSelectedFile(null);
      setIsAddDialogOpen(false);
      fetchPhotos();
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

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus foto ini?')) return;

    try {
      // Get photo data to delete from storage
      const photo = photos.find(p => p.id === id);
      
      if (photo && photo.image_url.includes('gallery-photos')) {
        // Extract filename from URL for deletion
        const urlParts = photo.image_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('gallery-photos')
          .remove([`gallery/${fileName}`]);
          
        if (storageError) {
          console.error('Storage delete error:', storageError);
        }
      }

      // Delete from database
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

  const handleAddCase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('case_studies')
        .insert([{
          title: newCase.title,
          category: newCase.category,
          client: newCase.client,
          year: newCase.year,
          duration: newCase.duration,
          dispute_value: newCase.dispute_value,
          status: newCase.status,
          case_number: newCase.case_number,
          description: newCase.description,
          results: newCase.results.split('\n').filter(r => r.trim()),
          challenges: newCase.challenges.split('\n').filter(c => c.trim()),
          solutions: newCase.solutions.split('\n').filter(s => s.trim()),
          created_by: adminUser?.id
        }]);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Studi kasus berhasil ditambahkan",
      });

      setNewCase({
        title: '',
        category: '',
        client: '',
        year: new Date().getFullYear().toString(),
        duration: '',
        dispute_value: '',
        status: '',
        case_number: '',
        description: '',
        results: '',
        challenges: '',
        solutions: ''
      });
      setIsAddCaseDialogOpen(false);
      fetchCaseStudies();
    } catch (error) {
      console.error('Error adding case study:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan studi kasus",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;
    
    try {
      const { error } = await supabase
        .from('case_studies')
        .update({
          title: newCase.title,
          category: newCase.category,
          client: newCase.client,
          year: newCase.year,
          duration: newCase.duration,
          dispute_value: newCase.dispute_value,
          status: newCase.status,
          case_number: newCase.case_number,
          description: newCase.description,
          results: newCase.results.split('\n').filter(r => r.trim()),
          challenges: newCase.challenges.split('\n').filter(c => c.trim()),
          solutions: newCase.solutions.split('\n').filter(s => s.trim()),
          updated_at: new Date().toISOString()
        })
        .eq('id', editingCase.id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Studi kasus berhasil diperbarui",
      });

      setEditingCase(null);
      setNewCase({
        title: '',
        category: '',
        client: '',
        year: new Date().getFullYear().toString(),
        duration: '',
        dispute_value: '',
        status: '',
        case_number: '',
        description: '',
        results: '',
        challenges: '',
        solutions: ''
      });
      fetchCaseStudies();
    } catch (error) {
      console.error('Error updating case study:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui studi kasus",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus studi kasus ini?')) return;

    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Studi kasus berhasil dihapus",
      });

      fetchCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus studi kasus",
        variant: "destructive",
      });
    }
  };

  const handleEditCase = (caseStudy: CaseStudy) => {
    setEditingCase(caseStudy);
    setNewCase({
      title: caseStudy.title,
      category: caseStudy.category,
      client: caseStudy.client,
      year: caseStudy.year,
      duration: caseStudy.duration,
      dispute_value: caseStudy.dispute_value,
      status: caseStudy.status,
      case_number: caseStudy.case_number,
      description: caseStudy.description,
      results: caseStudy.results.join('\n'),
      challenges: caseStudy.challenges.join('\n'),
      solutions: caseStudy.solutions.join('\n')
    });
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <Card key={photo.id} className="group">
                  <div className="relative">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        console.error('Image failed to load:', photo.image_url);
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', photo.image_url);
                      }}
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

          <TabsContent value="cases" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Studi Kasus</h2>
              <Button 
                onClick={() => setIsAddCaseDialogOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Studi Kasus
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {caseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{caseStudy.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <div><strong>Kategori:</strong> {caseStudy.category}</div>
                          <div><strong>Klien:</strong> {caseStudy.client}</div>
                          <div><strong>Tahun:</strong> {caseStudy.year}</div>
                          <div><strong>Status:</strong> {caseStudy.status}</div>
                        </div>
                        <p className="text-gray-700 mb-4">{caseStudy.description}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={() => handleEditCase(caseStudy)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteCase(caseStudy.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add/Edit Case Dialog */}
            <Dialog 
              open={isAddCaseDialogOpen || editingCase !== null} 
              onOpenChange={(open) => {
                if (!open) {
                  setIsAddCaseDialogOpen(false);
                  setEditingCase(null);
                  setNewCase({
                    title: '',
                    category: '',
                    client: '',
                    year: new Date().getFullYear().toString(),
                    duration: '',
                    dispute_value: '',
                    status: '',
                    case_number: '',
                    description: '',
                    results: '',
                    challenges: '',
                    solutions: ''
                  });
                }
              }}
            >
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingCase ? 'Edit Studi Kasus' : 'Tambah Studi Kasus Baru'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={editingCase ? handleUpdateCase : handleAddCase} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Judul</Label>
                      <Input
                        id="title"
                        value={newCase.title}
                        onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <Input
                        id="category"
                        value={newCase.category}
                        onChange={(e) => setNewCase({...newCase, category: e.target.value})}
                        placeholder="Hukum Pidana/Perdata"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client">Klien</Label>
                      <Input
                        id="client"
                        value={newCase.client}
                        onChange={(e) => setNewCase({...newCase, client: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Tahun</Label>
                      <Input
                        id="year"
                        value={newCase.year}
                        onChange={(e) => setNewCase({...newCase, year: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Durasi</Label>
                      <Input
                        id="duration"
                        value={newCase.duration}
                        onChange={(e) => setNewCase({...newCase, duration: e.target.value})}
                        placeholder="6 bulan"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dispute_value">Nilai Sengketa</Label>
                      <Input
                        id="dispute_value"
                        value={newCase.dispute_value}
                        onChange={(e) => setNewCase({...newCase, dispute_value: e.target.value})}
                        placeholder="IDR 326 juta"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Input
                        id="status"
                        value={newCase.status}
                        onChange={(e) => setNewCase({...newCase, status: e.target.value})}
                        placeholder="Mediasi Berhasil"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="case_number">Nomor Perkara</Label>
                      <Input
                        id="case_number"
                        value={newCase.case_number}
                        onChange={(e) => setNewCase({...newCase, case_number: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={newCase.description}
                      onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="results">Hasil Dicapai (satu per baris)</Label>
                    <Textarea
                      id="results"
                      value={newCase.results}
                      onChange={(e) => setNewCase({...newCase, results: e.target.value})}
                      rows={4}
                      placeholder="Penyelesaian melalui mediasi berhasil&#10;Akta Perdamaian ditandatangani"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="challenges">Tantangan (satu per baris)</Label>
                    <Textarea
                      id="challenges"
                      value={newCase.challenges}
                      onChange={(e) => setNewCase({...newCase, challenges: e.target.value})}
                      rows={4}
                      placeholder="Sisa hutang yang besar&#10;Melibatkan pejabat publik"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="solutions">Solusi (satu per baris)</Label>
                    <Textarea
                      id="solutions"
                      value={newCase.solutions}
                      onChange={(e) => setNewCase({...newCase, solutions: e.target.value})}
                      rows={4}
                      placeholder="Pendekatan mediasi yang konstruktif&#10;Negosiasi jadwal pembayaran"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {editingCase ? 'Perbarui Studi Kasus' : 'Tambah Studi Kasus'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
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
