import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Projeleriniz için hızlıca iletişime geçin. E-posta, telefon veya toplantı talebiyle freelance geliştirici desteği alın.",
};

export default function ContactPage() {
  return (
    <section className="border-b border-muted/60 bg-background">
      <div className="container grid gap-12 py-20 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            Bir mesaj kadar uzağınızdayım
          </h1>
          <p className="text-base text-foreground/70">
            Projenizin kapsamını, zaman planını ve beklentilerinizi paylaşın. 24 saat içerisinde detaylı geri dönüş
            sağlayıp sonraki adımları belirleyelim.
          </p>
          <div className="rounded-3xl border border-muted/60 bg-muted/30 p-8 text-sm text-foreground/70">
            <p className="font-semibold text-foreground">Ofis saatleri</p>
            <p className="mt-1">Hafta içi 09:00 – 18:00 (GMT+3)</p>
            <p className="mt-4 font-semibold text-foreground">Ön görüşme formatı</p>
            <p className="mt-1">30 dakikalık video görüşmesi veya yazılı değerlendirme</p>
          </div>
          <div className="space-y-4 text-sm text-foreground/70">
            <div>
              <p className="text-xs uppercase tracking-wide text-foreground/50">E-posta</p>
              <Link href="mailto:info@mtdsoftware.com" className="text-lg font-semibold text-primary">
                info@mtdsoftware.com
              </Link>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-foreground/50">Telefon</p>
              <Link href="tel:+905551112233" className="text-lg font-semibold text-primary">
                +90 555 111 22 33
              </Link>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-foreground/50">Takvim</p>
              <Link
                href="https://cal.com/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Çevrim içi toplantı planla →
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-stretch">
          <div className="flex w-full flex-col gap-6 rounded-3xl border border-muted/60 bg-background/80 p-10 shadow-sm shadow-primary/5">
            <h2 className="font-display text-2xl font-semibold text-foreground">İhtiyacınızı paylaşın</h2>
            <p className="text-sm text-foreground/70">
              Kısa bir mesaj bile işinizi anlamam için yeterli olacaktır. Form gönderimlerinin tamamı doğrudan e-posta
              kutuma düşer.
            </p>
            <form className="space-y-4">
              <label className="flex flex-col gap-2 text-sm text-foreground/70">
                Adınız
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-foreground/70">
                E-posta adresiniz
                <input
                  type="email"
                  placeholder="ornek@firma.com"
                  className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-foreground/70">
                Proje notlarınız
                <textarea
                  rows={5}
                  placeholder="Kısa bir özet, hedefler ve zaman planı"
                  className="rounded-xl border border-muted/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Mesajı Gönder
              </button>
            </form>
            <p className="text-xs text-foreground/50">
              Form henüz arka uç ile bağlı değildir; doğrudan e-posta göndermek isterseniz info@mtdsoftware.com adresine
              yazabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
