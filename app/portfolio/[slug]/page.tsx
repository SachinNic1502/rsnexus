import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data-fetchers";
import { ProjectViewClient } from "@/components/project-view-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | RSNexus",
    };
  }

  return {
    title: `${project.title} - Case Study | RSNexus Portfolio`,
    description: project.description.slice(0, 160),
    alternates: {
      canonical: `https://rsnexus.in/portfolio/${project.slug || slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectViewClient project={project} />;
}
