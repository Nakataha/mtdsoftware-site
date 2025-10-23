import type { Metadata } from "next";
import { headers } from "next/headers";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SeoJsonLd from "@/components/SeoJsonLd";
import { CSP_NONCE_HEADER_NAME } from "@/lib/security/csp";
import { inter, spaceGrotesk } from "./fonts";
import "./globals.css";

const fallbackSiteUrl = "https://www.mtdsoftware.com.tr";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;

const ogImage = "/og?title=MTD%20Software&subtitle=Freelance%20Yaz%C4%B1l%C4%B1m%20Geli%C5%9Ftirici";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MTD Software | Freelance Yazılım Geliştirici",
    template: "%s | MTD Software",
  },
  description:
    "Freelance yazılım geliştirici olarak modern web projeleri, SaaS ürünleri ve teknik danışmanlık sunuyorum.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "MTD Software | Freelance Yazılım Geliştirici",
    description:
      "Freelance yazılım geliştirici olarak modern web projeleri, SaaS ürünleri ve teknik danışmanlık sunuyorum.",
    url: siteUrl,
    siteName: "MTD Software",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "MTD Software",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MTD Software | Freelance Yazılım Geliştirici",
    description:
      "Freelance yazılım geliştirici olarak modern web projeleri, SaaS ürünleri ve teknik danışmanlık sunuyorum.",
    images: [ogImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const cspNonce = headerList.get(CSP_NONCE_HEADER_NAME) ?? undefined;

  return (
    <html
      lang="tr"
      className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <SeoJsonLd nonce={cspNonce} />
      </body>
    </html>
  );
}
