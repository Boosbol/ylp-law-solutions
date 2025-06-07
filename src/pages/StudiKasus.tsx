
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Award,
  Users,
  DollarSign
} from 'lucide-react';

const StudiKasus = () => {
  const studiKasus = [
    {
      id: 1,
      judul: "Penyelesaian Sengketa Korporat Multinasional",
      kategori: "Hukum Korporat",
      klien: "PT. Global Manufacturing Indonesia",
      tahun: "2023",
      durasi: "8 bulan",
      nilaiSengketa: "USD 25 juta",
      status: "Menang",
      deskripsi: "Berhasil menyelesaikan sengketa akuisisi perusahaan multinasional dengan hasil yang menguntungkan klien. Kasus ini melibatkan kompleksitas hukum lintas negara dan regulasi investasi asing.",
      hasil: [
        "Klien memperoleh kompensasi penuh",
        "Akuisisi berhasil diselesaikan",
        "Reputasi perusahaan terjaga",
        "Hubungan bisnis tetap baik"
      ],
      tantangan: [
        "Perbedaan sistem hukum antar negara",
        "Koordinasi dengan tim hukum internasional",
        "Tekanan waktu yang ketat",
        "Kompleksitas regulasi investasi"
      ],
      solusi: [
        "Kolaborasi dengan Hotman 911 untuk expertise internasional",
        "Strategi negosiasi bertahap",
        "Due diligence menyeluruh",
        "Mediasi terstruktur"
      ]
    },
    {
      id: 2,
      judul: "Pembelaan Kasus Pidana Korupsi Tingkat Tinggi",
      kategori: "Hukum Pidana",
      klien: "Pejabat Pemerintahan (Confidential)",
      tahun: "2023",
      durasi: "14 bulan",
      nilaiSengketa: "IDR 50 miliar",
      status: "Bebas",
      deskripsi: "Berhasil membebaskan klien dari tuduhan korupsi dengan nilai kerugian negara 50 miliar rupiah. Kasus ini menjadi perhatian media dan membutuhkan strategi hukum yang sangat hati-hati.",
      hasil: [
        "Klien dinyatakan bebas dari segala tuduhan",
        "Nama baik klien dipulihkan",
        "Tidak ada sanksi administratif",
        "Proses hukum yang fair dan transparan"
      ],
      tantangan: [
        "Tekanan media yang intens",
        "Kompleksitas alat bukti",
        "Stakeholder yang beragam",
        "Proses hukum yang panjang"
      ],
      solusi: [
        "Strategi komunikasi yang terukur",
        "Analisis mendalam terhadap alat bukti",
        "Koordinasi dengan berbagai pihak",
        "Persiapan yang sangat matang"
      ]
    },
    {
      id: 3,
      judul: "Mediasi Sengketa Tanah Skala Besar",
      kategori: "Hukum Properti",
      klien: "Developer Properti Terkemuka",
      tahun: "2022",
      durasi: "6 bulan",
      nilaiSengketa: "IDR 100 miliar",
      status: "Kesepakatan",
      deskripsi: "Menyelesaikan sengketa kepemilikan tanah seluas 50 hektar melalui mediasi yang melibatkan multiple stakeholders termasuk masyarakat adat, pemerintah daerah, dan developer.",
      hasil: [
        "Kesepakatan win-win solution",
        "Proyek pembangunan dapat dilanjutkan",
        "Kompensasi yang adil untuk semua pihak",
        "Hubungan harmonis dengan masyarakat"
      ],
      tantangan: [
        "Multiple stakeholders dengan kepentingan berbeda",
        "Aspek hukum adat yang kompleks",
        "Tekanan sosial dan politik",
        "Nilai ekonomi yang tinggi"
      ],
      solusi: [
        "Pendekatan mediasi bertahap",
        "Konsultasi dengan tokoh adat",
        "Analisis komprehensif aspek hukum",
        "Negosiasi berkelanjutan"
      ]
    },
    {
      id: 4,
      judul: "Restrukturisasi Utang Perusahaan PKPU",
      kategori: "Hukum Korporat",
      klien: "PT. Industri Tekstil Nusantara",
      tahun: "2022",
      durasi: "10 bulan",
      nilaiSengketa: "IDR 75 miliar",
      status: "Berhasil",
      deskripsi: "Membantu perusahaan textil besar menghindari kebangkrutan melalui proses PKPU (Penundaan Kewajiban Pembayaran Utang) dan berhasil melakukan restrukturisasi utang.",
      hasil: [
        "Perusahaan terhindar dari kebangkrutan",
        "Restrukturisasi utang 60% dari nilai awal",
        "Operasional perusahaan berlanjut",
        "10.000+ karyawan tetap bekerja"
      ],
      tantangan: [
        "Tekanan dari multiple kreditor",
        "Kondisi keuangan yang kritis",
        "Kompleksitas hukum kepailitan",
        "Dampak sosial yang luas"
      ],
      solusi: [
        "Strategi negosiasi dengan kreditor",
        "Rencana bisnis yang realistis",
        "Koordinasi dengan kurator",
        "Komunikasi yang transparant"
      ]
    }
  ];

  const statistik = [
    {
      icon: <Award className="h-8 w-8 text-gold-500" />,
      nilai: "98%",
      label: "Tingkat Keberhasilan",
      deskripsi: "Dari semua kasus yang ditangani"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-gold-500" />,
      nilai: "IDR 500M+",
      label: "Total Nilai Kasus",
      deskripsi: "Yang berhasil diselesaikan"
    },
    {
      icon: <Users className="h-8 w-8 text-gold-500" />,
      nilai: "150+",
      label: "Klien Puas",
      deskripsi: "Perusahaan dan individu"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-gold-500" />,
      nilai: "200+",
      label: "Kasus Selesai",
      deskripsi: "Dalam 2 tahun terakhir"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Studi Kasus & Pencapaian
            </h1>
            <p className="text-xl text-gray-200">
              Lihat bagaimana kami berhasil menyelesaikan kasus-kasus kompleks 
              dan memberikan hasil terbaik untuk klien
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistik.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">
                    {stat.nilai}
                  </h3>
                  <h4 className="text-lg font-semibold mb-2">
                    {stat.label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {stat.deskripsi}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Studi Kasus Terpilih
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beberapa kasus signifikan yang berhasil kami tangani dengan hasil yang memuaskan
            </p>
          </div>

          <div className="space-y-12">
            {studiKasus.map((kasus, index) => (
              <Card key={kasus.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <Badge variant="default" className="bg-gold-500 hover:bg-gold-600">
                          {kasus.kategori}
                        </Badge>
                        <Badge 
                          variant={kasus.status === 'Menang' || kasus.status === 'Bebas' || kasus.status === 'Berhasil' || kasus.status === 'Kesepakatan' ? 'default' : 'secondary'}
                          className={kasus.status === 'Menang' || kasus.status === 'Bebas' || kasus.status === 'Berhasil' || kasus.status === 'Kesepakatan' ? 'bg-green-500 hover:bg-green-600' : ''}
                        >
                          {kasus.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{kasus.judul}</h3>
                      <p className="text-muted-foreground mb-6">{kasus.deskripsi}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{kasus.tahun}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{kasus.durasi}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{kasus.nilaiSengketa}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>Klien Korporat</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">Hasil Dicapai</h4>
                        <ul className="space-y-2">
                          {kasus.hasil.map((hasil, hasilIndex) => (
                            <li key={hasilIndex} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{hasil}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-orange-600">Tantangan</h4>
                        <ul className="space-y-2">
                          {kasus.tantangan.map((tantangan, tantanganIndex) => (
                            <li key={tantanganIndex} className="flex items-start space-x-2 text-sm">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{tantangan}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-blue-600">Solusi</h4>
                        <ul className="space-y-2">
                          {kasus.solusi.map((solusi, solusiIndex) => (
                            <li key={solusiIndex} className="flex items-start space-x-2 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{solusi}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
            Butuh Bantuan Hukum Serupa?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tim ahli kami siap membantu menyelesaikan kasus hukum Anda 
            dengan strategi yang tepat dan hasil yang optimal
          </p>
          <Button 
            size="lg" 
            className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3"
          >
            Konsultasi Kasus Anda
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default StudiKasus;
