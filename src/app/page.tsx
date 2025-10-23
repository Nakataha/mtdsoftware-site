import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/data/site";
import { projects } from "@/data/projects";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Anasayfa",
  description:
    "MTD Software — .NET, Next.js ve SaaS tabanlı yazılım çözümleri. Kurumsal web siteleri, API entegrasyonları ve otomasyon projeleriyle dijital dönüşümü hızlandırıyoruz.",
};

export default function HomePage() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden border-b border-muted/40 bg-gradient-to-br from-background via-primary/10 to-primary/5">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-[90%] max-w-5xl rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div className="container mx-auto grid max-w-6xl gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left */}
          <div className="mx-auto flex max-w-2xl flex-col gap-8 text-center lg:mx-0 lg:text-left">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm shadow-primary/10 lg:mx-0 dark:bg-muted/60">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Kurumsal & Freelance Yazılım Geliştirici
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Kurumsal hedeflerinize hız kazandıran modern yazılım çözümleri
            </h1>
            <p className="text-lg text-foreground/70">
              .NET ve Next.js teknolojileriyle ölçeklenebilir, performanslı ve sürdürülebilir yazılım çözümleri
              geliştiriyorum. API entegrasyonlarından SaaS platformlarına kadar tüm süreci uçtan uca yönetiyor, kurumların
              dijital dönüşümünü hızlandırıyorum.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start lg:items-center lg:justify-start">
              <Link
                href="/projeler"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
              >
                Projelere Göz At
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full border border-primary/40 px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                İletişime Geç
              </Link>
            </div>
            <div className="grid gap-4 rounded-3xl border border-muted/40 bg-white/70 p-6 shadow-xl shadow-primary/10 sm:grid-cols-3 dark:bg-muted/60">
              <div className="space-y-2">
                <p className="text-3xl font-semibold text-primary">10+</p>
                <p className="text-sm text-foreground/60">Teslim edilen proje</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-semibold text-primary">%100</p>
                <p className="text-sm text-foreground/60">Müşteri memnuniyeti</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-semibold text-primary">7/24</p>
                <p className="text-sm text-foreground/60">Destek & İzleme</p>
              </div>
            </div>
          </div>

          {/* Right — Expertise Card */}
          <div className="relative mx-auto flex h-full max-w-lg items-center justify-center lg:mx-0">
            <div className="relative w-full rounded-[36px] border border-primary/20 bg-white/90 p-8 shadow-2xl shadow-primary/20 dark:bg-muted/80">
              <div
                className="absolute -right-6 -top-6 hidden h-20 w-20 rounded-3xl bg-primary/30 blur-lg lg:block"
                aria-hidden
              />
              <div className="space-y-4 text-center text-sm text-foreground/70">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
                  Uzmanlık Alanları
                </p>
                <p className="text-base font-medium text-foreground">
                  Kurumsal web siteleri, SaaS platformları, API & otomasyon projeleriyle güvenilir teknik çözüm ortağınız.
                </p>
                <div className="grid grid-cols-2 gap-3 text-left text-xs">
                  {[
                    "Kurumsal Web & SEO",
                    "API & Otomasyon",
                    "Performans & Güvenlik",
                    "CI/CD & DevOps",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-2xl bg-primary/5 px-3 py-2 text-foreground/70"
                    >
                      <span
                        className="inline-flex h-1.5 w-1.5 rounded-full bg-primary"
                        aria-hidden
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICES === */}
      <section className="bg-background" id="hizmetler">
        <div className="container mx-auto max-w-6xl py-24">
          <div className="mb-16 flex flex-col gap-4 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
              Hizmetler
            </span>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Ölçülebilir ve sürdürülebilir yazılım hizmetleri
            </h2>
            <p className="mx-auto max-w-3xl text-base text-foreground/70">
              Fikir aşamasından canlıya kadar, kurumsal odaklı yazılım çözümleri geliştiriyorum. Modüler yapılar ve sprint
              bazlı teslimatlar sayesinde iş hedeflerinize hızla uyum sağlarım.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group flex h-full flex-col gap-5 rounded-3xl border border-muted/50 bg-white/90 p-8 shadow-lg shadow-primary/10 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary/20 dark:bg-muted/70"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-foreground">{service.title}</h3>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    {service.benefits.length} avantaj
                  </span>
                </div>
                <p className="text-sm text-foreground/70">{service.description}</p>
                <ul className="mt-2 space-y-3 text-sm text-foreground/65">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span
                        className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-primary"
                        aria-hidden
                      />
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
        </div>
      </section>

      {/* === PROJECTS === */}
      <section className="relative border-y border-muted/40 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-primary/20 blur-3xl lg:block" aria-hidden />
        <div className="container mx-auto max-w-6xl py-24">
          <div className="mb-16 flex flex-col gap-4 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
              Projeler
            </span>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Öne çıkan başarı hikayeleri
            </h2>
            <p className="mx-auto max-w-3xl text-base text-foreground/70">
              Gerçek dünyadaki ihtiyaçlara yanıt veren projeler. Kurumsal web, otomasyon, API ve SaaS çözümleriyle
              performans, güvenlik ve sürdürülebilirliği bir arada sunuyorum.
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="flex flex-col gap-6 rounded-3xl border border-muted/50 bg-white/90 p-10 shadow-xl shadow-primary/10 transition-all hover:-translate-y-1 hover:shadow-primary/20 dark:bg-muted/70"
              >
                <div className="flex flex-col gap-3 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">Ürün geliştirme</p>
                  <h3 className="font-display text-2xl font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-foreground/70">{project.excerpt}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projeler/${project.slug}`}
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Projeyi İncele
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Link
              href="/projeler"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Tüm projeleri gör
            </Link>
          </div>
        </div>
      </section>

      {/* === CONTACT CTA === */}
      <section className="bg-background">
        <div className="container mx-auto max-w-5xl py-24">
          <div className="rounded-4xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-primary/20 p-12 text-center shadow-xl shadow-primary/20 dark:from-primary/10 dark:via-muted/80 dark:to-primary/20">
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Birlikte üretmeye hazır mısınız?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70">
              Projenizi paylaşın, teknik fizibilite, yol haritası ve teslimat planı ile en kısa sürede dönüş sağlayayım.
              MTD Software olarak; şeffaf, ölçeklenebilir ve ölçülebilir yazılım çözümleri geliştiriyoruz.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
              >
                İletişim Formu
              </Link>
              <Link
                href="mailto:info@mtdsoftware.com.tr"
                className="inline-flex items-center justify-center rounded-full border border-primary/40 px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                info@mtdsoftware.com.tr
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
