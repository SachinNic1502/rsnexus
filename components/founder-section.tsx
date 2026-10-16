"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Sparkles, ShieldCheck } from "lucide-react";
import team from "@/data/team.json";

const defaultFounders = team.filter((member) => member.role === "Founder" || member.role === "Co-Founder");

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

const FOUNDER_ROMAN = ["FOUNDER I", "FOUNDER II"];

interface FounderSectionProps {
  initialFounders?: any[];
}

export function FounderSection({ initialFounders }: FounderSectionProps = {}) {
  const founders = initialFounders && initialFounders.length > 0 ? initialFounders : defaultFounders;

  return (
    <section className="py-24 md:py-32 bg-slate-50/50 dark:bg-slate-950/50 relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              LEADERSHIP • DIRECT FOUNDER ACCESS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-foreground">
            Founder-Led, <span className="text-gradient-gold">Never Outsourced</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            You work directly with our technical founders from day one. No junior handoffs, no account-management runarounds—just honest, direct engineering collaboration.
          </p>

          <div className="classical-divider max-w-xs mx-auto">
            <span className="text-amber-500 font-serif text-xs">✦ MEET THE FOUNDERS ✦</span>
          </div>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {founders.map((member, index) => {
            const romanTag = FOUNDER_ROMAN[index % FOUNDER_ROMAN.length];
            return (
              <Card
                key={index}
                className="classical-card classical-frame group text-center p-8 sm:p-10 rounded-2xl hover:border-amber-400/50 dark:hover:border-cyan-400/50 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_45px_-10px_rgba(245,158,11,0.2)]"
              >
                <CardContent className="p-0 flex flex-col items-center">
                  {/* Top Roman Tag */}
                  <div className="w-full flex items-center justify-between mb-6">
                    <span className="font-serif text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                      {romanTag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-serif text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      FOUNDER
                    </span>
                  </div>

                  {/* Avatar with classical halo */}
                  <div className="relative mb-5">
                    <Avatar className="w-28 h-28 ring-4 ring-amber-500/20 dark:ring-amber-400/20 overflow-hidden shadow-xl group-hover:scale-105 group-hover:ring-amber-400 transition-all duration-300">
                      <AvatarImage className="object-cover w-full h-full" src={member.image} alt={member.name} />
                      <AvatarFallback className="font-serif text-xl font-bold bg-secondary">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-background" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold mb-1 text-foreground">
                    {member.name}
                  </h3>
                  <p className="font-serif text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3 tracking-wide">
                    {member.role === "Founder" ? "Founder & Lead Engineer" : "Co-Founder & Tech Lead"}
                  </p>

                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed font-sans max-w-sm">
                    {member.bio}
                  </p>

                  <Badge
                    variant="outline"
                    className="font-serif mb-6 text-xs px-3.5 py-1 bg-background/50 border-border"
                  >
                    ✦ {member.role === "Co-Founder" ? "2+" : "3+"} Years Engineering Experience
                  </Badge>

                  {/* Social Channels */}
                  <div className="flex items-center gap-3">
                    <Button asChild size="sm" variant="outline" className="font-serif rounded-full px-4 border-border hover:border-amber-400/40">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2 text-[#0A66C2]" />
                        LinkedIn
                      </a>
                    </Button>
                    {member.github && (
                      <Button asChild size="sm" variant="outline" className="font-serif rounded-full px-4 border-border">
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FounderSection;
