import { NextRequest, NextResponse } from "next/server";
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

// ─── Simple in-memory rate limiter ────────────────────────────────────────
// Allows max 3 submissions per IP per 10 minutes.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true; // allowed
  }
  if (entry.count >= MAX_REQUESTS) return false; // blocked
  entry.count++;
  return true;
}

// ─── Route handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Rate limiting
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

  // 2. Parse body safely
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  // 3. Extract & sanitize raw strings
  const raw = {
    name: sanitizeString(body.name as string),
    email: sanitizeString(body.email as string),
    phone: sanitizeString(body.phone as string),
    company: sanitizeString(body.company as string),
    service: sanitizeString(body.service as string),
    budget: sanitizeString(body.budget as string),
    message: sanitizeString(body.message as string),
  };

  // 4. Server-side validation (never trust the client)
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

  // 5. Build & send WhatsApp message
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
      // Don't fail the request — form submission is still recorded
    }
  }

  return NextResponse.json({ success: true });
}
