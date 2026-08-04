// import type { MetadataRoute } from "next";
// import projectsData from "@/data/projects.json";

// const baseUrl = "https://www.rsnexus.in";

// function slugify(title: string): string {
//   return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
// }

// export default function sitemap(): MetadataRoute.Sitemap {
//   const staticRoutes: MetadataRoute.Sitemap = [
//     "",
//     "/services",
//     "/pricing",
//     "/about",
//     "/team",
//     "/portfolio",
//     "/contact",
//   ].map((path) => ({
//     url: `${baseUrl}${path}`,
//     lastModified: new Date(),
//     changeFrequency: "monthly",
//     priority: path === "" ? 1 : 0.8,
//   }));

//   const portfolioRoutes: MetadataRoute.Sitemap = projectsData.projects.map((project) => ({
//     url: `${baseUrl}/portfolio/${slugify(project.title)}`,
//     lastModified: new Date(),
//     changeFrequency: "yearly",
//     priority: 0.6,
//   }));

//   return [...staticRoutes, ...portfolioRoutes];
// }

import type { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";
import blogData from "@/data/blog.json";

const baseUrl = "https://rsnexus.in";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/pricing",
    "/about",
    "/team",
    "/portfolio",
    "/contact",
    "/faq",
    "/blog",
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap =
    projectsData.projects.map((project) => ({
      url: `${baseUrl}/portfolio/${slugify(project.title)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}