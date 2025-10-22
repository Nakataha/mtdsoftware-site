import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Gerçek müşterilerle tamamlanan SaaS, entegrasyon ve danışmanlık projelerinden seçilmiş örnekler.",
};

export default function ProjectsPage() {
  return (
    <section className="border-b border-muted/60 bg-background">
      <div className="container flex flex-col gap-12 py-20">
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            Başarı hikayeleri
          </h1>
          <p className="text-base text-foreground/70">
            Farklı sektörlerde değer üreten projelerden elde ettiğim deneyimler; her yeni iş birliğinde daha hızlı ve
            daha etkili sonuçlar sunmamı sağlıyor.
          </p>
        </header>

        <div className="grid gap-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="grid gap-8 rounded-3xl border border-muted/60 bg-muted/30 p-10 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-foreground/60">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{project.year}</span>
                  <span>{project.role}</span>
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground">{project.title}</h2>
                <p className="text-sm text-foreground/70">{project.summary}</p>
                <p className="text-sm text-foreground/65">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-primary/20 px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2 text-sm text-foreground/70">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projeler/${project.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Proje detayları →
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex h-full w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-background/80 p-10 text-center text-xs uppercase tracking-wide text-foreground/60">
                  Sade görseller için placeholder
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
