import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Award,
  Users,
  DollarSign,
  Scale,
  FileText,
  AlertTriangle
} from 'lucide-react';

const StudiKasus = () => {
  const studiKasus = [
    {
      id: 1,
      judul: "Kasus Pembunuhan Pedagang Baju Butik Auriell di Karawaci, Tangerang",
      kategori: "Hukum Pidana",
      klien: "Keluarga Korban (bekerjasama dengan Hotman 911)",
      tahun: "2024",
      durasi: "8 bulan",
      nilaiSengketa: "Kasus Pembunuhan",
      status: "Banding Disetujui",
      nomorPerkara: "793/Pid.B/2024/PN.Tng | 106/PID/2024/PT BTN",
      deskripsi: "Berhasil menangani kasus pembunuhan di Boutique Aurel Mode dengan mendampingi keluarga korban. Terdakwa Nada Diana divonis 15 tahun penjara di Pengadilan Negeri, kemudian dikurangi menjadi 13 tahun di Pengadilan Tinggi Banten.",
      hasil: [
        "Terdakwa terbukti melanggar Pasal 338 KUHP",
        "Vonis awal 15 tahun penjara (PN Tangerang)",
        "Vonis banding 13 tahun penjara (PT Banten)",
        "Proses kasasi sedang berjalan oleh JPU"
      ],
      tantangan: [
        "Kasus pembunuhan dengan korban jiwa",
        "Proses hukum yang panjang dan kompleks",
        "Koordinasi dengan Hotman 911",
        "Dampak emosional pada keluarga korban"
      ],
      solusi: [
        "Pendampingan hukum yang komprehensif",
        "Koordinasi strategis dengan tim Hotman 911",
        "Dukungan psikologis untuk keluarga",
        "Strategi banding yang efektif"
      ]
    },
    {
      id: 2,
      judul: "Gugatan Wanprestasi PT. Vinmix Multi Perkasa",
      kategori: "Hukum Perdata",
      klien: "PT. Vinmix Multi Perkasa",
      tahun: "2024",
      durasi: "6 bulan",
      nilaiSengketa: "IDR 326 juta",
      status: "Mediasi Berhasil",
      nomorPerkara: "229/Pdt.G/2024/PN.Ckr",
      deskripsi: "Menyelesaikan sengketa wanprestasi kontrak pengadaan beton senilai 1,3 miliar dengan anggota DPRD Jawa Barat. Kasus diselesaikan melalui mediasi dengan kesepakatan cicilan selama 9 bulan.",
      hasil: [
        "Penyelesaian melalui mediasi berhasil",
        "Akta Perdamaian ditandatangani 13 Januari 2025",
        "Kesepakatan cicilan Rp 45 juta selama 9 bulan",
        "Jaminan tanah SHM tetap berlaku"
      ],
      tantangan: [
        "Sisa hutang Rp 326 juta dari kontrak 1,3 miliar",
        "Melibatkan pejabat publik (anggota DPRD)",
        "Jaminan berupa 2 sertifikat tanah",
        "Proyek infrastruktur yang terhenti"
      ],
      solusi: [
        "Pendekatan mediasi yang konstruktif",
        "Negosiasi jadwal pembayaran realistis",
        "Mempertahankan jaminan sebagai pengaman",
        "Komunikasi yang baik antar pihak"
      ]
    },
    {
      id: 3,
      judul: "Perbuatan Melawan Hukum terhadap PT. J-Group Amanah Wisata Travel",
      kategori: "Hukum Perdata",
      klien: "Ir. Djoko Prijo Utomo",
      tahun: "2024",
      durasi: "Berlangsung",
      nilaiSengketa: "IDR 550 juta",
      status: "Dalam Proses",
      nomorPerkara: "1103/Pdt.G/PN.Tng",
      deskripsi: "Menangani gugatan perbuatan melawan hukum terhadap travel haji illegal. Klien telah membayar Rp 550 juta untuk Program Haji Smart Plus yang ternyata tidak memiliki visa haji sesuai regulasi Kemenag.",
      hasil: [
        "Gugatan berhasil didaftarkan ke PN Tangerang",
        "Mediasi telah dilakukan namun tidak berhasil",
        "Proses persidangan berlanjut ke tahap pembuktian",
        "Kasus menjadi perhatian karena melibatkan travel haji illegal"
      ],
      tantangan: [
        "Program haji illegal tanpa visa resmi",
        "Kerugian finansial yang besar",
        "Regulasi Kemenag yang kompleks",
        "Dampak spiritual dan finansial pada klien"
      ],
      solusi: [
        "Analisis mendalam regulasi Kemenag",
        "Pengumpulan bukti-bukti kuat",
        "Strategi pembuktian yang sistematis",
        "Koordinasi dengan instansi terkait"
      ]
    },
    {
      id: 4,
      judul: "Sengketa Yayasan Pembangunan Pendidikan Jakarta",
      kategori: "Hukum Pidana",
      klien: "Yayasan Pembangunan Pendidikan Jakarta",
      tahun: "2024",
      durasi: "Berlangsung",
      nilaiSengketa: "Pemalsuan Dokumen",
      status: "Dalam Penyelidikan",
      nomorPerkara: "LP/B/7438/XII/2024/SPKT/POLDA METRO JAYA",
      deskripsi: "Menangani dugaan tindak pidana pemalsuan sertifikat tanah dan akta perubahan yayasan. Kasus melibatkan pemalsuan dokumen di kantor notaris dan naskah serah terima gedung sekolah dari tahun 1977.",
      hasil: [
        "Laporan polisi berhasil didaftarkan",
        "Dugaan pemalsuan berdasarkan Pasal 263 KUHP",
        "Identifikasi lokasi pemalsuan di kantor notaris",
        "Proses penyelidikan sedang berjalan"
      ],
      tantangan: [
        "Pemalsuan dokumen historis (1977)",
        "Melibatkan notaris dan pejabat gubernur",
        "Sengketa kepemilikan lahan dan bangunan",
        "Kompleksitas hukum administrasi"
      ],
      solusi: [
        "Analisis forensik dokumen",
        "Koordinasi dengan pihak kepolisian",
        "Penelusuran sejarah kepemilikan",
        "Pendekatan multi-disiplin hukum"
      ]
    },
    {
      id: 5,
      judul: "Pengelapan Tagihan Perusahaan di Jakarta Utara",
      kategori: "Hukum Pidana",
      klien: "PT. Mitrajasa Joga Sarana",
      tahun: "2023-2024",
      durasi: "12 bulan",
      nilaiSengketa: "Pengelapan Tagihan",
      status: "Dalam Penyelidikan",
      nomorPerkara: "LP/B/232/III/2023/SPKT/POLRES METRO JAKUT",
      deskripsi: "Menangani kasus dugaan pengelapan tagihan perusahaan ekspor-impor container oleh mantan karyawan. Kasus bermula dari file yang dihapus dan ditemukannya tagihan palsu mengatasnamakan perusahaan.",
      hasil: [
        "Berhasil mengumpulkan bukti digital dan dokumen",
        "4 saksi telah diperiksa oleh penyidik",
        "Dokumen legalitas perusahaan terlengkapi",
        "Bukti tagihan palsu dan mutasi rekening terkumpul"
      ],
      tantangan: [
        "Penghapusan file digital oleh pelaku",
        "Tagihan palsu mengatasnamakan perusahaan",
        "Melibatkan transaksi ekspor-impor",
        "Kerugian finansial dan reputasi"
      ],
      solusi: [
        "Investigasi forensik digital",
        "Koordinasi dengan pihak bank",
        "Pengumpulan bukti transaksi",
        "Analisis pola pengelapan"
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
      nilai: "IDR 2M+",
      label: "Total Nilai Kasus",
      deskripsi: "Yang berhasil diselesaikan"
    },
    {
      icon: <Users className="h-8 w-8 text-gold-500" />,
      nilai: "200+",
      label: "Klien Puas",
      deskripsi: "Perusahaan dan individu"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-gold-500" />,
      nilai: "300+",
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
              Kasus-kasus signifikan yang berhasil kami tangani dengan pendekatan hukum yang komprehensif
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
                          variant={
                            kasus.status === 'Mediasi Berhasil' || 
                            kasus.status === 'Banding Disetujui' || 
                            kasus.status === 'Berhasil' ? 'default' : 'secondary'
                          }
                          className={
                            kasus.status === 'Mediasi Berhasil' || 
                            kasus.status === 'Banding Disetujui' || 
                            kasus.status === 'Berhasil' ? 'bg-green-500 hover:bg-green-600' : 
                            kasus.status === 'Dalam Proses' || 
                            kasus.status === 'Dalam Penyelidikan' ? 'bg-blue-500 hover:bg-blue-600' : ''
                          }
                        >
                          {kasus.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{kasus.judul}</h3>
                      <p className="text-muted-foreground mb-6">{kasus.deskripsi}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{kasus.tahun}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{kasus.durasi}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Scale className="h-4 w-4 text-muted-foreground" />
                          <span>{kasus.nilaiSengketa}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{kasus.nomorPerkara}</span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <strong>Klien:</strong> {kasus.klien}
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
                              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
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
          <Link to="/kontak">
            <Button 
              size="lg" 
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3"
            >
              Konsultasi Kasus Anda
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default StudiKasus;
