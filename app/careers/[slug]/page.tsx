import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobOpeningBySlug, getActiveJobOpenings } from "@/lib/data-fetchers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobApplicationForm } from "@/components/job-application-form";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Share2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug);

  if (!job) {
    return {
      title: "Position Not Found | RSNexus Careers",
    };
  }

  return {
    title: `${job.title} | RSNexus Careers`,
    description: job.description.slice(0, 160),
    alternates: {
      canonical: `https://rsnexus.in/careers/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href="/careers">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Open Positions
            </Link>
          </Button>
        </div>

        {/* Job Header */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {job.department}
            </Badge>
            <Badge variant="secondary">{job.type}</Badge>
            {job.experienceLevel && <Badge variant="outline">{job.experienceLevel}</Badge>}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              {job.location}
            </span>
            {job.salaryRange && (
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                {job.salaryRange}
              </span>
            )}
          </div>
        </div>

        {/* Job Details Content */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* Overview */}
          <Card className="glass-card">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Role Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {job.description}
                </p>
              </div>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-3">Key Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-3">What We're Looking For</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-3">Perks & Benefits</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Application Form */}
          <JobApplicationForm jobId={job._id} jobTitle={job.title} />
        </div>
      </div>
    </div>
  );
}
