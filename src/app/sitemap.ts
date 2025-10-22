import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const baseUrl = "https://mtdsoftware.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/hakkimizda", "/hizmetler", "/projeler", "/iletisim", "/kvkk", "/cerez"];

  const projectRoutes = projects.map((project) => `/projeler/${project.slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
