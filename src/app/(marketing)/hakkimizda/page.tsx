import Breadcrumbs from "@/components/breadcrumbs";

export default function HakkimizdaPage() {
  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Breadcrumbs
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Hakkımızda" },
          ]}
        />
        <h1 className="text-3xl font-bold">Hakkımızda</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Kısa Hikâye</h2>
          <p>Şirketin kuruluş hikâyesi ve gelişimi burada yer alacak.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Değerlerimiz</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Değer örneği 1</li>
            <li>Değer örneği 2</li>
            <li>Değer örneği 3</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Çalışma Biçimimiz</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Çalışma maddesi 1</li>
            <li>Çalışma maddesi 2</li>
            <li>Çalışma maddesi 3</li>
          </ul>
        </section>
      </div>
    </section>
  );
}

