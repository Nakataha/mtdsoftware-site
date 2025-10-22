import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Özel web uygulamaları, sistem entegrasyonları ve teknik danışmanlık hizmetleri ile ürün ekiplerine uçtan uca destek.",
};

export default function ServicesPage() {
  return (
    <section className="border-b border-muted/60 bg-background">
      <div className="container flex flex-col gap-16 py-20">
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            İşinizi ileri taşıyan uçtan uca hizmetler
          </h1>
          <p className="text-base text-foreground/70">
            Teknik kararları sadeleştiren, ekipler arası uyumu artıran ve üretime hız kazandıran çözümler sunuyorum.
            Her hizmet alanı, gerçek proje deneyimleriyle şekillendi.
          </p>
        </header>

        <div className="grid gap-10">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="grid gap-8 rounded-3xl border border-muted/60 bg-muted/30 p-10 lg:grid-cols-[1.2fr_1fr]"
            >
              <div className="space-y-4">
                <h2 className="font-display text-3xl font-semibold text-foreground">{service.title}</h2>
                <p className="text-sm text-foreground/70">{service.description}</p>
                <ul className="space-y-3 text-sm text-foreground/70">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex h-full w-full max-w-sm items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-background/80 p-10 text-center text-xs uppercase tracking-wide text-foreground/60">
                  Sade görseller için placeholder
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-primary/30 bg-primary/10 p-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            Projenizi konuşalım
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/70">
            Teknik ihtiyaçlarınızı birkaç cümleyle paylaşmanız yeterli. Detayları birlikte planlayıp yol haritası
            hazırlayalım.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Hemen İletişime Geç
            </Link>
            <Link
              href="mailto:info@mtdsoftware.com"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              info@mtdsoftware.com
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
