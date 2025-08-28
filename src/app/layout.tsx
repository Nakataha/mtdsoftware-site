import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MTD Software",
  description: "MTD Software resmi sitesi",
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
