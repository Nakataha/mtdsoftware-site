import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";

const serviceSections = [
  {
    id: "kurumsal-web-siteleri",
    title: "Kurumsal Web Siteleri",
    items: [
      "Next.js, Tailwind, Lighthouse 90+",
      "Çok dilli, koyu/açık tema, SEO",
      "Cloudflare/Vercel yayın ve CDN",
    ],
  },
  {
    id: "entegrasyon-ve-otomasyon",
    title: "Entegrasyon & Otomasyon",
    items: [
      "Harici API’ler, CSV/Excel → DB",
      "Zamanlanmış görevler, bildirimler",
      "Basit paneller ve raporlama",
    ],
  },
  {
    id: "saas-ve-panel-gelistirme",
    title: "SaaS/Panel Geliştirme",
    items: [
      "Rol tabanlı erişim, çoklu tenant",
      "Form akışları, doğrulama, dosya yükleme",
      "İzleme, loglama, temel testler",
    ],
  },
];

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Kurumsal web siteleri, entegrasyon ve otomasyon projeleri ile SaaS/panel geliştirme hizmetlerinin özeti.",
};

export default function ServicesPage() {
  return (
    <section className="border-b border-muted/60 bg-background">
      <div className="container flex flex-col gap-10 py-16">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Hizmetler" },
          ]}
        />

        <header className="space-y-4">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">Hizmetler</h1>
          <p className="max-w-2xl text-base text-foreground/70">
            Küçük adımlı teslimlerle ilerleyen projeler kuruyorum. Kapsamı netleştirip erken demo alır, süreci
            yazılı olarak dokümante eder ve ekiplerinize devredilebilir çözümler sunarım.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {serviceSections.map((section) => (
            <article
              key={section.title}
              id={section.id}
              className="flex flex-col gap-4 rounded-2xl border border-muted/60 bg-background/80 p-8 shadow-sm shadow-primary/5"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground">{section.title}</h2>
              <ul className="space-y-2 text-sm text-foreground/70">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-sm text-foreground/70">
          <h2 className="font-display text-xl font-semibold text-foreground">Teslim yaklaşımı</h2>
          <p className="mt-3">
            Küçük adımlı geliştirme, erken demo ve yazılı dokümantasyon benim için standart. Her sprint sonunda canlı
            senaryo ve notları paylaşır, sonraki adımları birlikte planlarız.
          </p>
        </div>
      </div>
    </section>
  );
}
