
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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Anda adalah asisten AI untuk Yasmine Lisasih Law Office & Partners, firma hukum terpercaya di Indonesia. 
            
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
            
            Jika ada pertanyaan yang memerlukan konsultasi mendalam, sarankan untuk menghubungi firma secara langsung.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    const aiMessage = data.choices[0].message.content;

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
