import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Projenizden kısaca bahsedin; 24 saat içinde dönüş yaparım.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden border-b border-muted/60 bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.primary)/12%,transparent_55%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "İletişim" },
          ]}
        />

        <header className="space-y-4">
          <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-primary">
            Hızlı ve şeffaf iletişim
          </p>
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">İletişim</h1>
          <p className="max-w-3xl text-base text-foreground/70 sm:text-lg">
            Projenizin hedeflerini, süresini ve beklenen çıktıları birkaç cümleyle paylaşın. 24 saat içinde teknik değerlendirme
            ve sonraki adımlarla dönüş yaparım.
          </p>
        </header>

        <div className="grid gap-8 rounded-3xl border border-muted/60 bg-background/95 p-8 shadow-lg shadow-primary/10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start">
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">İletişim kanalları</h2>
              <p className="mt-3 text-sm text-foreground/70">
                İlk görüşmeleri çevrim içi toplantı veya yazılı iletişimle gerçekleştiriyorum. İhtiyaçlarınıza göre uygun çalışma
                modelini ve teslim planını birlikte belirleriz.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-foreground/70">
              <li className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">E-posta</p>
                <a href="mailto:info@mtdsoftware.com.tr" className="mt-2 inline-flex text-base font-medium text-foreground hover:text-primary">
                  info@mtdsoftware.com.tr
                </a>
                <p className="mt-1 text-xs text-foreground/60">Tüm talepler kayıt altına alınır ve en geç 24 saat içinde cevaplanır.</p>
              </li>
              <li className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Telefon</p>
                <a href="tel:+905555555555" className="mt-2 inline-flex text-base font-medium text-foreground hover:text-primary">
                  +90 (555) 555 55 55
                </a>
                <p className="mt-1 text-xs text-foreground/60">Hafta içi 09:00-18:00 arasında doğrudan iletişim.</p>
              </li>
              <li className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Ofis</p>
                <p className="mt-2 text-base font-medium text-foreground">İstanbul / Türkiye</p>
                <p className="mt-1 text-xs text-foreground/60">Randevu ile yüz yüze toplantı organize edebiliriz.</p>
              </li>
            </ul>
          </div>

          <form className="grid gap-4 rounded-3xl border border-muted/60 bg-background/90 p-6 text-sm text-foreground/70 shadow-inner shadow-primary/5">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Ad Soyad
              </label>
              <input
                id="name"
                type="text"
                placeholder="Adınız Soyadınız"
                className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                placeholder="ornek@firma.com"
                className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Şirket / Organizasyon
              </label>
              <input
                id="company"
                type="text"
                placeholder="Firma veya ekip adı"
                className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Konu
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Proje veya ihtiyaç başlığı"
                className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Mesaj
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Kısa bir özet, hedefler ve zaman planı"
                className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <label className="flex items-start gap-3 text-xs text-foreground/60">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-muted/60 text-primary focus:ring-primary/40" />
              <span>
                KVKK onayını kabul ediyorum ve mesajımın info@mtdsoftware.com.tr adresine iletilmesini onaylıyorum.
              </span>
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
