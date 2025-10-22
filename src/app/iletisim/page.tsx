import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Projenizden kısaca bahsedin; 24 saat içinde dönüş yaparım.",
};

export default function ContactPage() {
  return (
    <section className="border-b border-muted/60 bg-background">
      <div className="container flex flex-col gap-10 py-16">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "İletişim" },
          ]}
        />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">İletişim</h1>
          <p className="max-w-2xl text-base text-foreground/70">
            Projenizden kısaca bahsedin; 24 saat içinde dönüş yaparım.
          </p>
        </header>

        <form className="grid gap-4 rounded-2xl border border-muted/60 bg-background/80 p-8 shadow-sm shadow-primary/5">
          <label className="flex flex-col gap-2 text-sm text-foreground/70">
            Ad Soyad
            <input
              type="text"
              placeholder="Ad Soyad"
              className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-foreground/70">
            E-posta
            <input
              type="email"
              placeholder="ornek@firma.com"
              className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-foreground/70">
            Konu
            <input
              type="text"
              placeholder="Proje veya ihtiyaç başlığı"
              className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-foreground/70">
            Mesaj
            <textarea
              rows={5}
              placeholder="Kısa bir özet, hedefler ve zaman planı"
              className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <label className="flex items-start gap-3 text-xs text-foreground/60">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-muted/60 text-primary focus:ring-primary/40" />
            <span>
              KVKK onayını kabul ediyorum ve mesajımın info@mtdsoftware.com.tr adresine iletilmesini onaylıyorum.
            </span>
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Gönder
          </button>
        </form>
      </div>
    </section>
  );
}
