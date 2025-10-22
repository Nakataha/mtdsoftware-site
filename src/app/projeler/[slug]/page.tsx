import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import { projects } from "@/data/site";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const { slug } = params;
  const project = projects.find((item) => item.slug === slug);

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
  const { slug } = params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

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
        <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {project.year} · {project.role}
            </span>
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-base text-foreground/70">{project.summary}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-full w-full max-w-md items-center justify-center rounded-3xl border border-dashed border-primary/30 bg-muted/40 p-12 text-center text-xs uppercase tracking-wide text-foreground/60">
              Sade görseller için placeholder
            </div>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="space-y-6 text-sm text-foreground/70">
            <p>{project.description}</p>
            <p>
              Proje boyunca ürün ekibiyle birlikte kullanıcı ihtiyaçlarını analiz ettik, teknik yol haritasını
              belirledik ve iteratif teslimatlarla hızlı geri bildirim topladık. Kod kalitesi ve otomasyon odaklı
              yaklaşımımız sayesinde yeni özellikler risksiz şekilde yayına alındı.
            </p>
            <p>
              Yüksek erişilebilirlik, gözlemlenebilirlik ve sürdürülebilir maliyet optimizasyonu hedefleri doğrultusunda
              modern altyapı standartları uygulandı. Güvenlik değerlendirmeleri ve performans testleri ile canlı ortamın
              stabilitesi garanti altına alındı.
            </p>
          </article>
          <aside className="space-y-6 rounded-3xl border border-muted/60 bg-muted/30 p-8 text-sm text-foreground/70">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Teknolojiler</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-primary/30 px-3 py-1 text-xs uppercase tracking-wide text-foreground/70">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Elde edilen sonuçlar</h2>
              <ul className="mt-3 space-y-3">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Benzer bir projeye mi ihtiyacınız var?</h2>
              <p className="mt-2 text-xs text-foreground/65">
                İhtiyaçlarınıza uygun çözümü birlikte tasarlayalım. Ücretsiz ön görüşme için iletişim formunu
                kullanabilirsiniz.
              </p>
              <Link
                href="/iletisim"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                İletişim Formu
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
