import Breadcrumbs from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "MTD Software kullanım şartları",
  robots: {
    index: true,
    follow: true,
  },
};

export default function KullanimSartlariPage() {
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
            { label: "Kullanım Şartları" },
          ]}
        />
        <h1 className="text-3xl font-bold">Kullanım Şartları</h1>
        <p className="text-sm text-muted-foreground">Son güncelleme: {lastUpdated}</p>

        <nav aria-label="İçindekiler" className="space-y-2">
          <h2 className="text-2xl font-semibold">İçindekiler</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <a href="#kabul" className="hover:underline">
                Kabul ve Şartlar
              </a>
            </li>
            <li>
              <a href="#hizmet-kosullari" className="hover:underline">
                Hizmet Koşulları
              </a>
            </li>
            <li>
              <a href="#sorumluluk" className="hover:underline">
                Sorumluluk Reddi
              </a>
            </li>
          </ol>
        </nav>

        <section id="kabul" className="space-y-4">
          <h2 className="text-2xl font-semibold">Kabul ve Şartlar</h2>
          <p>İçerik buraya gelecek.</p>
        </section>

        <section id="hizmet-kosullari" className="space-y-4">
          <h2 className="text-2xl font-semibold">Hizmet Koşulları</h2>
          <p>İçerik buraya gelecek.</p>
        </section>

        <section id="sorumluluk" className="space-y-4">
          <h2 className="text-2xl font-semibold">Sorumluluk Reddi</h2>
          <p>İçerik buraya gelecek.</p>
        </section>
      </div>
    </section>
  );
}
