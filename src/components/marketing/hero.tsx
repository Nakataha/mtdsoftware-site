import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          SaaS &amp; Danışmanlık ile daha hızlı ürünleşin
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Modern SaaS çözümleri ve uzman danışmanlıkla fikirlerinizi hızla piyasaya sunun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-primary text-white font-medium"
          >
            Teklif Al
          </Link>
          <Link
            href="/hizmetler"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-md border border-foreground/20"
          >
            Hizmetler
          </Link>
        </div>
      </div>
    </section>
  );
}
