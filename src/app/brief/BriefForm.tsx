"use client";

import { FormEvent, useState } from "react";

interface BriefFormProps {
  siteKey?: string;
}

export default function BriefForm({ siteKey }: BriefFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      need: formData.get("need")?.toString().trim() ?? "",
      description: formData.get("description")?.toString().trim() ?? "",
      token: formData.get("cf-turnstile-response")?.toString() ?? "",
    };

    if (!payload.token) {
      setStatus("error");
      setErrorMessage("Doğrulama tamamlanamadı. Lütfen tekrar deneyin.");
      return;
    }

    try {
      setStatus("submitting");
      setErrorMessage(null);

      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          result?.error ?? "Form gönderimi başarısız oldu. Lütfen tekrar deneyin."
        );
        return;
      }

      setStatus("success");
      form.reset();
      window.turnstile?.reset();
    } catch (error) {
      console.error("Brief form submission failed", error);
      setStatus("error");
      setErrorMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <form
      className="mx-auto grid w-full max-w-2xl gap-6 rounded-3xl border border-muted/60 bg-background/80 p-8 text-foreground shadow-xl shadow-primary/10 backdrop-blur"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Adınız Soyadınız
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-2xl border border-muted/50 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
          placeholder="Adınızı girin"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          E-posta Adresi
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-2xl border border-muted/50 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
          placeholder="ornek@domain.com"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="need" className="text-sm font-semibold text-foreground">
          İhtiyacınız
        </label>
        <input
          id="need"
          name="need"
          type="text"
          required
          className="w-full rounded-2xl border border-muted/50 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
          placeholder="Proje veya hizmet ihtiyacınızı özetleyin"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="description" className="text-sm font-semibold text-foreground">
          Proje Detayları
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          className="w-full rounded-2xl border border-muted/50 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
          placeholder="Teknik gereksinimleri veya hedefleri paylaşın"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="cf-turnstile"
          data-sitekey={siteKey ?? ""}
          data-theme="light"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Gönderiliyor..." : "Brief Gönder"}
        </button>
        <p className="text-xs text-foreground/60">
          Form gönderimi ile kişisel verileriniz KVKK kapsamında korunmaktadır.
        </p>
      </div>

      <div className="text-sm" aria-live="polite" aria-atomic="true">
        {status === "success" && (
          <p className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-700">
            Briefiniz başarıyla alındı. En kısa sürede dönüş yapacağız.
          </p>
        )}
        {status === "error" && errorMessage && (
          <p className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-red-700">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}
