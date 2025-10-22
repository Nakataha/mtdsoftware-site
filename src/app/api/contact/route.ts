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
    /(casino|viagra|loan|roulette|porn|sex|crypto pump|bitcoin miner|telegram|whatsapp|forex|bet)/i.test(
      lower
    );
  return urlCount > 2 || bad;
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* =========================
   Cloudflare Turnstile doğrulama
   TURNSTILE_SECRET tanımlıysa token zorunlu
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
   Types
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

/* =========================
   POST /api/contact
========================= */
export async function POST(req: NextRequest) {
  // --- rate limit
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

  // --- env
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

    // --- honeypot: doluysa sessizce başarılı dön (mail gönderme)
    if (hp) return NextResponse.json({ success: true });

    // --- turnstile: secret varsa zorunlu
    const human = await verifyTurnstile(req, turnstileToken);
    if (!human) {
      return NextResponse.json(
        { success: false, message: "Doğrulama başarısız." },
        { status: 400 }
      );
    }

    // --- validation
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

    // --- transporter (Zoho / SMTP)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: (SMTP_SECURE || "false") === "true", // 465:true, 587:false
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Bağlantı testi
    await transporter.verify();

    const from = MAIL_FROM || `MTD Software <${SMTP_USER}>`;
    const to = MAIL_TO || SMTP_USER;

    const mailSubject =
      subject ? `Yeni İletişim — ${subject} — ${name}` : `Yeni İletişim — ${name}`;

    // Plain text (kolay arama/forward için iyi olur)
    const plain = [
      `👤 Ad Soyad : ${name}`,
      `✉️ E-posta : ${email}`,
      company ? `🏢 Şirket  : ${company}` : "",
      subject ? `📝 Konu    : ${subject}` : "",
      `🌐 IP       : ${ip}`,
      "",
      "Mesaj:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    // HTML şablon (daha okunur)
    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI; color:#0b253c;">
        <div style="background:#0d2a46; color:#fff; padding:16px 20px; border-radius:14px 14px 0 0;">
          <div style="font-weight:700; font-size:16px;">MTD Software — İletişim Formu</div>
          <div style="opacity:.8; font-size:12px; margin-top:2px;">Yeni mesaj bildirimi</div>
        </div>

        <div style="border:1px solid #e5e7eb; border-top:none; border-radius:0 0 14px 14px; padding:18px;">
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tbody>
              <tr>
                <td style="padding:8px 0; width:140px; color:#64748b;">Ad Soyad</td>
                <td style="padding:8px 0;"><strong>${escapeHtml(name)}</strong></td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#64748b;">E-posta</td>
                <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(
      email
    )}</a></td>
              </tr>
              ${
                company
                  ? `<tr><td style="padding:8px 0; color:#64748b;">Şirket</td><td style="padding:8px 0;">${escapeHtml(
                      company
                    )}</td></tr>`
                  : ""
              }
              ${
                subject
                  ? `<tr><td style="padding:8px 0; color:#64748b;">Konu</td><td style="padding:8px 0;">${escapeHtml(
                      subject
                    )}</td></tr>`
                  : ""
              }
              <tr>
                <td style="padding:8px 0; color:#64748b;">IP</td>
                <td style="padding:8px 0;">${escapeHtml(ip)}</td>
              </tr>
            </tbody>
          </table>

          <div style="margin:16px 0 8px; font-weight:600; color:#0b253c;">Mesaj</div>
          <div style="white-space:pre-wrap; background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:12px; line-height:1.6;">
            ${escapeHtml(message)}
          </div>

          <div style="margin-top:14px; font-size:12px; color:#64748b;">
            Cevaplamak için: <a href="mailto:${escapeHtml(email)}">yanıtla</a>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: mailSubject,
      text: plain,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("CONTACT_ERROR:", msg);
    return NextResponse.json(
      { success: false, message: "Mesaj gönderilemedi." },
      { status: 500 }
    );
  }
}
