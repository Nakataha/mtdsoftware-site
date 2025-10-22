/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ===== Rate limit (1dk/3) ===== */
const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 1000;
const requests = new Map<string, { count: number; start: number }>();

const JSON = (data: any, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/* ===== Helpers ===== */
function withTimeout<T>(p: Promise<T>, ms: number, label = "timeout"): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(label)), ms);
    p.then(v => { clearTimeout(id); resolve(v); })
     .catch(e => { clearTimeout(id); reject(e); });
  });
}

function looksSpammy(text: string): boolean {
  const lower = text.toLowerCase();
  const urlCount = (lower.match(/https?:\/\//g) || []).length;
  const bad = /(casino|viagra|loan|roulette|porn|sex|crypto pump|bitcoin miner|telegram|whatsapp|forex|bet)/i.test(lower);
  return urlCount > 2 || bad;
}
function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function escapeHtml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ===== Turnstile (secret varsa zorunlu) ===== */
async function verifyTurnstile(req: NextRequest, token?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: getIp(req),
  }).toString();

  try {
    const res = await withTimeout(
      fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
      }),
      8000,
      "turnstile timeout"
    );
    if (!res.ok) return false;
    const json = (await res.json()) as { success?: boolean };
    return !!json.success;
  } catch {
    return false;
  }
}

/* ===== Types ===== */
type Body = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  company?: string;
  hp?: string;               // honeypot
  turnstileToken?: string;   // cf-turnstile-response
};

/* ===== POST /api/contact ===== */
export async function POST(req: NextRequest) {
  // rate-limit
  const ip = getIp(req);
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    requests.set(ip, { count: 1, start: now });
  } else {
    if (entry.count >= RATE_LIMIT) {
      return JSON({ success: false, message: "Çok fazla istek. Lütfen daha sonra deneyin." }, 429);
    }
    entry.count++;
  }

  // ENV
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
    return JSON({ success: false, message: "Mesaj gönderilemedi." }, 500);
  }

  try {
    const body = (await withTimeout(req.json(), 4000, "body parse timeout")) as Partial<Body>;

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();
    const subject = (body.subject || "").trim();
    const company = (body.company || "").trim();
    const hp = (body.hp || "").trim();
    const turnstileToken = body.turnstileToken;

    // honeypot: doluysa sessizce başarılı dön
    if (hp) return JSON({ success: true });

    // Turnstile
    const human = await verifyTurnstile(req, turnstileToken);
    if (!human) return JSON({ success: false, message: "Doğrulama başarısız." }, 400);

    // validation
    if (!name || !email || !message) return JSON({ success: false, message: "Tüm alanlar zorunludur." }, 400);
    if (!isEmail(email)) return JSON({ success: false, message: "Geçerli bir e-posta girin." }, 400);
    if (message.length > 1500) return JSON({ success: false, message: "Mesaj çok uzun." }, 400);
    if (looksSpammy(`${name} ${email} ${subject} ${company} ${message}`)) {
      return JSON({ success: true }); // sessiz drop
    }

    /* ===== Nodemailer (Zoho) — SMTPTransport.Options tipi ===== */
    const transportOptions: SMTPTransport.Options = {
      host: SMTP_HOST,                                // örn: smtp.zoho.eu
      port: Number(SMTP_PORT),                        // 587 (STARTTLS) veya 465 (SSL)
      secure: (SMTP_SECURE || "false") === "true",    // 465:true, 587:false
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      // timeoutlar — kilitlenmeyi önler
      connectionTimeout: 10_000,
      greetingTimeout: 6_000,
      socketTimeout: 12_000,
      // 587 kullanıyorsan STARTTLS'i zorla
      requireTLS: (SMTP_SECURE || "false") !== "true",
      tls: {
        servername: SMTP_HOST,
        rejectUnauthorized: true,
      },
    };

    const transporter = nodemailer.createTransport(transportOptions);

    const from = MAIL_FROM || `MTD Software <${SMTP_USER}>`;
    const to = MAIL_TO || SMTP_USER;

    const mailSubject = subject
      ? `Yeni İletişim — ${subject} — ${name}`
      : `Yeni İletişim — ${name}`;

    const plain = [
      `👤 Ad Soyad : ${name}`,
      `✉️ E-posta : ${email}`,
      company ? `🏢 Şirket  : ${company}` : "",
      subject ? `📝 Konu    : ${subject}` : "",
      `🌐 IP       : ${ip}`,
      "",
      "Mesaj:",
      message,
    ].filter(Boolean).join("\n");

    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#0b253c">
        <div style="background:#0d2a46;color:#fff;padding:16px 20px;border-radius:14px 14px 0 0">
          <div style="font-weight:700;font-size:16px">MTD Software — İletişim Formu</div>
          <div style="opacity:.85;font-size:12px">Yeni mesaj bildirimi</div>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 14px 14px;padding:18px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tbody>
              <tr><td style="padding:8px 0;width:140px;color:#64748b">Ad Soyad</td><td style="padding:8px 0"><strong>${escapeHtml(name)}</strong></td></tr>
              <tr><td style="padding:8px 0;color:#64748b">E-posta</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              ${company ? `<tr><td style="padding:8px 0;color:#64748b">Şirket</td><td style="padding:8px 0">${escapeHtml(company)}</td></tr>` : ""}
              ${subject ? `<tr><td style="padding:8px 0;color:#64748b">Konu</td><td style="padding:8px 0">${escapeHtml(subject)}</td></tr>` : ""}
              <tr><td style="padding:8px 0;color:#64748b">IP</td><td style="padding:8px 0">${escapeHtml(ip)}</td></tr>
            </tbody>
          </table>
          <div style="margin:16px 0 8px;font-weight:600;color:#0b253c">Mesaj</div>
          <div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:12px;line-height:1.6">
            ${escapeHtml(message)}
          </div>
          <div style="margin-top:14px;font-size:12px;color:#64748b">
            Cevaplamak için: <a href="mailto:${escapeHtml(email)}">yanıtla</a>
          </div>
        </div>
      </div>
    `;

    // Sadece sendMail (verify yok) — timeout’lu
    await withTimeout(
      transporter.sendMail({ from, to, replyTo: email, subject: mailSubject, text: plain, html }),
      12_000,
      "smtp send timeout"
    );

    try { transporter.close(); } catch {}

    return JSON({ success: true }, 200);
  } catch (err: any) {
    console.error("CONTACT_ERROR:", err?.message || err);
    return JSON({ success: false, message: "Mesaj gönderilemedi." }, 500);
  }
}
