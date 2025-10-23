import { NextResponse } from "next/server";

const TURNSTILE_VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface BriefPayload {
  name: string;
  email: string;
  need: string;
  description: string;
  token: string;
}

export async function POST(request: Request) {
  const secret = process.env.TURNSTILE_SECRET;

  if (!secret) {
    console.error("Turnstile secret is not configured");
    return NextResponse.json(
      { success: false, error: "Sunucu yapılandırması eksik." },
      { status: 500 }
    );
  }

  let payload: BriefPayload;

  try {
    payload = (await request.json()) as BriefPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Geçersiz istek formatı." },
      { status: 400 }
    );
  }

  if (!payload.token) {
    return NextResponse.json(
      { success: false, error: "Doğrulama token'ı eksik." },
      { status: 400 }
    );
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", payload.token);

    const verificationResponse = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!verificationResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Doğrulama servisi yanıt vermedi." },
        { status: 502 }
      );
    }

    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success) {
      return NextResponse.json(
        { success: false, error: "Doğrulama başarısız." },
        { status: 400 }
      );
    }

    // TODO: Rate limiting ve form verisi işleme logiği eklenecek.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return NextResponse.json(
      { success: false, error: "Doğrulama sırasında hata oluştu." },
      { status: 500 }
    );
  }
}
