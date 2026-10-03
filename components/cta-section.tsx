"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Sparkles, Shield, Clock, Award } from "lucide-react";
import { useRouter } from "next/navigation";

export function CTASection() {
  const router = useRouter();

  const handleGetConsultation = () => {
    router.push("/contact");
  };

  const handleViewWork = () => {
    router.push("/portfolio");
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-50/50 dark:bg-slate-950/60 scroll-mt-20 relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="classical-card classical-frame max-w-4xl mx-auto rounded-3xl border border-amber-500/40 dark:border-cyan-400/30 overflow-hidden shadow-2xl bg-gradient-to-br from-background via-secondary/40 to-background">
          <CardContent className="p-8 sm:p-12 md:p-16 text-center relative z-10">
            {/* Classical Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/90 border border-amber-500/30 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
                START YOUR PROJECT • LET&apos;S TALK
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight leading-tight">
              Ready to Build Your <span className="text-gradient-gold">Next Project</span>?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
              Schedule a free 30-minute call with our lead engineers. We&apos;ll discuss your goals, share honest technical advice, and outline a clear, milestone-based roadmap.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="font-serif text-base sm:text-lg px-8 py-6 group bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-xl transition-all border-0"
                onClick={handleGetConsultation}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                <span>Book Free Consultation</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-serif text-base sm:text-lg px-8 py-6 border-border hover:bg-background/80 bg-background/50"
                onClick={handleViewWork}
              >
                View Our Portfolio
              </Button>
            </div>

            {/* Classical Guarantees */}
            <div className="mt-12 pt-8 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Shield, text: "Strict Non-Disclosure" },
                { icon: Award, text: "Direct Engineer Access" },
                { icon: Clock, text: "Milestone-Based Delivery" },
                { icon: Sparkles, text: "Clean, Maintainable Code" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 text-xs font-serif text-foreground/80">
                  <item.icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default CTASection;
