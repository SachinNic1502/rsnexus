"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, ExternalLink, Github, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { InteractiveDeviceShowcase } from "@/components/interactive-device-showcase";

export function ProjectViewClient({ project }: { project: any }) {
  const router = useRouter();

  if (!project) {
    return (
      <div className="container mx-auto p-12 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-lg font-medium text-muted-foreground">⚠️ Project not found.</p>
        <Button onClick={() => router.back()} className="mt-4 rounded-xl px-6 py-2 shadow">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const images: string[] = project.images?.length
    ? project.images
    : [project.image || "/placeholder.svg"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-16 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="rounded-xl px-4 py-2 shadow-sm bg-white/80 dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/50 backdrop-blur-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <Button
                asChild
                className="rounded-xl px-5 py-2 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 text-white font-medium shadow-md shadow-primary/20 flex items-center gap-1.5"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span>Live Demo</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-slate-200/90 dark:border-slate-800/90"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Header Info */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-primary/10 text-primary dark:text-cyan-400 border border-primary/20">
              {project.category}
            </span>
            {project.label && (
              <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                {project.label}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {project.title}
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* CENTERPIECE: 3D Interactive Device Showcase */}
        <div className="my-10">
          <InteractiveDeviceShowcase
            images={images}
            title={project.title}
            liveUrl={project.liveUrl}
            category={project.category}
          />
        </div>

        {/* Detailed Case Study / Specifications Tabs */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Tabs defaultValue="tech" className="w-full">
            <TabsList className="w-full justify-start p-1.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl mb-6">
              <TabsTrigger value="tech" className="rounded-xl font-mono text-xs">
                Tech Stack
              </TabsTrigger>
              <TabsTrigger value="features" className="rounded-xl font-mono text-xs">
                Features & Logic
              </TabsTrigger>
              <TabsTrigger value="results" className="rounded-xl font-mono text-xs">
                Key Metrics
              </TabsTrigger>
              {project.caseStudy && (
                <TabsTrigger value="case-study" className="rounded-xl font-mono text-xs">
                  Architecture & Case Study
                </TabsTrigger>
              )}
            </TabsList>

            {/* Tech Tab */}
            <TabsContent value="tech">
              <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-base font-bold mb-4 font-mono text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    TECH STACK & TOOLS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: any, idx: number) => {
                      const name = typeof tech === "string" ? tech : tech.name;
                      return (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl font-mono text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 shadow-sm"
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features">
              <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-base font-bold mb-4 font-mono text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    KEY FEATURES & HIGHLIGHTS
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features?.map((f: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                        <span className="leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results">
              <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-base font-bold mb-4 font-mono text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    RESULTS & IMPACT
                  </h3>
                  <div className="space-y-2.5">
                    {project.results?.map((r: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-2.5"
                      >
                        <span className="font-bold text-sm">✓</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Case Study Tab */}
            {project.caseStudy && (
              <TabsContent value="case-study">
                <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
                  <CardContent className="p-6 space-y-6">
                    {project.caseStudy.overview && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-500 dark:text-cyan-400 font-semibold mb-1">
                          Overview
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {project.caseStudy.overview}
                        </p>
                      </div>
                    )}
                    {project.caseStudy.challenge && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-rose-500 dark:text-rose-400 font-semibold mb-1">
                          The Challenge
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {project.caseStudy.challenge}
                        </p>
                      </div>
                    )}
                    {project.caseStudy.solution && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-500 dark:text-emerald-400 font-semibold mb-1">
                          The Solution
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {project.caseStudy.solution}
                        </p>
                      </div>
                    )}
                    {project.caseStudy.architecture && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-1">
                          System Architecture
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {project.caseStudy.architecture}
                        </p>
                      </div>
                    )}
                    {project.caseStudy.outcome && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-1">
                          Impact & Outcome
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {project.caseStudy.outcome}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
