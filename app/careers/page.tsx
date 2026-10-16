import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getActiveJobOpenings } from "@/lib/data-fetchers";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  GraduationCap,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers & Open Positions | RSNexus",
  description:
    "Join our founder-led engineering studio. Explore remote job openings for Full-Stack Next.js engineers, UI/UX designers, and mobile developers.",
  alternates: {
    canonical: "https://rsnexus.in/careers",
  },
};

const perks = [
  {
    icon: Globe,
    title: "100% Remote Work",
    description: "Work with complete flexibility from anywhere in India with balanced hours.",
  },
  {
    icon: Users,
    title: "Direct Founder Mentorship",
    description: "Collaborate directly with our technical leaders without middle-management layers.",
  },
  {
    icon: Zap,
    title: "Modern Tech Stack",
    description: "Build with React 19, Next.js 16, TypeScript, AI agents, and fast cloud tools.",
  },
  {
    icon: GraduationCap,
    title: "Accelerated Growth",
    description: "Ship real production apps, earn project bonuses, and build scalable systems.",
  },
];

export default async function CareersPage() {
  const jobs = await getActiveJobOpenings();

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-foreground relative overflow-hidden py-16 md:py-24">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              CAREERS • JOIN OUR TEAM
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
            Build Great <span className="text-gradient-gold">Software</span> With Us
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto">
            We are a fast-growing, founder-led software studio building products for clients across the globe. Join our team of passionate engineers and designers.
          </p>

          <div className="classical-divider max-w-xs mx-auto my-6">
            <span className="text-amber-500 font-serif text-xs">✦ JOIN OUR TEAM ✦</span>
          </div>
        </div>

        {/* Culture & Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <Card key={idx} className="classical-card classical-frame hover:border-amber-400/50 transition-all hover:-translate-y-1.5 p-6 rounded-2xl bg-background/90 dark:bg-slate-900/90 shadow-md">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 border border-amber-500/25 rounded-xl mb-4 text-amber-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2 text-foreground">{perk.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">{perk.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Open Positions Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border/60">
            <div>
              <span className="font-serif text-xs tracking-widest uppercase text-amber-600 dark:text-amber-400 block mb-1">
                OPEN POSITIONS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Active Openings
              </h2>
            </div>
            <span className="font-serif text-xs px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold">
              {jobs.length} Active {jobs.length === 1 ? "Role" : "Roles"}
            </span>
          </div>

          {jobs.length === 0 ? (
            <Card className="p-12 text-center classical-card border-dashed">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="font-serif text-lg font-bold mb-2">No Active Openings Right Now</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6 font-sans">
                We are always excited to connect with talented builders. Send us your portfolio and we will reach out when a new mission opens.
              </p>
              <Button asChild className="font-serif bg-gradient-to-r from-amber-600 to-amber-500 text-white">
                <Link href="/contact?type=general-application">Get In Touch</Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-5">
              {jobs.map((job: any) => (
                <Card
                  key={job._id}
                  className="classical-card classical-frame group hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl bg-background/90 dark:bg-slate-900/90 rounded-2xl overflow-hidden p-6 sm:p-8"
                >
                  <CardContent className="p-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-xs px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 font-bold">
                          {job.department}
                        </span>
                        <Badge variant="secondary" className="text-xs font-mono">
                          {job.type}
                        </Badge>
                        {job.experienceLevel && (
                          <Badge variant="outline" className="text-xs font-mono">
                            {job.experienceLevel}
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        <Link href={`/careers/${job.slug}`}>{job.title}</Link>
                      </h3>

                      <p className="text-muted-foreground text-sm line-clamp-2 max-w-2xl leading-relaxed font-sans">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1 font-mono">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          {job.location}
                        </span>
                        {job.salaryRange && (
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            {job.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <Button asChild size="lg" className="w-full sm:w-auto font-serif text-xs uppercase tracking-wider px-6 py-5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white border-0 shadow-lg group">
                        <Link href={`/careers/${job.slug}`}>
                          <span>View Role Details</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* General Application CTA */}
        <div className="classical-card classical-frame rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-amber-500/30 bg-background/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl">
          <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
            GENERAL APPLICATION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
            Don't See the Exact Role?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            We are always looking for talented developers and designers. Send us your portfolio and let's talk.
          </p>
          <Button asChild size="lg" className="font-serif bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-xl shadow-lg border-0">
            <Link href="/contact?type=general-application">Submit Open Application</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
