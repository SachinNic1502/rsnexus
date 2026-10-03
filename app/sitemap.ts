import type { MetadataRoute } from "next";
import { getProjects, getBlogPosts, getActiveJobOpenings } from "@/lib/data-fetchers";

const baseUrl = "https://rsnexus.in";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/services",
    "/pricing",
    "/about",
    "/team",
    "/careers",
    "/portfolio",
    "/contact",
    "/faq",
    "/blog",
    "/privacy",
    "/terms",
    "/security",
    "/track",
    "/brand",
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const [projects, blogPosts, jobs] = await Promise.all([
    getProjects(),
    getBlogPosts(),
    getActiveJobOpenings(),
  ]);

  const portfolioRoutes: MetadataRoute.Sitemap = projects.map((project: any) => ({
    url: `${baseUrl}/portfolio/${project.slug || slugify(project.title)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedDate ? new Date(post.publishedDate) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const careerRoutes: MetadataRoute.Sitemap = jobs.map((job: any) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes, ...careerRoutes];
}