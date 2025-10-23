import type { MetadataRoute } from "next";
import { projects } from "@/data/projects"; // <-- default değil, named

const fallbackSiteUrl = "https://www.mtdsoftware.com.tr";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/hakkimizda",
    "/hizmetler",
    "/projeler",
    "/iletisim",
    "/gizlilik",
    "/cerez",
    "/kullanim-sartlari",
    "/kvkk",
  ];

  const projectRoutes =
    (projects ?? []).map((p) => `/projeler/${p.slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
