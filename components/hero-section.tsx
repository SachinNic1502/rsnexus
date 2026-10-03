"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Zap, Globe, Sparkles } from "lucide-react";
import { GlobeDemo } from "@/components/ui/GlobeDemo";

const SparklesCore = dynamic(
  () => import("@/components/ui/sparkles").then((mod) => mod.SparklesCore),
  { ssr: false }
);

export function HeroSection() {
  const router = useRouter();

  const handleStartProject = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact");
    }
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-hero-gradient overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Ambient subtle sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <SparklesCore
          id="hero-ambient-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#38bdf8"
        />
      </div>

      {/* Floating ambient glows */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-float-delay" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-amber-500/10 rounded-full blur-xl animate-float" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-10 sm:py-14 md:py-16">
        <div className="grid lg:grid-cols-2 mt-2 items-center gap-8 lg:gap-12">
          {/* Content (Mobile first, Desktop left) */}
          <div className="order-1 lg:order-1 text-center lg:text-left space-y-6 sm:space-y-8">
            {/* Atelier Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 bg-background/60 backdrop-blur-md border-amber-500/30 px-3.5 sm:px-4 py-1.5 shadow-sm"
              >
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="font-serif text-[11px] sm:text-xs uppercase tracking-widest text-foreground/90">
                  EST. 2024 • CUSTOM SOFTWARE & WEB STUDIO
                </span>
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
                <span className="text-gradient-hero block">Turning Great Ideas</span>
                <span className="text-gradient-gold block font-serif">
                  Into Powerful Software
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-sans mx-auto lg:mx-0">
                We design and build fast, reliable websites, mobile apps, and custom web software for startups and growing businesses worldwide. Zero fluff, transparent pricing, and direct engineer access.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                className="font-serif text-sm sm:text-base px-7 sm:px-8 py-5 sm:py-6 group shadow-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white border-0 transition-all rounded-xl"
                onClick={handleStartProject}
              >
                <span>Start Your Project</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-serif text-sm sm:text-base px-7 sm:px-8 py-5 sm:py-6 bg-background/60 backdrop-blur-md hover:bg-accent/40 border-slate-300 dark:border-slate-800 rounded-xl"
              >
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
              {[
                "Founder-Led Team",
                "Clean, Maintainable Code",
                "Next.js & React 19",
                "Direct Engineer Chat",
                "Zero Hidden Costs",
                "Fast Loading Speeds",
              ].map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  className="bg-background/20 backdrop-blur-sm border-amber-500/20 text-[11px] sm:text-xs font-serif py-1"
                >
                  ✦ {badge}
                </Badge>
              ))}
            </div>

            {/* Feature Highlights Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Code className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">
                  Full-Stack Development
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Zap className="h-4 w-4 text-accent" />
                </div>
                <span className="text-foreground font-medium">
                  Lightning Fast Delivery
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm">
                <div className="p-2 bg-primary-glow/20 rounded-lg">
                  <Globe className="h-4 w-4 text-primary-glow" />
                </div>
                <span className="text-foreground font-medium">
                  Direct Communication
                </span>
              </div>
            </div>
          </div>

          {/* 3D Globe (Mobile below CTAs, Desktop right) */}
          <div className="order-2 lg:order-2 relative flex items-center justify-center">
            <GlobeDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;