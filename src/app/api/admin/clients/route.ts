import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDemoRequests } from "@/lib/demoDb";

export const dynamic = "force-dynamic";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function GET(req: NextRequest) {
  const adminSession = req.cookies.get("admin_session");
  if (!adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let clients = [];
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    try {
      const { data, error } = await supabaseAdmin
        .from("client_profiles")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (!error && data) {
        // Here we should Ideally join with projects to get project_count.
        // For simplicity, we just fetch projects and group.
        const { data: projects } = await supabaseAdmin.from("projects").select("client_id");
        const countMap = (projects || []).reduce((acc: any, p: any) => {
           acc[p.client_id] = (acc[p.client_id] || 0) + 1;
           return acc;
        }, {});
        
        clients = data.map(c => ({
          ...c,
          project_count: countMap[c.id] || 0
        }));
      }
    } catch (err) {}
  }

  // Combine with demo clients from demo requests if they exist
  // We can treat approved demo requests as clients
  const demoRequests = getDemoRequests();
  const existingEmails = new Set(clients.map((c: any) => c.email));
  const uniqueDemoClients = demoRequests
    .filter((r: any) => r.status === "approved" || r.status === "active") // We updated it to active in projects but it's "approved" in requests
    .filter((r: any) => !existingEmails.has(r.email))
    .map((r: any) => ({
       id: r.client_id || r.id,
       full_name: r.full_name || r.client_name,
       email: r.email || r.client_email,
       phone: r.phone || null,
       company: r.company || null,
       role: "active_client",
       created_at: r.created_at,
       project_count: 1
    }));
  
  // also add all pending or other users from demoRequests as "normal_user"
  const pendingDemoUsers = demoRequests
    .filter((r: any) => r.status !== "approved" && r.status !== "active")
    .filter((r: any) => !existingEmails.has(r.email) && !uniqueDemoClients.find(uc => uc.email === r.email))
    .map((r: any) => ({
       id: r.user_id || r.id,
       full_name: r.full_name,
       email: r.email,
       phone: r.phone || null,
       company: r.company || null,
       role: "normal_user",
       created_at: r.created_at,
       project_count: 0
    }));

  clients = [...clients, ...uniqueDemoClients, ...pendingDemoUsers];

  return NextResponse.json({ clients });
}
