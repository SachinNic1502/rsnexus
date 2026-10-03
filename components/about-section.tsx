import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Clock, Target, Sparkles, ShieldCheck, Compass, Code2, LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

const statIcons: Record<string, LucideIcon> = {
  Users,
  Award,
  Clock,
  Target,
};

const ROMAN = ["I", "II", "III", "IV"];

export function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-slate-50/40 dark:bg-slate-950/40 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              OUR APPROACH • CRAFTED WITH CARE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-foreground">
            Solid Foundations, <span className="text-gradient-gold">Fast Delivery</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            We believe software should be built right the first time.
            We create fast, scalable digital products that help your business grow smoothly.
          </p>

          <div className="classical-divider max-w-xs mx-auto">
            <span className="text-amber-500 font-serif text-xs">✦ CORE STRENGTHS ✦</span>
          </div>
        </div>

        {/* 4 Architectural Stat Pilasters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {siteConfig.stats.map((stat, idx) => {
            const IconComponent = statIcons[stat.iconName] || Target;
            const roman = ROMAN[idx % ROMAN.length];
            return (
              <Card
                key={stat.id}
                className="classical-card classical-frame group text-center p-6 rounded-2xl hover:border-amber-400/50 dark:hover:border-cyan-400/50 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_15px_35px_-10px_rgba(245,158,11,0.2)]"
              >
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between mb-4">
                    <span className="font-serif text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      PILLAR {roman}
                    </span>
                    <span className="text-[10px] font-serif uppercase tracking-widest text-muted-foreground/60">
                      VERIFIED
                    </span>
                  </div>

                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/10 via-primary/10 to-cyan-500/10 border border-border group-hover:border-amber-400/40 group-hover:scale-110 transition-all duration-300 mb-4">
                    <IconComponent className="h-6 w-6 text-foreground group-hover:text-amber-500 dark:group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-gradient-gold mb-1">
                    {stat.value}
                  </div>

                  <div className="font-serif font-bold text-base mb-1.5 text-foreground">
                    {stat.label}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Architectural Manifesto & Principles */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="classical-card p-8 md:p-10 rounded-2xl border border-border/80 relative">
            <span className="font-serif text-xs tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-2 block">
              OUR MISSION & VALUES
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-5 text-foreground leading-snug">
              Building Software That Truly Lasts
            </h3>
            <p className="text-muted-foreground mb-5 leading-relaxed text-sm sm:text-base font-sans">
              Instead of quick, messy shortcuts, we build clean, dependable software that stands the test of time. We partner with founders, growing startups, and businesses to build web platforms that perform smoothly under heavy traffic.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-sans">
              Our engineering founders personally lead every project, ensuring top-tier code quality, crystal-clear communication, and zero middle-management delays.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                icon: Compass,
                title: "Built Right from Day One",
                detail: "We design clean, modern software structures that prevent bugs and make future scaling effortless.",
              },
              {
                icon: ShieldCheck,
                title: "Thorough Quality Testing",
                detail: "Every feature is thoroughly tested across browsers and mobile screens before going live.",
              },
              {
                icon: Code2,
                title: "Clean, Future-Proof Code",
                detail: "We write clean, well-organized TypeScript and React that your team can easily understand and update for years.",
              },
            ].map((principle, pIdx) => (
              <div
                key={pIdx}
                className="group p-5 rounded-xl bg-background/50 dark:bg-slate-900/50 border border-border/80 hover:border-amber-400/40 hover:bg-background/80 transition-all flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                  <principle.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-foreground mb-1 group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                    {principle.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {principle.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;