export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
}

export const services: Service[] = [
  {
    id: "kurumsal-web-siteleri",
    title: "Kurumsal Web Siteleri",
    description:
      "Next.js ve Tailwind ile hız, güvenlik ve içerik yönetimi kolaylığı sunan çok dilli kurumsal web siteleri.",
    benefits: [
      "Lighthouse 90+ skorlarını hedefleyen performans optimizasyonu",
      "Koyu/açık tema, içerik modülleri ve SEO yapılandırmaları",
      "Cloudflare veya Vercel üzerinde yayın, CDN ve temel güvenlik katmanları",
    ],
  },
  {
    id: "entegrasyon-ve-otomasyon",
    title: "Entegrasyon & Otomasyon",
    description:
      "Harici API'ler, dosya kaynakları ve iç sistemler arasında veri akışlarını otomatikleştiren çözümler.",
    benefits: [
      "CSV/Excel'den veritabanına güvenli aktarım ve doğrulama",
      "Zamanlanmış görevler, bildirim altyapıları ve raporlama",
      "Küçük panellerle operasyon ekipleri için yönetilebilirlik",
    ],
  },
  {
    id: "saas-ve-panel-gelistirme",
    title: "SaaS/Panel Geliştirme",
    description:
      "Rol tabanlı erişim, form akışları ve çoklu tenant yapılarıyla ölçeklenebilir SaaS panelleri.",
    benefits: [
      "Doğrulama, dosya yükleme ve otomasyon adımlarını kapsayan form süreçleri",
      "İzleme, loglama ve temel testlerle sürdürülebilir bakım",
      "Analiz, geliştirme ve dağıtım adımlarını kapsayan teslim yaklaşımı",
    ],
  },
];
