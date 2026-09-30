import type { Metadata } from "next";
import { getProjects } from "@/lib/data-fetchers";
import { PortfolioClient } from "@/components/portfolio-client";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | RSNexus",
  description:
    "Explore our production software builds, full-stack applications, and internal platforms engineered by RSNexus for clients worldwide.",
  alternates: {
    canonical: "https://rsnexus.in/portfolio",
  },
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <PortfolioClient projects={projects} />
    </div>
  );
}
