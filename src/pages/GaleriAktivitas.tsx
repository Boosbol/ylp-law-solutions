
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Video, Play } from 'lucide-react';
import { useState } from 'react';

const GaleriAktivitas = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  // Real photos from uploads
  const photos = [
    {
      id: 1,
      src: "/lovable-uploads/249537df-a3c1-40c6-9a3f-a17e498a3df1.png",
      title: "Congratulation for Grand Opening",
      description: "Karangan bunga ucapan selamat pembukaan kantor dari Dr. Hotman Paris S.H., M.Hum",
      date: "2023-08-17"
    },
    {
      id: 2,
      src: "/lovable-uploads/f430c6a9-dadb-40dd-b29b-ece45b6367b8.png",
      title: "Grand Opening Kantor",
      description: "Momen pembukaan kantor Yasmine Lisasih Law Office & Partners dengan berbagai karangan bunga dari mitra",
      date: "2023-08-17"
    },
    {
      id: 3,
      src: "/lovable-uploads/9f67be4e-6abd-4057-9a8c-0bb3dfa55536.png",
      title: "Karangan Bunga dari Mitra",
      description: "Ucapan selamat grand opening dari Dr. Farhat Abbas, S.H.M.H. (Ketua Partai Pandai Pembela Kaum Lemah)",
      date: "2023-08-17"
    }
  ];

  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
      title: "Webinar Hukum Pidana",
      description: "Penjelasan tentang prosedur hukum pidana",
      duration: "45:30",
      date: "2024-01-10"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      title: "Tips Hukum Perdata",
      description: "Panduan praktis hukum perdata",
      duration: "32:15",
      date: "2024-01-25"
    }
  ];

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
            <Tabs defaultValue="photos" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Foto
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
              </TabsList>

              <TabsContent value="photos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {photos.map((photo) => (
                    <Card 
                      key={photo.id} 
                      className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                      onClick={() => setSelectedMedia(photo.src)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={photo.src}
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
                        <p className="text-xs text-gray-500">{photo.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <Card 
                      key={video.id} 
                      className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                          <Play className="text-white h-12 w-12 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 text-foreground">{video.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{video.description}</p>
                        <p className="text-xs text-gray-500">{video.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{photos.length}</div>
                <p className="text-muted-foreground">Foto</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{videos.length}</div>
                <p className="text-muted-foreground">Video</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <p className="text-muted-foreground">Acara</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">8</div>
                <p className="text-muted-foreground">Seminar</p>
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
