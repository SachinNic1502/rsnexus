import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  Sparkles,
  Lock,
  KeyRound,
  FileCode2,
  Server,
  Terminal,
  Bug,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Security Standards & Data Protection | RSNexus",
  description:
    "Learn about our software security standards: modern encryption, secure cloud infrastructure, and automated vulnerability scanning at RSNexus.",
  alternates: {
    canonical: "https://rsnexus.in/security",
  },
};

const securityPillars = [
  {
    icon: Lock,
    roman: "PILLAR I",
    title: "Data Encryption in Transit & at Rest",
    description:
      "All data sent between users and your site is protected with modern TLS 1.3 encryption. Stored data and databases are securely encrypted using industry-standard AES-256.",
  },
  {
    icon: KeyRound,
    roman: "PILLAR II",
    title: "Strict Access Controls & Logins",
    description:
      "Only authorized users can access sensitive data. We enforce role-based permissions, multi-factor authentication (MFA), and secure session handling across all systems.",
  },
  {
    icon: FileCode2,
    roman: "PILLAR III",
    title: "Clean Code & Input Protection",
    description:
      "All user inputs and form submissions are validated and sanitized to block malicious attacks like SQL injection and cross-site scripting (XSS).",
  },
  {
    icon: Server,
    roman: "PILLAR IV",
    title: "Isolated Cloud Hosting & Databases",
    description:
      "Your applications and databases run in isolated cloud containers with private networks, firewalls, and secure connections.",
  },
  {
    icon: Terminal,
    roman: "PILLAR V",
    title: "Automated Security & Code Scans",
    description:
      "Before any code is launched, automated tools scan for known security flaws, outdated libraries, and vulnerabilities.",
  },
  {
    icon: Bug,
    roman: "PILLAR VI",
    title: "Quick Vulnerability Reporting",
    description:
      "We take security reports seriously. Any reported issue is reviewed by our engineering team within 12 hours with top priority.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden py-16 md:py-24">
      {/* Ambient background lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              ✦ SECURITY & RELIABILITY • BEST PRACTICES ✦
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground leading-tight">
            Built-in Security & <span className="text-gradient-gold">Data Protection</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-sans max-w-3xl mx-auto">
            Security is never an afterthought at RSNexus. We build security, encryption, and best practices directly into every line of code, database, and cloud setup.
          </p>

          <div className="classical-divider max-w-xs mx-auto mt-10">
            <span className="text-amber-500 font-serif text-xs">✦ SECURITY STANDARDS ✦</span>
          </div>
        </div>

        {/* Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="classical-card classical-frame rounded-3xl p-7 border border-border/80 dark:border-slate-800/80 bg-card/85 dark:bg-slate-900/85 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-[11px] font-bold uppercase tracking-wider text-amber-500">
                      {pillar.roman}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-serif text-foreground/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Included in All Projects</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Comparison Card */}
        <div className="mb-24">
          <div className="classical-card classical-frame rounded-3xl p-8 sm:p-12 border border-amber-500/30 bg-gradient-to-br from-card via-secondary/20 to-card shadow-2xl">
            <div className="text-center mb-10">
              <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
                SECURITY COMPARISON
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-foreground">
                How Our Security Standards Compare to Other Agencies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 space-y-3">
                <span className="font-serif font-bold text-destructive text-sm uppercase tracking-wider block">
                  ✕ Common Agency Mistakes
                </span>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Secret keys hardcoded in frontend code and public repositories.</li>
                  <li>• Outdated software packages with known vulnerabilities.</li>
                  <li>• Shared cheap hosting servers with security risks.</li>
                  <li>• Loose coding standards leading to unexpected bugs and crashes.</li>
                  <li>• Outsourcing to junior developers with no senior code review.</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/25 space-y-3">
                <span className="font-serif font-bold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wider block">
                  ✓ How RSNexus Protects You
                </span>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• All API keys and secrets encrypted with automated leak prevention.</li>
                  <li>• Automated weekly scans for outdated dependencies and security fixes.</li>
                  <li>• Isolated cloud servers, private databases, and modern SSL encryption.</li>
                  <li>• 100% type-safe code that prevents runtime errors.</li>
                  <li>• Founder-led code reviews on every feature before live release.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Responsible Disclosure Section */}
        <div className="mb-24 max-w-4xl mx-auto text-center">
          <div className="classical-card classical-frame rounded-3xl p-8 sm:p-10 border border-border/80 bg-card/70">
            <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
              SECURITY CONTACT
            </span>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
              Report a Security Issue
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6">
              If you discover any security issue with our website or services, please contact our security team directly. We will review it within 12 hours.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border font-mono text-xs text-foreground">
              <span>Security Desk:</span>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-500 hover:underline">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="classical-card classical-frame rounded-3xl p-8 sm:p-12 border border-amber-500/30 bg-card/90 shadow-2xl">
            <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-2">
              SECURITY QUESTIONS
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-foreground mb-4">
              Need a Custom Security & Compliance Review?
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              We provide security assessments, custom data agreements, and compliance reviews for enterprise projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="font-serif px-8 py-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow-xl border-0"
              >
                <Link href="/contact?type=consultation">
                  <span>Schedule Security Review</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-serif px-8 py-6 border-border">
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
