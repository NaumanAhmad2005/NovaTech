import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

  const { data, error } = await supabaseAdmin
    .from("project_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ requests: data });
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
  const { data: request, error: updateError } = await supabaseAdmin
    .from("project_requests")
    .update({ status: newStatus })
    .eq("id", requestId)
    .select()
    .single();

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  // 2. If approved — create a project and promote user to active_client
  if (action === "approve" && request) {
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
  }

  return NextResponse.json({ success: true, status: newStatus });
}
