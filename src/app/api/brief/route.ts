import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { consumeRateLimit } from "@/lib/rateLimit";
import { verifyTurnstile } from "@/security/turnstile";

const JSON = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  // Apply a shared rate limiter before any other processing to protect downstream services.
  const rateLimit = consumeRateLimit("brief", req);
  if (rateLimit.limited) {
    return JSON({ error: "Too many requests" }, 429);
  }

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

  const ipForTurnstile = rateLimit.isFallback ? undefined : rateLimit.ip;
  const verification = await verifyTurnstile(token, ipForTurnstile);
  if (!verification.success) {
    return JSON({ success: false, message: verification.message }, verification.status);
  }

  return JSON({ success: true });
}
