
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, 
  Award,
  GraduationCap,
  Briefcase,
  Users,
  ArrowDown
} from 'lucide-react';

const Tim = () => {
  const advisor = {
    nama: "Dr. Hotman Paris S.H, M.Hum",
    posisi: "Advisor",
    spesialisasi: ["Hukum Pidana", "Hukum Perdata", "Hukum Korporat"],
    pengalaman: "25+ tahun",
    pendidikan: [
      "S1 Hukum - Universitas Indonesia",
      "S2 Hukum - Universitas Gadjah Mada", 
      "S3 Hukum - Universitas Indonesia"
    ],
    prestasi: [
      "Pengacara Kondang Indonesia",
      "Hotman Paris Show Host",
      "Praktisi Hukum Senior"
    ],
    photo: "/lovable-uploads/5c42685f-3725-453d-bb8a-cbc5a8049597.png"
  };

  const managingPartner = {
    nama: "Nin Yasmine Lisasih S.H, M.H",
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
    photo: "/lovable-uploads/5cdca76e-df6d-4525-857e-120585253a25.png"
  };

  const partners = [
    {
      nama: "Phiong Arifin S.H.",
      posisi: "Partner",
      spesialisasi: ["Hukum Korporat", "Hukum Bisnis", "Merger & Akuisisi"],
      pengalaman: "20+ tahun",
      lokasi: "Jakarta"
    }
  ];

  const seniorAssociate = {
    nama: "Ahlluddin Saiful Ahmad S.H., M.H.",
    posisi: "Senior Associate",
    spesialisasi: ["Hukum Korporat", "Hukum Bisnis", "Compliance"],
    pengalaman: "10+ tahun",
    pendidikan: [
      "S1 Hukum - Universitas Padjadjaran",
      "S2 Hukum Bisnis - Universitas Indonesia"
    ],
    prestasi: [
      "Corporate Law Specialist",
      "Business Compliance Expert",
      "Legal Consultant"
    ]
  };

  const associates = [
    {
      nama: "Dhea Arum Saskia S.H., M.H",
      posisi: "Associate in Criminal Law",
      spesialisasi: ["Hukum Pidana", "Perlindungan Saksi", "Hukum Acara Pidana"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta"
    },
    {
      nama: "Indra Sihombing S.H., M.H.",
      posisi: "Associate in Criminal Law", 
      spesialisasi: ["Hukum Pidana", "Hukum Pidana Khusus", "Advokasi"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta"
    },
    {
      nama: "Edina Giawa S.H.",
      posisi: "Associate in Private Law",
      spesialisasi: ["Hukum Perdata", "Hukum Keluarga", "Hukum Waris"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta"
    },
    {
      nama: "Berry Suswanto S.H",
      posisi: "Associate in Private Law",
      spesialisasi: ["Hukum Perdata", "Hukum Kontrak", "Hukum Properti"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta"
    },
    {
      nama: "Lina Kristie S.H.",
      posisi: "Associate in Land Law",
      spesialisasi: ["Hukum Pertanahan", "Sertifikat Tanah", "Hukum Properti"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta"
    },
    {
      nama: "Widjayati S.H., S.Ak",
      posisi: "Associate in Tax Law",
      spesialisasi: ["Hukum Pajak", "Perencanaan Pajak", "Sengketa Pajak"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Struktur Organisasi
            </h1>
            <p className="text-xl text-gray-200">
              Hierarki kepemimpinan dan tim profesional firma hukum kami
            </p>
          </div>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Advisor */}
            <div className="text-center mb-8">
              <Card className="inline-block hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={advisor.photo} alt={advisor.nama} />
                      <AvatarFallback className="text-2xl">HP</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold mb-2">{advisor.nama}</h3>
                    <p className="text-gold-600 font-semibold mb-4 text-lg">{advisor.posisi}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{advisor.pengalaman} pengalaman</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {advisor.spesialisasi.map((spec, specIndex) => (
                          <Badge key={specIndex} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mb-8">
              <ArrowDown className="h-8 w-8 text-primary" />
            </div>

            {/* Managing Partner */}
            <div className="text-center mb-8">
              <Card className="inline-block hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={managingPartner.photo} alt={managingPartner.nama} />
                      <AvatarFallback className="text-2xl">NY</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold mb-2">{managingPartner.nama}</h3>
                    <p className="text-gold-600 font-semibold mb-4 text-lg">{managingPartner.posisi}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{managingPartner.pengalaman} pengalaman</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {managingPartner.spesialisasi.map((spec, specIndex) => (
                          <Badge key={specIndex} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mb-8">
              <ArrowDown className="h-8 w-8 text-primary" />
            </div>

            {/* Partners */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-6">Partners</h2>
              <div className="flex justify-center">
                {partners.map((partner, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-28 w-28 mb-4">
                          <AvatarImage src="/lovable-uploads/776115f4-f18f-477b-b306-32aacaf5ec9f.png" alt={partner.nama} />
                          <AvatarFallback className="text-lg">PA</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold mb-2">{partner.nama}</h3>
                        <p className="text-gold-600 font-semibold mb-4">{partner.posisi}</p>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{partner.pengalaman} pengalaman</span>
                          </div>
                          <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{partner.lokasi}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {partner.spesialisasi.map((spec, specIndex) => (
                              <Badge key={specIndex} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <ArrowDown className="h-8 w-8 text-primary" />
            </div>

            {/* Senior Associate */}
            <div className="text-center mb-8">
              <Card className="inline-block hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-28 w-28 mb-4">
                      <AvatarImage src="/placeholder.svg" alt={seniorAssociate.nama} />
                      <AvatarFallback className="text-lg">AS</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-2">{seniorAssociate.nama}</h3>
                    <p className="text-gold-600 font-semibold mb-4">{seniorAssociate.posisi}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{seniorAssociate.pengalaman} pengalaman</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {seniorAssociate.spesialisasi.map((spec, specIndex) => (
                          <Badge key={specIndex} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mb-8">
              <ArrowDown className="h-8 w-8 text-primary" />
            </div>

            {/* Associates */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-8">Associates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {associates.map((associate, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 mb-3">
                          <AvatarImage 
                            src={associate.nama === "Widjayati S.H., S.Ak" ? "/lovable-uploads/776115f4-f18f-477b-b306-32aacaf5ec9f.png" : "/placeholder.svg"} 
                            alt={associate.nama} 
                          />
                          <AvatarFallback className="text-sm">
                            {associate.nama.split(' ').slice(0, 2).map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="text-lg font-semibold mb-2">{associate.nama}</h4>
                        <p className="text-gold-600 font-medium mb-3 text-sm">{associate.posisi}</p>
                        <div className="mb-3">
                          <span className="text-sm text-muted-foreground">{associate.pengalaman} pengalaman</span>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{associate.lokasi}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {associate.spesialisasi.map((spec, specIndex) => (
                            <Badge key={specIndex} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tim;
