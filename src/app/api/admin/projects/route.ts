import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDemoProjects, updateDemoProject } from "@/lib/demoDb";

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

  let projects: any[] = [];
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    try {
      const { data, error } = await supabaseAdmin
        .from("projects")
        .select(`
          id, title, status, progress, phase, start_date, estimated_delivery, budget, client_id, team
        `)
        .order("created_at", { ascending: false });
        
      if (!error && data) {
        // Here we should Ideally join with client_profiles to get the client name.
        // For simplicity, we just fetch client profiles and map it.
        const { data: clients } = await supabaseAdmin.from("client_profiles").select("id, full_name");
        const clientMap = (clients || []).reduce((acc: any, c: any) => ({ ...acc, [c.id]: c.full_name }), {});
        
        projects = data.map(p => ({
          ...p,
          client: clientMap[p.client_id] || "Unknown Client"
        }));
      }
    } catch (err) {}
  }

  // Combine with demo projects if they exist
  const demoProjects = getDemoProjects();
  const existingIds = new Set(projects.map((p: any) => p.id));
  const uniqueDemoProjects = demoProjects.filter((p: any) => !existingIds.has(p.id));
  
  projects = [...projects, ...uniqueDemoProjects];

  return NextResponse.json({ projects });
}
