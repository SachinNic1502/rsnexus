"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Eye,
  Search,
  X,
  Sparkles,
  Check,
  Layers,
  Shield,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InteractiveDeviceShowcase } from "@/components/interactive-device-showcase";

// Labels that represent paid/real client engagements; everything else is an in-house build
const CLIENT_LABELS = ["Featured Project", "Internal Project", "Client Project"];

const ROMAN_NUMERALS = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
];

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
    const romanNumeral = ROMAN_NUMERALS[index % ROMAN_NUMERALS.length] || `${index + 1}`;

    return (
      <div
        key={project.slug || index}
        className="classical-card classical-frame group relative rounded-3xl overflow-hidden bg-card/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between"
      >
        {/* Top subtle golden shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        <div>
          {/* Card Media Preview */}
          <div className="relative overflow-hidden bg-slate-950 h-56 sm:h-64">
            <button
              type="button"
              aria-label={`Preview interactive showcase for ${project.title}`}
              className="block w-full h-full cursor-zoom-in focus:outline-none relative group/img"
              onClick={() => handleOpenPreview(project)}
            >
              <Image
                src={project.images?.[0] || project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              
              {/* Interactive Hover Zoom Pill */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-slate-900/95 border border-amber-500/40 text-amber-300 text-xs px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-2xl font-mono font-bold tracking-wide">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interactive 3D Preview</span>
                </span>
              </div>
            </button>

            {/* Top Floating Badges */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-900/85 border border-amber-500/30 text-amber-400 backdrop-blur-md shadow-sm">
                PROJECT {romanNumeral}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-200 bg-slate-900/80 border border-slate-700/80 backdrop-blur-md shadow-sm">
                {project.category}
              </span>
            </div>
          </div>

          {/* Card Body Header */}
          <div className="p-6 sm:p-7 pb-2">
            <h3 className="font-serif text-2xl font-black tracking-tight text-foreground group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
              <Link href={projectSlug}>{project.title}</Link>
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-6 sm:p-7 pt-2 space-y-4">
          {/* Tech Stack Chips */}
          {project.technologies?.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">
                TECH STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 5).map((tech: any, techIndex: number) => {
                  const techName = typeof tech === "string" ? tech : tech.name;
                  return (
                    <span
                      key={techIndex}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-foreground/85 bg-secondary/60 dark:bg-slate-800/50 border border-border/60"
                    >
                      {techName}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Core Capabilities */}
          {project.features?.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">
                KEY FEATURES
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                {project.features.slice(0, 4).map((feature: string, featureIndex: number) => (
                  <div key={featureIndex} className="flex items-center gap-1.5 truncate">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Impact Metrics */}
          {project.results?.length > 0 && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
              <div className="space-y-1 text-xs">
                {project.results.slice(0, 2).map((metric: string, metricIndex: number) => (
                  <div key={metricIndex} className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-4 border-t border-border/60">
            <Button asChild size="sm" className="flex-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-serif font-bold text-xs uppercase tracking-wider shadow-sm py-2.5">
              <Link href={projectSlug} className="flex items-center justify-center gap-1.5">
                <span>View Case Study</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>

            {project.liveUrl && (
              <Button asChild size="sm" variant="outline" className="rounded-xl border-border hover:border-amber-500/40 text-xs font-serif">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1 text-amber-500" />
                  Live
                </a>
              </Button>
            )}

            {project.githubUrl && (
              <Button asChild size="sm" variant="outline" className="rounded-xl border-border hover:border-amber-500/40" aria-label="GitHub Repository">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
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
    <div className="container mx-auto px-4 py-20 md:py-28 max-w-7xl">
      {/* Classical Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
            PROVEN WORK • CLIENT CASE STUDIES
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-foreground tracking-tight leading-tight">
          Our Portfolio & <span className="text-gradient-gold">Featured Projects</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-sans">
          Explore production websites, mobile apps, SaaS platforms, and custom software we&apos;ve designed, built, and launched for clients worldwide.
        </p>

        <div className="classical-divider max-w-xs mx-auto mt-6">
          <span className="text-amber-500 font-serif text-xs">✦ FEATURED WORK ✦</span>
        </div>
      </div>

      {/* Live Search Bar */}
      <div className="max-w-xl mx-auto mb-10 relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
          <Input
            type="text"
            placeholder="Search by technology, industry or keywords (Next.js, AI, Stripe, E-commerce)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-10 py-6 bg-card/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border-border/80 focus-visible:ring-amber-500/40 shadow-sm text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-center text-xs text-muted-foreground mt-2 font-mono">
            Found {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} matching &ldquo;{searchQuery}&rdquo;
          </p>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-14">
        {categories.map((category, index) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-serif text-xs transition-all duration-200 focus:outline-none ${
                isActive
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.03]"
                  : "bg-card/70 dark:bg-slate-900/70 border border-border/70 text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Project Sections with Tabs */}
      <Tabs defaultValue="client" className="w-full mb-20">
        <div className="flex justify-center">
          <TabsList className="mb-12 p-1.5 rounded-2xl bg-card/70 dark:bg-slate-900/70 border border-border/80 backdrop-blur-xl shadow-md h-auto gap-1">
            <TabsTrigger
              value="client"
              className="font-serif text-xs sm:text-sm px-5 py-2.5 rounded-xl data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 data-[state=active]:font-bold data-[state=active]:shadow-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Client Projects ({clientProjects.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="concept"
              className="font-serif text-xs sm:text-sm px-5 py-2.5 rounded-xl data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 data-[state=active]:font-bold data-[state=active]:shadow-sm transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>In-House Builds ({conceptProjects.length})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="client">
          <section>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-[11px] font-serif uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold mb-2 block">
                CLIENT WORK • LIVE PLATFORMS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black mb-3 text-foreground tracking-tight">
                Built for Growing <span className="text-gradient-gold">Businesses</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                Custom web and mobile platforms delivered for clients worldwide, built to scale cleanly.
              </p>
            </div>

            {clientProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {clientProjects.map((project, index) => renderProjectCard(project, index))}
              </div>
            ) : (
              <div className="text-center py-16 classical-card rounded-2xl border border-dashed border-border/80 max-w-md mx-auto">
                <p className="text-muted-foreground text-sm font-serif">
                  No client projects found in this category.
                </p>
              </div>
            )}
          </section>
        </TabsContent>

        <TabsContent value="concept">
          <section>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-[11px] font-serif uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold mb-2 block">
                INTERNAL PROJECTS • EXPERIMENTAL APPS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black mb-3 text-foreground tracking-tight">
                In-House Apps & <span className="text-gradient-gold">Prototypes</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                Apps and tools built in-house to explore new AI tools, clean workflows, and fast interfaces.
              </p>
            </div>

            {conceptProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {conceptProjects.map((project, index) => renderProjectCard(project, index))}
              </div>
            ) : (
              <div className="text-center py-16 classical-card rounded-2xl border border-dashed border-border/80 max-w-md mx-auto">
                <p className="text-muted-foreground text-sm font-serif">
                  No internal projects found in this category.
                </p>
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>

      {/* Classical Bottom Conversion Hub */}
      <div className="classical-card classical-frame rounded-3xl p-8 sm:p-12 md:p-16 border border-amber-500/30 bg-gradient-to-br from-card via-secondary/30 to-card shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/90 border border-amber-500/30 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
            START A PROJECT • GET IN TOUCH
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight leading-tight">
          Ready to Build Your <span className="text-gradient-gold">Next Project</span>?
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
          Schedule a free call with our lead engineers. We&apos;ll discuss your goals, share honest advice, and outline a clear project roadmap.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="font-serif text-xs sm:text-sm uppercase tracking-wider font-bold px-8 py-6 group bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xl transition-all rounded-xl"
            onClick={handleStartProject}
          >
            <span>Start a Project</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="font-serif text-xs sm:text-sm uppercase tracking-wider px-8 py-6 border-border hover:bg-secondary/60 rounded-xl"
            onClick={handleRequestQuote}
          >
            Request a Free Quote
          </Button>
        </div>

        {/* Guarantees Strip */}
        <div className="mt-12 pt-8 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: Shield, text: "Strict Non-Disclosure" },
            { icon: Award, text: "Direct Engineer Access" },
            { icon: Clock, text: "Milestone-Based Delivery" },
            { icon: Check, text: "100% Code Ownership" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-2 text-xs font-serif text-foreground/80">
              <item.icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 3D Device Showcase Dialog */}
      <Dialog open={preview !== null} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-w-5xl bg-slate-950/95 border-amber-500/30 text-slate-100 p-5 sm:p-8 backdrop-blur-2xl rounded-3xl max-h-[92vh] overflow-y-auto">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold flex items-center justify-between text-white font-serif">
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

export default PortfolioClient;

