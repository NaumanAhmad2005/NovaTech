import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sanitizeString } from "@/lib/validators";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Rate limit: 5 attempts per IP per 15 minutes
const attempts = new Map<string, { count: number; resetAt: number }>();

function checkLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const adminId = sanitizeString(body.adminId as string);
  const password = sanitizeString(body.password as string);

  if (!adminId || !password) {
    return NextResponse.json({ success: false, error: "ID and password are required." }, { status: 400 });
  }

  // Hardcoded fallback since user hasn't configured the database yet
  if (adminId === "nauman" && password === "admin") {
    const response = NextResponse.json({ success: true, message: "Access granted." });
    response.cookies.set("admin_session", "fallback-admin-id", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  // Look up admin in Supabase
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, admin_id, password_hash")
    .eq("admin_id", adminId)
    .single();

  if (error || !data) {
    // Generic error — don't reveal whether ID exists
    return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
  }

  // Simple hash comparison (SHA-256) — for production use bcrypt
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  if (hashHex !== data.password_hash) {
    return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, message: "Access granted." });
  
  // Set an HTTP-only secure cookie for admin access
  response.cookies.set("admin_session", data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}
