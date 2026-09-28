"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Zap, Globe } from "lucide-react";
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
    <section className="relative min-h-[92vh] flex items-center justify-center bg-hero-gradient overflow-hidden">
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

      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-float-delay" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-primary-glow/10 rounded-full blur-xl animate-float" />

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 mt-2 items-center gap-8 lg:gap-12">
          {/* Mobile-only badge above Globe */}
          <div className="order-1 lg:hidden text-center mb-2">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-background/50 backdrop-blur-md border-primary/30"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Elite Software Development Team
            </Badge>
          </div>

          {/* Globe (mobile: top, desktop: right) */}
          <div className="order-2 lg:order-2 relative flex items-center justify-center">
            <GlobeDemo />
          </div>

          {/* Content (mobile: bottom, desktop: left) */}
          <div className="order-3 lg:order-1 text-center lg:text-left space-y-8">
            {/* Desktop-only badge */}
            <div className="hidden lg:block">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 bg-background/50 backdrop-blur-md border-primary/30 px-3.5 py-1.5"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Elite Software Development Team
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-hero block">Transform Ideas</span>
                <span className="text-gradient-primary block">
                  Into Digital Excellence
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                We're a growing software development team turning ideas into powerful digital products, delivering innovative solutions to clients around the world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                className="text-base sm:text-lg px-8 py-6 group shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all"
                onClick={handleStartProject}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-8 py-6 bg-background/60 backdrop-blur-md hover:bg-accent/40"
              >
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                "Founder-led Development",
                "Modern React & Next.js",
                "Transparent Communication",
                "Free Consultation",
                "Scalable Solutions",
                "Clean & Maintainable Code",
              ].map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  className="bg-background/10 backdrop-blur-sm border-primary/20 text-xs sm:text-sm font-normal"
                >
                  ✓ {badge}
                </Badge>
              ))}
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 !mb-5">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Code className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">
                  Full-Stack Development
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Zap className="h-4 w-4 text-accent" />
                </div>
                <span className="text-foreground font-medium">
                  Lightning Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-primary-glow/20 rounded-lg">
                  <Globe className="h-4 w-4 text-primary-glow" />
                </div>
                <span className="text-foreground font-medium">
                  Direct Communication
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}