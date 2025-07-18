
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Scale, 
  Users, 
  Briefcase, 
  Handshake,
  Gavel,
  FileText,
  Settings
} from 'lucide-react';
import Layout from '@/components/Layout';

const Index = () => {
  const services = [
    {
      icon: <FileText className="h-8 w-8 text-gold-500" />,
      title: "Pemberian Nasihat Hukum",
      description: "Konsultasi hukum komprehensif untuk berbagai kebutuhan legal"
    },
    {
      icon: <Gavel className="h-8 w-8 text-gold-500" />,
      title: "Representasi di Pengadilan",
      description: "Pendampingan profesional untuk kasus pidana dan perdata"
    },
    {
      icon: <Handshake className="h-8 w-8 text-gold-500" />,
      title: "Mediasi & Penyelesaian Sengketa",
      description: "Solusi alternatif penyelesaian sengketa yang efektif"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-gold-500" />,
      title: "Kepatuhan Korporat",
      description: "Layanan hukum korporat dan compliance yang terpercaya"
    }
  ];

  const stats = [
    { number: "100+", label: "Kasus Berhasil" },
    { number: "50+", label: "Klien Puas" },
    { number: "5", label: "Tahun Pengalaman Tim" },
    { number: "2", label: "Kantor Lokasi" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-primary to-gray-900 text-white py-20 overflow-hidden min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/lovable-uploads/90898dfc-8929-48fb-84da-fa24ff9297b8.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Mitra Hukum Terkemuka dengan Layanan{" "}
                <span className="text-gold-500">Unggul, Inovatif, dan Profesional</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 drop-shadow-md">
                Yasmine Lisasih Law Office & Partners berkolaborasi dengan Hotman 911 
                untuk memberikan solusi hukum terbaik dengan standar internasional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/kontak">
                  <Button 
                    size="lg" 
                    className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3"
                  >
                    Konsultasi Hukum Gratis
                  </Button>
                </Link>
                <Link to="/tentang">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Stats positioned at bottom right */}
          <div className="absolute bottom-8 right-8 hidden lg:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gold-500 mb-1 drop-shadow-md">
                      {stat.number}
                    </div>
                    <div className="text-xs text-white drop-shadow-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Layanan Hukum Profesional
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kami menyediakan berbagai layanan hukum komprehensif dengan pendekatan 
              yang inovatif dan solusi yang efektif untuk setiap klien.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/layanan">
              <Button variant="outline" size="lg" className="border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white">
                Lihat Semua Layanan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tentang Yasmine Lisasih Law Office & Partners
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Didirikan pada 17 Agustus 2023, kami telah menjadi mitra hukum terpercaya 
                dengan kantor strategis di kawasan industri Lippo Cikarang dan Jakarta Barat.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Kolaborasi dengan Hotman 911 memberikan kami keunggulan dalam menangani 
                kasus-kasus kompleks dengan standar pelayanan internasional.
              </p>
              <Link to="/tentang">
                <Button className="bg-primary hover:bg-primary/90">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gold-50 p-6 rounded-lg">
                <Scale className="h-12 w-12 text-gold-500 mb-4" />
                <h3 className="font-semibold mb-2">Keadilan</h3>
                <p className="text-sm text-muted-foreground">
                  Berkomitmen untuk menegakkan keadilan tanpa diskriminasi
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <Users className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Tim Expert</h3>
                <p className="text-sm text-muted-foreground">
                  Didukung oleh tim ahli hukum berpengalaman
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Butuh Bantuan Hukum Profesional?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Konsultasikan masalah hukum Anda dengan tim ahli kami. 
            Kami siap memberikan solusi terbaik untuk kebutuhan legal Anda.
          </p>
          <Link to="/kontak">
            <Button 
              size="lg" 
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3"
            >
              Hubungi Kami Sekarang
            </Button>
          </Link>
        </div>
        
        {/* Subtle Admin Login Link */}
        <div className="absolute bottom-4 right-4">
          <Link 
            to="/admin/login" 
            className="text-gray-400 hover:text-gray-300 transition-colors opacity-50 hover:opacity-100"
            title="Admin Login"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
