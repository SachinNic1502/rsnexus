"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExternalLink, Github, ArrowRight, Eye, Search, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InteractiveDeviceShowcase } from "@/components/interactive-device-showcase";

// Labels that represent paid/real client engagements; everything else is an in-house build
const CLIENT_LABELS = ["Featured Project", "Internal Project", "Client Project"];

function isClientProject(project: any): boolean {
  return CLIENT_LABELS.includes(project.label);
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

export function PortfolioClient({ projects }: { projects: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [preview, setPreview] = useState<{
    images: string[];
    title: string;
    liveUrl?: string;
    category?: string;
  } | null>(null);
  const router = useRouter();

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const query = searchQuery.trim().toLowerCase();

  const filteredProjects = projects.filter((project: any) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!query) return true;

    const titleMatch = project.title.toLowerCase().includes(query);
    const descMatch = project.description.toLowerCase().includes(query);
    const techMatch = project.technologies?.some((t: any) =>
      (typeof t === "string" ? t : t.name).toLowerCase().includes(query)
    );
    const featureMatch = project.features?.some((f: string) =>
      f.toLowerCase().includes(query)
    );

    return titleMatch || descMatch || techMatch || featureMatch;
  });

  const clientProjects = filteredProjects.filter((project) => isClientProject(project));
  const conceptProjects = filteredProjects.filter((project) => !isClientProject(project));

  const handleStartProject = () => router.push("/contact?type=project");
  const handleRequestQuote = () => router.push("/contact?type=quote");

  const handleOpenPreview = (project: any) => {
    const images: string[] = project.images?.length
      ? project.images
      : [project.image].filter(Boolean);
    if (images.length === 0) return;
    setPreview({
      images,
      title: project.title,
      liveUrl: project.liveUrl,
      category: project.category,
    });
  };

  const renderProjectCard = (project: any, index: number) => {
    const projectSlug = `/portfolio/${project.slug || slugify(project.title)}`;
    return (
      <div
        key={index}
        className="group relative rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 backdrop-blur-xl shadow-sm hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.25)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
      >
        <div>
          <div className="relative overflow-hidden bg-slate-950">
            <button
              type="button"
              aria-label={`Preview images for ${project.title}`}
              className="block w-full cursor-zoom-in focus:outline-none relative group/img"
              onClick={() => handleOpenPreview(project)}
            >
              <Image
                src={project.images?.[0] || project.image || "/placeholder.svg"}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-52 object-cover group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-slate-900/90 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl font-mono">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> Preview Showcase
                </span>
              </div>
            </button>
            <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-sm">
                {project.category}
              </span>
              {(project as any).label && !isClientProject(project) && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
                  {(project as any).label}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 pb-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              <Link href={projectSlug}>{project.title}</Link>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <div className="p-6 pt-2 space-y-4">
          {project.technologies?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 6).map((tech: any, techIndex: number) => {
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
            </div>
          )}

          {project.features?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                Core Capabilities
              </h4>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                {project.features.slice(0, 4).map((feature: string, featureIndex: number) => (
                  <div key={featureIndex} className="flex items-center gap-1.5 truncate">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.results?.length > 0 && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="space-y-1 text-xs">
                {project.results.slice(0, 2).map((metric: string, metricIndex: number) => (
                  <div key={metricIndex} className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="font-bold">✓</span> {metric}
                  </div>
                ))}
              </div>
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
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">
          Our Portfolio
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
          Projects That Deliver Results
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our successful products across industries. Each solution is engineered with precision, high performance, and measurable business outcomes.
        </p>
      </div>

      {/* Live Search Bar */}
      <div className="max-w-md mx-auto mb-8 relative">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by tech, keyword (React, AI, Payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-9 py-5 bg-background/70 backdrop-blur-md rounded-full border-border focus-visible:ring-primary shadow-sm text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            Found {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} matching &ldquo;{searchQuery}&rdquo;
          </p>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className="mb-2 rounded-full px-4"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Project Sections */}
      <Tabs defaultValue="client" className="w-full mb-16">
        <div className="flex justify-center">
          <TabsList className="mb-8">
            <TabsTrigger value="client">Collaborations ({clientProjects.length})</TabsTrigger>
            <TabsTrigger value="concept">Made to Explore ({conceptProjects.length})</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="client">
          <section>
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-3">
                Client Work
              </Badge>
              <h2 className="text-3xl font-bold mb-3">Built for Real Businesses</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Production systems delivered for clients and running in the real world.
              </p>
            </div>
            {clientProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {clientProjects.map((project, index) => renderProjectCard(project, index))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No client projects in this category.
              </p>
            )}
          </section>
        </TabsContent>

        <TabsContent value="concept">
          <section>
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-3">
                Concept Builds
              </Badge>
              <h2 className="text-3xl font-bold mb-3">Ideas We Engineered In-House</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Self-initiated products we designed and shipped to explore new stacks and prove out ideas.
              </p>
            </div>
            {conceptProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {conceptProjects.map((project, index) => renderProjectCard(project, index))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No concept projects in this category.
              </p>
            )}
          </section>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's discuss how we can build your vision into reality with custom software tailored to your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8" onClick={handleStartProject}>
            Start Your Project
          </Button>
          <Button size="lg" variant="outline" className="px-8 bg-transparent" onClick={handleRequestQuote}>
            Request Quote
          </Button>
        </div>
      </div>

      {/* Interactive 3D Device Showcase Dialog */}
      <Dialog open={preview !== null} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-w-5xl bg-slate-950/95 border-slate-800 text-slate-100 p-5 sm:p-8 backdrop-blur-2xl rounded-3xl max-h-[92vh] overflow-y-auto">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold flex items-center justify-between text-white">
              <span>{preview?.title}</span>
            </DialogTitle>
          </DialogHeader>
          {preview && (
            <InteractiveDeviceShowcase
              images={preview.images}
              title={preview.title}
              liveUrl={preview.liveUrl}
              category={preview.category}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
