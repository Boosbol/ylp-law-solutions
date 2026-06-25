import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_MESSAGE_LENGTH = 2000;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => null);
    const message = body?.message;
    if (typeof message !== "string" || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `message exceeds ${MAX_MESSAGE_LENGTH} chars` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) throw new Error("Gemini API key not configured");

    const websiteContext = `YASMINE LISASIH LAW OFFICE & PARTNERS - Indonesian law firm. Services: criminal, civil, business, family, land, tax law, mediation. Offices: Lippo Cikarang & Jakarta Barat. Founded 17 Aug 2023.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Anda asisten AI untuk Yasmine Lisasih Law Office. Jawab dalam Bahasa Indonesia, profesional, dan ringkas. Hanya informasi umum, bukan nasihat hukum spesifik. KONTEKS: ${websiteContext}\n\nPertanyaan: ${message}`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to get AI response");

    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
