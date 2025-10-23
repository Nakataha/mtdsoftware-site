const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mtdsoftware.com.tr";

const organization = {
  "@type": "Organization",
  name: "MTD Software",
  url: siteUrl,
  email: "info@mtdsoftware.com.tr",
  logo: `${siteUrl}/MTD_Logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
};

const faqPage = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bir projeyi ne kadar sürede teslim ediyorsunuz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Projenin kapsamına göre süre değişmekle birlikte, küçük ölçekli projeler genellikle 2-4 hafta içinde tamamlanır.",
      },
    },
    {
      "@type": "Question",
      name: "Proje bütçeleri nasıl belirleniyor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bütçe, ihtiyaç analizi ve teknik gereksinimler doğrultusunda şeffaf bir şekilde belirlenir ve teklif olarak paylaşılır.",
      },
    },
    {
      "@type": "Question",
      name: "Proje sonrası destek sağlıyor musunuz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet, canlıya alma sonrasında bakım ve destek hizmetleri ayrı bir paket olarak sunulur.",
      },
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, faqPage],
};

export default function SeoJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
