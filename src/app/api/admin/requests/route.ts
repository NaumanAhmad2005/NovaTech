import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDemoRequests, updateDemoRequest } from "@/lib/demoDb";

export const dynamic = "force-dynamic";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// GET — list all project requests
export async function GET(req: NextRequest) {
  const adminSession = req.cookies.get("admin_session");
  if (!adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requests = [];
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    try {
      const { data, error } = await supabaseAdmin
        .from("project_requests")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (!error && data) {
        requests = data;
      }
    } catch (err) {}
  }

  // Combine with demo requests if they exist
  const demoRequests = getDemoRequests();
  // Filter out duplicates just in case
  const existingIds = new Set(requests.map(r => r.id));
  const uniqueDemoRequests = demoRequests.filter(r => !existingIds.has(r.id));
  
  requests = [...requests, ...uniqueDemoRequests].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return NextResponse.json({ requests });
}

// POST — approve or reject a request
export async function POST(req: NextRequest) {
  const adminSession = req.cookies.get("admin_session");
  if (!adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { requestId, action, projectTitle } = body; // action: 'approve' | 'reject'

  if (!requestId || !action) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 1. Update the request status
  const newStatus = action === "approve" ? "approved" : "rejected";
  let request = null;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    try {
      const { data, error: updateError } = await supabaseAdmin
        .from("project_requests")
        .update({ status: newStatus })
        .eq("id", requestId)
        .select()
        .single();
      if (!updateError) request = data;
    } catch (err) {}
  }

  if (!request) {
    // Try updating demo db
    request = updateDemoRequest(requestId, { status: newStatus });
    if (!request) return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  // 2. If approved — create a project and promote user to active_client
  if (action === "approve" && request) {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      try {
        // Promote user role in client_profiles
        if (request.user_id) {
          await supabaseAdmin
            .from("client_profiles")
            .update({ role: "active_client" })
            .eq("id", request.user_id);
        }

        // Create the project record
        const { error: projectError } = await supabaseAdmin
          .from("projects")
          .insert({
            client_id: request.user_id || null,
            title: projectTitle || request.project_type || "New Project",
            description: request.description,
            status: "active",
            progress: 0,
            phase: "Phase 1: Discovery",
          });

        if (projectError) {
          console.error("Project creation error:", projectError.message);
        }
      } catch (err) {}
    }
  }

  return NextResponse.json({ success: true, status: newStatus });
}
