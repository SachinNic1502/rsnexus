import type { Metadata } from "next";
import { ServiceCard } from "@/components/service-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Award, Landmark, Layers } from "lucide-react";
import { getServicesData } from "@/lib/data-fetchers";
import { TechStackDock } from "@/components/ui/tech-stack-dock";
import { ProcessTimeline } from "@/components/process-timeline";

export const metadata: Metadata = {
  title: "Software Development Services | RSNexus",
  description:
    "Comprehensive end-to-end software development services including web apps, mobile apps, SaaS systems, AI integrations, and cloud infrastructure.",
  alternates: {
    canonical: "https://rsnexus.in/services",
  },
};

export default async function ServicesPage() {
  const services = await getServicesData();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden">
      {/* Classical ambient background lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-amber-500/5 via-cyan-500/5 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Classical Monumental Hero Section */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/90">
              OUR SOFTWARE SERVICES
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            High-Performance Web & <span className="text-gradient-gold">Software Development</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-sans">
            From high-speed web apps and mobile applications to custom AI tools and reliable cloud setups,
            we build fast, scalable software designed to grow with your business.
          </p>

          {/* Classical Architectural Divider */}
          <div className="classical-divider max-w-md mx-auto my-8">
            <span className="text-amber-500 font-serif text-sm">✦ WHAT WE DELIVER ✦</span>
          </div>

          {/* Classical Guarantees Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: Shield, label: "Built-in Security", detail: "Protected from day one" },
              { icon: Landmark, label: "Clean Code", detail: "Easy to maintain & scale" },
              { icon: Award, label: "Founder-Led", detail: "Work directly with founders" },
              { icon: Layers, label: "Fast Performance", detail: "Loads in under a second" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-background/60 dark:bg-slate-900/60 border border-border/80 text-center flex flex-col items-center justify-center hover:border-amber-400/40 transition-colors"
              >
                <item.icon className="w-5 h-5 text-amber-500 mb-1.5" />
                <span className="font-serif text-xs font-bold text-foreground">{item.label}</span>
                <span className="text-[11px] text-muted-foreground">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Modern Tech Stack Dock */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-8">
            <span className="font-serif text-xs tracking-widest uppercase text-amber-600 dark:text-amber-400">
              OUR TECH STACK
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mt-1 text-foreground">
              Technologies We Use
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-lg mx-auto">
              Modern tools and frameworks we use to build reliable, high-speed software.
            </p>
          </div>
          <TechStackDock />
        </div>

        {/* Services Grid with Canvas Reveal Effect */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-border/60">
            <div>
              <span className="font-serif text-xs tracking-widest uppercase text-muted-foreground">
                ALL SERVICES
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Our Development Services
              </h2>
            </div>
            <div className="text-xs font-serif text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              {services.length} SERVICES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service: any, index: number) => {
              return (
                <div
                  key={service.id || service.serviceId}
                  id={service.id || service.serviceId}
                  className="scroll-mt-28"
                >
                  <ServiceCard service={service} index={index} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Timeline Section */}
        <div className="my-16">
          <ProcessTimeline />
        </div>

        {/* Classical Architectural Consultation Section */}
        <div className="mt-20 md:mt-28 text-center max-w-4xl mx-auto">
          <div className="classical-card classical-frame rounded-2xl p-8 md:p-14 relative overflow-hidden border border-amber-500/30 dark:border-cyan-400/30 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block font-serif text-xs tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-2">
                START YOUR PROJECT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-foreground">
                Ready to Build Your Next Software Project?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Talk directly with our founders to get an accurate estimate, project timeline, and expert recommendations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="font-serif px-8 py-6 text-base shadow-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white border-0 group"
                >
                  <Link href="/contact">
                    <span>Schedule a Free Consultation</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-serif px-8 py-6 text-base bg-background/50 hover:bg-background/80"
                >
                  <Link href="/portfolio">Inspect Living Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
