"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Github, Sparkles, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import projectsData from "@/data/projects.json";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";

const projects = projectsData.projects;

function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

const defaultFeatured = [...projects]
  .sort((a: any, b: any) => (a.label === "Featured Project" ? -1 : 0) - (b.label === "Featured Project" ? -1 : 0))
  .slice(0, 4);

const OPUS_NUMERALS = ["PROJECT 01", "PROJECT 02", "PROJECT 03", "PROJECT 04", "PROJECT 05", "PROJECT 06"];

// Gather diverse project images for the 3D perspective stream
const STREAM_IMAGES = projectsData.projects
  .flatMap((p: any) => (p.images || []).map((src: string) => ({ src, alt: p.title })))
  .filter((img, idx, arr) => arr.findIndex((t) => t.src === img.src) === idx)
  .slice(0, 14);

interface FeaturedProjectsProps {
  initialProjects?: any[];
}

export function FeaturedProjects({ initialProjects }: FeaturedProjectsProps = {}) {
  const router = useRouter();
  const displayProjects = initialProjects && initialProjects.length > 0
    ? initialProjects
    : defaultFeatured;

  return (
    <section className="py-24 md:py-32 bg-slate-50/50 dark:bg-slate-950/70 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              OUR WORK • FEATURED CASE STUDIES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-foreground">
            Featured Projects & <span className="text-gradient-gold">Case Studies</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            A selection of modern web applications, client platforms, and custom software solutions we&apos;ve designed, engineered, and shipped for businesses worldwide.
          </p>

          <div className="classical-divider max-w-xs mx-auto">
            <span className="text-amber-500 font-serif text-xs">✦ RECENT BUILDS ✦</span>
          </div>
        </div>

        {/* 3D Perspective Hall / Image Stream Corridor */}
        {/* {STREAM_IMAGES.length > 0 && (
          <div className="mb-20 rounded-3xl overflow-hidden classical-card classical-frame border border-amber-500/20 dark:border-cyan-500/20 p-2 sm:p-4 bg-slate-950">
            <div className="py-4 text-center">
              <span className="font-serif text-xs tracking-widest uppercase text-amber-400">
                OUR WORK IN ACTION • LIVE PREVIEW
              </span>
            </div>
            <ImageStreamHero
              images={STREAM_IMAGES}
              cards={8}
              speed={22}
              axis={50}
              className="h-[280px] sm:h-[360px] md:h-[420px] w-full bg-slate-950/80 rounded-2xl flex items-center justify-center"
            >
              <div className="relative z-20 text-center pointer-events-none px-4 max-w-lg">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-900/90 text-amber-300 border border-amber-400/30 text-xs font-serif tracking-widest uppercase backdrop-blur-md mb-2">
                  OUR RECENT BUILDS
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  Real Software In Motion
                </h3>
              </div>
            </ImageStreamHero>
          </div>
        )} */}

        {/* Featured Projects Grid with Classical Framing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16 max-w-6xl mx-auto">
          {displayProjects.map((project: any, index: number) => {
            const projectSlug = `/portfolio/${project.slug || slugify(project.title)}`;
            const opus = OPUS_NUMERALS[index % OPUS_NUMERALS.length];

            return (
              <div
                key={index}
                className="group relative classical-card classical-frame rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200/90 dark:border-slate-800/90 hover:border-amber-400/50 dark:hover:border-amber-400/40 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-12px_rgba(245,158,11,0.2)]"
              >
                <div>
                  {/* Image container */}
                  <Link href={projectSlug} className="block relative h-60 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={project.images?.[0] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 2}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    {/* Top status badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="font-serif px-3 py-1 rounded-md text-xs font-bold tracking-wider bg-slate-900/90 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-md">
                        {opus}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium tracking-wide bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {project.label || "Live Project"}
                      </span>
                    </div>

                    {project.category && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-serif text-slate-200 bg-slate-900/80 border border-slate-700/60 backdrop-blur-md uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Header / Description */}
                  <div className="p-6 sm:p-7 pb-3">
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                      <Link href={projectSlug}>{project.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-[15px] mt-2.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Content & Actions */}
                <div className="p-6 sm:p-7 pt-2 space-y-5">
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 5).map((tech: any, techIndex: number) => {
                        const techName = typeof tech === "string" ? tech : tech.name;
                        return (
                          <span
                            key={techIndex}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-foreground/80 bg-secondary/60 dark:bg-slate-900/80 border border-border"
                          >
                            {techName}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                    <Button asChild size="sm" className="font-serif flex-1 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-md">
                      <Link href={projectSlug} className="flex items-center justify-center gap-2">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    {project.liveUrl && (
                      <Button asChild size="sm" variant="outline" className="font-serif rounded-xl border-border hover:border-amber-400/40">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild size="sm" variant="outline" className="rounded-xl border-border" aria-label="GitHub Repository">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
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

        {/* Classical Navigation to Full Archives */}
        <div className="text-center">
          <Button
            size="lg"
            className="font-serif px-8 py-6 text-base group bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-xl transition-all"
            onClick={() => router.push("/portfolio")}
          >
            <span>Explore All Projects</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
