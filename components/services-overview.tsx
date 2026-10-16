"use client";

import React from "react";
import { ServiceCard } from "@/components/service-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getServices, getServiceIcon } from "@/lib/services";

export function ServicesOverview() {
  const services = getServices();

  return (
    <section className="py-24 md:py-32 bg-slate-50/50 dark:bg-slate-900/40 relative overflow-hidden">
      {/* Ambient background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              WHAT WE BUILD • CORE SERVICES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-foreground">
            Custom Software & <span className="text-gradient-gold">Web Services</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            From modern responsive websites and mobile apps to full-stack cloud software and AI tools, explore what we can build for your business.
          </p>

          <div className="classical-divider max-w-xs mx-auto">
            <span className="text-amber-500 font-serif text-xs">✦ OUR SERVICES ✦</span>
          </div>
        </div>

        {/* 2 or 3-column Grid of Service Cards with Canvas Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <div key={service.id} className="h-full">
                <ServiceCard service={{ ...service, icon: Icon }} index={index} />
              </div>
            );
          })}
        </div>

        {/* Classical View All CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="font-serif text-base px-8 py-6 group bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-xl transition-all"
          >
            <Link href="/services">
              <span>View All Services</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ServicesOverview;
