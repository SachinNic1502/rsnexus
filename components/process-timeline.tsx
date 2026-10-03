"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Compass,
  FileCode2,
  Layers,
  Cpu,
  ShieldCheck,
  Rocket,
  Activity,
  Sparkles,
  Check,
  Clock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface PhaseData {
  roman: string;
  step: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  image: string;
}

const phases: PhaseData[] = [
  {
    roman: "I",
    step: "01",
    icon: Compass,
    title: "Discovery",
    subtitle: "Project Goals & Scope",
    description:
      "Understanding your business goals, target audience, technical needs, and budget to set up a clear project plan.",
    deliverables: [
      "Project Requirements Plan",
      "System Architecture Blueprint",
      "Milestones & Timelines",
    ],
    duration: "Phase 01",
    image: "/images/process/discovery.jpg",
  },
  {
    roman: "II",
    step: "02",
    icon: FileCode2,
    title: "Blueprint",
    subtitle: "Technical Architecture",
    description:
      "Designing database models, API structures, and cloud setups designed to run fast and scale easily.",
    deliverables: [
      "Database & Data Models",
      "REST & API Endpoints",
      "Cloud & Hosting Setup",
    ],
    duration: "Phase 02",
    image: "/images/process/blueprint.jpg",
  },
  {
    roman: "III",
    step: "03",
    icon: Layers,
    title: "UI/UX Design",
    subtitle: "Wireframes & Visuals",
    description:
      "Creating interactive Figma prototypes, clean responsive layouts, and modern visual designs tailored to your brand.",
    deliverables: [
      "Clickable Figma Prototypes",
      "Custom Design System",
      "Mobile & Desktop Layouts",
    ],
    duration: "Phase 03",
    image: "/images/process/atelier.jpg",
  },
  {
    roman: "IV",
    step: "04",
    icon: Cpu,
    title: "Engineering",
    subtitle: "Full-Stack Development",
    description:
      "Building your application with clean TypeScript, modern Next.js, fast database queries, and thorough code reviews.",
    deliverables: [
      "Clean TypeScript Code",
      "Reusable Components",
      "Automated Code Checks",
    ],
    duration: "Phase 04",
    image: "/images/process/engineering.jpg",
  },
  {
    roman: "V",
    step: "05",
    icon: ShieldCheck,
    title: "Validation",
    subtitle: "Testing & Quality Check",
    description:
      "Running thorough tests across devices and browsers, checking security, and optimizing loading speed.",
    deliverables: [
      "Automated Tests & QA",
      "Security & Bug Checks",
      "Google Speed Optimization",
    ],
    duration: "Phase 05",
    image: "/images/process/validation.jpg",
  },
  {
    roman: "VI",
    step: "06",
    icon: Rocket,
    title: "Deployment",
    subtitle: "Smooth Live Launch",
    description:
      "Deploying your site to production, configuring SSL security, domain connection, and verifying live traffic.",
    deliverables: [
      "Zero-Downtime Launch",
      "SSL & Domain Setup",
      "Analytics & Tracking Setup",
    ],
    duration: "Phase 06",
    image: "/images/process/deployment.jpg",
  },
  {
    roman: "VII",
    step: "07",
    icon: Activity,
    title: "Evolution",
    subtitle: "Ongoing Maintenance",
    description:
      "Monitoring uptime and performance, releasing security updates, and adding new features as your business grows.",
    deliverables: [
      "24/7 Uptime Monitoring",
      "Database & Speed Tuning",
      "Continuous Updates & Support",
    ],
    duration: "Ongoing",
    image: "/images/process/evolution.jpg",
  },
];

