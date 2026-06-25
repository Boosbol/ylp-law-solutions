import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-setup-token",
};

interface BootstrapRequest {
  // map of email -> password to assign for the existing admin_users rows
  adminPasswords: Record<string, string>;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const setupToken = Deno.env.get("ADMIN_BOOTSTRAP_TOKEN");
    const provided = req.headers.get("x-setup-token");
    if (!setupToken || provided !== setupToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as BootstrapRequest;
    if (!body?.adminPasswords || typeof body.adminPasswords !== "object") {
      return new Response(JSON.stringify({ error: "Body must include adminPasswords map" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: admins, error: fetchErr } = await supabase
      .from("admin_users")
      .select("id, email, name, user_id");
    if (fetchErr) throw fetchErr;

    const results: Array<{ email: string; status: string; user_id?: string; error?: string }> = [];

    for (const admin of admins ?? []) {
      const password = body.adminPasswords[admin.email];
      if (!password || password.length < 8) {
        results.push({ email: admin.email, status: "skipped", error: "missing/short password" });
        continue;
      }
      try {
        let authUserId = admin.user_id as string | null;

        if (!authUserId) {
          const { data: created, error: createErr } = await supabase.auth.admin.createUser({
            email: admin.email,
            password,
            email_confirm: true,
            user_metadata: { name: admin.name },
          });
          if (createErr) {
            const { data: list } = await supabase.auth.admin.listUsers();
            const existing = list?.users.find(
              (u) => u.email?.toLowerCase() === admin.email.toLowerCase(),
            );
            if (existing) {
              authUserId = existing.id;
              await supabase.auth.admin.updateUserById(existing.id, { password });
            } else {
              throw createErr;
            }
          } else {
            authUserId = created.user!.id;
          }

          await supabase.from("admin_users").update({ user_id: authUserId }).eq("id", admin.id);
        } else {
          await supabase.auth.admin.updateUserById(authUserId, { password });
        }

        await supabase
          .from("user_roles")
          .upsert({ user_id: authUserId, role: "admin" }, { onConflict: "user_id,role" });

        results.push({ email: admin.email, status: "ok", user_id: authUserId });
      } catch (err) {
        results.push({ email: admin.email, status: "error", error: (err as Error).message });
      }
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
