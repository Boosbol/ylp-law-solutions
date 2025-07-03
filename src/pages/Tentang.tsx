import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Users, Briefcase, Handshake, FileText, Gavel } from 'lucide-react';

const Tentang = () => {
  const visiMisi = [
    {
      title: "Pelayanan Berkualitas",
      description: "Memberikan layanan hukum terbaik dengan standar internasional"
    },
    {
      title: "Keahlian",
      description: "Tim ahli dengan pengalaman mendalam di berbagai bidang hukum"
    },
    {
      title: "Komitmen pada Klien",
      description: "Mengutamakan kepentingan dan kepuasan klien dalam setiap penanganan kasus"
    },
    {
      title: "Inklusivitas",
      description: "Melayani semua lapisan masyarakat tanpa diskriminasi"
    },
    {
      title: "Etika Profesional",
      description: "Menjunjung tinggi kode etik dan integritas dalam praktik hukum"
    },
    {
      title: "Pemberdayaan Masyarakat",
      description: "Berkontribusi dalam edukasi hukum dan pemberdayaan masyarakat"
    },
    {
      title: "Kemitraan",
      description: "Membangun kemitraan strategis untuk memberikan layanan terbaik"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="py-20 bg-gradient-to-r from-primary to-gray-900 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/lovable-uploads/17e97f92-90c7-4001-b754-945f35b72d2d.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tentang Kami
            </h1>
            <p className="text-xl text-gray-200">
              Mengenal lebih dekat Yasmine Lisasih Law Office & Partners, 
              firma hukum yang berkomitmen memberikan layanan legal terbaik
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Sejarah Kami</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Didirikan pada <strong>17 Agustus 2023</strong>, Yasmine Lisasih Law Office 
                & Partners lahir dari visi untuk menyediakan layanan hukum berkualitas tinggi 
                dengan pendekatan yang inovatif dan profesional.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Kami berkolaborasi dengan <strong>Hotman 911</strong> untuk penanganan 
                kasus-kasus kompleks, memberikan keunggulan dalam memberikan solusi hukum 
                yang efektif dan strategis.
              </p>
              <p className="text-lg text-muted-foreground">
                Dengan kantor strategis di kawasan industri <strong>Lippo Cikarang</strong> 
                dan <strong>Jakarta Barat</strong>, kami melayani klien dari berbagai sektor 
                dengan standar pelayanan internasional.
              </p>
            </div>
            <div className="bg-gold-50 p-8 rounded-lg">
              <div className="text-center mb-6">
                <img 
                  src="/lovable-uploads/2349fbc5-deb1-46dd-9bae-218485f74177.png" 
                  alt="YLP Logo" 
                  className="h-24 w-auto mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold text-primary">2023 - Sekarang</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
                  <span>Pendirian firma hukum</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
                  <span>Kolaborasi dengan Hotman 911</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
                  <span>Pembukaan kantor Cikarang & Jakarta</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
                  <span>100+ kasus berhasil ditangani</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Visi & Misi</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Visi</h3>
                <p className="text-lg text-muted-foreground">
                  Menjadi mitra hukum global dengan layanan inovatif dan terpercaya, 
                  yang memberikan solusi legal terdepan untuk menciptakan keadilan 
                  dan kesejahteraan masyarakat.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-6">Misi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visiMisi.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-gold-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-gold-600 font-bold text-lg">{index + 1}</span>
                      </div>
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Makna Logo */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <img 
                src="/lovable-uploads/2349fbc5-deb1-46dd-9bae-218485f74177.png" 
                alt="YLP Logo" 
                className="h-48 w-auto mx-auto lg:mx-0 mb-8"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Filosofi Logo</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 p-3 rounded-lg flex-shrink-0">
                    <FileText className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Inisial YLP</h3>
                    <p className="text-muted-foreground">
                      Yasmine Lisasih Partners - identitas firma yang kuat dan mudah diingat
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 p-3 rounded-lg flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Balok Fondasi</h3>
                    <p className="text-muted-foreground">
                      Melambangkan dasar hukum yang kuat dan kokoh dalam setiap penanganan kasus
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 p-3 rounded-lg flex-shrink-0">
                    <Scale className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Kubah Perlindungan</h3>
                    <p className="text-muted-foreground">
                      Simbol perlindungan hukum yang menyeluruh tanpa diskriminasi untuk semua klien
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 p-3 rounded-lg flex-shrink-0">
                    <Handshake className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Warna Emas</h3>
                    <p className="text-muted-foreground">
                      Melambangkan kemurnian niat, eksklusivitas layanan, dan standar emas dalam praktik hukum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tentang;
