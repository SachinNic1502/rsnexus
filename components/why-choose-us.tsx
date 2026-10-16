"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  UserCheck,
  MessageSquare,
  Layers,
  Gauge,
  Boxes,
  Code2,
  Workflow,
  Gem,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";

interface PillarItem {
  icon: LucideIcon;
  roman: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

const pillars: PillarItem[] = [
  {
    icon: UserCheck,
    roman: "I",
    title: "Founder-Led Team",
    subtitle: "Direct Responsibility",
    description:
      "You work directly with our founding engineers, without any junior middlemen or confusing account managers.",
    highlight: "Direct Access to Founders",
  },
  {
    icon: MessageSquare,
    roman: "II",
    title: "Fast Communication",
    subtitle: "Quick & Direct Answers",
    description:
      "Your questions get fast, clear answers from the actual developers building your product, with zero delays.",
    highlight: "Under 2-Hour Response Time",
  },
  {
    icon: Layers,
    roman: "III",
    title: "Focused Developer Teams",
    subtitle: "No Wasted Time",
    description:
      "Small, focused teams with fewer handoffs and minimal meetings ensure your project moves fast without red tape.",
    highlight: "Fast Project Delivery",
  },
  {
    icon: Gauge,
    roman: "IV",
    title: "Blazing Fast Speed",
    subtitle: "Built for Performance",
    description:
      "Built from day one to load in under a second, pass all Google speed tests, and handle heavy website traffic smoothly.",
    highlight: "95+ Google Speed Score",
  },
  {
    icon: Boxes,
    roman: "V",
    title: "Modern & Reliable Tech",
    subtitle: "Industry Best Practices",
    description:
      "Built with modern technologies and clean code—never cheap templates or quick hacks that break down later.",
    highlight: "Modern Cloud Standards",
  },
  {
    icon: Code2,
    roman: "VI",
    title: "Clean, Bug-Free Code",
    subtitle: "Built to Last",
    description:
      "Written with strict TypeScript, clean data models, and organized components that are easy to update as your business grows.",
    highlight: "100% Type-Safe Code",
  },
  {
    icon: Workflow,
    roman: "VII",
    title: "Full Transparency",
    subtitle: "Live Progress Updates",
    description:
      "See your project come to life on live preview links with full access to code and regular live milestone demos.",
    highlight: "Complete Code & Demo Access",
  },
  {
    icon: Gem,
    roman: "VIII",
    title: "Top-Tier Quality",
    subtitle: "Limited Projects at a Time",
    description:
      "We take on only a few clients at a time so every single project gets our full attention, deep care, and best work.",
    highlight: "Dedicated Personal Attention",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-slate-50/70 dark:bg-slate-950/80 border-t border-border/60">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Classical Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
              WHY CHOOSE US • 8 CORE ADVANTAGES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Why Clients Choose <span className="text-gradient-gold">RSNexus</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
            We focus on clean code, transparent pricing, and direct communication. Here are the 8 key reasons startups and businesses trust us to build their software.
          </p>
        </div>

        {/* 8 Architectural Pillars Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.roman}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative classical-card classical-frame rounded-3xl p-6 sm:p-7 bg-card/85 dark:bg-slate-900/85 backdrop-blur-xl border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Top subtle golden shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Background subtle watermark Roman numeral */}
                <span className="font-mono text-4xl sm:text-5xl font-black text-slate-200/50 dark:text-slate-800/50 select-none pointer-events-none absolute right-4 top-4 group-hover:text-amber-500/10 transition-colors">
                  {pillar.roman}
                </span>

                <div>
                  {/* Icon & Pillar Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge
                      variant="outline"
                      className="font-serif text-[11px] font-bold px-2 py-0.5 rounded-md border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25"
                    >
                      PILLAR {pillar.roman}
                    </Badge>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-3">
                    {pillar.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Highlight Tag */}
                <div className="pt-3 border-t border-border/60">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-secondary/60 dark:bg-slate-800/50 border border-border/60 text-xs">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-foreground/90 font-sans font-medium text-[11px] sm:text-xs">
                      {pillar.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

