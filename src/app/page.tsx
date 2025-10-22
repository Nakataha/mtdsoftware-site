import Link from "next/link";
import type { Metadata } from "next";
import { projects, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Anasayfa",
  description:
    "Freelance yazılım geliştirici olarak web uygulamaları, sistem entegrasyonları ve teknik danışmanlık sunuyorum.",
};

export default function HomePage() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <>
      <section className="border-b border-muted/50 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Freelance Yazılım Geliştirici
            </span>
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              İş hedeflerinizi hızlandıran modern yazılım çözümleri
            </h1>
            <p className="text-lg text-foreground/70">
              Ürün ekiplerine uçtan uca web geliştirme, entegrasyon ve danışmanlık hizmetleri sunarak sürdürülebilir
              büyümeyi destekliyorum.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/projeler"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Projelere Göz At
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                İletişime Geç
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-semibold text-primary">10+</p>
                <p className="text-sm text-foreground/60">Yıldır üretimde olan projeler</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-primary">%99</p>
                <p className="text-sm text-foreground/60">Müşteri memnuniyeti</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-primary">24/7</p>
                <p className="text-sm text-foreground/60">Proaktif destek ve izleme</p>
              </div>
            </div>
          </div>
          <div className="flex h-full items-center justify-center">
            <div className="flex w-full max-w-md items-center justify-center rounded-3xl border border-dashed border-primary/30 bg-muted/40 p-12 text-center text-sm text-foreground/60">
              Sade görseller için placeholder
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20" id="hizmetler">
        <div className="mb-12 flex flex-col gap-4 text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">Hizmetler</h2>
          <p className="mx-auto max-w-2xl text-base text-foreground/70">
            Ürün ekipleriyle birlikte çalışarak fikirden canlıya kadar tüm süreçlerde yanınızdayım. Ölçeklenebilir
            mimari, temiz kod ve sürdürülebilir teslimata odaklanıyorum.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col gap-4 rounded-2xl border border-muted/60 bg-background/80 p-8 shadow-sm shadow-primary/5"
            >
              <h3 className="font-display text-2xl font-semibold text-foreground">{service.title}</h3>
              <p className="text-sm text-foreground/70">{service.description}</p>
              <ul className="mt-2 space-y-2 text-sm text-foreground/65">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/hizmetler#${service.id}`}
                className="mt-auto inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Detayları İncele →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-muted/50 bg-muted/40">
        <div className="container py-20">
          <div className="mb-12 flex flex-col gap-4 text-center">
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">Öne Çıkan Projeler</h2>
            <p className="mx-auto max-w-2xl text-base text-foreground/70">
              İş ortaklarım için geliştirdiğim projelerden seçtiklerim. Veriye dayalı karar alma ve sürekli teslimat
              kültürüyle değer üreten çözümler.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="flex flex-col gap-6 rounded-3xl border border-muted/60 bg-background p-8"
              >
                <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-muted/50 text-sm text-foreground/60">
                  Sade görseller için placeholder
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-foreground/60">
                    <span>{project.year}</span>
                    <span>{project.role}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-foreground/70">{project.summary}</p>
                  <Link
                    href={`/projeler/${project.slug}`}
                    className="mt-auto inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Projeyi İncele →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/projeler"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Tüm projeleri gör
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="rounded-3xl border border-muted/60 bg-primary/5 p-10 text-center shadow-sm shadow-primary/10">
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Birlikte üretmeye hazır mısınız?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70">
            İhtiyacınızı birkaç cümleyle paylaşın; teknik değerlendirme, yol haritası ve teslimat planıyla en kısa sürede
            size dönüş yapayım.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              İletişim Formu
            </Link>
            <Link
              href="mailto:info@mtdsoftware.com"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              info@mtdsoftware.com
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
