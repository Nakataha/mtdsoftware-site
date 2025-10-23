const VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileVerificationResult = {
  success: boolean;
  status: number;
  message: string;
};

const TURNSTILE_TIMEOUT_MS = 8000;

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string
): Promise<TurnstileVerificationResult> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    return { success: false, status: 403, message: "Doğrulama yapılandırılmamış." };
  }

  if (!token) {
    return { success: false, status: 400, message: "Doğrulama gerekli." };
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    params.set("remoteip", remoteIp);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TURNSTILE_TIMEOUT_MS);

  try {
    const res = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params,
      signal: controller.signal,
    });

    if (!res.ok) {
      return { success: false, status: 403, message: "Doğrulama başarısız." };
    }

    const outcome = (await res.json()) as { success?: boolean };
    if (!outcome.success) {
      return { success: false, status: 403, message: "Doğrulama başarısız." };
    }

    return { success: true, status: 200, message: "" };
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError"
      ? "Doğrulama zaman aşımına uğradı."
      : "Doğrulama tamamlanamadı.";
    return { success: false, status: 400, message };
  } finally {
    clearTimeout(timeout);
  }
}
