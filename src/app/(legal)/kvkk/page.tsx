import Breadcrumbs from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK",
  description: "MTD Software KVKK bilgilendirmesi.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function KvkkPage() {
  return (
    <div className="space-y-6 text-sm text-foreground/75">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "KVKK" },
        ]}
      />

      <header className="space-y-3">
        <h1 className="font-display text-4xl font-semibold text-foreground">KVKK Aydınlatma Metni</h1>
        <p>
          MTD Software olarak iletişim formları ve proje süreçlerinde paylaştığınız kişisel verileri yalnızca talep
          değerlendirme, teklif oluşturma ve sözleşme süreçlerini yürütmek amacıyla işleriz. Verileriniz yetkisiz
          kişilerle paylaşılmaz ve mevzuatın öngördüğü süre boyunca güvenle saklanır.
        </p>
        <p>
          KVKK kapsamındaki haklarınızı kullanmak veya veri işleme faaliyetleri hakkında bilgi almak isterseniz
          info@mtdsoftware.com.tr adresine e-posta gönderebilirsiniz.
        </p>
      </header>
    </div>
  );
}
