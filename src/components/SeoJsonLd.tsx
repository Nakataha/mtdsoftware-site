import Script from "next/script";

import { getInlineScript } from "@/security/inline-content";

const seoJsonLd = getInlineScript("seoJsonLd");

export default function SeoJsonLd() {
  return (
    <Script id="seo-json-ld" type="application/ld+json" strategy="afterInteractive">
      {seoJsonLd}
    </Script>
  );
}
