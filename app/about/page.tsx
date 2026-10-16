"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Lightbulb,
  Award,
  MapPin,
  Phone,
  Mail,
  Globe,
  UserCheck,
  GitBranch,
  MessageSquare,
  Code2,
  Sparkles,
  ShieldCheck,
  Linkedin,
  ArrowRight,
  Check,
} from "lucide-react";
import team from "@/data/team.json";
import { WhyChooseUs } from "@/components/why-choose-us";
import { TrustSignals } from "@/components/trust-signals";
import { CTASection } from "@/components/cta-section";

const values = [
  {
    icon: Target,
    roman: "I",
    title: "Excellence",
    subtitle: "High Quality Code",
    description:
      "We take pride in clean code, fast page loads, and dependable software architecture.",
    highlight: "Clean Code",
  },
  {
    icon: Users,
    roman: "II",
    title: "Collaboration",
    subtitle: "Transparent Partnership",
    description:
      "We build open, long-term relationships with direct communication and complete honesty.",
    highlight: "Direct Access to Founders",
  },
  {
    icon: Lightbulb,
    roman: "III",
    title: "Innovation",
    subtitle: "Modern Technologies",
    description:
      "We use modern cloud, mobile, and AI tools that give your business a real competitive edge.",
    highlight: "Modern Tech Stack",
  },
  {
    icon: Award,
    roman: "IV",
    title: "Reliability",
    subtitle: "Built to Scale",
    description:
      "We build reliable systems designed to handle high web traffic and grow with your business.",
    highlight: "99.9% Uptime Focus",
  },
];

const pillars = [
  {
    icon: UserCheck,
    roman: "I",
    number: "Founder-Led",
    label: "Direct Involvement",
    description:
      "Our founders personally plan and build every project — no middlemen, no junior handoffs.",
  },
  {
    icon: Code2,
    roman: "II",
    number: "Modern Stack",
    label: "Current Technology",
    description:
      "React 19, Next.js, clean TypeScript, and fast cloud hosting — never outdated tools.",
  },
  {
    icon: MessageSquare,
    roman: "III",
    number: "Transparent",
    label: "Open Communication",
    description:
      "Direct WhatsApp and Slack chat with real-time updates and weekly live demos.",
  },
  {
    icon: GitBranch,
    roman: "IV",
    number: "Clean Code",
    label: "Quality Standards",
    description:
      "Clean TypeScript, automated testing, and well-organized code that is easy to update for years.",
  },
];

