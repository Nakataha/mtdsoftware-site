import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";

const siteUrl = "https://mtdsoftware.com";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MTD Software | Freelance Yazılım Geliştirici",
    template: "%s | MTD Software",
  },
  description:
    "Freelance yazılım geliştirici olarak modern web projeleri, SaaS ürünleri ve teknik danışmanlık sunuyorum.",
  openGraph: {
    title: "MTD Software | Freelance Yazılım Geliştirici",
    description:
      "Freelance yazılım geliştirici olarak modern web projeleri, SaaS ürünleri ve teknik danışmanlık sunuyorum.",
    url: siteUrl,
    siteName: "MTD Software",
    images: [
      {
        url: "/og?title=MTD%20Software&subtitle=Freelance%20Yaz%C4%B1l%C4%B1m%20Geli%C5%9Ftirici",
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
    images: [
      "/og?title=MTD%20Software&subtitle=Freelance%20Yaz%C4%B1l%C4%B1m%20Geli%C5%9Ftirici",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
