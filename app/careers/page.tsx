import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    description: "Work from anywhere in India with flexible working hours and autonomy.",
  },
  {
    icon: Users,
    title: "Founder-Led Mentorship",
    description: "Collaborate directly with our technical leadership without middle management layers.",
  },
  {
    icon: Zap,
    title: "Modern Tech Stacks",
    description: "Build with React 19, Next.js 16, TypeScript, AI agents, and cloud-native architecture.",
  },
  {
    icon: GraduationCap,
    title: "Accelerated Growth",
    description: "Ship real production systems, earn milestone bonuses, and level up your engineering career.",
  },
];

export default async function CareersPage() {
  const jobs = await getActiveJobOpenings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Careers at RSNexus
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Build Exceptional Software With Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are a fast-growing, founder-led software studio delivering digital excellence across the globe. Join our team of passionate engineers and designers.
          </p>
        </div>

        {/* Culture & Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <Card key={idx} className="glass-card hover:border-primary/50 transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{perk.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Open Positions Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Open Opportunities</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Find a role that matches your skills and passions.
              </p>
            </div>
            <Badge variant="secondary" className="w-fit text-xs px-3 py-1">
              {jobs.length} Open {jobs.length === 1 ? "Position" : "Positions"}
            </Badge>
          </div>

          {jobs.length === 0 ? (
            <Card className="p-12 text-center glass-card border-dashed">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Active Openings Right Now</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                We are always excited to connect with talented builders. Send us your resume and we will reach out when a role opens up.
              </p>
              <Button asChild>
                <Link href="/contact?type=general-application">Get In Touch</Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {jobs.map((job: any) => (
                <Card
                  key={job._id}
                  className="group hover:border-primary/50 transition-all duration-300 hover:shadow-xl glass-card overflow-hidden"
                >
                  <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                          {job.department}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {job.type}
                        </Badge>
                        {job.experienceLevel && (
                          <Badge variant="outline" className="text-xs">
                            {job.experienceLevel}
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        <Link href={`/careers/${job.slug}`}>{job.title}</Link>
                      </h3>

                      <p className="text-muted-foreground text-sm line-clamp-2 max-w-2xl leading-relaxed">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {job.location}
                        </span>
                        {job.salaryRange && (
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            {job.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <Button asChild size="lg" className="w-full sm:w-auto shadow-md group">
                        <Link href={`/careers/${job.slug}`}>
                          View Details & Apply
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
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-10 max-w-3xl mx-auto border border-primary/20">
          <h2 className="text-2xl font-bold mb-3">Don't See the Right Fit?</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            We are always looking for exceptional engineers, UI designers, and marketers. Send us an open application.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-background/80">
            <Link href="/contact?type=general-application">Send Open Application</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
