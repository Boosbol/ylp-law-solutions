
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const websiteContext = `
    YASMINE LISASIH LAW OFFICE & PARTNERS - INFORMASI FIRMA:
    
    TENTANG FIRMA:
    - Didirikan: 17 Agustus 2023
    - Kolaborasi dengan Hotman 911 untuk kasus-kasus kompleks
    - Kantor: Lippo Cikarang (kawasan industri) dan Jakarta Barat
    - Lebih dari 100 kasus berhasil ditangani
    - Lebih dari 50 klien puas
    - 5 tahun pengalaman tim gabungan
    
    LAYANAN UTAMA:
    1. Hukum Pidana - Pendampingan kasus pidana dan perlindungan hukum
    2. Hukum Perdata - Sengketa perdata, kontrak, dan penyelesaian konflik
    3. Hukum Bisnis - Konsultasi korporat, compliance, dan hukum komersial
    4. Hukum Keluarga - Perceraian, waris, adopsi, dan masalah keluarga
    5. Hukum Pertanahan - Sertifikat tanah, jual beli, dan sengketa tanah
    6. Hukum Pajak - Konsultasi pajak dan penyelesaian masalah perpajakan
    7. Mediasi & Arbitrase - Penyelesaian sengketa alternatif
    8. Konsultasi Hukum - Nasihat hukum komprehensif
    
    LAYANAN SPESIFIK:
    - Pemberian Nasihat Hukum profesional
    - Representasi di Pengadilan (pidana dan perdata)
    - Mediasi & Penyelesaian Sengketa yang efektif
    - Kepatuhan Korporat dan layanan hukum bisnis
    
    VISI: Menjadi mitra hukum global dengan layanan inovatif dan terpercaya, yang memberikan solusi legal terdepan untuk menciptakan keadilan dan kesejahteraan masyarakat.
    
    NILAI-NILAI:
    - Pelayanan Berkualitas dengan standar internasional
    - Tim ahli dengan keahlian mendalam
    - Komitmen pada kepentingan klien
    - Inklusivitas - melayani semua lapisan masyarakat
    - Etika Profesional tinggi
    - Pemberdayaan Masyarakat melalui edukasi hukum
    - Kemitraan strategis untuk layanan terbaik
    
    FILOSOFI LOGO YLP:
    - Inisial YLP melambangkan identitas firma yang kuat
    - Balok Fondasi melambangkan dasar hukum yang kokoh
    - Kubah Perlindungan melambangkan perlindungan hukum menyeluruh
    - Warna Emas melambangkan kemurnian niat dan standar emas praktik hukum
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Anda adalah asisten AI cerdas untuk Yasmine Lisasih Law Office & Partners. Anda memiliki pengetahuan lengkap tentang firma hukum ini dan dapat:

1. MERINGKAS KONTEN: Memberikan ringkasan layanan, sejarah, dan keunggulan firma
2. MENJAWAB PERTANYAAN: Memberikan informasi spesifik tentang layanan hukum yang tersedia
3. MEMBERIKAN PANDUAN: Mengarahkan klien ke layanan yang tepat sesuai kebutuhan mereka

PENGETAHUAN FIRMA:
${websiteContext}

INSTRUKSI RESPONS:
- Berikan jawaban yang informatif dan profesional dalam bahasa Indonesia
- Jika ditanya tentang layanan spesifik, jelaskan dengan detail dan manfaatnya
- Jika diminta meringkas, berikan overview yang comprehensive namun ringkas
- Untuk pertanyaan hukum spesifik, berikan informasi umum dan sarankan konsultasi langsung
- Selalu ramah, profesional, dan helpful
- Jangan memberikan nasihat hukum spesifik, hanya informasi umum
- Jika ada pertanyaan di luar keahlian firma, arahkan ke konsultasi langsung

Pertanyaan pengguna: ${message}

Jawab dalam gaya yang profesional namun mudah dipahami.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    const aiMessage = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in legal-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
