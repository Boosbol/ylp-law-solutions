import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Gavel, CheckCircle, AlertTriangle, Lightbulb, User, Clock } from 'lucide-react';
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
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
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

      if (error) {
        console.error('Error fetching case studies:', error);
        return;
      }

      // Transform the data to match our interface with proper type conversion
      const transformedData: CaseStudy[] = data?.map(item => ({
        ...item,
        results: Array.isArray(item.results) ? item.results.map(String) : [],
        challenges: Array.isArray(item.challenges) ? item.challenges.map(String) : [],
        solutions: Array.isArray(item.solutions) ? item.solutions.map(String) : []
      })) || [];
      
      setCaseStudies(transformedData);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes('berhasil') || status.toLowerCase().includes('disetujui')) {
      return 'bg-green-100 text-green-800';
    }
    if (status.toLowerCase().includes('mediasi')) {
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    if (category.toLowerCase().includes('pidana')) {
      return 'bg-red-100 text-red-800';
    }
    if (category.toLowerCase().includes('perdata')) {
      return 'bg-orange-100 text-orange-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat studi kasus...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div 
        className="bg-gradient-to-r from-primary to-primary/80 text-white py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/lovable-uploads/17e97f92-90c7-4001-b754-945f35b72d2d.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Studi Kasus</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Pengalaman nyata dalam menangani berbagai kasus hukum dengan hasil yang memuaskan
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          {caseStudies.map((caseStudy) => (
            <Card key={caseStudy.id} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              {/* Header with badges */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={`${getCategoryColor(caseStudy.category)} border-0`}>
                    {caseStudy.category}
                  </Badge>
                  <Badge className={`${getStatusColor(caseStudy.status)} border-0`}>
                    {caseStudy.status}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{caseStudy.title}</h2>
                <p className="text-gray-700 leading-relaxed">{caseStudy.description}</p>
              </div>

              <CardContent className="p-6">
                {/* Case details in a clean layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{caseStudy.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{caseStudy.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Gavel className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{caseStudy.case_number}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-600">Klien: </span>
                        <span className="text-sm font-medium text-gray-900">{caseStudy.client}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Results, Challenges, Solutions in a three-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Results */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-700">Hasil Dicapai</h3>
                    </div>
                    <ul className="space-y-3">
                      {caseStudy.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 leading-relaxed">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <h3 className="text-lg font-semibold text-amber-700">Tantangan</h3>
                    </div>
                    <ul className="space-y-3">
                      {caseStudy.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 leading-relaxed">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-700">Solusi</h3>
                    </div>
                    <ul className="space-y-3">
                      {caseStudy.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 leading-relaxed">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {caseStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Belum ada studi kasus yang tersedia.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudiKasus;
