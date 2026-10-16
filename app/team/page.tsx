import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTeamMembers } from "@/lib/data-fetchers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Shield,
  Award,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  Linkedin,
  Mail,
  Phone,
  Terminal,
  GitCommit,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Our Team & Leadership | RSNexus",
  description:
    "Meet the experienced software engineers, architects, and technical leaders behind RSNexus. Direct founder-led engineering without account management filters.",
  alternates: {
    canonical: "https://rsnexus.in/team",
  },
};

const disciplines = [
  {
    icon: Code2,
    roman: "DISCIPLINE I",
    name: "Web Systems & Cloud Infrastructure",
    description: "Next.js 15, React 19, TypeScript strict mode, edge runtime deployments, and scalable PostgreSQL/Prisma backends.",
  },
  {
    icon: Cpu,
    roman: "DISCIPLINE II",
    name: "Autonomous Agents & AI Pipelines",
    description: "Custom LLM integrations, retrieval-augmented generation (RAG), vector databases, and real-time inference optimization.",
  },
  {
    icon: Layers,
    roman: "DISCIPLINE III",
    name: "Mobile & Cross-Platform UX",
    description: "Native-grade iOS & Android architectures via Flutter & React Native with offline-first local synchronization.",
  },
  {
    icon: Terminal,
    roman: "DISCIPLINE IV",
    name: "DevOps, Security & CI/CD",
    description: "Dockerized containerization, Kubernetes orchestration, zero-downtime rolling updates, and automated vulnerability audits.",
  },
];

const manifestoPoints = [
  {
    title: "Zero Account-Management Layers",
    desc: "You talk directly with senior engineers who understand your goals, design your systems, and build your product.",
  },
  {
    title: "Rock-Solid Type Safety",
    desc: "We enforce strict TypeScript standards and full data validation across all API routes, databases, and apps.",
  },
  {
    title: "100% Code & Project Ownership",
    desc: "All source code, git history, and server configurations belong entirely to you from day one.",
  },
  {
    title: "Continuous Monitoring & SLAs",
    desc: "Every deployed system includes real-time error logging, performance monitoring, and clear milestone guarantees.",
  },
];

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden py-16 md:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Classical Monumental Hero */}
        <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              ✦ MEET OUR TEAM • LEADERSHIP & BUILDERS ✦
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground leading-tight">
            Our Team & <span className="text-gradient-gold">Technical Leadership</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-sans max-w-3xl mx-auto">
            Experienced full-stack engineers and designers dedicated to building fast, clean, and reliable software for businesses worldwide.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 pt-6 border-t border-border/60 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { icon: Award, title: "Founder-Led", sub: "Direct founder oversight" },
              { icon: Code2, title: "Clean Code", sub: "Strict TypeScript quality" },
              { icon: Shield, title: "Senior Engineers", sub: "Experienced builders only" },
              { icon: GitCommit, title: "Weekly Sprints", sub: "Clear updates every week" },
            ].map((token, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-background/60 dark:bg-slate-900/60 border border-border/70 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-foreground">
                  <token.icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{token.title}</span>
                </div>
                <span className="text-[11px] text-muted-foreground block mt-0.5">{token.sub}</span>
              </div>
            ))}
          </div>

          <div className="classical-divider max-w-xs mx-auto mt-12">
            <span className="text-amber-500 font-serif text-xs">✦ LEADERSHIP TEAM ✦</span>
          </div>
        </div>

        {/* Executive Leadership Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-28 max-w-7xl mx-auto">
          {teamMembers.map((member: any, idx: number) => (
            <div
              key={member.name || idx}
              className="relative rounded-3xl classical-card classical-frame p-6 sm:p-7 border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between overflow-hidden bg-card/85 dark:bg-slate-900/85"
            >
              {/* Top Accent Light */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col items-center text-center">
                {/* Avatar with Halo Ring */}
                <div className="relative mb-5">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 opacity-30 blur-sm group-hover:opacity-80 transition-opacity" />
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-xl bg-slate-900">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 flex h-4 w-4 rounded-full bg-slate-950 p-0.5">
                    <span className="h-full w-full rounded-full bg-emerald-500 ring-2 ring-background" />
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-xl font-bold text-foreground tracking-tight mb-1">
                  {member.name}
                </h3>

                <div className="mb-4">
                  <Badge variant="outline" className="font-serif text-[11px] uppercase tracking-wider border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5">
                    {member.role}
                  </Badge>
                </div>

                {/* Bio */}
                <p className="text-xs text-muted-foreground leading-relaxed font-sans mb-6 line-clamp-4">
                  {member.bio}
                </p>
              </div>

              {/* Direct Social Links */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-center gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500/40 transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-9 h-9 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:border-amber-500/40 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="w-9 h-9 rounded-xl bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/40 transition-colors"
                    aria-label={`Call ${member.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Guild Disciplines Breakdown */}
        <div className="mb-28 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
              CORE AREAS OF EXPERTISE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Our Technical <span className="text-gradient-gold">Services</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mt-3">
              We focus on key engineering areas to build fast, scalable, and secure products for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disciplines.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl classical-card classical-frame p-7 border border-border/80 dark:border-slate-800/80 bg-card/80 dark:bg-slate-900/80 flex items-start gap-5 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-serif text-[10px] uppercase tracking-widest text-amber-500 font-semibold block mb-1">
                      {d.roman}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                      {d.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Engineering Manifesto */}
        <div className="mb-28 max-w-5xl mx-auto">
          <div className="rounded-3xl classical-card classical-frame p-8 sm:p-12 border border-amber-500/30 bg-gradient-to-br from-card via-secondary/20 to-card shadow-2xl">
            <div className="text-center mb-10">
              <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
                HOW WE CODE & DELIVER
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-foreground tracking-tight">
                Our Engineering <span className="text-gradient-gold">Standards</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto mt-2">
                The quality principles behind every line of code we ship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {manifestoPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-500 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-foreground mb-1">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Classical Conversion Banner */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="classical-card classical-frame rounded-3xl p-8 sm:p-12 border border-amber-500/30 bg-card/90 shadow-2xl">
            <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-2">
              START WORKING WITH US
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Work Directly with <span className="text-gradient-gold">Our Lead Engineers</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              No salespeople or middlemen. Talk directly with our senior engineers to turn your idea into a working product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="font-serif px-8 py-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-xl shadow-amber-500/20 border-0"
              >
                <Link href="/contact?type=consultation">
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-serif px-8 py-6 border-border hover:bg-secondary"
              >
                <Link href="/portfolio">View Our Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}