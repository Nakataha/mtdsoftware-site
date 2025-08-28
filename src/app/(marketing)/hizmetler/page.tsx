import Breadcrumbs from "@/components/breadcrumbs";

export default function HizmetlerPage() {
  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Hizmetler" },
          ]}
        />
        <h1 className="text-3xl font-bold">Hizmetler</h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">SaaS Geliştirme</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium">Kapsam</h3>
              <p>Proje gereksinimleri ve hedefleri burada özetlenecek.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Teslimatlar</h3>
              <p>Bu hizmet kapsamında sunulacak çıktıların listesi.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Süre &amp; Yaklaşım</h3>
              <p>Zaman çizelgesi ve çalışma metodolojisi açıklaması.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Teknik Stack Örnekleri</h3>
              <p>Kullanılabilecek teknolojilere örnekler.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Teknik Danışmanlık</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium">Kapsam</h3>
              <p>Danışmanlık alanlarının genel çerçevesi.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Teslimatlar</h3>
              <p>Raporlar, öneriler ve diğer çıktılar.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Süre &amp; Yaklaşım</h3>
              <p>İş birlik süresi ve izlenen yöntemler.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Teknik Stack Örnekleri</h3>
              <p>Önerilen araç ve teknolojiler.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Ürün Tasarımı</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium">Kapsam</h3>
              <p>Tasarım sürecinin aşamaları ve hedefleri.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Teslimatlar</h3>
              <p>Wireframe, prototip ve diğer görsel çıktılar.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Süre &amp; Yaklaşım</h3>
              <p>Proje süresi ve kullanılacak yöntem.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Teknik Stack Örnekleri</h3>
              <p>Tasarım araçları ve teknolojilerine örnekler.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

