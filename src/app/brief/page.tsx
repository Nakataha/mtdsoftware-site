import type { Metadata } from "next";
import Script from "next/script";
import BriefForm from "./BriefForm";

export const metadata: Metadata = {
  title: "Proje Briefi",
  description:
    "Projenizin detaylarını ve beklentilerinizi paylaşarak hızlı geri dönüş alın.",
  alternates: {
    canonical: "/brief",
  },
};

export default function BriefPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;

  return (
    <section className="border-b border-muted/60 bg-gradient-to-b from-background via-primary/5 to-background py-20">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        defer
      />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <header className="space-y-4 text-center">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Brief Formu
          </span>
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            Proje briefinizi paylaşın
          </h1>
          <p className="mx-auto max-w-2xl text-base text-foreground/70">
            Projenizin kapsamını, hedeflerinizi ve ihtiyaçlarınızı kısa sürede değerlendirebilmemiz için lütfen formu doldurun.
          </p>
        </header>

        <BriefForm siteKey={turnstileSiteKey} />

        <p className="mx-auto max-w-2xl text-center text-xs text-foreground/60">
          Gönderdiğiniz bilgiler gizlilik politikamız kapsamında yalnızca proje değerlendirmesi amacıyla kullanılacaktır.
        </p>
      </div>
    </section>
  );
}
