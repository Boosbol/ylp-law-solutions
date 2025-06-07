
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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Anda adalah asisten AI untuk Yasmine Lisasih Law Office & Partners, firma hukum terpercaya di Indonesia. 
            
Keahlian firma:
- Hukum Pidana
- Hukum Perdata
- Hukum Bisnis
- Hukum Keluarga
- Hukum Pertanahan
- Hukum Pajak
- Mediasi & Arbitrase
- Konsultasi Hukum

Instruksi:
1. Berikan informasi umum tentang hukum Indonesia
2. Jelaskan layanan yang tersedia di firma
3. Sarankan konsultasi langsung untuk kasus spesifik
4. Selalu profesional dan informatif
5. Jangan memberikan nasihat hukum spesifik
6. Gunakan bahasa Indonesia yang formal namun ramah

Jika ada pertanyaan yang memerlukan konsultasi mendalam, sarankan untuk menghubungi firma secara langsung.

Pertanyaan pengguna: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
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
