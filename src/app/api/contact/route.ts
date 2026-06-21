import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sanitizeString,
  validateName,
  validateEmail,
  validatePhone,
  validateCompany,
  validateMessage,
  validateService,
  validateBudget,
} from "@/lib/validators";

// ─── Supabase admin client (service role bypasses RLS) ────────────────────────
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// ─── Simple in-memory rate limiter ────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

// ─── Route handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait 10 minutes before trying again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const raw = {
    name: sanitizeString(body.name as string),
    email: sanitizeString(body.email as string),
    phone: sanitizeString(body.phone as string),
    company: sanitizeString(body.company as string),
    service: sanitizeString(body.service as string),
    budget: sanitizeString(body.budget as string),
    message: sanitizeString(body.message as string),
  };

  const checks = [
    validateName(raw.name),
    validateEmail(raw.email),
    validatePhone(raw.phone),
    validateCompany(raw.company),
    validateMessage(raw.message),
    validateService(raw.service),
    validateBudget(raw.budget),
  ];

  const firstError = checks.find((c) => !c.ok);
  if (firstError) {
    return NextResponse.json({ success: false, error: firstError.error }, { status: 400 });
  }

  // ─── Save to Supabase project_requests ──────────────────────────────────
  const userId = body.user_id as string | null;
  const supabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseConfigured) {
    try {
      const { error: dbError } = await supabaseAdmin
        .from("project_requests")
        .insert({
          user_id: userId || null,
          full_name: raw.name,
          email: raw.email,
          phone: raw.phone || null,
          company: raw.company || null,
          project_type: raw.service || null,
          budget: raw.budget || null,
          description: raw.message,
          status: "pending",
        });
      if (dbError) console.error("Supabase insert error:", dbError.message);
    } catch (err) {
      console.error("Supabase save failed:", err);
    }
  }

  // ─── WhatsApp notification ───────────────────────────────────────────────
  const text = [
    "🚀 *New Project Brief — NovaTech*",
    "",
    `👤 *Name:* ${raw.name}`,
    `📧 *Email:* ${raw.email}`,
    raw.phone ? `📱 *Phone:* ${raw.phone}` : null,
    raw.company ? `🏢 *Company:* ${raw.company}` : null,
    raw.service ? `⚙️ *Service:* ${raw.service}` : null,
    raw.budget ? `💰 *Budget:* ${raw.budget}` : null,
    "",
    `📝 *Message:*\n${raw.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const PHONE = process.env.WHATSAPP_PHONE;
  const APIKEY = process.env.WHATSAPP_APIKEY;

  if (!PHONE || !APIKEY) {
    console.warn("WhatsApp env vars not configured — skipping WhatsApp notification.");
  } else {
    try {
      const encoded = encodeURIComponent(text);
      const url = `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${encoded}&apikey=${APIKEY}`;
      const waRes = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!waRes.ok) console.error("CallMeBot error:", await waRes.text());
    } catch (err) {
      console.error("WhatsApp fetch failed:", err);
    }
  }

  return NextResponse.json({ success: true });
}
