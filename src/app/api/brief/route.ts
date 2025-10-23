import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const JSON = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(req: NextRequest) {
  // TODO: rate limit requests
  let body: {
    name?: string;
    email?: string;
    need?: string;
    description?: string;
    turnstileToken?: string;
  };

  try {
    body = await req.json();
  } catch {
    return JSON({ success: false, message: "Geçersiz istek." }, 400);
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const need = (body.need ?? "").trim();
  const description = (body.description ?? "").trim();
  const token = body.turnstileToken;

  if (!name || !email || !need || !description) {
    return JSON({ success: false, message: "Tüm alanları doldurun." }, 400);
  }

  if (!token) {
    return JSON({ success: false, message: "Doğrulama gerekli." }, 400);
  }

  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    return JSON({ success: false, message: "Doğrulama yapılandırılmamış." }, 400);
  }

  const formData = new URLSearchParams({
    secret,
    response: token,
    remoteip: getIp(req),
  });

  try {
    const res = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });

    if (!res.ok) {
      return JSON({ success: false, message: "Doğrulama başarısız." }, 400);
    }

    const outcome = (await res.json()) as { success?: boolean };
    if (!outcome.success) {
      return JSON({ success: false, message: "Doğrulama başarısız." }, 400);
    }
  } catch {
    return JSON({ success: false, message: "Doğrulama tamamlanamadı." }, 400);
  }

  return JSON({ success: true });
}
