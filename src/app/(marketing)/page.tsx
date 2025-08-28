import type { Metadata } from "next";
import Hero from "@/components/marketing/hero";
import Services from "@/components/marketing/services";

export const metadata: Metadata = {
  title: "Anasayfa",
  openGraph: {
    title: "Anasayfa",
    images: [
      {
        url: "/og?title=MTD%20Software&subtitle=Anasayfa",
        width: 1200,
        height: 630,
        alt: "MTD Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anasayfa",
    images: ["/og?title=MTD%20Software&subtitle=Anasayfa"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
    </>
  );
}
