import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// GET — fetch all content or by section
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section");

  let query = supabaseAdmin.from("site_content").select("*");
  if (section) query = query.eq("section", section);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ content: data || [] });
}

// POST — upsert a content field (admin only)
export async function POST(req: NextRequest) {
  const adminSession = req.cookies.get("admin_session");
  if (!adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { section, key, value } = body;

  if (!section || !key || value === undefined) {
    return NextResponse.json({ error: "Missing fields: section, key, value" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("site_content")
    .upsert({ section, key, value, updated_at: new Date().toISOString() }, {
      onConflict: "section,key",
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
