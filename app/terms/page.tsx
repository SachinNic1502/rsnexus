import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FileCheck, Sparkles, Scale, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service & Client Agreement | RSNexus",
  description:
    "Master services agreement, milestone delivery policies, intellectual property transfer terms, and warranty obligations at RSNexus Technologies.",
  alternates: {
    canonical: "https://rsnexus.in/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden py-16 md:py-24">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-5 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              ✦ TERMS OF SERVICE • CLIENT AGREEMENT ✦
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
            Terms of Service & <span className="text-gradient-gold">Client Agreement</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
            Clear, transparent terms covering project milestones, payments, code ownership, and free warranty support.
          </p>

          <div className="mt-4 text-xs font-serif text-amber-600 dark:text-amber-400">
            Last Updated: {lastUpdated} • Location: Mumbai, Maharashtra, India
          </div>

          <div className="classical-divider max-w-xs mx-auto my-8">
            <span className="text-amber-500 font-serif text-xs">✦ CONTRACT TERMS ✦</span>
          </div>
        </div>

        {/* Content Card */}
        <div className="classical-card classical-frame rounded-3xl p-8 sm:p-12 md:p-16 border border-border/80 dark:border-slate-800/80 bg-card/90 dark:bg-slate-900/90 shadow-2xl space-y-10 text-foreground/90 font-sans leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">01.</span>
              Agreement & Project Scope
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              These Terms of Service (&quot;Agreement&quot;) are between {siteConfig.legalName} (&quot;RSNexus&quot;, &quot;we&quot;, &quot;our&quot;) and you (&quot;Client&quot;, &quot;you&quot;). By starting a project, approving a proposal, or paying any project invoice, you agree to these terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">02.</span>
              Milestone Delivery & Payment Structure
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              We believe in honest, transparent pricing. All projects are delivered in clear, agreed milestones:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/70">
                <span className="font-serif font-bold text-amber-500 block mb-1">PHASE 1: DISCOVERY & PLAN</span>
                <span className="font-bold text-foreground text-sm block mb-1">30% Deposit</span>
                <p className="text-muted-foreground">Covers project planning, wireframes, technical designs, and initial approval.</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/70">
                <span className="font-serif font-bold text-amber-500 block mb-1">PHASE 2: DEVELOPMENT</span>
                <span className="font-bold text-foreground text-sm block mb-1">40% Midway</span>
                <p className="text-muted-foreground">Paid once core features are built and ready for you to test on a live preview link.</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/70">
                <span className="font-serif font-bold text-amber-500 block mb-1">PHASE 3: LAUNCH & HANDOVER</span>
                <span className="font-bold text-foreground text-sm block mb-1">30% Completion</span>
                <p className="text-muted-foreground">Paid after final testing, live launch, and complete handover of all source code and files.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              * Custom payment schedules can be arranged for enterprise contracts or ongoing monthly work.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">03.</span>
              100% Full Code Ownership
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              We believe you should <strong>completely own what you pay for</strong>. Unlike agencies that lock you into monthly runtime fees:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Upon final milestone payment, <strong>all custom source code, designs, database files, and project assets belong 100% to you.</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>RSNexus keeps zero rights over your business logic, client data, or proprietary ideas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Open-source software libraries used in your build remain licensed under their respective licenses (MIT, Apache 2.0).</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">04.</span>
              Post-Launch Warranty & Bug Fixes
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Every project comes with a free warranty support period (ranging from 1 month for starter websites up to 12 months for enterprise applications):
            </p>
            <div className="p-4 rounded-2xl bg-secondary/50 border border-border/70 text-xs sm:text-sm text-muted-foreground space-y-2">
              <p>
                <strong>What We Cover:</strong> Any bugs, broken links, or errors in our code will be fixed promptly at zero extra cost.
              </p>
              <p>
                <strong>Exclusions:</strong> Issues caused by third-party outages (such as AWS or Stripe server outages), modifications by outside developers, or completely new feature requests outside the original project scope.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">05.</span>
              Client Responsibilities & Asset Delivery
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              To guarantee contracted turnaround schedules, the Client agrees to provide necessary third-party API credentials, copy assets, domain access, and milestone approvals within five (5) business days of request. Unreasonable review delays may adjust final delivery milestones proportionately.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">06.</span>
              Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              To the maximum extent permitted by applicable law, in no event shall RSNexus Technologies be liable for any indirect, incidental, punitive, or consequential damages (including loss of profits or business interruption) exceeding the total fees actually paid by Client under the applicable Statement of Work in the three (3) months preceding the incident.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 pt-4 border-t border-border/70">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">07.</span>
              Governing Law & Dispute Resolution
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              This Agreement shall be governed by and construed in accordance with the laws of the Republic of India. In the event of any contractual dispute, the parties shall first engage in good-faith executive mediation. Unresolved disputes shall fall under the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra, India.
            </p>
            <div className="p-4 rounded-xl bg-secondary/60 border border-border text-xs text-muted-foreground">
              For contract inquiries, custom MSA execution, or enterprise vendor onboarding: <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-500 underline font-mono">{siteConfig.contact.email}</a>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="font-serif rounded-full px-6">
            <Link href="/">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
