import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/security/turnstile";

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

  const remoteIp = getIp(req);
  const verification = await verifyTurnstile(token, remoteIp === "unknown" ? undefined : remoteIp);
  if (!verification.success) {
    return JSON({ success: false, message: verification.message }, verification.status);
  }

  return JSON({ success: true });
}
