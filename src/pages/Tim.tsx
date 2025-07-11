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
    nama: "Dr. Hotman Paris S.H, M.H",
    posisi: "Advisor",
    spesialisasi: ["Hukum Kepailitan", "Hukum Perdata", "Hukum Bisnis"],
    pengalaman: "35+ tahun",
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
    spesialisasi: ["Hukum Bisnis", "Hukum Perdata", "Hukum Pidana"],
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
    photo: "/lovable-uploads/7dd03baf-4fa3-463b-ab44-fdaa1d8c2159.png"
  };

  const partners = [
    {
      nama: "Phiong Arifin S.H.",
      posisi: "Partner",
      spesialisasi: ["Hukum Korporat", "Hukum Bisnis", "Merger & Akuisisi"],
      pengalaman: "20+ tahun",
      lokasi: "Jakarta",
      photo: "/lovable-uploads/9aaad565-3cd1-49df-b92d-7130a4d56bd5.png"
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
    ],
    photo: "/lovable-uploads/b099367d-775b-46a0-b916-0fbc9a74fd46.png"
  };

  const associates = [
    {
      nama: "Dhea Arum Saskia S.H., M.H",
      posisi: "Associate in Criminal Law",
      spesialisasi: ["Hukum Pidana", "Perlindungan Saksi", "Hukum Acara Pidana"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta",
      photo: "/lovable-uploads/36eb6974-f30d-45cf-8b4c-02ad45f7881a.png"
    },
    {
      nama: "Indra Sihombing S.H., M.H.",
      posisi: "Associate in Criminal Law", 
      spesialisasi: ["Hukum Pidana", "Hukum Pidana Khusus", "Advokasi"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta",
      photo: "/lovable-uploads/d5a3f60d-254d-429f-9acc-49b2a851daa8.png"
    },
    {
      nama: "Edina Giawa S.H.",
      posisi: "Associate in Private Law",
      spesialisasi: ["Hukum Perdata", "Hukum Keluarga", "Hukum Waris"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta",
      photo: "/lovable-uploads/9447345a-f43f-4a66-8b8f-21dc5d19f7b2.png"
    },
    {
      nama: "Lina Kristie S.H.",
      posisi: "Associate in Land Law",
      spesialisasi: ["Hukum Pertanahan", "Sertifikat Tanah", "Hukum Properti"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta",
      photo: "/lovable-uploads/c1308c04-2c48-4fad-8b68-ac3d5d273eac.png"
    },
    {
      nama: "Widjayati S.H., S.Ak",
      posisi: "Associate in Tax Law",
      spesialisasi: ["Hukum Pajak", "Perencanaan Pajak", "Sengketa Pajak"],
      pengalaman: "10+ tahun",
      lokasi: "Jakarta",
      photo: "/lovable-uploads/9ef8ee53-59c7-4216-a6d8-341e22c48679.png"
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
                          <AvatarImage src={partner.photo} alt={partner.nama} />
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
                      <AvatarImage src={seniorAssociate.photo} alt={seniorAssociate.nama} />
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
                {associates.map((associate, index) => {
                  let photoSrc = "/placeholder.svg";
                  
                  // Use the photo property if it exists
                  if (associate.photo) {
                    photoSrc = associate.photo;
                  }
                  
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-20 w-20 mb-3">
                            <AvatarImage src={photoSrc} alt={associate.nama} />
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tim;
