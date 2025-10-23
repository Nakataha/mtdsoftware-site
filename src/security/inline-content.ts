const fallbackSiteUrl = "https://www.mtdsoftware.com.tr";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;

const seoJsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MTD Software",
    url: siteUrl,
    logo: `${siteUrl}/MTD_Logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/mtdsoftware/",
      "https://github.com/mtdsoftware",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@mtdsoftware.com.tr",
        contactType: "customer support",
        availableLanguage: ["tr", "en"],
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Hangi hizmetleri sunuyorsunuz?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Web uygulamaları, SaaS ürünleri ve entegrasyon projeleri için analiz, geliştirme, devops ve sürdürülebilirlik odağında uçtan uca destek sunuyorum.",
        },
      },
      {
        "@type": "Question",
        name: "Projeler nasıl yönetiliyor?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Çevik yöntemlerle sprint bazlı planlama yapıyor, düzenli durum paylaşımlarıyla teknik yol haritasını şeffaf biçimde ilerletiyorum.",
        },
      },
      {
        "@type": "Question",
        name: "Hangi teknoloji yığınlarıyla çalışıyorsunuz?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "JavaScript/TypeScript tabanlı modern çerçeveler, .NET altyapısı ve bulut servisleriyle ürünlerinizi ihtiyaçlara göre ölçeklendiriyorum.",
        },
      },
    ],
  },
];

export const inlineScripts = {
  seoJsonLd: JSON.stringify(seoJsonLdData),
} as const;

export type InlineScriptKey = keyof typeof inlineScripts;

export function getInlineScript(key: InlineScriptKey) {
  return inlineScripts[key];
}
