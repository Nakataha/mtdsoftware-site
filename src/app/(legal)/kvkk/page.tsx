import Breadcrumbs from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK",
  description:
    "MTD Software projelerinde kişisel verilerin işlenmesine dair aydınlatma metni ve iletişim kanalları.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function KvkkPage() {
  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "KVKK" },
        ]}
      />

      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Veri Güvenliği
        </span>
        <h1 className="font-display text-4xl font-semibold text-foreground">KVKK Aydınlatma Metni</h1>
        <p className="text-base text-foreground/70">
          MTD Software olarak kişisel verilerinizi; proje taleplerinizi değerlendirmek, teknik çözümler önermek ve sözleşme
          süreçlerini yürütmek amacıyla işleriz. Verileriniz hiçbir koşulda üçüncü kişilerle paylaşılmaz ve yalnızca mevzuatın
          zorunlu kıldığı süre boyunca saklanır.
        </p>
      </header>

      <div className="space-y-8">
        <section className="rounded-3xl border border-muted/60 bg-background/95 p-6 shadow-lg shadow-primary/10">
          <h2 className="font-display text-xl font-semibold text-foreground">Veri sorumlusu ve iletişim</h2>
          <p className="mt-3">
            Veri sorumlusu sıfatıyla MTD Software, info@mtdsoftware.com.tr ve +90 507 008 27 34 iletişim kanalları üzerinden
            başvurularınızı kabul eder. Talepleriniz en geç 30 gün içerisinde yazılı olarak yanıtlanır.
          </p>
        </section>

        <section className="grid gap-6 rounded-3xl border border-muted/60 bg-background/95 p-6 shadow-lg shadow-primary/10 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">İşlenen veri kategorileri</h2>
            <ul className="space-y-2">
              {[
                "Kimlik ve iletişim bilgileri (ad-soyad, e-posta, telefon)",
                "Proje detayları, teknik beklentiler ve bütçe notları",
                "Sözleşme ve faturalandırma süreçleri için zorunlu tutulan bilgiler",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-foreground/75">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-foreground">İşleme amaçlarımız</h2>
            <ul className="space-y-2">
              {[
                "İletişim taleplerine yanıt vermek ve teklif süreçlerini yönetmek",
                "Proje kapsamı, zaman planı ve teslimat gereksinimlerini kayıt altına almak",
                "Sözleşme, faturalandırma ve hukuki yükümlülüklerimizi yerine getirmek",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-foreground/75">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-muted/60 bg-background/95 p-6 shadow-lg shadow-primary/10">
          <h2 className="font-display text-xl font-semibold text-foreground">Saklama süreleri</h2>
          <p className="mt-3">
            Proje iletişim kayıtları ve sözleşme evrakları, ilgili mevzuatta belirtilen azami süreler boyunca saklanır. Dijital
            veriler şifreli ortamda tutulur ve erişim yetkileri düzenli olarak gözden geçirilir. Saklama süresi dolan veriler
            güvenli yöntemlerle imha edilir.
          </p>
        </section>

        <section className="rounded-3xl border border-muted/60 bg-background/95 p-6 shadow-lg shadow-primary/10">
          <h2 className="font-display text-xl font-semibold text-foreground">Haklarınız</h2>
          <p className="mt-3">
            KVKK’nın 11. maddesi uyarınca verilerinize ilişkin bilgi talep etme, düzeltme, silme veya işlemeyi kısıtlama gibi
            haklara sahipsiniz. Başvurularınızı info@mtdsoftware.com.tr adresine ileterek tüm süreçlere dair bilgi alabilir ve
            haklarınızı kullanabilirsiniz.
          </p>
        </section>

        <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5 text-xs text-foreground/70">
          <p>
            Son güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long" })}. Yasal düzenlemeler
            doğrultusunda metin güncellendiğinde bu sayfadan paylaşılır.
          </p>
        </div>
      </div>
    </div>
  );
}
