import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFaqData } from "@/lib/data-fetchers";
import { FaqGrid } from "@/components/faq-grid";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | RSNexus",
  description:
    "Straightforward answers to common questions about our development process, pricing, timeline, tech stack, and post-launch support.",
  alternates: {
    canonical: "https://rsnexus.in/faq",
  },
};

export default async function FaqPage() {
  const allFaqs = await getFaqData();

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-foreground relative overflow-hidden py-16 md:py-24">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              QUESTIONS & ANSWERS • FAQ
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto">
            Clear, transparent answers about our development process, timelines, pricing, code ownership, and support.
          </p>

          <div className="classical-divider max-w-xs mx-auto my-6">
            <span className="text-amber-500 font-serif text-xs">✦ EVERYTHING YOU NEED TO KNOW ✦</span>
          </div>
        </div>

        {/* Interactive Classical Accordion Grid */}
        <FaqGrid faqs={allFaqs} />

        {/* Classical Direct Inquiry Box */}
        <div className="classical-card classical-frame rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center mt-16 md:mt-20 max-w-3xl mx-auto border border-amber-500/30 bg-background/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-serif tracking-wider uppercase mb-3">
            TALK TO OUR ENGINEERS
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
            Have a Question About Your Project?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm sm:text-base font-sans leading-relaxed">
            Reach out directly to our founders. No chatbots or sales pitches — you speak straight with the engineers who build your product.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="font-serif px-8 py-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white rounded-xl shadow-lg border-0 group">
              <Link href="/contact">
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-serif px-8 py-6 rounded-xl border-border bg-background/60">
              <a href="https://wa.me/919309931886" target="_blank" rel="noopener noreferrer">
                Direct WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
