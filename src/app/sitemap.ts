import { MetadataRoute } from "next";

const baseUrl = "https://mtdsoftware.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/kullanim-sartlari`,
      lastModified: new Date(),
    },
  ];
}