export function ProcessTimeline() {
  const standardPhases = phases.slice(0, 6);
  const evolutionPhase = phases[6];
  const EvolutionIcon = evolutionPhase.icon;

  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-slate-950/80 py-20 md:py-28 border-y border-border/60">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
              OUR DEVELOPMENT PROCESS • 7 CLEAR STEPS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            How We Build <span className="text-gradient-gold">Your Software</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
            A clear, step-by-step development process from initial idea to live launch and ongoing support. Every stage gives you real progress and full transparency.
          </p>
        </div>

        {/* Linear Progression Pipeline Bar (Desktop / Tablet Overview) */}
        <div className="hidden lg:flex items-center justify-between mb-12 p-3.5 rounded-2xl bg-card/60 dark:bg-slate-900/60 border border-border/80 backdrop-blur-xl shadow-sm">
          {phases.map((phase, idx) => (
            <React.Fragment key={phase.step}>
              <div className="flex items-center gap-2.5 px-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
                  {phase.roman}
                </span>
                <div className="text-left">
                  <p className="font-serif text-xs font-bold text-foreground leading-tight">
                    {phase.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {phase.step}
                  </p>
                </div>
              </div>
              {idx < phases.length - 1 && (
                <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-amber-500/40 to-amber-500/10" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Unified 7-Card Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {/* Phases 01 to 06 */}
          {standardPhases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-3xl p-6 sm:p-7 bg-card/85 dark:bg-slate-900/85 backdrop-blur-xl border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Top subtle golden shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Big watermark step number in background */}
                <span className="font-mono text-5xl font-black text-slate-200/50 dark:text-slate-800/50 select-none pointer-events-none absolute right-5 top-5 group-hover:text-amber-500/10 transition-colors">
                  {phase.step}
                </span>

                <div>
                  {/* Card Header: Icon + Roman badge + Duration */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-serif text-[11px] font-bold px-2 py-0.5 rounded-md border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25">
                        PHASE {phase.roman}
                      </span>
                      <Badge variant="outline" className="font-mono text-[11px] px-2 py-0.5 border-border">
                        <Clock className="w-3 h-3 mr-1 text-amber-500" />
                        {phase.duration}
                      </Badge>
                    </div>
                  </div>

                  {/* Step Image Showcase */}
                  <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 border border-border/70 group-hover:border-amber-500/40 transition-colors shadow-sm bg-slate-950/20">
                    <Image
                      src={phase.image}
                      alt={`${phase.title} - ${phase.subtitle}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-foreground tracking-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {phase.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-sans mt-0.5 mb-3.5">
                    {phase.subtitle}
                  </p>

                  {/* Scope Description */}
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                    {phase.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-border/60">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold mb-2.5 block">
                    AUDITED DELIVERABLES
                  </span>
                  <div className="space-y-2">
                    {phase.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 p-2 rounded-lg bg-secondary/50 dark:bg-slate-800/40 border border-border/50 text-xs"
                      >
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-foreground/90 font-sans font-medium leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Phase 07: Evolution - Signature Full-Width Command Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group relative md:col-span-2 lg:col-span-3 rounded-3xl p-6 sm:p-8 md:p-9 bg-card/90 dark:bg-slate-900/90 backdrop-blur-xl border border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden"
          >
            {/* Top golden accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500/30 via-amber-400 to-amber-500/30" />

            {/* Background watermark */}
            <span className="font-mono text-7xl md:text-8xl font-black text-slate-200/40 dark:text-slate-800/40 select-none pointer-events-none absolute right-8 top-4 group-hover:text-amber-500/10 transition-colors">
              07
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Phase identity & description */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-sm shrink-0">
                    <EvolutionIcon className="w-6 h-6" />
                  </div>

                  <span className="font-serif text-xs font-black px-2.5 py-0.5 rounded-lg border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                    PHASE VII
                  </span>

                  <Badge variant="outline" className="font-mono text-xs px-2.5 py-0.5 border-border">
                    <Clock className="w-3 h-3 mr-1 text-amber-500" />
                    Perpetual Cycle
                  </Badge>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    24/7 Live SLA Support
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {evolutionPhase.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-sans mt-0.5 mb-3">
                  {evolutionPhase.subtitle}
                </p>

                <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed mb-6">
                  {evolutionPhase.description}
                </p>

                {/* Key Deliverables on Left */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold mb-3 block">
                    CONTINUOUS DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {evolutionPhase.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/60 dark:bg-slate-800/60 border border-border/70 hover:border-amber-500/40 transition-colors text-xs"
                      >
                        <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-amber-500" />
                        </div>
                        <span className="text-foreground font-sans font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: High-tech 24/7 Command Center Image Showcase */}
              <div className="lg:col-span-5">
                <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-amber-500/30 group-hover:border-amber-400 transition-all duration-300 shadow-xl bg-slate-950">
                  <Image
                    src={evolutionPhase.image}
                    alt={`${evolutionPhase.title} - ${evolutionPhase.subtitle}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-100 font-mono">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Monitoring Center
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md text-amber-400 border border-amber-500/30 font-bold">
                      99.99% SLA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Call to Action Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-background to-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-foreground">
              Ready to start your project with us?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
              Schedule a free discovery call with our founders. Direct answers, no sales fluff.
            </p>
          </div>
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-serif font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-md shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2">
              <span>Start Phase 01</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProcessTimeline;

