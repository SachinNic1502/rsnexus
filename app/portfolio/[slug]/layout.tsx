import type React from "react";
import type { Metadata } from "next";
import projectsData from "@/data/projects.json";

function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

interface PortfolioLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.projects.find(
    (p: any) => slugify(p.title) === slug,
  );

  if (!project) {
    return {
      title: "Project not found | RSNexus Portfolio",
      description: "The requested RSNexus portfolio project could not be found.",
    };
  }

  const url = `https://rsnexus.in/portfolio/${slug}`;
  const ogImage = project.images?.[0];

  return {
    title: `${project.title} | RSNexus Portfolio`,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | RSNexus Portfolio`,
      description: project.description,
      url,
      type: "website",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | RSNexus Portfolio`,
      description: project.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function PortfolioSlugLayout({ children, params }: PortfolioLayoutProps) {
  const { slug } = await params;
  const project = projectsData.projects.find((p: any) => slugify(p.title) === slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://rsnexus.in/portfolio" },
      {
        "@type": "ListItem",
        position: 3,
        name: project?.title ?? slug,
        item: `https://rsnexus.in/portfolio/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
