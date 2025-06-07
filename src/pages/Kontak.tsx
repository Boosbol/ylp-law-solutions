import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building,
  Car,
  Wifi,
  Coffee,
  Instagram,
  ExternalLink
} from 'lucide-react';

const Kontak = () => {
  const informasiKontak = [
    {
      jenis: "Kantor Pusat",
      alamat: "Paragon Business Park Blok B28 V, Lippo Cikarang, Bekasi 17550",
      telepon: "+62 856 4211 1789",
      email: "nin_yasmine@yahoo.co.id",
      jamOperasional: "Senin - Jumat: 08:00 - 17:00 WIB",
      koordinat: "Lippo Cikarang",
      googleMapsUrl: "https://maps.google.com/?q=Paragon+Business+Park+Blok+B28+V,+Lippo+Cikarang,+Bekasi+17550",
      fasilitas: ["Parking Area", "Free WiFi", "Meeting Room", "Waiting Lounge"]
    },
    {
      jenis: "Kantor Cabang",
      alamat: "Jl. Kebon Jeruk XV No.13, Kebon Jeruk, Jakarta Barat 11530",
      telepon: "+62 878 8471 7155",
      email: "nin_yasmine@yahoo.co.id",
      jamOperasional: "Senin - Jumat: 09:00 - 17:00 WIB",
      koordinat: "Jakarta Barat",
      googleMapsUrl: "https://maps.google.com/?q=Jl.+Kebon+Jeruk+XV+No.13,+Kebon+Jeruk,+Jakarta+Barat+11530",
      fasilitas: ["Parking Area", "Free WiFi", "Conference Room", "Coffee Bar"]
    }
  ];

  const kontakDarurat = [
    {
      layanan: "Kontak Darurat",
      kontak: "+62 821 3746 2729",
      deskripsi: "Untuk keadaan darurat hukum dan konsultasi mendesak"
    },
    {
      layanan: "WhatsApp Business",
      kontak: "+62 856 4211 1789",
      deskripsi: "Chat langsung dengan tim customer service"
    },
    {
      layanan: "Email Priority",
      kontak: "nin_yasmine@yahoo.co.id",
      deskripsi: "Untuk kasus urgent dengan respon maksimal 2 jam"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-gray-200">
              Siap membantu Anda 24/7. Konsultasi pertama gratis untuk semua klien baru
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Office Locations */}
              {informasiKontak.map((kantor, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Building className="h-5 w-5 mr-2 text-gold-500" />
                      {kantor.jenis}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <span className="text-sm">{kantor.alamat}</span>
                        <br />
                        <a 
                          href={kantor.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold-600 hover:text-gold-700 text-sm inline-flex items-center mt-1 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Buka di Google Maps
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{kantor.telepon}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{kantor.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{kantor.jamOperasional}</span>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Fasilitas:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {kantor.fasilitas.map((fasilitas, fasilitasIndex) => (
                          <div key={fasilitasIndex} className="flex items-center space-x-2 text-sm">
                            {fasilitas.includes('Parking') && <Car className="h-4 w-4 text-muted-foreground" />}
                            {fasilitas.includes('WiFi') && <Wifi className="h-4 w-4 text-muted-foreground" />}
                            {fasilitas.includes('Coffee') && <Coffee className="h-4 w-4 text-muted-foreground" />}
                            {fasilitas.includes('Meeting') && <Building className="h-4 w-4 text-muted-foreground" />}
                            {fasilitas.includes('Conference') && <Building className="h-4 w-4 text-muted-foreground" />}
                            {fasilitas.includes('Waiting') && <Building className="h-4 w-4 text-muted-foreground" />}
                            <span>{fasilitas}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Emergency Contact */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-xl text-red-700">Kontak Darurat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {kontakDarurat.map((darurat, index) => (
                    <div key={index} className="border-b border-red-200 last:border-0 pb-3 last:pb-0">
                      <h4 className="font-semibold text-red-700">{darurat.layanan}</h4>
                      <p className="text-red-600 font-medium">{darurat.kontak}</p>
                      <p className="text-sm text-red-600">{darurat.deskripsi}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Media Sosial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Instagram className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Instagram:</span>
                      <br />
                      <span className="text-muted-foreground">@yasminelisasihlawoffice</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Lokasi Kantor</h2>
            <p className="text-xl text-muted-foreground">
              Kunjungi kantor kami untuk konsultasi langsung
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {informasiKontak.map((kantor, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden group">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">{kantor.jenis}</p>
                  <p className="text-sm text-gray-500 mb-3">{kantor.koordinat}</p>
                  <a 
                    href={kantor.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Lihat di Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;
