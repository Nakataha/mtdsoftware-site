export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: number;
  role: string;
  technologies: string[];
  outcomes: string[];
}

export const services: Service[] = [
  {
    id: "ozel-web-uygulamalari",
    title: "Özel Web Uygulamaları",
    description:
      "İş hedeflerinize göre ölçeklenebilir ve güvenli web uygulamaları geliştiriyorum.",
    benefits: [
      "React, Next.js ve TypeScript ile modern arayüzler",
      "Performans ve SEO odaklı mimari",
      "Bulut üzerinde CI/CD ve gözlemlenebilirlik",
    ],
  },
  {
    id: "sistem-entegrasyonlari",
    title: "Sistem Entegrasyonları",
    description:
      "Var olan yazılımlarınız ile üçüncü parti servisler arasında güvenli entegrasyonlar kuruyorum.",
    benefits: [
      "REST, GraphQL ve gRPC ile veri alışverişi",
      "Kimlik doğrulama ve yetkilendirme tasarımı",
      "Dokümantasyon ve devreye alma desteği",
    ],
  },
  {
    id: "teknik-danismanlik",
    title: "Teknik Danışmanlık",
    description:
      "Ürün ekiplerine teknik yol haritası, kod inceleme ve mimari danışmanlık sağlıyorum.",
    benefits: [
      "Sprint planlama ve önceliklendirme",
      "Kod kalitesi ve test stratejileri",
      "Takım içi bilgi paylaşımı ve eğitim",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "saha-yonetim-platformu",
    title: "Saha Yönetim Platformu",
    summary:
      "Saha ekiplerinin gerçek zamanlı takip edildiği ve iş akışlarının optimize edildiği SaaS çözümü.",
    description:
      "Saha ekipleri için rota optimizasyonu, görev takibi ve müşteri iletişimini tek bir panelde buluşturan SaaS platformunu sıfırdan tasarlayıp geliştirdim.",
    year: 2024,
    role: "Ürün geliştirici & teknik lider",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "AWS",
    ],
    outcomes: [
      "Görev tamamlama süresi %35 kısaldı",
      "Gerçek zamanlı bildirim altyapısı ile müşteri memnuniyeti arttı",
      "Bulut maliyetlerinde aylık %20 tasarruf sağlandı",
    ],
  },
  {
    slug: "e-ticaret-analiz-destegi",
    title: "E-ticaret Analiz Desteği",
    summary:
      "Satış ve pazarlama ekiplerine gerçek zamanlı içgörü sunan analitik dashboard projesi.",
    description:
      "Mevcut e-ticaret altyapısından gelen veri akışlarını birleştirerek satış ve kampanya performansını görselleştiren analitik dashboard geliştirdim.",
    year: 2023,
    role: "Full-stack geliştirici",
    technologies: [
      "Next.js",
      "Node.js",
      "ClickHouse",
      "Tailwind CSS",
      "Azure",
    ],
    outcomes: [
      "Rapor oluşturma süresi saatlerden dakikalara indi",
      "Kampanya dönüşüm oranında %18 artış",
      "C-suite seviyesinde self-servis raporlama",
    ],
  },
  {
    slug: "mobil-bankacilik-danismanligi",
    title: "Mobil Bankacılık Danışmanlığı",
    summary:
      "Kurumsal bankanın mobil uygulaması için performans ve güvenlik odaklı danışmanlık.",
    description:
      "Bankanın mobil uygulama ekiplerine performans iyileştirmeleri, güvenli kod geliştirme pratikleri ve DevOps süreçleri için yol haritası hazırladım.",
    year: 2022,
    role: "Teknik danışman",
    technologies: [
      "React Native",
      "TypeScript",
      "Jest",
      "Docker",
      "Kubernetes",
    ],
    outcomes: [
      "Uygulama açılış süresi %25 iyileşti",
      "CI/CD süreleri %40 kısaldı",
      "Penetrasyon testlerinden tam başarı ile geçti",
    ],
  },
];
