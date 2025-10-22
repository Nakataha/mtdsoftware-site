import Breadcrumbs from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK",
  description: "MTD Software KVKK aydınlatma metni",
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = "10 Mayıs 2024";

export default function KvkkPage() {
  return (
    <div className="space-y-10 text-sm text-foreground/75">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "KVKK" },
        ]}
      />
      <header className="space-y-3">
        <h1 className="font-display text-4xl font-semibold text-foreground">KVKK Aydınlatma Metni</h1>
        <p className="text-xs uppercase tracking-wide text-foreground/50">
          Son güncelleme: {lastUpdated}
        </p>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, MTD Software olarak müşterilerimizin, iş
          ortaklarımızın ve ziyaretçilerimizin kişisel verilerinin güvenliğini önemsiyoruz. Bu metin, kişisel verilerinizi
          hangi amaçlarla işlediğimizi, hukuki sebeplerimizi ve haklarınızı açıklamaktadır.
        </p>
      </header>

      <nav aria-label="İçindekiler" className="rounded-2xl border border-muted/60 bg-muted/30 p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">İçindekiler</h2>
        <ol className="mt-3 space-y-2 text-sm">
          <li>
            <a href="#veri-sorumlusu" className="text-primary hover:text-primary/80">
              1. Veri sorumlusu ve iletişim
            </a>
          </li>
          <li>
            <a href="#islenen-veriler" className="text-primary hover:text-primary/80">
              2. İşlenen kişisel veriler ve amaçlar
            </a>
          </li>
          <li>
            <a href="#aktarim" className="text-primary hover:text-primary/80">
              3. Veri aktarımı ve saklama süreleri
            </a>
          </li>
          <li>
            <a href="#haklar" className="text-primary hover:text-primary/80">
              4. İlgili kişi hakları
            </a>
          </li>
        </ol>
      </nav>

      <section id="veri-sorumlusu" className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">1. Veri sorumlusu ve iletişim</h2>
        <p>
          Veri sorumlusu sıfatıyla MTD Software, kişisel verilerinizi KVKK ve ilgili mevzuata uygun olarak işler. Veri
          sorumlusu ile info@mtdsoftware.com adresine e-posta göndererek iletişime geçebilirsiniz.
        </p>
      </section>

      <section id="islenen-veriler" className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">2. İşlenen kişisel veriler ve amaçlar</h2>
        <p>İşlediğimiz başlıca veriler ve işleme amaçlarımız:</p>
        <ul className="space-y-2">
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>
              İletişim formu üzerinden ilettiğiniz ad, soyad, e-posta ve telefon bilgileri; teklif hazırlamak ve size geri
              dönüş yapmak için işlenir.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>
              Proje detayları ve mesaj içerikleri; hizmet kapsamının belirlenmesi ve sözleşme yönetimi amaçlarıyla
              saklanır.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>
              Zorunlu çerezler aracılığıyla toplanan teknik veriler; sitenin güvenliği ve performansının sağlanması için
              kullanılır.
            </span>
          </li>
        </ul>
      </section>

      <section id="aktarim" className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">3. Veri aktarımı ve saklama süreleri</h2>
        <p>
          Kişisel verileriniz, hizmetlerin sağlanması için gerekli olduğu durumlarda yurt içindeki iş ortaklarıyla veya
          bulut hizmet sağlayıcılarıyla paylaşılabilir. Hukuki yükümlülüklerin yerine getirilmesi dışında üçüncü taraflara
          aktarım yapılmaz. Veriler, ilgili hizmetin tamamlanmasını takiben en fazla 2 yıl süreyle saklanır ve ardından
          güvenli şekilde imha edilir.
        </p>
      </section>

      <section id="haklar" className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">4. İlgili kişi hakları</h2>
        <p>
          KVKK’nın 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işleme amaçlarını
          sorgulama, eksik veya yanlış işlenen verilerin düzeltilmesini isteme ve silinmesini talep etme haklarına
          sahipsiniz. Haklarınızı kullanmak için info@mtdsoftware.com adresine e-posta gönderebilirsiniz.
        </p>
      </section>
    </div>
  );
}
