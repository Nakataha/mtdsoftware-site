# MTD Software – Site Gereksinimleri

## Amaç
SaaS & danışmanlık odaklı kurumsal web: hızlı, temiz, güvenli.

## Teknoloji
- Next.js (App Router, TS), Tailwind, (ops) shadcn/ui
- SEO: next/metadata, sitemap.xml, robots.txt
- Analytics: (ops) Vercel Analytics ya da GA4
- Performans: Image optimization, lazy, prefetch

## Sayfalar
- / (Home), /services, /about, /contact
- (ops) /blog (sonra)
- 404/500 custom

## UI/Brand
- Renkler: #1F6FEB, #111827, #22d3ee, arkaplan açık/koyu destek
- Font: Inter + Space Grotesk
- Stil: sade, kurumsal, güven veren

## Kabul Kriterleri (genel)
- Erişilebilirlik: Lighthouse a11y ≥ 90
- CLS/LCP iyi; build ve preview yeşil
- ESLint temiz; tip hatası yok
- .env’ler gizli, repo’ya sızmaz
