import type { MetadataRoute } from "next";

const fallbackSiteUrl = "https://www.mtdsoftware.com.tr";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
