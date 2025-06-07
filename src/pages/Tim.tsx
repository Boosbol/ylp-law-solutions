
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Award,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const Tim = () => {
  const timUtama = [
    {
      nama: "Yasmine Lisasih, S.H., M.H.",
      posisi: "Managing Partner",
      spesialisasi: ["Hukum Pidana", "Hukum Perdata", "Mediasi"],
      pengalaman: "15+ tahun",
      pendidikan: [
        "S1 Hukum - Universitas Indonesia",
        "S2 Hukum Bisnis - Universitas Gadjah Mada"
      ],
      prestasi: [
        "Advokat Terbaik Kategori Hukum Pidana 2022",
        "Certified Mediator - BANI",
        "Member Indonesian Bar Association"
      ],
      email: "yasmine@ylp-law.com",
      phone: "+62 21 1234 5678",
      foto: "/api/placeholder/300/400"
    },
    {
      nama: "Dr. Ahmad Hotman, S.H., M.H.",
      posisi: "Senior Partner (Hotman 911 Collaboration)",
      spesialisasi: ["Hukum Korporat", "Merger & Akuisisi", "Compliance"],
      pengalaman: "20+ tahun",
      pendidikan: [
        "S1 Hukum - Universitas Padjadjaran",
        "S2 Corporate Law - Harvard Law School",
        "S3 Hukum Bisnis - Universitas Indonesia"
      ],
      prestasi: [
        "Top Corporate Lawyer Indonesia 2023",
        "International Arbitrator - ICC",
        "Author: 'Corporate Law in Indonesia'"
      ],
      email: "ahmad.hotman@ylp-law.com",
      phone: "+62 21 8765 4321",
      foto: "/api/placeholder/300/400"
    }
  ];

  const timAhli = [
    {
      nama: "Sarah Dewi, S.H.",
      posisi: "Senior Associate",
      spesialisasi: ["Hukum Ketenagakerjaan", "Hukum Properti"],
      pengalaman: "8 tahun",
      lokasi: "Jakarta Barat"
    },
    {
      nama: "Budi Santoso, S.H., M.Kn.",
      posisi: "Associate",
      spesialisasi: ["Hukum Pidana", "Perlindungan Konsumen"],
      pengalaman: "5 tahun",
      lokasi: "Lippo Cikarang"
    },
    {
      nama: "Maya Sari, S.H.",
      posisi: "Junior Associate",
      spesialisasi: ["Hukum Keluarga", "Hukum Waris"],
      pengalaman: "3 tahun",
      lokasi: "Jakarta Barat"
    },
    {
      nama: "Rizki Pratama, S.H.",
      posisi: "Legal Consultant",
      spesialisasi: ["Hukum Teknologi", "Intellectual Property"],
      pengalaman: "4 tahun",
      lokasi: "Lippo Cikarang"
    }
  ];

  const teamSupport = [
    {
      nama: "Linda Sari",
      posisi: "Office Manager",
      tugas: "Koordinasi operasional kantor dan manajemen jadwal"
    },
    {
      nama: "Andi Wijaya",
      posisi: "Legal Researcher",
      tugas: "Riset hukum dan penyusunan legal memorandum"
    },
    {
      nama: "Sinta Dewi",
      posisi: "Document Controller",
      tugas: "Manajemen dokumen dan administrasi legal"
    },
    {
      nama: "Farid Rahman",
      posisi: "IT Support",
      tugas: "Dukungan teknologi dan sistem digital"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tim Profesional Kami
            </h1>
            <p className="text-xl text-gray-200">
              Bertemu dengan para ahli hukum berpengalaman yang siap memberikan solusi terbaik
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Partners</h2>
            <p className="text-xl text-muted-foreground">
              Pemimpin firma dengan pengalaman dan keahlian yang tidak diragukan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {timUtama.map((partner, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="bg-gray-200 rounded-lg h-48 w-full flex items-center justify-center">
                        <span className="text-gray-500">Photo</span>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-2">{partner.nama}</h3>
                      <p className="text-gold-600 font-semibold mb-4">{partner.posisi}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{partner.pengalaman} pengalaman</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {partner.spesialisasi.map((spec, specIndex) => (
                            <Badge key={specIndex} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Pendidikan
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {partner.pendidikan.map((edu, eduIndex) => (
                            <li key={eduIndex}>• {edu}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          Prestasi
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {partner.prestasi.map((prestasi, prestasiIndex) => (
                            <li key={prestasiIndex}>• {prestasi}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{partner.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{partner.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Associates Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tim Associates</h2>
            <p className="text-xl text-muted-foreground">
              Para ahli hukum berpengalaman yang mendukung layanan firma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timAhli.map((tim, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-gray-200 rounded-full h-24 w-24 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Photo</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{tim.nama}</h3>
                  <p className="text-gold-600 font-medium mb-3">{tim.posisi}</p>
                  <div className="mb-3">
                    <span className="text-sm text-muted-foreground">{tim.pengalaman} pengalaman</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{tim.lokasi}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {tim.spesialisasi.map((spec, specIndex) => (
                      <Badge key={specIndex} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tim Support</h2>
            <p className="text-xl text-muted-foreground">
              Tim pendukung yang memastikan kelancaran operasional firma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamSupport.map((support, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-gold-100 rounded-full h-16 w-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gold-600 text-xs font-semibold">
                      {support.nama.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{support.nama}</h3>
                  <p className="text-gold-600 font-medium mb-3">{support.posisi}</p>
                  <p className="text-sm text-muted-foreground">{support.tugas}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tim;
