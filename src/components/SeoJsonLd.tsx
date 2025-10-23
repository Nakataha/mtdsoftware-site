import Script from "next/script";

import { getInlineScript } from "@/security/inline-content";

const seoJsonLd = getInlineScript("seoJsonLd");

type SeoJsonLdProps = {
  nonce?: string;
};

export default function SeoJsonLd({ nonce }: SeoJsonLdProps) {
  return (
    <Script
      id="seo-json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
      nonce={nonce}
    >
      {seoJsonLd}
    </Script>
  );
}
