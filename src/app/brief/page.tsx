import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

import { CSP_NONCE_HEADER_NAME } from "@/lib/security/csp";
import BriefForm from "./BriefForm";

const fallbackSiteUrl = "https://www.mtdsoftware.com.tr";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;
const briefOgImage = "/og?title=Brief%20Talep%20Formu&subtitle=H%C4%B1zl%C4%B1%20Geri%20Bildirim";

export const metadata: Metadata = {
  title: "Brief Talep Formu",
  description:
    "Kısa brief formu ile proje ihtiyaçlarınızı paylaşın, en kısa sürede dönüş sağlayalım.",
  alternates: {
    canonical: "/brief",
  },
  openGraph: {
    title: "Brief Talep Formu",
    description:
      "Proje hedeflerinizi paylaşın, teknik yol haritasını birlikte planlayalım.",
    url: `${siteUrl}/brief`,
    type: "website",
    images: [
      {
        url: briefOgImage,
        width: 1200,
        height: 630,
        alt: "Brief Talep Formu",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Brief Talep Formu",
    description:
      "Proje ihtiyaçlarınızı paylaşmak için kısa brief formunu doldurun.",
    images: [briefOgImage],
  },
};

export default async function BriefIntakePage() {
  const headerList = await headers();
  const cspNonce = headerList.get(CSP_NONCE_HEADER_NAME) ?? undefined;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        defer
        nonce={cspNonce}
      />
      <section className="bg-background">
        <div className="container mx-auto flex max-w-4xl flex-col gap-10 py-24">
          <header className="mx-auto max-w-2xl space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
              Proje Briefi
            </span>
            <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Projenizi tanıtın, hızlı geri dönüş alın
            </h1>
            <p className="text-base text-foreground/70">
              Kısa formu doldurduğunuzda ihtiyaçlarınızı netleştirip teknik önerilerle birlikte
              geri dönüş sağlıyoruz.
            </p>
          </header>

          <BriefForm siteKey={siteKey} />
        </div>
      </section>
    </>
  );
}
