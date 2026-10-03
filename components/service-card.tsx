"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, Code, type LucideIcon } from "lucide-react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "framer-motion";
import { getServiceIcon } from "@/lib/services";

interface ServiceCardProps {
  service: {
    id?: string;
    serviceId?: string;
    icon?: LucideIcon;
    iconName?: string;
    title: string;
    description: string;
    features: string[];
    technologies: string[];
    typicalTimeline?: string;
    deliverables?: string;
  };
  index?: number;
}

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const roman = ROMAN_NUMERALS[index % ROMAN_NUMERALS.length] || `0${index + 1}`;
  const serviceId = service.id || service.serviceId || "service";
  const Icon = service.icon || (service.iconName ? getServiceIcon(service.iconName) : Code);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative classical-card classical-frame rounded-2xl overflow-hidden flex flex-col justify-between h-full border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400/50 dark:hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_20px_50px_-12px_rgba(56,189,248,0.2)]"
    >
      {/* Dynamic Modern Interactive Canvas Reveal Effect on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          >
            <CanvasRevealEffect
              animationSpeed={1.5}
              containerClassName="bg-slate-950/70"
              colors={[
                [56, 189, 248], // Electric Azure
                [245, 158, 11], // Classical Gold
                [129, 140, 248], // Indigo
              ]}
              dotSize={2.2}
              opacities={[0.2, 0.3, 0.4, 0.6, 0.8, 1]}
              showGradient={true}
            />
            {/* Frosted glass veil to ensure exceptional readability */}
            <div className="absolute inset-0 bg-background/85 dark:bg-slate-950/85 backdrop-blur-[12px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Classical Watermark Roman Numeral */}
      <div className="absolute top-3 right-5 pointer-events-none select-none z-10">
        <span className="font-serif text-5xl md:text-6xl font-black text-slate-200/50 dark:text-slate-800/40 group-hover:text-amber-500/20 dark:group-hover:text-cyan-400/20 transition-colors duration-500">
          {roman}
        </span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <CardHeader className="p-0 pb-6">
            <div className="flex items-center justify-between mb-4">
              {/* Classical Architectural Emblem Icon */}
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/10 via-primary/10 to-cyan-500/10 dark:from-amber-400/15 dark:via-primary/20 dark:to-cyan-400/15 border border-amber-500/30 dark:border-cyan-400/30 group-hover:border-amber-400 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all duration-300">
                <Icon className="h-7 w-7 text-amber-600 dark:text-amber-300 group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-cyan-400 ring-2 ring-background animate-pulse" />
              </div>

              {/* Classification Tag */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/60 dark:bg-slate-900/80 border border-border/60 text-[11px] font-serif tracking-widest text-muted-foreground uppercase">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>SERVICE {roman}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl md:text-[1.7rem] font-bold tracking-tight text-foreground group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors duration-300">
              {service.title}
            </h3>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-[15px]">
              {service.description}
            </p>

            {/* Key Capabilities */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-4 bg-amber-500/60" />
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-foreground/80">
                  What's Included
                </h4>
              </div>
              <div className="space-y-2.5">
                {service.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2.5 text-sm">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-amber-500/10 dark:bg-emerald-500/15 border border-amber-500/30 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 text-amber-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-foreground/90 font-sans leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="h-px w-4 bg-cyan-500/60" />
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-foreground/80">
                  Core Technologies
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {service.technologies.map((tech, tIndex) => (
                  <Badge
                    key={tIndex}
                    variant="outline"
                    className="text-xs py-0.5 px-2.5 bg-background/50 dark:bg-slate-900/60 border-slate-300 dark:border-slate-800 text-foreground/80 group-hover:border-amber-400/40 dark:group-hover:border-cyan-400/40 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </div>

        {/* Footer Action */}
        <div className="pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs font-serif text-muted-foreground tracking-wide">
            CUSTOM BUILT
          </span>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="group/btn text-sm font-medium text-primary dark:text-cyan-400 hover:text-amber-500 dark:hover:text-amber-300 hover:bg-amber-500/10 transition-all"
          >
            <Link href={`/contact?plan=${serviceId}`}>
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
