import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";

const approach = [
  "İhtiyacı netleştir, küçük parçalara böl",
  "Önce prototip/demo, sonra iterasyon",
  "Performans, erişilebilirlik ve güvenlik",
];

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Mehmet Taha Demirci hakkında kısa biyografi ve projelere yaklaşım: Next.js/TypeScript odaklı geliştirici.",
};

export default function AboutPage() {
  return (
    <section className="border-b border-muted/60 bg-background">
      <div className="container flex flex-col gap-8 py-16">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Hakkımda" },
          ]}
        />

        <header className="space-y-4">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">Hakkımda</h1>
          <p className="max-w-3xl text-base text-foreground/70">
            Ben Mehmet Taha Demirci. İstanbul’da yaşıyorum. 1+ yıldır C#/.NET ile çalışıyor, web tarafında
            Next.js/TypeScript ağırlıklı projeler geliştiriyorum. Ailemizin inşaat şirketi Asdem Yapı’nın kurumsal
            dönüşümü ve çeşitli otomasyon/entegrasyon projeleri üzerinde çalıştım. Basit çözümler, iyi dokümantasyon ve
            düzenli teslim benim için kritik.
          </p>
        </header>

        <section className="rounded-2xl border border-muted/60 bg-background/80 p-8 shadow-sm shadow-primary/5">
          <h2 className="font-display text-2xl font-semibold text-foreground">Yaklaşım</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            {approach.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
