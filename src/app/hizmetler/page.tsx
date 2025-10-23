import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";

const serviceSections = [
  {
    id: "kurumsal-web-siteleri",
    title: "Kurumsal Web Siteleri",
    items: [
      "Next.js, Tailwind ve Lighthouse 90+ performans skorları",
      "Çok dilli yapı, koyu/açık tema, gelişmiş SEO optimizasyonu",
      "Cloudflare CDN, SSL, SMTP ve güvenli Vercel dağıtımı",
    ],
  },
  {
    id: "api-ve-otomasyon",
    title: "API & Otomasyon Geliştirme",
    items: [
      "C#/.NET tabanlı REST API ve mikro servis yapıları",
      "Harici sistem entegrasyonları, otomatik veri toplama",
      "Headless browser, planlanmış görevler, e-posta bildirimleri",
    ],
  },
  {
    id: "saas-platformlari",
    title: "SaaS Platformları & Panel Geliştirme",
    items: [
      "Rol tabanlı erişim, çoklu tenant (multi-tenant) yapı",
      "Form akışları, doğrulama, dosya yükleme ve raporlama",
      "CI/CD, gözlemlenebilirlik ve versiyon yönetimi",
    ],
  },
  {
    id: "performans-ve-guvenlik",
    title: "Performans & Güvenlik Optimizasyonu",
    items: [
      "Ölçülebilir performans (Lighthouse, GTMetrix, Core Web Vitals)",
      "reCAPTCHA, Turnstile ve WAF korumalarıyla form güvenliği",
      "Cloudflare cache, DNS ve SSL yapılandırmaları",
    ],
  },
  {
    id: "oyun-ve-prototip-gelistirme",
    title: "Oyun & Prototip Geliştirme",
    items: [
      "Unity 3D/2D oyun mekanikleri ve seviye tasarımı",
      "Prototip üretimi, sahne geçişleri ve ekip koordinasyonu",
      "Oyun içi test, performans optimizasyonu ve sürüm yönetimi",
    ],
  },
];

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Kurumsal web siteleri, API entegrasyonları, SaaS platformları, performans optimizasyonu ve oyun geliştirme alanlarında profesyonel yazılım hizmetleri.",
};

export default function ServicesPage() {
  return (
    <section className="relative overflow-hidden border-b border-muted/60 bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary)/12%,transparent_55%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Hizmetler" },
          ]}
        />

        <header className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-primary">
              Uçtan uca kurumsal yazılım teslimi
            </p>
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              Net kapsamlı, ölçülebilir ve sürdürülebilir yazılım projeleri
            </h1>
            <p className="text-base text-foreground/70 sm:text-lg">
              MTD Software olarak; kurumların dijital altyapılarını güçlendiren, süreçlerini otomatikleştiren ve kullanıcı
              deneyimini önceliklendiren çözümler geliştiriyoruz. Her proje; analiz, prototip, sprint ve teslim aşamalarında
              şeffaf raporlanır, sürdürülebilir kodlama standartlarıyla canlıya alınır.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-primary/30 bg-primary/5 p-6 text-sm text-foreground/70 shadow-lg shadow-primary/10">
            <p className="font-display text-xl font-semibold text-foreground">Birlikte nasıl ilerleriz?</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>İhtiyaç, risk ve başarı kriterlerini birlikte tanımlarız.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Her sprint sonunda çalışan prototipler ve metrikler sunarız.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Devredilebilir kod, teknik dokümantasyon ve eğitim teslim ederiz.</span>
              </li>
            </ul>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceSections.map((section) => (
            <article
              key={section.title}
              id={section.id}
              className="flex flex-col gap-5 rounded-3xl border border-muted/60 bg-background/90 p-8 shadow-sm shadow-primary/10 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{section.title}</span>
                <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">Öne çıkan çıktılar</h2>
              </div>
              <ul className="space-y-3 text-sm text-foreground/70">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="grid gap-8 rounded-3xl border border-muted/60 bg-background/95 p-8 shadow-lg shadow-primary/5 md:grid-cols-[2fr_3fr] md:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold text-foreground">
              Teknik mükemmeliyet için kurumsal standartlar
            </h2>
            <p className="text-sm text-foreground/70">
              Performans, güvenlik ve sürdürülebilirlik ölçümlerini proje başında belirler; her teslimatta raporlarız.
              Kod incelemeleri, CI/CD süreçleri, testler ve gözden geçirme oturumlarıyla riskleri erkenden kontrol altına alırız.
              Her projede hedef; sadece teslim etmek değil, sürdürülebilir bir ürün inşa etmektir.
            </p>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-primary">Teslim Süreçleri</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">Sprint bazlı planlama & raporlama</dd>
              <p className="mt-1 text-xs text-foreground/60">Ürün ekipleriyle ortak ritim ve şeffaf süreç yönetimi.</p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-primary">Teknik İzlenebilirlik</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">CI/CD, testler ve gözlemlenebilirlik</dd>
              <p className="mt-1 text-xs text-foreground/60">Her ortamda aynı kaliteyi garanti ederiz.</p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-primary">Bilgi Transferi</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">Detaylı dokümantasyon & eğitim</dd>
              <p className="mt-1 text-xs text-foreground/60">Ekipleriniz için sürdürülebilir devri kolaylaştırır.</p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-primary">Destek</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">Go-live sonrası 30 gün destek</dd>
              <p className="mt-1 text-xs text-foreground/60">Canlıya geçiş sonrası kritik süreçleri birlikte izleriz.</p>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
