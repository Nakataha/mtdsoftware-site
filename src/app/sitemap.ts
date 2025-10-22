import type { MetadataRoute } from "next";
import projects from "@/data/projects"; // sende zaten var

const baseUrl = "https://www.mtdsoftware.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  // Statik sayfalar
  const staticRoutes = [
    "/",               // anasayfa
    "/hakkimizda",
    "/hizmetler",
    "/projeler",
    "/iletisim",
    "/kvkk",
    "/cerez",
  ];

  // Proje detay sayfaları (slug’ları data’dan geliyor)
  const projectRoutes = projects.map((p) => `/projeler/${p.slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
