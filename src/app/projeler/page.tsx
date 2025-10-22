import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Seçili işler ve POC’lerden bazıları. Benzer bir çalışmaya ihtiyacınız varsa yazın.",
};

export default function ProjectsPage() {
  return (
    <section className="bg-background">
      <div className="container mx-auto flex max-w-6xl flex-col gap-12 py-20">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Projeler" },
          ]}
        />

        <header className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
            Proje portföyü
          </span>
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            Başarıya ulaşan projelerden seçkiler
          </h1>
          <p className="max-w-3xl text-base text-foreground/70">
            Ürün ekipleriyle birlikte geliştirdiğim projeler, performans, ölçeklenebilirlik ve kullanıcı deneyimine odaklanarak kurumsal hedefleri destekler.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-muted/40 bg-white/90 p-8 shadow-lg shadow-primary/10 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary/20 dark:bg-muted/70"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">{project.industry ?? "Kurumsal çözüm"}</p>
                  <h2 className="font-display text-2xl font-semibold text-foreground">{project.title}</h2>
                </div>
                <p className="text-sm text-foreground/70">{project.excerpt}</p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projeler/${project.slug}`}
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/30 transition-transform hover:-translate-y-0.5"
                >
                  Detayları Görüntüle
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
