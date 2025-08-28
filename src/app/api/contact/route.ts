import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 1000;
const requests = new Map<string, { count: number; start: number }>();

function getClientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
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

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } =
    process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("Missing SMTP configuration");
    return NextResponse.json(
      { success: false, message: "Mesaj gönderilemedi." },
      { status: 500 }
    );
  }

  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }
    if (message.length > 1000) {
      return NextResponse.json(
        { success: false, message: "Mesaj çok uzun." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `İletişim Formu: ${name}`,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send message", error);
    return NextResponse.json(
      { success: false, message: "Mesaj gönderilemedi." },
      { status: 500 }
    );
  }
}
