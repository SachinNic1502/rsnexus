import type { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";

const baseUrl = "https://www.rsnexus.in";

function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/pricing",
    "/about",
    "/team",
    "/portfolio",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = projectsData.projects.map((project) => ({
    url: `${baseUrl}/portfolio/${slugify(project.title)}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...portfolioRoutes];
}
