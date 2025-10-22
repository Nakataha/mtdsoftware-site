import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    return {
      title: "Proje bulunamadı",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug) ?? notFound();

  return (
    <section className="border-b border-muted/60 bg-background">
      <div className="container flex flex-col gap-10 py-16">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Projeler", href: "/projeler" },
            { label: project.title },
          ]}
        />

        <header className="space-y-4">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">{project.title}</h1>
          <p className="max-w-3xl text-base text-foreground/70">{project.summary}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="space-y-6 text-sm text-foreground/75">
            <section className="space-y-2">
              <h2 className="font-display text-xl font-semibold text-foreground">Problem</h2>
              <p>{project.problem}</p>
            </section>
            <section className="space-y-2">
              <h2 className="font-display text-xl font-semibold text-foreground">Çözüm</h2>
              <p>{project.solution}</p>
            </section>
            <section className="space-y-2">
              <h2 className="font-display text-xl font-semibold text-foreground">Sonuç</h2>
              <p>{project.result}</p>
            </section>
          </article>

          <aside className="space-y-6 rounded-3xl border border-muted/60 bg-muted/20 p-8 text-sm text-foreground/75">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Teknolojiler</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-primary/30 px-3 py-1 text-xs uppercase tracking-wide">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Rollerim</h2>
              <ul className="mt-3 space-y-2">
                {project.roles.map((role) => (
                  <li key={role} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
            {project.links && project.links.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">Linkler</h2>
                <ul className="mt-3 space-y-2">
                  {project.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
