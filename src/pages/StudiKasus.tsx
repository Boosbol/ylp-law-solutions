
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Gavel, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Studi Kasus</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Pengalaman nyata dalam menangani berbagai kasus hukum dengan hasil yang memuaskan
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8">
          {caseStudies.map((caseStudy) => (
            <Card key={caseStudy.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{caseStudy.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-sm">
                        {caseStudy.category}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {caseStudy.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Case Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Klien</p>
                      <p className="font-medium">{caseStudy.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Tahun</p>
                      <p className="font-medium">{caseStudy.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Durasi</p>
                      <p className="font-medium">{caseStudy.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gavel className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Nilai Sengketa</p>
                      <p className="font-medium">{caseStudy.dispute_value}</p>
                    </div>
                  </div>
                </div>

                {/* Case Number */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Nomor Perkara:</p>
                  <p className="text-blue-800 font-mono text-sm">{caseStudy.case_number}</p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ringkasan Kasus</h3>
                  <p className="text-gray-700 leading-relaxed">{caseStudy.description}</p>
                </div>

                <Separator />

                {/* Results, Challenges, Solutions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Results */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-700">Hasil Dicapai</h3>
                    </div>
                    <ul className="space-y-2">
                      {caseStudy.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <h3 className="text-lg font-semibold text-amber-700">Tantangan</h3>
                    </div>
                    <ul className="space-y-2">
                      {caseStudy.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-700">Solusi</h3>
                    </div>
                    <ul className="space-y-2">
                      {caseStudy.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{solution}</span>
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
