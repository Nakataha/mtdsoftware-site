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
    <section className="border-b border-muted/60 bg-background">
      <div className="container flex flex-col gap-8 py-16">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Projeler" },
          ]}
        />

        <header className="space-y-3">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">Projeler</h1>
          <p className="max-w-3xl text-base text-foreground/70">
            Seçili işler ve POC’lerden bazıları. Benzer bir çalışmaya ihtiyacınız varsa yazın.
          </p>
        </header>

        <div className="grid gap-6">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-3xl border border-muted/60 bg-background/80 p-8 shadow-sm shadow-primary/5"
            >
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-2xl font-semibold text-foreground">{project.title}</h2>
                <p className="text-sm text-foreground/70">{project.excerpt}</p>
                <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-primary/20 px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div>
                  <Link
                    href={`/projeler/${project.slug}`}
                    className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    Detay
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
