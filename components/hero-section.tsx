"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Zap, Globe } from "lucide-react";
import { GlobeDemo } from "@/components/ui/GlobeDemo";

export function HeroSection() {
  const handleStartProject = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-float-delay" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-primary-glow/10 rounded-full blur-xl animate-float" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 mt-5 items-center">
          {/* Mobile-only badge above Globe */}
          <div className="order-1 lg:hidden text-center mb-4">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-colors"
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
            {/* Desktop-only badge (normal place) */}
            <div className="hidden lg:block">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-colors"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Elite Software Development Team
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient-hero block">Transform Ideas</span>
                <span className="text-gradient-primary block">
                  Into Digital Excellence
                </span>
              </h1>

             <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
  We’re a growing software development team turning ideas into powerful digital products, delivering innovative solutions to clients around the world.
</p>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                className="text-lg px-8 py-6 group"
                onClick={handleStartProject}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
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
                  Global Client Base
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}