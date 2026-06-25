import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  nama: string;
  email: string;
  telepon: string;
  perusahaan?: string;
  layanan: string;
  prioritas: string;
  pesan: string;
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validate(input: any): { ok: true; data: ContactEmailRequest } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Invalid body" };
  const fields = ["nama", "email", "telepon", "layanan", "prioritas", "pesan"] as const;
  for (const f of fields) {
    if (typeof input[f] !== "string" || input[f].trim().length === 0) {
      return { ok: false, error: `${f} is required` };
    }
  }
  if (input.nama.length > 120 || input.telepon.length > 40 || input.layanan.length > 120 || input.prioritas.length > 40) {
    return { ok: false, error: "Field too long" };
  }
  if (input.pesan.length > 5000) return { ok: false, error: "pesan exceeds 5000 chars" };
  if (input.perusahaan && (typeof input.perusahaan !== "string" || input.perusahaan.length > 200))
    return { ok: false, error: "perusahaan invalid" };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email) || input.email.length > 254)
    return { ok: false, error: "Invalid email" };
  return { ok: true, data: input as ContactEmailRequest };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const parsed = validate(await req.json().catch(() => null));
    if (!parsed.ok) {
      return new Response(JSON.stringify({ error: parsed.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { nama, email, telepon, perusahaan, layanan, prioritas, pesan } = parsed.data;

    await resend.emails.send({
      from: "Kontak Website <onboarding@resend.dev>",
      to: ["nin_yasmine@yahoo.co.id"],
      subject: `Pesan Baru dari Website - ${esc(layanan)} (${esc(prioritas)})`,
      html: `
        <h2>Pesan Baru dari Website</h2>
        <p><strong>Nama:</strong> ${esc(nama)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Telepon:</strong> ${esc(telepon)}</p>
        ${perusahaan ? `<p><strong>Perusahaan:</strong> ${esc(perusahaan)}</p>` : ""}
        <p><strong>Jenis Layanan:</strong> ${esc(layanan)}</p>
        <p><strong>Tingkat Urgensi:</strong> ${esc(prioritas)}</p>
        <p><strong>Pesan:</strong></p>
        <p>${esc(pesan).replace(/\n/g, "<br>")}</p>
      `,
    });

    await resend.emails.send({
      from: "Yasmine Lisasih Law Office <onboarding@resend.dev>",
      to: [email],
      subject: "Terima kasih atas pesan Anda - Yasmine Lisasih Law Office & Partners",
      html: `
        <h2>Terima kasih atas pesan Anda</h2>
        <p>Dear ${esc(nama)},</p>
        <p>Kami telah menerima pesan Anda dan akan segera menghubungi Anda kembali.</p>
        <p><strong>Jenis Layanan:</strong> ${esc(layanan)}</p>
        <p><strong>Tingkat Urgensi:</strong> ${esc(prioritas)}</p>
        <p>Untuk keadaan darurat: <strong>+62 821 3746 2729</strong></p>
        <p>Salam,<br>Tim Yasmine Lisasih Law Office & Partners</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Gagal mengirim email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
};

serve(handler);
