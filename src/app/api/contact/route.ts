import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, budget, message } = body;

    // --- Build the WhatsApp message ---
    const text = [
      "🚀 *New Project Brief — NovaTech*",
      "",
      `👤 *Name:* ${name}`,
      `📧 *Email:* ${email}`,
      phone ? `📱 *Phone:* ${phone}` : null,
      company ? `🏢 *Company:* ${company}` : null,
      service ? `⚙️ *Service:* ${service}` : null,
      budget ? `💰 *Budget:* ${budget}` : null,
      "",
      `📝 *Message:*\n${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(text);

    // CallMeBot — free, no-signup WhatsApp notifications.
    // One-time setup: send "I allow callmebot to send me messages" to +34 644 597 91
    // on WhatsApp and they'll reply with your apikey.
    const PHONE = process.env.WHATSAPP_PHONE;   // e.g. 923026468105  (no +)
    const APIKEY = process.env.WHATSAPP_APIKEY; // given by CallMeBot

    if (!PHONE || !APIKEY) {
      console.warn("WhatsApp env vars not configured — skipping WhatsApp notification.");
    } else {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${encoded}&apikey=${APIKEY}`;
      const waRes = await fetch(url);
      if (!waRes.ok) {
        console.error("CallMeBot error:", await waRes.text());
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
