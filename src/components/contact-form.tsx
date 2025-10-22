"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

/* ==== Turnstile türleri (any YOK) ==== */
type TurnstileSize = "normal" | "compact" | "invisible";
type TurnstileTheme = "auto" | "light" | "dark";

interface TurnstileRenderOptions {
  sitekey: string;
  size?: TurnstileSize;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: TurnstileTheme;
  action?: string;
  cData?: string;
}

interface TurnstileAPI {
  render: (el: HTMLElement, opts: TurnstileRenderOptions) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}

interface FormState {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  consent: boolean;
}

type Status = "idle" | "loading" | "success" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  consent: false,
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Honeypot (botlar için görünmez alan)
  const hpRef = useRef<HTMLInputElement>(null);

  // Turnstile (görünmez)
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY as string | undefined;
  const tsDivRef = useRef<HTMLDivElement>(null);
  const tsWidgetIdRef = useRef<string | null>(null);

  // Turnstile scriptini yükle + widget'ı render et
  useEffect(() => {
    if (!sitekey) return;
    if (typeof window === "undefined") return;

    const ensureScript = (): Promise<void> =>
      new Promise<void>((resolve) => {
        if (document.getElementById("cf-ts")) return resolve();
        const s = document.createElement("script");
        s.id = "cf-ts";
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        document.head.appendChild(s);
      });

    ensureScript().then(() => {
      if (!window.turnstile || !tsDivRef.current || tsWidgetIdRef.current) return;
      tsWidgetIdRef.current = window.turnstile.render(tsDivRef.current, {
        sitekey,
        size: "invisible",
        callback: () => {
          /* token DOM'a yazılıyor, submit sırasında okunacak */
        },
      });
    });
  }, [sitekey]);

  // Invisible Turnstile token'ını oku
  async function getTurnstileToken(): Promise<string | undefined> {
    if (!sitekey || !window.turnstile || !tsWidgetIdRef.current || !tsDivRef.current) {
      return undefined;
    }

    return new Promise<string>((resolve) => {
      const obs = new MutationObserver(() => {
        const input = tsDivRef.current!.querySelector(
          'input[name="cf-turnstile-response"]'
        ) as HTMLInputElement | null;
        if (input && input.value) {
          resolve(input.value);
          obs.disconnect();
        }
      });
      obs.observe(tsDivRef.current, { subtree: true, childList: true });
      window.turnstile!.execute(tsWidgetIdRef.current!);
    });
  }

  const updateField =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "consent"
          ? (event as ChangeEvent<HTMLInputElement>).target.checked
          : event.target.value;

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    if (!form.consent) {
      setErrorMessage("Mesajınızı gönderebilmek için KVKK onayını işaretleyin.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const hp = hpRef.current?.value?.trim() ?? "";

      // Turnstile token (varsa)
      const turnstileToken = await getTurnstileToken();

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: `Şirket / Organizasyon: ${form.company.trim() || "-"}\nKonu: ${
          form.subject.trim() || "-"
        }\n\n${form.message.trim()}`,
        subject: form.subject.trim(),
        company: form.company.trim(),
        hp,
        turnstileToken,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data: { message?: string } | null = await response.json().catch(() => null);
        throw new Error(data?.message || "Mesaj gönderilemedi.");
      }

      setStatus("success");
      setForm(initialState);
      if (window.turnstile && tsWidgetIdRef.current) {
        window.turnstile.reset(tsWidgetIdRef.current);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Mesaj gönderilemedi.";
      setStatus("error");
      setErrorMessage(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-3xl border border-muted/60 bg-background/90 p-6 text-sm text-foreground/70 shadow-inner shadow-primary/5"
      noValidate
    >
      {/* HONEYPOT (gizli) */}
      <input ref={hpRef} type="text" name="hp" autoComplete="off" className="hidden" />

      {/* TURNSTILE (görünmez widget burada render ediliyor) */}
      {sitekey && <div ref={tsDivRef} className="hidden" />}

      <div className="grid gap-2">
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
          Ad Soyad
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Adınız Soyadınız"
          value={form.name}
          onChange={updateField("name")}
          className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          required
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
          E-posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="ornek@firma.com"
          value={form.email}
          onChange={updateField("email")}
          className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          required
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
          Şirket / Organizasyon
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Firma veya ekip adı"
          value={form.company}
          onChange={updateField("company")}
          className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
          Konu
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="Proje veya ihtiyaç başlığı"
          value={form.subject}
          onChange={updateField("subject")}
          className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Kısa bir özet, hedefler ve zaman planı"
          value={form.message}
          onChange={updateField("message")}
          className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          required
        />
      </div>

      <label className="flex items-start gap-3 text-xs text-foreground/60">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={updateField("consent")}
          className="mt-1 h-4 w-4 rounded border-muted/60 text-primary focus:ring-primary/40"
          required
        />
        <span>
          KVKK onayını kabul ediyorum ve mesajımın info@mtdsoftware.com.tr adresine iletilmesini onaylıyorum.
        </span>
      </label>

      <div className="space-y-3">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Gönderiliyor..." : "Gönder"}
        </button>
        <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-xs font-medium">
          {status === "success" && <span className="text-primary">Teşekkürler! Mesajınız başarıyla iletildi.</span>}
          {status === "error" && <span className="text-red-500">{errorMessage || "Mesaj gönderilemedi. Lütfen tekrar deneyin."}</span>}
        </p>
      </div>
    </form>
  );
}
