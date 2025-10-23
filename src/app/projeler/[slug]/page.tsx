import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: { slug: string };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mtdsoftware.com.tr";

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

  const canonical = `/projeler/${project.slug}`;
  const ogImage = `/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.summary)}`;

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `${siteUrl}${canonical}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    alternates: {
      canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [ogImage],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug) ?? notFound();

  return (
    <section className="relative overflow-hidden border-b border-muted/60 bg-gradient-to-br from-background via-primary/10 to-primary/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-20%] hidden w-1/2 bg-primary/20 blur-3xl lg:block"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Projeler", href: "/projeler" },
            { label: project.title },
          ]}
        />

        <header className="space-y-6 text-center lg:text-left">
          {project.industry && (
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {project.industry}
            </span>
          )}
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">{project.title}</h1>
          <p className="mx-auto max-w-3xl text-base text-foreground/70 lg:mx-0">{project.summary}</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
          <article className="space-y-8 rounded-3xl border border-muted/60 bg-background/95 p-8 text-sm text-foreground/75 shadow-xl shadow-primary/10">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-foreground">Problem</h2>
              <p>{project.problem}</p>
            </section>
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-foreground">Çözüm</h2>
              <p>{project.solution}</p>
            </section>
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-foreground">Sonuç</h2>
              <p>{project.result}</p>
            </section>
          </article>

          <aside className="space-y-6 rounded-3xl border border-muted/60 bg-background/80 p-8 text-sm text-foreground/75 shadow-xl shadow-primary/10 backdrop-blur">
            <div className="space-y-3">
              <h2 className="font-display text-lg font-semibold text-foreground">Teknolojiler</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-wide text-primary">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-lg font-semibold text-foreground">Rollerim</h2>
              <ul className="space-y-2">
                {project.roles.map((role) => (
                  <li key={role} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
            {project.links && project.links.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-display text-lg font-semibold text-foreground">Linkler</h2>
                <ul className="space-y-2">
                  {project.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {link.label}
                        <span aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <div className="rounded-3xl border border-primary/30 bg-primary/10 p-8 text-center text-sm text-foreground/70 shadow-lg shadow-primary/20 lg:text-left">
          <h2 className="font-display text-2xl font-semibold text-foreground">Benzer bir projeyi birlikte hayata geçirelim</h2>
          <p className="mt-3">
            İhtiyaçlarınızı paylaşmak ve projeniz için teknik yol haritası oluşturmak isterseniz iletişim formunu kullanabilir
            veya doğrudan info@mtdsoftware.com.tr adresine yazabilirsiniz.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              İletişim Formu
            </Link>
            <Link
              href="mailto:info@mtdsoftware.com.tr"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              info@mtdsoftware.com.tr
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
