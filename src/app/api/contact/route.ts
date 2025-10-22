import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/** Nodemailer için Node runtime ve cache kapama */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* =========================
   Basit rate-limit (1dk/3)
========================= */
const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 1000;
const requests = new Map<string, { count: number; start: number }>();

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/* =========================
   Basit spam filtresi
========================= */
function looksSpammy(text: string): boolean {
  const lower = text.toLowerCase();
  const urlCount = (lower.match(/https?:\/\//g) || []).length;
  const bad =
    /(casino|viagra|loan|roulette|porn|sex|crypto pump|bitcoin miner|telegram)/i.test(
      lower
    );
  return urlCount > 2 || bad;
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/* =========================
   Cloudflare Turnstile doğrulama (opsiyonel)
   TURNSTILE_SECRET tanımlıysa token İSTENİR.
========================= */
async function verifyTurnstile(
  req: NextRequest,
  token: string | undefined
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // Kapalıysa geç
  if (!token) return false; // Secret var ama token yok -> başarısız

  try {
    const form = new URLSearchParams();
    form.append("secret", secret);
    form.append("response", token);
    form.append("remoteip", getIp(req));

    const r = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form }
    );
    const data = (await r.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

/* =========================
   POST /api/contact
========================= */
type Body = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  company?: string;
  hp?: string; // honeypot (boş olmalı)
  turnstileToken?: string;
};

export async function POST(req: NextRequest) {
  // rate limit
  const ip = getIp(req);
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    requests.set(ip, { count: 1, start: now });
  } else {
    if (entry.count >= RATE_LIMIT) {
      return NextResponse.json(
        { success: false, message: "Çok fazla istek. Lütfen daha sonra deneyin." },
        { status: 429 }
      );
    }
    entry.count++;
  }

  // env
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM,
    MAIL_TO,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    // eslint-disable-next-line no-console
    console.error("CONTACT_ERROR: Missing SMTP configuration");
    return NextResponse.json(
      { success: false, message: "Mesaj gönderilemedi." },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as Partial<Body>;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();
    const subject = (body.subject || "").trim();
    const company = (body.company || "").trim();
    const hp = (body.hp || "").trim();
    const turnstileToken = body.turnstileToken;

    // honeypot: doluysa sessizce başarılı dön (mail gönderme)
    if (hp) return NextResponse.json({ success: true });

    // turnstile: secret varsa zorunlu
    const human = await verifyTurnstile(req, turnstileToken);
    if (!human) {
      return NextResponse.json(
        { success: false, message: "Doğrulama başarısız." },
        { status: 400 }
      );
    }

    // server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Geçerli bir e-posta girin." },
        { status: 400 }
      );
    }
    if (message.length > 1500) {
      return NextResponse.json(
        { success: false, message: "Mesaj çok uzun." },
        { status: 400 }
      );
    }
    if (looksSpammy(`${name} ${email} ${subject} ${company} ${message}`)) {
      return NextResponse.json({ success: true }); // sessiz drop
    }

    // transporter (Zoho/SMTP)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: (SMTP_SECURE || "false") === "true", // 465:true, 587:false
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // bağlantı testi (hata logda görünür)
    await transporter.verify();

    const from = MAIL_FROM || `MTD Software <${SMTP_USER}>`;
    const to = MAIL_TO || SMTP_USER;

    const finalSubject =
      subject
        ? `İletişim Formu — ${subject} — ${name}`
        : `İletişim Formu — ${name}`;

    const plain = [
      `Kimden: ${name} <${email}>`,
      company ? `Şirket/Organizasyon: ${company}` : "",
      `IP: ${ip}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI">
        <p><strong>Kimden:</strong> ${name} &lt;${email}&gt;</p>
        ${company ? `<p><strong>Şirket/Organizasyon:</strong> ${company}</p>` : ""}
        <p style="color:#6b7280;font-size:12px;margin:0">IP: ${ip}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0" />
        <pre style="white-space:pre-wrap;font:inherit;margin:0">${message}</pre>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: finalSubject,
      text: plain,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error("CONTACT_ERROR:", msg);
    return NextResponse.json(
      { success: false, message: "Mesaj gönderilemedi." },
      { status: 500 }
    );
  }
}
