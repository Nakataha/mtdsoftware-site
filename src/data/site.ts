export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
}

export const services = [
  {
    id: "kurumsal-web",
    title: "Kurumsal Web Siteleri",
    description:
      "Next.js ve WordPress tabanlı, çok dilli ve yüksek performanslı kurumsal web çözümleri geliştiriyorum.",
    benefits: [
      "Lighthouse 90+ performans skorları",
      "Koyu/açık tema, çok dilli içerik, SEO optimizasyonu",
      "Cloudflare CDN ve güvenlik yapılandırmaları",
    ],
  },
  {
    id: "api-entegrasyon",
    title: "API & Otomasyon Geliştirme",
    description:
      ".NET ve TypeScript tabanlı otomasyon sistemleriyle veri toplama, API entegrasyonu ve süreç optimizasyonu sağlarım.",
    benefits: [
      "REST API & mikro servis mimarileri",
      "Headless browser otomasyonları",
      "Zamanlanmış görevler ve bildirim altyapısı",
    ],
  },
  {
    id: "saas-platformlari",
    title: "SaaS Platformları & Paneller",
    description:
      "Çoklu tenant (multi-tenant) yapılar, rol bazlı erişim ve CI/CD destekli SaaS platformları inşa ediyorum.",
    benefits: [
      "Rol tabanlı yetkilendirme",
      "Form akışları, doğrulama, dosya yükleme",
      "Gözlemlenebilirlik ve sürüm yönetimi",
    ],
  },
  {
    id: "performans-guvenlik",
    title: "Performans & Güvenlik",
    description:
      "Cloudflare, Turnstile ve SEO analizleriyle ölçülebilir performans ve güvenlik optimizasyonları.",
    benefits: [
      "WAF, cache ve DNS yapılandırmaları",
      "Form güvenliği (reCAPTCHA/Turnstile)",
      "GTMetrix & Core Web Vitals iyileştirmeleri",
    ],
  },
  {
    id: "oyun-gelistirme",
    title: "Oyun & Prototip Geliştirme",
    description:
      "Unity 3D/2D ortamlarında oyun mekanikleri, seviye tasarımı ve prototipleme süreçleri geliştiriyorum.",
    benefits: [
      "Hızlı prototipleme ve test",
      "Performans optimizasyonu",
      "Yayın süreci ve versiyon yönetimi",
    ],
  },
];

