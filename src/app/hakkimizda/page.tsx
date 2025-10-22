import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";

const approach = [
  "İhtiyacı netleştir, küçük parçalara böl",
  "Önce prototip/demo, sonra iterasyon",
  "Performans, erişilebilirlik ve güvenlik",
];

const highlights = [
  {
    label: "Teslim edilen proje",
    value: "20+",
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

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Mehmet Taha Demirci hakkında kısa biyografi ve projelere yaklaşım: Next.js/TypeScript odaklı geliştirici.",
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
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              Kurumsal hedeflere odaklanan freelance yazılım geliştirici
            </h1>
            <p className="text-base text-foreground/70 sm:text-lg">
              İstanbul merkezli bir geliştirici olarak; Next.js, TypeScript ve .NET ekosistemlerinde uzmanlaştım. Ailemizin
              inşaat şirketi Asdem Yapı için yürüttüğüm dijital dönüşüm projeleriyle başlayan yolculuğum, bugün SaaS ürünleri,
              entegrasyonlar ve kurumsal web platformlarıyla devam ediyor.
            </p>
            <p className="text-base text-foreground/70 sm:text-lg">
              Her iş birliğinde, iş hedeflerini ve başarı metriklerini netleştirip, sürdürülebilir ve devredilebilir çözümler
              tasarlamayı önceliklendiriyorum.
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
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold text-foreground">Çalışma prensipleri</h2>
            <p className="text-sm text-foreground/70">
              Her projede sürdürülebilir kodlama standartlarını uygular, ölçülebilir hedefler belirler ve ekiplerle ortak bir dil
              geliştiririm. Süreç boyunca güncel dokümantasyon, düzenli durum toplantıları ve hızlı geri bildirim kültürü ile
              belirsizlikleri minimuma indiririm.
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
          <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-sm text-foreground/70">
            <h3 className="font-display text-2xl font-semibold text-foreground">Alan uzmanlığı</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Next.js, React, Tailwind, kurumsal UI sistemleri</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>.NET & C# ile entegrasyon, otomasyon ve API geliştirme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Bulut yayınlama, CI/CD ve gözlemlenebilirlik süreçleri</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Ürün yönetimi ekipleriyle çevik iş birliği</span>
              </li>
            </ul>
            <p className="text-xs text-foreground/60">
              İş ortaklarıma, projelerin uzun ömürlü ve kurum kültürüne uygun ilerlemesi için stratejik danışmanlık da sunuyorum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
