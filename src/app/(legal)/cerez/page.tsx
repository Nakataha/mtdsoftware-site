import Breadcrumbs from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "MTD Software çerez kullanımı hakkında kısa bilgilendirme.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="space-y-6 text-sm text-foreground/75">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Çerez Politikası" },
        ]}
      />

      <header className="space-y-3">
        <h1 className="font-display text-4xl font-semibold text-foreground">Çerez Politikası</h1>
        <p>
          Web sitemizde yalnızca sitenin çalışması için zorunlu olan ve ziyaret deneyiminizi iyileştiren çerezler
          kullanıyoruz. Bu çerezler oturum sürekliliği, güvenlik ve temel trafik ölçümü gibi amaçlara hizmet eder.
        </p>
        <p>
          Tarayıcınızın ayarları üzerinden çerez tercihlerinizi yönetebilir veya silebilirsiniz. Sorularınız için
          info@mtdsoftware.com.tr adresi üzerinden bize ulaşabilirsiniz.
        </p>
      </header>
    </div>
  );
}
