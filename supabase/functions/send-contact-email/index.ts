
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nama, email, telepon, perusahaan, layanan, prioritas, pesan }: ContactEmailRequest = await req.json();

    console.log("Sending contact email for:", { nama, email, layanan });

    // Send email to law office
    const emailResponse = await resend.emails.send({
      from: "Kontak Website <onboarding@resend.dev>",
      to: ["nin_yasmine@yahoo.co.id"],
      subject: `Pesan Baru dari Website - ${layanan} (${prioritas})`,
      html: `
        <h2>Pesan Baru dari Website</h2>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telepon:</strong> ${telepon}</p>
        ${perusahaan ? `<p><strong>Perusahaan:</strong> ${perusahaan}</p>` : ''}
        <p><strong>Jenis Layanan:</strong> ${layanan}</p>
        <p><strong>Tingkat Urgensi:</strong> ${prioritas}</p>
        <p><strong>Pesan:</strong></p>
        <p>${pesan.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><em>Pesan ini dikirim dari formulir kontak website Yasmine Lisasih Law Office & Partners</em></p>
      `,
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: "Yasmine Lisasih Law Office <onboarding@resend.dev>",
      to: [email],
      subject: "Terima kasih atas pesan Anda - Yasmine Lisasih Law Office & Partners",
      html: `
        <h2>Terima kasih atas pesan Anda</h2>
        <p>Dear ${nama},</p>
        <p>Kami telah menerima pesan Anda dan akan segera menghubungi Anda kembali.</p>
        
        <p><strong>Detail pesan Anda:</strong></p>
        <p><strong>Jenis Layanan:</strong> ${layanan}</p>
        <p><strong>Tingkat Urgensi:</strong> ${prioritas}</p>
        
        <p>Tim kami akan menghubungi Anda dalam waktu:</p>
        <ul>
          <li>Darurat: dalam 2 jam</li>
          <li>Tinggi: dalam 6 jam</li>
          <li>Normal: dalam 24 jam</li>
          <li>Rendah: dalam 2-3 hari</li>
        </ul>
        
        <p>Untuk keadaan darurat, Anda juga dapat menghubungi kami di:</p>
        <p><strong>Kontak Darurat:</strong> +62 821 3746 2729</p>
        
        <p>Salam,<br>
        Tim Yasmine Lisasih Law Office & Partners</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, message: "Email berhasil dikirim" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Gagal mengirim email", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
