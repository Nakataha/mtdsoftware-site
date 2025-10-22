import type { MetadataRoute } from "next";
import { projects } from "@/data/projects"; // <-- default değil, named

const baseUrl = "https://www.mtdsoftware.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/hakkimizda",
    "/hizmetler",
    "/projeler",
    "/iletisim",
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
