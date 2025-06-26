
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  date_taken: string;
}

const GaleriAktivitas = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('date_taken', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const MediaModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full">
        <img 
          src={src} 
          alt="Gallery item"
          className="max-w-full max-h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          ✕
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Galeri Aktivitas
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-200">
              Dokumentasi kegiatan, seminar, dan momen penting Yasmine Lisasih Law Office & Partners
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-8">
                <p>Memuat galeri...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo) => (
                  <Card 
                    key={photo.id} 
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                    onClick={() => setSelectedMedia(photo.image_url)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <Image className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-foreground">{photo.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{photo.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(photo.date_taken).toLocaleDateString('id-ID')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{photos.length}</div>
                <p className="text-muted-foreground">Foto</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(photos.map(p => p.date_taken)).size}
                </div>
                <p className="text-muted-foreground">Acara</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <p className="text-muted-foreground">Grand Opening</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for viewing images */}
      {selectedMedia && (
        <MediaModal 
          src={selectedMedia} 
          onClose={() => setSelectedMedia(null)} 
        />
      )}
    </Layout>
  );
};

export default GaleriAktivitas;
