"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  CheckCircle2,
  MessageSquareCode,
  CloudLightning,
  FileCode,
  MessagesSquare,
  Lock,
  Sparkles,
  Award,
  type LucideIcon,
} from "lucide-react";

interface ProofToken {
  icon: LucideIcon;
  title: string;
  invariant: string;
  proof: string;
}

const proofTokens: ProofToken[] = [
  {
    icon: ShieldCheck,
    title: "Founder-Led Development",
    invariant: "Direct Founder Access",
    proof: "You work directly with our senior engineers and founders, with no junior handoffs or middlemen.",
  },
  {
    icon: Cpu,
    title: "Modern React 19 & Next.js",
    invariant: "Modern Web Framework",
    proof: "Built with React 19 and Next.js for blazing fast page loads and smooth user experience.",
  },
  {
    icon: CheckCircle2,
    title: "Milestone-Based Delivery",
    invariant: "Pay as We Deliver",
    proof: "Clear project phases with live preview links and demos before you approve and pay.",
  },
  {
    icon: MessageSquareCode,
    title: "Free Technical Consultation",
    invariant: "Free Project Roadmap",
    proof: "Honest technical advice and cost estimate with zero pushy sales tactics.",
  },
  {
    icon: CloudLightning,
    title: "Scalable Cloud Architecture",
    invariant: "Fast Global Hosting",
    proof: "Reliable hosting on AWS and Cloudflare with automatic backups and 99.9% uptime.",
  },
  {
    icon: FileCode,
    title: "Strict Clean Code Standards",
    invariant: "100% Type-Safe Code",
    proof: "Clean, well-documented TypeScript code with automated tests that make future updates easy.",
  },
  {
    icon: MessagesSquare,
    title: "Direct Engineering Channels",
    invariant: "Fast Response Time",
    proof: "Direct WhatsApp and Slack chat with the actual developers building your software.",
  },
  {
    icon: Lock,
    title: "Top Security & SEO",
    invariant: "Google Best Practices",
    proof: "Free SSL certificate, security protection, and high Google search ranking optimization.",
  },
];

export function TrustSignals() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-background border-t border-border/60">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Classical Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
              OUR PROMISE • CLEAR GUARANTEES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Real Guarantees, <span className="text-gradient-gold">Zero Empty Promises</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
            Every promise we make is backed by milestone deliverables, clear timelines, and complete access to your source code.
          </p>
        </div>

        {/* 8 Proof Tokens Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {proofTokens.map((token, idx) => {
            const Icon = token.icon;
            return (
              <motion.div
                key={token.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative classical-card classical-frame rounded-3xl p-6 bg-card/85 dark:bg-slate-900/85 backdrop-blur-xl border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Top subtle golden shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Top Bar: Icon + Live Verified Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      VERIFIED
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {token.title}
                  </h3>

                  {/* Proof Description */}
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed mb-4">
                    {token.proof}
                  </p>
                </div>

                {/* Invariant Tag */}
                <div className="pt-3 border-t border-border/60">
                  <span className="text-[11px] font-mono font-semibold text-amber-600 dark:text-amber-400">
                    ✦ {token.invariant}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Gilded IP Ownership Guarantee Seal */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-secondary/40 to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-foreground">
                100% Intellectual Property & Source Code Ownership
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-0.5">
                Full copyright, GitHub repository rights, and cloud deployment keys are unconditionally transferred upon project milestones. Zero vendor lock-in.
              </p>
            </div>
          </div>

          <Badge variant="outline" className="font-serif text-xs px-3.5 py-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400 bg-background/60 shrink-0">
            CONTRACTUAL GUARANTEE
          </Badge>
        </div>
      </div>
    </section>
  );
}

export default TrustSignals;

