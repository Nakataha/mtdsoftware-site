import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";        // Nodemailer için şart
export const dynamic = "force-dynamic"; // Cache kapansın

// ---- Basit oran sınırlayıcı (serverless'ta en azından anlık korur)
const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 1000;
const requests = new Map<string, { count: number; start: number }>();

function ip(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

// ---- Basit spam filtresi & “honeypot”
function looksSpammy(text: string) {
  const lower = text.toLowerCase();
  const urlCount = (lower.match(/https?:\/\//g) || []).length;
  const badWords = /(casino|viagra|roulette|loan|crypto pump|sex|porn)/i.test(lower);
  return urlCount > 2 || badWords;
}

type Body = {
  name: string;
  email: string;
  message: string;
  hp?: string;                // honeypot: boş olmalı
  turnstileToken?: string;    // opsiyonel: Cloudflare Turnstile
};

async function verifyTurnstile(token: string | undefined, req: NextRequest) {
  if (!process.env.TURNSTILE_SECRET || !token) return true; // kapalıysa geç
  try {
    const form = new URLSearchParams();
    form.append("secret", process.env.TURNSTILE_SECRET);
    form.append("response", token);
    form.append("remoteip", ip(req));
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = await r.json();
    return !!data.success;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // Rate limit
  const clientIp = ip(req);
  const now = Date.now();
  const entry = requests.get(clientIp);
  if (!entry || now - entry.start > WINDOW_MS) {
    requests.set(clientIp, { count: 1, start: now });
  } else {
    if (entry.count >= RATE_LIMIT) {
      return NextResponse.json(
        { success: false, message: "Çok fazla istek. Lütfen daha sonra deneyin." },
        { status: 429 }
      );
    }
    entry.count++;
  }

  // Config
  const {
    SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
    SMTP_SECURE, MAIL_FROM, MAIL_TO
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Missing SMTP configuration");
    return NextResponse.json({ success: false, message: "Mesaj gönderilemedi." }, { status: 500 });
  }

  try {
    const { name, email, message, hp, turnstileToken } = (await req.json()) as Body;

    // Honeypot (botlar genelde doldurur)
    if (hp) {
      return NextResponse.json({ success: true }); // sessizce “başarılı” dön
    }

    // Turnstile doğrulama (varsa)
    const human = await verifyTurnstile(turnstileToken, req);
    if (!human) {
      return NextResponse.json({ success: false, message: "Doğrulama başarısız." }, { status: 400 });
    }

    // Sunucu tarafı doğrulama
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ success: false, message: "Tüm alanlar zorunludur." }, { status: 400 });
    }
    if (message.length > 1500) {
      return NextResponse.json({ success: false, message: "Mesaj çok uzun." }, { status: 400 });
    }
    if (looksSpammy(`${name} ${email} ${message}`)) {
      return NextResponse.json({ success: true }); // sessiz drop
    }

    // Zoho SMTP transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: (SMTP_SECURE || "false") === "true",   // 465 -> true, 587 -> false
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // İsteğe bağlı: bağlantı testi (hata verir ise loglarda görülür)
    await transporter.verify();

    // “from” Zoho tarafından izinli bir adres olmalı (genelde SMTP_USER)
    const from = MAIL_FROM || `MTD Software <${SMTP_USER}>`;
    const to = MAIL_TO || "info@mtdsoftware.com.tr";

    await transporter.sendMail({
      from,
      to,
      replyTo: email, // reply direkt gönderene gider
      subject: `İletişim Formu — ${name}`,
      text: `Kimden: ${name} <${email}>\nIP: ${clientIp}\n\n${message}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI">
          <p><strong>Kimden:</strong> ${name} &lt;${email}&gt;</p>
          <p style="color:#6b7280;font-size:12px;margin:0">IP: ${clientIp}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0" />
          <pre style="white-space:pre-wrap;font:inherit;margin:0">${message}</pre>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT_ERROR:", error);
    return NextResponse.json({ success: false, message: "Mesaj gönderilemedi." }, { status: 500 });
  }
}
