import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-bootstrap-token",
};

interface AdminInput {
  email: string;
  password: string;
  name?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const expected = Deno.env.get("ADMIN_BOOTSTRAP_TOKEN");
    if (!expected) {
      return new Response(
        JSON.stringify({ error: "ADMIN_BOOTSTRAP_TOKEN not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const provided =
      req.headers.get("x-bootstrap-token") ??
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

    if (provided !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const admins: AdminInput[] = Array.isArray(body?.admins) ? body.admins : [];
    if (admins.length === 0) {
      return new Response(JSON.stringify({ error: "No admins provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const results: Array<Record<string, unknown>> = [];

    for (const a of admins) {
      const entry: Record<string, unknown> = { email: a.email };
      try {
        // Try to find existing auth user by listing (paginate if needed)
        let authUserId: string | null = null;
        let page = 1;
        while (page < 20) {
          const { data, error } = await supabase.auth.admin.listUsers({
            page,
            perPage: 200,
          });
          if (error) throw error;
          const found = data.users.find(
            (u) => u.email?.toLowerCase() === a.email.toLowerCase(),
          );
          if (found) {
            authUserId = found.id;
            break;
          }
          if (data.users.length < 200) break;
          page++;
        }

        if (authUserId) {
          const { error: updErr } = await supabase.auth.admin.updateUserById(
            authUserId,
            { password: a.password, email_confirm: true },
          );
          if (updErr) throw updErr;
          entry.auth = "updated";
        } else {
          const { data: created, error: createErr } =
            await supabase.auth.admin.createUser({
              email: a.email,
              password: a.password,
              email_confirm: true,
            });
          if (createErr) throw createErr;
          authUserId = created.user!.id;
          entry.auth = "created";
        }

        // Ensure admin role in user_roles
        const { error: roleErr } = await supabase
          .from("user_roles")
          .upsert(
            { user_id: authUserId, role: "admin" },
            { onConflict: "user_id,role" },
          );
        if (roleErr) throw roleErr;
        entry.role = "admin";

        // Link admin_users row (by email) to auth user
        const { data: existingAdmin } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", a.email)
          .maybeSingle();

        if (existingAdmin) {
          const { error: linkErr } = await supabase
            .from("admin_users")
            .update({ user_id: authUserId, ...(a.name ? { name: a.name } : {}) })
            .eq("id", existingAdmin.id);
          if (linkErr) throw linkErr;
          entry.admin_users = "linked";
        } else {
          const { error: insErr } = await supabase
            .from("admin_users")
            .insert({
              email: a.email,
              name: a.name ?? a.email,
              user_id: authUserId,
            });
          if (insErr) throw insErr;
          entry.admin_users = "inserted";
        }

        entry.user_id = authUserId;
        entry.ok = true;
      } catch (e) {
        entry.ok = false;
        entry.error = (e as Error).message;
      }
      results.push(entry);
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
