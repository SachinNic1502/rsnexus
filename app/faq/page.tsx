import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFaqData } from "@/lib/data-fetchers";
import { FaqGrid } from "@/components/faq-grid";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            FAQ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Straight answers about how we work, what things cost, and what to expect — no sales spin.
          </p>
        </div>

        <FaqGrid faqs={allFaqs} />

        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 mt-16 max-w-3xl mx-auto border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-8">
            Reach out directly — no forms to fill out just to talk to a real engineer.
          </p>
          <Button asChild size="lg" className="px-8">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
