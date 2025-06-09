import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Gavel, 
  Handshake, 
  Briefcase, 
  Scale, 
  Users,
  Building,
  Heart,
  Home,
  Truck,
  CreditCard,
  Shield
} from 'lucide-react';

const Layanan = () => {
  const layananHukum = [
    {
      category: "Hukum Pidana",
      icon: <Gavel className="h-8 w-8 text-gold-500" />,
      services: [
        "Pembelaan dalam perkara pidana umum",
        "Perkara pidana khusus (korupsi, pencucian uang)",
        "Perkara pidana ekonomi dan bisnis",
        "Pendampingan dalam tahap penyidikan"
      ]
    },
    {
      category: "Hukum Perdata",
      icon: <Scale className="h-8 w-8 text-gold-500" />,
      services: [
        "Sengketa kontrak dan wanprestasi",
        "Sengketa tanah dan properti",
        "Hukum keluarga dan perceraian",
        "Sengketa warisan dan hibah"
      ]
    },
    {
      category: "Hukum Korporat",
      icon: <Briefcase className="h-8 w-8 text-gold-500" />,
      services: [
        "Pendirian dan akuisisi perusahaan",
        "Due diligence dan merger",
        "Compliance dan tata kelola perusahaan",
        "Perjanjian bisnis dan kemitraan"
      ]
    },
    {
      category: "Hukum Ketenagakerjaan",
      icon: <Users className="h-8 w-8 text-gold-500" />,
      services: [
        "Penyusunan kontrak kerja",
        "Penyelesaian sengketa industrial",
        "Pemutusan hubungan kerja",
        "Audit kepatuhan ketenagakerjaan"
      ]
    },
    {
      category: "Hukum Properti",
      icon: <Building className="h-8 w-8 text-gold-500" />,
      services: [
        "Transaksi jual beli properti",
        "Sertifikasi dan legalisasi tanah",
        "Sengketa kepemilikan properti",
        "Perizinan konstruksi dan IMB"
      ]
    },
    {
      category: "Mediasi & Arbitrase",
      icon: <Handshake className="h-8 w-8 text-gold-500" />,
      services: [
        "Mediasi sengketa bisnis",
        "Arbitrase komersial",
        "Negosiasi penyelesaian sengketa",
        "Alternative Dispute Resolution (ADR)"
      ]
    }
  ];

  const layananTambahan = [
    {
      title: "Konsultasi Hukum Online",
      description: "Layanan konsultasi hukum 24/7 melalui platform digital",
      icon: <FileText className="h-6 w-6 text-gold-500" />
    },
    {
      title: "Legal Health Check",
      description: "Audit menyeluruh terhadap aspek hukum perusahaan Anda",
      icon: <Heart className="h-6 w-6 text-gold-500" />
    },
    {
      title: "Notaris & PPAT",
      description: "Layanan notaris dan Pejabat Pembuat Akta Tanah",
      icon: <Home className="h-6 w-6 text-gold-500" />
    },
    {
      title: "Jasa Pengiriman Dokumen",
      description: "Layanan kurir khusus untuk dokumen hukum penting",
      icon: <Truck className="h-6 w-6 text-gold-500" />
    },
    {
      title: "Payment Gateway Legal",
      description: "Sistem pembayaran terintegrasi untuk fee hukum",
      icon: <CreditCard className="h-6 w-6 text-gold-500" />
    },
    {
      title: "Legal Insurance",
      description: "Asuransi perlindungan hukum untuk klien korporat",
      icon: <Shield className="h-6 w-6 text-gold-500" />
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Layanan Hukum Profesional
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Solusi hukum komprehensif untuk berbagai kebutuhan legal Anda
            </p>
            <Button 
              size="lg" 
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3"
            >
              Konsultasi Gratis Sekarang
            </Button>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bidang Keahlian Kami
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tim ahli hukum kami memiliki pengalaman mendalam dalam berbagai bidang hukum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {layananHukum.map((layanan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    {layanan.icon}
                    <CardTitle className="text-xl">{layanan.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {layanan.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Layanan Tambahan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nilai tambah yang kami berikan untuk kemudahan klien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {layananTambahan.map((layanan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gold-100 p-3 rounded-lg flex-shrink-0">
                      {layanan.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{layanan.title}</h3>
                      <p className="text-sm text-muted-foreground">{layanan.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Membantu Masalah Hukum Anda
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hubungi tim ahli hukum kami untuk konsultasi gratis dan dapatkan solusi terbaik
          </p>
          <Link to="/kontak">
            <Button 
              size="lg" 
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3"
            >
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Layanan;
