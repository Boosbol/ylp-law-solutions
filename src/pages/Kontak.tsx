
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  Building,
  Car,
  Wifi,
  Coffee
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
      fasilitas: ["Parking Area", "Free WiFi", "Meeting Room", "Waiting Lounge"]
    },
    {
      jenis: "Kantor Cabang",
      alamat: "Jl. Kebon Jeruk XV No.13, Kebon Jeruk, Jakarta Barat 11530",
      telepon: "+62 878 8471 7155",
      email: "nin_yasmine@yahoo.co.id",
      jamOperasional: "Senin - Jumat: 09:00 - 17:00 WIB",
      koordinat: "Jakarta Barat",
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

  const mediaSosial = [
    { platform: "LinkedIn", handle: "@yasmine-lisasih-partners" },
    { platform: "Instagram", handle: "@yasminelisasihlawoffice" },
    { platform: "Facebook", handle: "YLP Law Office & Partners" },
    { platform: "YouTube", handle: "YLP Legal Channel" }
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="h-6 w-6 mr-2 text-gold-500" />
                    Kirim Pesan
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nama">Nama Lengkap *</Label>
                      <Input id="nama" placeholder="Masukkan nama lengkap" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="nama@email.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telepon">Nomor Telepon *</Label>
                      <Input id="telepon" placeholder="+62 xxx xxx xxx" />
                    </div>
                    <div>
                      <Label htmlFor="perusahaan">Perusahaan (Opsional)</Label>
                      <Input id="perusahaan" placeholder="Nama perusahaan" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="layanan">Jenis Layanan *</Label>
                    <select className="w-full p-2 border border-input rounded-md">
                      <option value="">Pilih jenis layanan</option>
                      <option value="pidana">Hukum Pidana</option>
                      <option value="perdata">Hukum Perdata</option>
                      <option value="korporat">Hukum Korporat</option>
                      <option value="ketenagakerjaan">Hukum Ketenagakerjaan</option>
                      <option value="properti">Hukum Properti</option>
                      <option value="mediasi">Mediasi & Arbitrase</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="prioritas">Tingkat Urgensi *</Label>
                    <select className="w-full p-2 border border-input rounded-md">
                      <option value="">Pilih tingkat urgensi</option>
                      <option value="rendah">Rendah (Respon dalam 2-3 hari)</option>
                      <option value="normal">Normal (Respon dalam 24 jam)</option>
                      <option value="tinggi">Tinggi (Respon dalam 6 jam)</option>
                      <option value="darurat">Darurat (Respon dalam 2 jam)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="pesan">Deskripsi Kasus/Kebutuhan *</Label>
                    <textarea 
                      id="pesan"
                      className="w-full p-2 border border-input rounded-md h-32"
                      placeholder="Jelaskan secara singkat masalah hukum atau kebutuhan Anda..."
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="privacy" className="mt-1" />
                    <Label htmlFor="privacy" className="text-sm">
                      Saya menyetujui <a href="#" className="text-gold-600 hover:underline">Kebijakan Privasi</a> dan 
                      <a href="#" className="text-gold-600 hover:underline"> Syarat & Ketentuan</a>
                    </Label>
                  </div>

                  <Button className="w-full bg-gold-500 hover:bg-gold-600">
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </CardContent>
              </Card>
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
                      <span className="text-sm">{kantor.alamat}</span>
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
                  <div className="grid grid-cols-2 gap-3">
                    {mediaSosial.map((sosmed, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{sosmed.platform}:</span>
                        <br />
                        <span className="text-muted-foreground">{sosmed.handle}</span>
                      </div>
                    ))}
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
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-600">Kantor Pusat - Lippo Cikarang</p>
                <p className="text-sm text-gray-500">Interactive Map</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-600">Kantor Cabang - Jakarta Barat</p>
                <p className="text-sm text-gray-500">Interactive Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;
