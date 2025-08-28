import Breadcrumbs from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "MTD Software gizlilik politikası",
  robots: {
    index: true,
    follow: true,
  },
};

export default function GizlilikPage() {
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
            { label: "Gizlilik Politikası" },
          ]}
        />
        <h1 className="text-3xl font-bold">Gizlilik Politikası</h1>
        <p className="text-sm text-muted-foreground">Son güncelleme: {lastUpdated}</p>

        <nav aria-label="İçindekiler" className="space-y-2">
          <h2 className="text-2xl font-semibold">İçindekiler</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <a href="#toplanan-bilgiler" className="hover:underline">
                Toplanan Bilgiler
              </a>
            </li>
            <li>
              <a href="#bilgilerin-kullanimi" className="hover:underline">
                Bilgilerin Kullanımı
              </a>
            </li>
            <li>
              <a href="#bilgi-guvenligi" className="hover:underline">
                Bilgi Güvenliği
              </a>
            </li>
          </ol>
        </nav>

        <section id="toplanan-bilgiler" className="space-y-4">
          <h2 className="text-2xl font-semibold">Toplanan Bilgiler</h2>
          <p>İçerik buraya gelecek.</p>
        </section>

        <section id="bilgilerin-kullanimi" className="space-y-4">
          <h2 className="text-2xl font-semibold">Bilgilerin Kullanımı</h2>
          <p>İçerik buraya gelecek.</p>
        </section>

        <section id="bilgi-guvenligi" className="space-y-4">
          <h2 className="text-2xl font-semibold">Bilgi Güvenliği</h2>
          <p>İçerik buraya gelecek.</p>
        </section>
      </div>
    </section>
  );
}
