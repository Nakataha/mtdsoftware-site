import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "MTD Software olarak freelance geliştirici deneyimimi, ürün ekipleriyle kurduğum uzun soluklu iş birlikleri üzerinden tanıyın.",
};

const values = [
  {
    title: "Şeffaflık",
    description: "Süreçlerin her aşamasını paylaşır, riskleri erken yönetir ve ortak bir dil oluştururum.",
  },
  {
    title: "Sürekli öğrenme",
    description: "Teknolojiyi yakından takip eder, projelerinizin geleceğe hazır olmasını sağlarım.",
  },
  {
    title: "Sorumluluk",
    description: "Teslim ettiğim her işin operasyonel devamlılığını ve sürdürülebilirliğini üstlenirim.",
  },
];

const milestones = [
  {
    year: "2016",
    description: "Kurumsal SaaS ürünlerinde full-stack geliştirici olarak kariyere başlangıç.",
  },
  {
    year: "2019",
    description: "Finans ve perakende sektörlerinde büyük ölçekli entegrasyon projelerinde teknik liderlik.",
  },
  {
    year: "2022",
    description: "MTD Software markasıyla freelance danışmanlık ve ürün geliştirme hizmetlerinin hayata geçmesi.",
  },
  {
    year: "2024",
    description: "Uluslararası SaaS girişimleriyle uzun süreli iş birlikleri ve uzaktan ekip yönetimi.",
  },
];

export default function AboutPage() {
  return (
    <section className="border-b border-muted/60 bg-background">
      <div className="container flex flex-col gap-16 py-20">
        <header className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              Her projeye ürün odaklı yaklaşan freelance geliştirici
            </h1>
            <p className="text-base text-foreground/70">
              MTD Software adıyla bireysel olarak çalışıyorum. 8 yılı aşkın süredir ürün ekipleriyle birlikte modern
              web uygulamaları geliştiriyor, teknik borçları azaltıyor ve ölçülebilir değer üretiyorum.
            </p>
            <p className="text-base text-foreground/70">
              Proje yönetiminden mimari tasarıma, devops süreçlerinden kullanıcı deneyimi ölçümlemelerine kadar geniş bir
              perspektife sahibim. Her iş birliğinde ekibinizin uzaktan çalışan fakat tam zamanlı üyesi gibi hareket
              ederim.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/projeler"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Projelere göz at
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                İş birliği başlat
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-full w-full max-w-md items-center justify-center rounded-3xl border border-dashed border-primary/30 bg-muted/40 p-12 text-center text-xs uppercase tracking-wide text-foreground/60">
              Sade görseller için placeholder
            </div>
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-muted/60 bg-background/80 p-8 shadow-sm shadow-primary/5"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground">{value.title}</h2>
              <p className="mt-3 text-sm text-foreground/70">{value.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-muted/60 bg-muted/30 p-10">
          <h2 className="font-display text-3xl font-semibold text-foreground">Kısa kronoloji</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {milestones.map((item) => (
              <div key={item.year} className="flex gap-4">
                <span className="font-display text-2xl font-semibold text-primary">{item.year}</span>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
