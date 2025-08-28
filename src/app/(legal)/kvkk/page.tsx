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

export default function KvkkPage() {
  const lastUpdated = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "KVKK" },
          ]}
        />
        <h1 className="text-3xl font-bold">KVKK Aydınlatma Metni</h1>
        <p className="text-sm text-muted-foreground">Son güncelleme: {lastUpdated}</p>

        <nav aria-label="İçindekiler" className="space-y-2">
          <h2 className="text-2xl font-semibold">İçindekiler</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <a href="#veri-sorumlusu" className="hover:underline">
                Veri Sorumlusu
              </a>
            </li>
            <li>
              <a href="#toplanan-veriler" className="hover:underline">
                Toplanan Veriler
              </a>
            </li>
            <li>
              <a href="#haklariniz" className="hover:underline">
                Haklarınız
              </a>
            </li>
          </ol>
        </nav>

        <section id="veri-sorumlusu" className="space-y-4">
          <h2 className="text-2xl font-semibold">Veri Sorumlusu</h2>
          <p>İçerik buraya gelecek.</p>
        </section>

        <section id="toplanan-veriler" className="space-y-4">
          <h2 className="text-2xl font-semibold">Toplanan Veriler</h2>
          <p>İçerik buraya gelecek.</p>
        </section>

        <section id="haklariniz" className="space-y-4">
          <h2 className="text-2xl font-semibold">Haklarınız</h2>
          <p>İçerik buraya gelecek.</p>
        </section>
      </div>
    </section>
  );
}
