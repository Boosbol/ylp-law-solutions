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
                Didirikan pada 17 Agustus 2023, Yasmine Lisasih Law Office & Partners lahir dari visi untuk menyediakan layanan hukum berkualitas tinggi dengan pendekatan yang inovatif dan profesional.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Managing Partner dari YLP Law Office , Nin Yasmine Lisasih S.H., M.H. (biasa disapa Miss Yasmine), adalah seorang advokat (pengacara) profesional, akademisi hukum, dan wirausahawan asal Solo, Indonesia. Ia dikenal luas karena menjalankan peran ganda yang sukses sebagai praktisi hukum yang menangani berbagai kasus-kasus viral tingkat nasional sekaligus dosen di sejumlah universitas di Jakarta.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Yasmine tergabung dalam tim advokat Hotman 911 Official yang dipimpin oleh pengacara kondang Dr. Hotman Paris Hutapea, S.H., M.Hum.. Di sini, ia aktif membantu penanganan berbagai kasus kemanusiaan dan pencari keadilan. Awal mulai karier professionalnya dengan Dr. Hotman Paris Hutapea S.H., M.H. berawal dari menjadi asisten dosen Bp. Hotman Paris dari tahun 2013 di Universitas 17 Agustus 1945.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Sebagai akademisi dengan jabatan fungsional Lektor (Assistant Profesor), ia menjadi dosen tetap di Fakultas Hukum Universitas Esa Unggul. Selain itu, ia juga mengajar di Kwik Kian Gie School of Business, GS FAME Institute of Business, dan Universitas 17 Agustus 1945 (UTA45) Jakarta serta Universitas Mpu Tantular.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Latar belakang pendidikan Yasmine ialah S1 di Fakultas Hukum Universitas Negeri Sebelas maret Surakarta. Ia lulus dengan predikat cumlaude, IPK tertinggi lebih dari wisudawan, lulusan termuda se universitas (lulus pada usia 20 tahun) dan tergolong lulusan tercepat di angkatannya. Ia langsung melanjutkan studi S2 di Universitas Padjajaran  di program studi Magister Hukum Bisnis dengan ipk di atas 3,50.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Penghargaan yang pernah diraih antara lain:
              </p>
              <ul className="text-lg text-muted-foreground mb-6 list-disc list-inside space-y-2">
                <li>Pada tahun 2025 ia meraih Woman Empower Woman Award: Ia dianugerahi penghargaan sebagai &quot;Best Performance Woman in Law and Education&quot; atas kontribusi konsistennya di dunia hukum dan pendidikan. Penghargaan ini didukung oleh Kementerian Pemberdayaan Perempuan dan Perlindungan Anak (KemenPPPA).</li>
                <li>Pada tahun yang sama ia meraih Top 35 Dosen Hukum Terfavorit: Terpilih sebagai salah satu dari 35 dosen hukum terfavorit di Indonesia versi Hukumonline.</li>
                <li>Penerima Beasiswa Djarum: Ia juga berhasil menyelesaikan studi S1 dan S2 berkat dukungan penuh dari Djarum Beasiswa Plus.</li>
              </ul>
              <p className="text-lg text-muted-foreground">
                Berbekal pengalaman sebagai dosen, lawyer dan saksi ahli di puluhan perkara maka Yasmine mendirikan kantor hukumnya di tahun 2023. YLP Law Office  berkolaborasi dengan Hotman 911 untuk penanganan kasus-kasus kompleks, memberikan keunggulan dalam memberikan solusi hukum yang efektif dan strategis. Dengan kantor strategis di kawasan industri, kami melayani klien dari berbagai sektor dengan standar pelayanan internasional.
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
