import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://mtdsoftware.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MTD Software",
    template: "%s | MTD Software",
  },
  description: "MTD Software resmi sitesi",
  openGraph: {
    title: "MTD Software",
    description: "MTD Software resmi sitesi",
    url: siteUrl,
    siteName: "MTD Software",
    images: [
      {
        url: "/og?title=MTD%20Software&subtitle=MTD%20Software%20resmi%20sitesi",
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
    title: "MTD Software",
    description: "MTD Software resmi sitesi",
    images: [
      "/og?title=MTD%20Software&subtitle=MTD%20Software%20resmi%20sitesi",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
