import Breadcrumbs from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "MTD Software web sitesinde kullanılan çerez türleri, amaçları ve yönetim seçenekleri hakkında bilgilendirme.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Çerez Politikası" },
        ]}
      />

      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Şeffaflık ve Güven
        </span>
        <h1 className="font-display text-4xl font-semibold text-foreground">Çerez Politikası</h1>
        <p className="text-base text-foreground/70">
          Ziyaret deneyiminizi geliştirmek, güvenlik kontrollerini sağlamak ve temel trafik ölçümleri yapmak için minimum
          düzeyde çerez kullanıyoruz. Çerez tercihlerinizi dilediğiniz zaman tarayıcınız üzerinden yönetebilirsiniz.
        </p>
      </header>

      <div className="space-y-8">
        <section className="rounded-3xl border border-muted/60 bg-background/95 p-6 shadow-lg shadow-primary/10">
          <h2 className="font-display text-xl font-semibold text-foreground">Kullandığımız çerez türleri</h2>
          <ul className="mt-4 space-y-3">
            {[
              {
                title: "Zorunlu çerezler",
                description:
                  "Site oturumlarının sürekliliğini sağlar, güvenlik denetimlerini yürütür ve iletişim formlarının sorunsuz çalışmasını garanti eder.",
              },
              {
                title: "Performans çerezleri",
                description:
                  "Sayfa görüntülenme sayıları ve hata raporları gibi anonim metrikleri takip ederek deneyimi optimize etmemize yardımcı olur.",
              },
            ].map((cookie) => (
              <li key={cookie.title} className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <h3 className="font-semibold text-foreground">{cookie.title}</h3>
                <p className="mt-1 text-foreground/70">{cookie.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-muted/60 bg-background/95 p-6 shadow-lg shadow-primary/10">
          <h2 className="font-display text-xl font-semibold text-foreground">Çerez tercihlerinizi yönetme</h2>
          <p className="mt-3">
            Çoğu tarayıcı çerezleri otomatik olarak kabul eder; ancak ayarlar menüsünden çerezleri reddedebilir veya mevcut
            çerezleri silebilirsiniz. Çerezleri devre dışı bırakmanız halinde sitenin bazı fonksiyonları beklenen şekilde
            çalışmayabilir.
          </p>
        </section>

        <section className="rounded-3xl border border-muted/60 bg-background/95 p-6 shadow-lg shadow-primary/10">
          <h2 className="font-display text-xl font-semibold text-foreground">Sorularınız için</h2>
          <p className="mt-3">
            Çerez kullanımıyla ilgili tüm sorularınızı info@mtdsoftware.com.tr adresine iletebilirsiniz. Talepleriniz en kısa
            sürede değerlendirilir ve KVKK politikamız doğrultusunda yanıtlanır.
          </p>
        </section>
      </div>
    </div>
  );
}
