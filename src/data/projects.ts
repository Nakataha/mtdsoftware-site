export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  technologies: string[];
  roles: string[];
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: "asdem-yapi",
    title: "Asdem Yapı — Kurumsal Site Revizyonu",
    excerpt:
      "Çok dilli, koyu/açık tema, performans ve güvenlik odaklı yeni arayüz; WordPress üzerine özel geliştirmeler.",
    summary:
      "Aile şirketimizin kurumsal web sitesini WordPress + Kadence altyapısı üzerinde yeniden tasarladım; çok dilli içerik, tema geçişi ve Lighthouse 90+ skorlarını hedefleyen optimizasyonlar uyguladım.",
    problem:
      "Eski site tek dilli, mobilde yavaş ve içerik güncellemelerinde manuel hatalara açıktı; satış ekibinin güncel referansları paylaşması zorlaştı.",
    solution:
      "WordPress üzerinde çok dilli içerik yönetimi, koyu/açık tema desteği ve Cloudflare üzerinden CDN/Güvenlik katmanları kurdum; SMTP entegrasyonu ve özel bloklarla içerik güncellemelerini sadeleştirdim.",
    result:
      "Lighthouse raporlarında 90+ skorları yakalandı, iletişim formlarındaki teslimat oranı %100'e çıktı ve içerik güncellemeleri yarı zamana indi.",
    technologies: ["WordPress", "Kadence", "Cloudflare", "SMTP/Google"],
    roles: ["Analiz", "Geliştirme", "Dağıtım"],
  },
  {
    slug: "atay-sigorta",
    title: "Atay Sigorta — Teklif Toplayıcı (POC)",
    excerpt:
      "Oturum yönetimi, çoklu firma akışı ve sonuç paneli sunan sigorta teklif toplayıcı POC.",
    summary:
      "Sigorta acenteleri için farklı firmalardaki teklif formlarını tek panelde toplayan bir POC geliştirdim; oturum yönetimi ve sonuç paneliyle süreç izlenebilir hale geldi.",
    problem:
      "Acenteler her teklif için ayrı portallara giriyor, veri girişlerini tekrarlıyor ve sonuçları manuel olarak toparlıyordu.",
    solution:
      ".NET tabanlı arka uç ve TypeScript otomasyon scriptleriyle formları headless browser üzerinden dolduran, sonuçları normalize edip panelde gösteren bir akış hazırladım.",
    result:
      "Teklif hazırlama süresi 15 dakikadan 3 dakikaya düştü, manuel hata oranı gözle görülür şekilde azaldı ve süreç demo sonrası yatırıma değer bulundu.",
    technologies: [".NET", "TypeScript", "Headless Browser", "Otomasyon"],
    roles: ["Analiz", "Geliştirme", "Dağıtım"],
  },
  {
    slug: "galeri-otomasyon",
    title: "Galeri Otomasyon — Envanter Takibi",
    excerpt:
      "Araç ilan senkronizasyonu, raporlar ve kullanıcı rolleri bulunan envanter takip sistemi.",
    summary:
      "Galerinin tüm araç stoğunu merkezi bir panelden yönetmesini sağlayan Node.js tabanlı envanter sistemi kurdum; ilan platformlarıyla senkronizasyon ve çok seviyeli yetkilendirme sağladım.",
    problem:
      "Excel tabloları ile takip edilen stokta güncel olmayan ilanlar ve yetkisiz değişiklikler müşteri kaybına yol açıyordu.",
    solution:
      "Node.js/TypeScript REST API'si, PostgreSQL şeması ve arka plan işler ile ilan senkronizasyonu geliştirdim; rol tabanlı erişim ve raporlama ekranları ekledim.",
    result:
      "Yanlış ilan oranı %80 azaldı, stok raporları günlük olarak otomatik hazırlandı ve ekip rollerine göre yetkilendirme netleşti.",
    technologies: ["Node.js", "TypeScript", "REST API", "PostgreSQL"],
    roles: ["Analiz", "Geliştirme", "Dağıtım"],
  },
  {
    slug: "csv-db-portali",
    title: "CSV→DB Portalı",
    excerpt:
      "CSV içe aktarım, doğrulama, tablo görüntüleme ve dışa aktarma işlevlerine sahip web portalı.",
    summary:
      "Ofis ekibinin Excel dosyalarını güvenle veritabanına aktarması için Next.js tabanlı bir portal geliştirdim; doğrulama adımları ve tablo görünümleri ile süreç izlenebilir hale geldi.",
    problem:
      "CSV dosyaları manuel olarak veritabanına aktarılıyor, hatalı satırlar fark edilmiyor ve raporlamada gecikme yaşanıyordu.",
    solution:
      "Next.js, Prisma ve MySQL üzerinde çok adımlı içe aktarma akışı, satır bazlı doğrulama ve toplu dışa aktarma özellikleri oluşturup rol tabanlı erişim tanımladım.",
    result:
      "Aktarım hataları %90 azaldı, veri onay süreci dakikalara indi ve ekipler güncel raporları tek tuşla paylaşabilir hale geldi.",
    technologies: ["Next.js", "Prisma", "MySQL"],
    roles: ["Analiz", "Geliştirme", "Dağıtım"],
  },
];
