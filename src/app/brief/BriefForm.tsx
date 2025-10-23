"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

interface BriefFormProps {
  siteKey?: string;
}

type Status = "idle" | "loading" | "success" | "error";

declare global {
  interface Window {
    onBriefTurnstileSuccess?: (token: string) => void;
    onBriefTurnstileExpire?: () => void;
    onBriefTurnstileError?: () => void;
  }
}

const initialFields = {
  name: "",
  email: "",
  need: "",
  description: "",
};

export default function BriefForm({ siteKey }: BriefFormProps) {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.onBriefTurnstileSuccess = (value: string) => {
      setToken(value);
      setMessage("");
    };
    window.onBriefTurnstileExpire = () => {
      setToken(null);
    };
    window.onBriefTurnstileError = () => {
      setToken(null);
      setMessage("Doğrulama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    };

    return () => {
      delete window.onBriefTurnstileSuccess;
      delete window.onBriefTurnstileExpire;
      delete window.onBriefTurnstileError;
    };
  }, []);

  const isSubmitting = status === "loading";
  const canSubmit = useMemo(() => {
    return (
      fields.name.trim().length > 1 &&
      fields.email.trim().length > 3 &&
      fields.need.trim().length > 1 &&
      fields.description.trim().length > 9
    );
  }, [fields]);

  const updateField = (key: keyof typeof initialFields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }));
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!siteKey) {
      setStatus("error");
      setMessage("Doğrulama anahtarı yapılandırılmamış görünüyor.");
      return;
    }

    if (!token) {
      setStatus("error");
      setMessage("Lütfen doğrulamayı tamamlayın.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, turnstileToken: token }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form gönderilemedi.");
      }

      setStatus("success");
      setMessage("Form başarıyla iletildi. Teşekkür ederiz!");
      setFields(initialFields);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Form gönderilirken bir sorun oluştu."
      );
    } finally {
      const turnstile = (window as typeof window & {
        turnstile?: { reset?: (id?: string) => void };
      }).turnstile;
      turnstile?.reset?.();
      setToken(null);
      setTimeout(() => setStatus("idle"), 6000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-3xl border border-muted/50 bg-background/90 p-8 shadow-lg shadow-primary/10"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-foreground/80">
          <span>Ad Soyad</span>
          <input
            type="text"
            name="name"
            required
            value={fields.name}
            onChange={updateField("name")}
            className="rounded-2xl border border-muted/40 bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-muted/60"
            placeholder="Adınızı girin"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-foreground/80">
          <span>E-posta</span>
          <input
            type="email"
            name="email"
            required
            value={fields.email}
            onChange={updateField("email")}
            className="rounded-2xl border border-muted/40 bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-muted/60"
            placeholder="ornek@firma.com"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-foreground/80">
        <span>İhtiyaç Başlığı</span>
        <input
          type="text"
          name="need"
          required
          value={fields.need}
          onChange={updateField("need")}
          className="rounded-2xl border border-muted/40 bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-muted/60"
          placeholder="Örn. SaaS platformu için geliştirme"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-foreground/80">
        <span>Kısa Açıklama</span>
        <textarea
          name="description"
          required
          value={fields.description}
          onChange={updateField("description")}
          minLength={10}
          rows={6}
          className="rounded-2xl border border-muted/40 bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-muted/60"
          placeholder="Projenizin kapsamını özetleyin"
        />
      </label>

      <div className="space-y-3">
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-callback="onBriefTurnstileSuccess"
          data-expired-callback="onBriefTurnstileExpire"
          data-error-callback="onBriefTurnstileError"
        />
        {!siteKey && (
          <p className="text-sm text-red-500">Doğrulama anahtarı bulunamadı.</p>
        )}
      </div>

      {message && (
        <p
          className={`text-sm ${status === "success" ? "text-emerald-600" : "text-red-500"}`}
          role={status === "success" ? "status" : "alert"}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || isSubmitting || !siteKey}
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Gönderiliyor..." : "Brief Gönder"}
      </button>
    </form>
  );
}
