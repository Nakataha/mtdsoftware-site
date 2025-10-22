import Breadcrumbs from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "MTD Software çerez politikası ve kullanım detayları",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="space-y-10 text-sm text-foreground/75">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Çerez Politikası" },
        ]}
      />
      <header className="space-y-3">
        <h1 className="font-display text-4xl font-semibold text-foreground">Çerez Politikası</h1>
        <p>
          MTD Software olarak web sitemizde kullandığımız çerez türleri ve bunların yönetimi hakkında sizi
          bilgilendiriyoruz. Çerezler, deneyiminizi iyileştirmek ve güvenliği sağlamak için kullanılan küçük metin
          dosyalarıdır.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">Kullandığımız çerez türleri</h2>
        <ul className="space-y-2">
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>
              <strong>Zorunlu çerezler:</strong> Sitenin temel işlevlerini sağlayan ve oturum sürekliliğini koruyan çerezlerdir.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>
              <strong>Performans çerezleri:</strong> Site kullanımını anonim olarak analiz ederek içerikleri optimize etmemize yardımcı olur.
            </span>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">Çerezlerin yönetimi</h2>
        <p>
          Tarayıcınızın ayarlarını değiştirerek çerezleri kabul edebilir, reddedebilir veya belirli çerezler için uyarı
          alabilirsiniz. Çerezlerin devre dışı bırakılması bazı site özelliklerinin düzgün çalışmamasına sebep olabilir.
          Aşağıdaki bağlantılar üzerinden sık kullanılan tarayıcıların çerez yönetimi yönergelerine ulaşabilirsiniz:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:text-primary/80">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/kb/cookies-enabling-and-disabling" className="text-primary hover:text-primary/80">
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-primary hover:text-primary/80">
              Safari
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">Veri güvenliği</h2>
        <p>
          Çerezler aracılığıyla toplanan veriler yalnızca belirtilen amaçlar için kullanılır ve KVKK kapsamındaki
          yükümlülüklerimize uygun şekilde saklanır. Sorularınız için info@mtdsoftware.com adresinden bize ulaşabilirsiniz.
        </p>
      </section>
    </div>
  );
}
