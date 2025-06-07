import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "PT. Vinmix Multi Perkasa",
      position: "Perusahaan Konstruksi",
      content: "Yasmine Lisasih Law Office berhasil menyelesaikan kasus wanprestasi kami senilai 326 juta melalui mediasi. Pendekatan profesional dan solusi win-win yang mereka tawarkan sangat memuaskan.",
      rating: 5,
      case: "Kasus Wanprestasi - 2024"
    },
    {
      id: 2,
      name: "Ir. Djoko Prijo Utomo",
      position: "Individu",
      content: "Dalam kasus travel haji ilegal, tim YLP memberikan pendampingan hukum yang sangat komprehensif. Mereka memahami betul regulasi Kemenag dan strategi pembuktian yang sistematis.",
      rating: 5,
      case: "Perbuatan Melawan Hukum - 2024"
    },
    {
      id: 3,
      name: "PT. Mitrajasa Joga Sarana",
      position: "Perusahaan Ekspor-Impor",
      content: "Kasus pengelapan tagihan yang kompleks ditangani dengan investigasi forensik digital yang sangat teliti. Tim YLP bekerja dengan detail dan profesional.",
      rating: 5,
      case: "Dugaan Pengelapan - 2023-2024"
    },
    {
      id: 4,
      name: "Keluarga Korban",
      position: "Bekerjasama dengan Hotman 911",
      content: "Dalam kasus pembunuhan yang sangat sensitif, YLP memberikan dukungan hukum dan psikologis yang luar biasa. Proses banding berhasil mengurangi vonis dari 15 menjadi 13 tahun.",
      rating: 5,
      case: "Kasus Pembunuhan - 2024"
    }
  ];

  const stats = [
    { number: "98%", label: "Tingkat Kepuasan Klien" },
    { number: "300+", label: "Kasus Berhasil Diselesaikan" },
    { number: "10+", label: "Tahun Pengalaman" },
    { number: "200+", label: "Klien Puas" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Testimoni Klien
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kepercayaan klien adalah prioritas utama kami. Lihat apa yang mereka katakan tentang layanan hukum kami.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-500 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300 bg-white border-l-4 border-l-gold-500">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-gold-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                    
                    <div>
                      <div className="font-semibold text-primary mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {testimonial.position}
                      </div>
                      <div className="text-xs bg-gold-100 text-gold-700 px-3 py-1 rounded-full inline-block">
                        {testimonial.case}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Bergabunglah dengan klien-klien yang puas dengan layanan kami
          </p>
          <Button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 text-lg">
            Konsultasi Gratis Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
