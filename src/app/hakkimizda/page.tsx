import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";

const approach = [
  "İhtiyacı netleştir, küçük parçalara böl",
  "Önce prototip/demo, sonra iterasyon",
  "Performans, erişilebilirlik ve güvenlik",
  "Sürümleme, dokümantasyon ve geri dönüş (rollback) planı",
];

const highlights = [
  {
    label: "Teslim edilen proje",
    value: "10+",
    description: "Kurumsal web, otomasyon ve entegrasyon projeleri",
  },
  {
    label: "Ortalama sprint süresi",
    value: "2 hafta",
    description: "Şeffaf planlama ve ölçülebilir çıktılar",
  },
  {
    label: "Memnuniyet",
    value: "%100",
    description: "Her projede referans alınabilir teslimat",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/Nakataha" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mehmet-taha-demirci-ab8923197/" },
];

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Mehmet Taha Demirci — C#/.NET ve Next.js/TypeScript odaklı geliştirici. Kurumsal web, SaaS, API & otomasyon ve entegrasyon projeleri.",
};

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden border-b border-muted/60 bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,theme(colors.primary)/14%,transparent_55%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Hakkımda" },
          ]}
        />

        <header className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-primary">
              Mehmet Taha Demirci
            </p>

            {/* Sosyal bağlantılar (yapıyı bozmadan küçük ek) */}
            <div className="flex flex-wrap gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-muted/60 bg-background/60 px-3 py-1 text-xs text-foreground/70 hover:border-primary/40 hover:text-foreground transition"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              Kurumsal hedeflere odaklanan freelance yazılım geliştirici
            </h1>

            <p className="text-base text-foreground/70 sm:text-lg">
              İstanbul merkezli bir geliştirici olarak; <strong>C#/.NET</strong> ve <strong>Next.js/TypeScript</strong> ekosistemlerinde{" "}
              <strong>SaaS</strong> tabanlı mimariler, <strong>API &amp; otomasyon</strong> çözümleri ve kurumsal web projeleri geliştiriyorum.
              Ailemizin inşaat şirketi <strong>Asdem Yapı</strong> için yürüttüğüm dijital dönüşüm projeleriyle başlayan yolculuğum; bugün
              çoklu kiracı (multi-tenant) yapılar, entegrasyonlar ve yüksek performanslı arayüzlerle devam ediyor.
            </p>

            <p className="text-base text-foreground/70 sm:text-lg">
              Çalışma yaklaşımım; iş hedeflerini ve başarı metriklerini netleştirip sprint planına indirmek, prototiple hızla doğrulamak ve
              ölçülebilir çıktılarla ilerlemek üzerine kurulu. Teslim sonrası destek, gözlemlenebilirlik ve sürdürülebilirlik ilkelerini
              standart olarak uygularım.
            </p>
          </div>

          <div className="grid gap-4 rounded-3xl border border-muted/60 bg-background/95 p-8 shadow-lg shadow-primary/10">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.label}</p>
                <p className="mt-2 font-display text-3xl font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-xs text-foreground/60">{item.description}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid gap-8 rounded-3xl border border-muted/60 bg-background/95 p-8 shadow-lg shadow-primary/5 md:grid-cols-2 md:items-start">
          {/* Sol sütun: prensipler */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold text-foreground">Çalışma prensipleri</h2>
            <p className="text-sm text-foreground/70">
              Her projede sürdürülebilir kodlama standartlarını uygular, ölçülebilir hedefler belirler ve ekiplerle ortak bir dil geliştiririm.
              Süreç boyunca güncel dokümantasyon, düzenli durum toplantıları ve hızlı geri bildirim kültürü ile belirsizlikleri minimuma indiririm.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70">
              {approach.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ sütun: alan uzmanlığı (CV'den zenginleştirildi) */}
          <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-sm text-foreground/70">
            <h3 className="font-display text-2xl font-semibold text-foreground">Alan uzmanlığı</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Next.js, React, Tailwind ile kurumsal arayüzler ve hızlı prototipleme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>.NET &amp; C# ile entegrasyon, otomasyon ve REST API geliştirme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Entity Framework, SQL/PostgreSQL ile veri katmanı ve performans</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Multi-tenant SaaS mimarileri, rol bazlı yetkilendirme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>WordPress (Kadence) ile kurumsal site, SEO, performans ve güvenlik yapılandırmaları</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Bulut yayınlama (Vercel/Cloudflare), CI/CD ve gözlemlenebilirlik</span>
              </li>
            </ul>

            <p className="text-xs text-foreground/60">
              Deneyimden örnekler: Finans projelerinde .NET modülleri, Asdem Yapı kurumsal site modernizasyonu, sigorta teklif
              otomasyonu (çoklu oturum yönetimi) ve Unity tabanlı oyun prototipleri.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
