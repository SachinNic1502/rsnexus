import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Shield, Sparkles, Lock, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection | RSNexus",
  description:
    "Our privacy commitments, data processing principles, and compliance with the DPDP Act 2023 and GDPR at RSNexus Technologies.",
  alternates: {
    canonical: "https://rsnexus.in/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden py-16 md:py-24">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-5 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              ✦ PRIVACY POLICY • DATA PROTECTION ✦
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
            Privacy Policy & <span className="text-gradient-gold">Data Protection</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
            Our commitment to protecting your privacy, personal information, and business confidentiality.
          </p>

          <div className="mt-4 text-xs font-serif text-amber-600 dark:text-amber-400">
            Effective Date: {lastUpdated} • Compliance: DPDP Act 2023 & GDPR Aligned
          </div>

          <div className="classical-divider max-w-xs mx-auto my-8">
            <span className="text-amber-500 font-serif text-xs">✦ PRIVACY DETAILS ✦</span>
          </div>
        </div>

        {/* Content Card */}
        <div className="classical-card classical-frame rounded-3xl p-8 sm:p-12 md:p-16 border border-border/80 dark:border-slate-800/80 bg-card/90 dark:bg-slate-900/90 shadow-2xl space-y-10 text-foreground/90 font-sans leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">01.</span>
              Overview & Scope
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {siteConfig.legalName} (&quot;RSNexus&quot;, &quot;we&quot;, &quot;our&quot;) respects the privacy of every client, partner, and visitor who visits <span className="font-mono text-xs">{siteConfig.domain}</span> or contacts us for software development. This policy explains how we collect, store, and protect your information.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">02.</span>
              Information We Collect
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              We only collect information necessary to communicate with you and build your software:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Contact & Project Details:</strong> Your name, email, phone/WhatsApp number, company name, and project requirements submitted through our contact forms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Website Usage Data:</strong> Anonymous data such as browser type, general country-level location, and visited pages to ensure fast loading speeds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Payment Data:</strong> All payments are processed securely through certified payment gateways (Stripe, Razorpay, or bank transfer). We never store credit card or banking details on our servers.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">03.</span>
              How We Use Your Data
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your data is used only to deliver our services and communicate with you:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                { title: "Direct Consultation", desc: "Understanding your project scope, estimating costs, and scheduling calls." },
                { title: "Project Delivery & Development", desc: "Setting up code repositories, demo links, and delivering milestones." },
                { title: "Security & Fraud Prevention", desc: "Protecting our website from spam, bots, and security vulnerabilities." },
                { title: "Service & Project Updates", desc: "Sending important project updates, deployment notifications, and support alerts." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-secondary/50 border border-border/70">
                  <h4 className="font-serif font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">04.</span>
              Strict Confidentiality & Non-Disclosure
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              We uphold strict confidentiality. <strong>We will never sell, rent, or share your personal information or business details with advertisers or data brokers.</strong>
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              Any codebases, API credentials, or business ideas shared with RSNexus are protected and accessible only to the developers directly assigned to your project.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">05.</span>
              Your Privacy Rights
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Depending on your jurisdiction, you retain full rights over your data, including:
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
              <li>Right to review and obtain an export of all personal data held about you.</li>
              <li>Right to request immediate correction or completion of inaccurate information.</li>
              <li>Right to request permanent erasure (&quot;Right to be Forgotten&quot;) across all staging environments.</li>
              <li>Right to revoke consent for promotional or technical communication at any time.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">06.</span>
              Cookies & Local Storage
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              We employ essential, session-based cookies strictly for theme preferences (Dark/Light mode) and secure state persistence. We do not employ third-party tracking pixels that follow your behavior across external websites.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 pt-4 border-t border-border/70">
            <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-500 font-serif text-sm">07.</span>
              Data Protection Officer & Inquiries
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              If you have any questions, wish to exercise statutory data rights, or require a signed mutual Non-Disclosure Agreement (NDA), please contact our Data Protection Officer directly:
            </p>
            <div className="p-5 rounded-2xl bg-secondary/60 border border-border text-sm space-y-1 font-mono">
              <div className="font-bold text-foreground">{siteConfig.legalName} • Data Privacy Desk</div>
              <div className="text-muted-foreground">Attn: Sachin Rathod (Principal Software Architect)</div>
              <div>Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-500 underline">{siteConfig.contact.email}</a></div>
              <div>Address: {siteConfig.contact.address.display}</div>
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
