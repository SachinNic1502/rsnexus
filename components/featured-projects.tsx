"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import projectsData from "@/data/projects.json";

const projects = projectsData.projects;

function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

const defaultFeatured = [...projects]
  .sort((a: any, b: any) => (a.label === "Featured Project" ? -1 : 0) - (b.label === "Featured Project" ? -1 : 0))
  .slice(0, 4);

interface FeaturedProjectsProps {
  initialProjects?: any[];
}

export function FeaturedProjects({ initialProjects }: FeaturedProjectsProps = {}) {
  const router = useRouter();
  const displayProjects = initialProjects && initialProjects.length > 0
    ? initialProjects
    : defaultFeatured;

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-primary/10 text-primary dark:text-cyan-400 border border-primary/20 mb-4">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            FEATURED ENGINEERING
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
            Products We've Built
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A curated mix of production systems, enterprise platforms, and technical showcases engineered for real-world impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          {displayProjects.map((project: any, index: number) => {
            const projectSlug = `/portfolio/${project.slug || slugify(project.title)}`;
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 backdrop-blur-xl shadow-sm hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.25)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <Link href={projectSlug} className="block relative h-56 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={project.images?.[0] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Top status badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-sm">
                        {project.label || "Production System"}
                      </span>
                    </div>

                    {project.category && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Header / Description */}
                  <div className="p-6 pb-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      <Link href={projectSlug}>{project.title}</Link>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Content & Actions */}
                <div className="p-6 pt-2 space-y-4">
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 5).map((tech: any, techIndex: number) => {
                        const techName = typeof tech === "string" ? tech : tech.name;
                        return (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60"
                          >
                            {techName}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <Button asChild size="sm" className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-sm">
                      <Link href={projectSlug} className="flex items-center justify-center gap-1.5">
                        <span>Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </Button>
                    {project.liveUrl && (
                      <Button asChild size="sm" variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700/80">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5 mr-1 text-cyan-500" />
                          Live
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild size="sm" variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700/80">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="group rounded-xl px-7 shadow-lg shadow-primary/20"
            onClick={() => router.push("/portfolio")}
          >
            Explore Complete Showcase
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