const ARCHITECT_ROMAN = ["TEAM I", "TEAM II", "TEAM III", "TEAM IV"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20 selection:text-amber-500">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-slate-50/70 dark:bg-slate-950/80 relative overflow-hidden border-b border-border/60">
        {/* Ambient background illumination */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
              ABOUT RSNEXUS • WHO WE ARE
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black mb-6 text-foreground tracking-tight leading-tight">
            Driven by Innovation, <span className="text-gradient-gold">Committed to Quality</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-sans leading-relaxed">
            RSNexus is a modern software development studio founded by experienced engineers. We partner with startups and ambitious businesses worldwide to build fast, scalable, and beautifully designed digital products.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-serif text-muted-foreground">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/60 dark:bg-slate-900/60 border border-border/70 backdrop-blur-md">
              <MapPin className="h-4 w-4 text-amber-500" />
              <span>Delivering Worldwide</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/60 dark:bg-slate-900/60 border border-border/70 backdrop-blur-md">
              <Users className="h-4 w-4 text-amber-500" />
              <span>Senior Engineers</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/60 dark:bg-slate-900/60 border border-border/70 backdrop-blur-md">
              <Globe className="h-4 w-4 text-amber-500" />
              <span>Founder-Led Architecture</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/60 dark:bg-slate-900/60 border border-border/70 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              <span>100% Code Ownership</span>
            </div>
          </div>

          <div className="classical-divider max-w-xs mx-auto mt-12">
            <span className="text-amber-500 font-serif text-xs">✦ OUR CORE VALUES ✦</span>
          </div>
        </div>
      </section>

      {/* Core Keystone Pillars (Stats / Values Overview) */}
      <section className="py-20 md:py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.roman}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="group relative classical-card classical-frame rounded-3xl p-6 sm:p-7 bg-card/85 dark:bg-slate-900/85 backdrop-blur-xl border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="font-mono text-4xl sm:text-5xl font-black text-slate-200/50 dark:text-slate-800/50 select-none pointer-events-none absolute right-4 top-4 group-hover:text-amber-500/10 transition-colors">
                    {stat.roman}
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge
                        variant="outline"
                        className="font-serif text-[11px] font-bold px-2 py-0.5 rounded-md border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25"
                      >
                        PILLAR {stat.roman}
                      </Badge>
                    </div>

                    <h3 className="font-serif text-2xl font-black text-foreground mb-1 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                      {stat.number}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-3">
                      {stat.label}
                    </p>

                    <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story / The Chronicle */}
      <section className="py-24 md:py-32 bg-slate-50/70 dark:bg-slate-950/80 relative overflow-hidden border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
                  OUR STORY • HOW WE STARTED
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight leading-tight">
                The Story Behind <span className="text-gradient-gold">RSNexus</span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                <p>
                  RSNexus was founded to turn great ideas into fast, dependable software. Based in Mumbai and working remotely worldwide, we build high-performing websites and web applications for businesses that want to scale.
                </p>
                <p>
                  With over 3 years of software engineering experience, we focus on speed, clean code, and reliability. We reject traditional agency fluff and endless middlemen—instead, you work directly with our engineering founders to build software that lasts.
                </p>
                <p>
                  From custom web applications to mobile apps and cloud setups, everything we build is designed to handle high traffic and scale smoothly.
                </p>
              </div>

              {/* Chronicle Milestones */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  "Founded by Software Engineers",
                  "10+ Global Deployments",
                  "Clean Code Philosophy",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-xl bg-card/80 dark:bg-slate-900/80 border border-border/70 text-xs font-serif font-medium text-foreground"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Showcase Image */}
            <div className="lg:col-span-5">
              <div className="classical-card classical-frame relative rounded-3xl p-3 border border-amber-500/30 overflow-hidden shadow-2xl group bg-card/80 dark:bg-slate-900/80">
                <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950">
                  <Image
                    src="/images/about/atelier-chronicle.jpg"
                    alt="RSNexus team collaborating on digital platforms"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                    <span className="px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold border border-amber-500/30">
                      MUMBAI STUDIO
                    </span>
                    <span className="px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-slate-200">
                      GLOBAL DELIVERY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The VIII Architectural Pillars */}
      <WhyChooseUs />

      {/* The Verified Proof Matrix */}
      <TrustSignals />

      {/* Our Core Values */}
      <section className="py-24 md:py-32 bg-slate-50/70 dark:bg-slate-950/80 relative overflow-hidden border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
                HOW WE OPERATE • GUIDING PRINCIPLES
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Principles of <span className="text-gradient-gold">Integrity & Quality</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
              Our core tenets shape our engineering decisions, client partnerships, and technical rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.roman}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="group relative classical-card classical-frame rounded-3xl p-6 sm:p-7 bg-card/85 dark:bg-slate-900/85 backdrop-blur-xl border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="font-mono text-4xl sm:text-5xl font-black text-slate-200/50 dark:text-slate-800/50 select-none pointer-events-none absolute right-4 top-4 group-hover:text-amber-500/10 transition-colors">
                    {value.roman}
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge
                        variant="outline"
                        className="font-serif text-[11px] font-bold px-2 py-0.5 rounded-md border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25"
                      >
                        VALUE {value.roman}
                      </Badge>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-3">
                      {value.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                      {value.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-secondary/60 dark:bg-slate-800/50 border border-border/60 text-xs">
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-foreground/90 font-sans font-medium text-[11px]">
                        {value.highlight}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership / The Principal Architects */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
                OUR TEAM • LEADERSHIP
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              The Team Behind <span className="text-gradient-gold">RSNexus</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
              Our leaders combine deep engineering experience, reliable cloud expertise, and fast-paced startup execution to deliver real results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => {
              const romanTag = ARCHITECT_ROMAN[idx % ARCHITECT_ROMAN.length];
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="group relative classical-card classical-frame rounded-3xl p-6 sm:p-7 bg-card/85 dark:bg-slate-900/85 backdrop-blur-xl border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden text-center"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Top Roman Tag */}
                    <div className="w-full flex items-center justify-between mb-5">
                      <span className="font-serif text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {romanTag}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-serif text-muted-foreground font-semibold">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        LEADERSHIP
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="relative mx-auto mb-4 w-24 h-24">
                      <Avatar className="w-24 h-24 ring-4 ring-amber-500/20 dark:ring-amber-400/20 overflow-hidden shadow-xl group-hover:scale-105 group-hover:ring-amber-400 transition-all duration-300">
                        <AvatarImage className="object-cover w-full h-full" src={member.image} alt={member.name} />
                        <AvatarFallback className="font-serif text-lg font-bold bg-secondary">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="font-serif text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3 tracking-wide">
                      {member.role}
                    </p>

                    <p className="text-xs text-muted-foreground font-sans leading-relaxed mb-5">
                      {member.bio}
                    </p>
                  </div>

                  {/* Actions / Channels */}
                  <div className="pt-4 border-t border-border/60 space-y-2">
                    {member.linkedin && (
                      <Button asChild size="sm" variant="outline" className="w-full font-serif text-xs rounded-xl border-border hover:border-amber-400/40">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-3.5 w-3.5 mr-1.5 text-[#0A66C2]" />
                          Connect on LinkedIn
                        </a>
                      </Button>
                    )}
                    <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground font-mono">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="hover:text-amber-500 transition-colors flex items-center gap-1" title={member.email}>
                          <Mail className="h-3 w-3 text-amber-500" />
                          <span>Email</span>
                        </a>
                      )}
                      {member.phone && (
                        <a href={`tel:${member.phone}`} className="hover:text-amber-500 transition-colors flex items-center gap-1" title={member.phone}>
                          <Phone className="h-3 w-3 text-amber-500" />
                          <span>Direct</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Conversion CTA Section */}
      <CTASection />
    </div>
  );
}