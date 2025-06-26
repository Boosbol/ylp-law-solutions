
import { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  dispute_value: string;
  status: string;
  case_number: string;
  description: string;
  results: string[];
  challenges: string[];
  solutions: string[];
  created_at: string;
}

const StudiKasus = () => {
  const [studiKasus, setStudiKasus] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudiKasus(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Memuat studi kasus...</p>
          </div>
        </div>
      </Layout>
    );
  }

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

          {studiKasus.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Studi Kasus</h3>
              <p className="text-gray-500">Studi kasus akan ditampilkan di sini setelah ditambahkan oleh admin.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {studiKasus.map((kasus, index) => (
                <Card key={kasus.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Info */}
                      <div className="lg:col-span-2">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <Badge variant="default" className="bg-gold-500 hover:bg-gold-600">
                            {kasus.category}
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
                        
                        <h3 className="text-2xl font-bold mb-4">{kasus.title}</h3>
                        <p className="text-muted-foreground mb-6">{kasus.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{kasus.year}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{kasus.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Scale className="h-4 w-4 text-muted-foreground" />
                            <span>{kasus.dispute_value}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs">{kasus.case_number}</span>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <strong>Klien:</strong> {kasus.client}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-green-600">Hasil Dicapai</h4>
                          <ul className="space-y-2">
                            {kasus.results.map((hasil, hasilIndex) => (
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
                            {kasus.challenges.map((tantangan, tantanganIndex) => (
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
                            {kasus.solutions.map((solusi, solusiIndex) => (
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
          )}
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
