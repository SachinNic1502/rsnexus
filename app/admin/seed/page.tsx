"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleSeed = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to seed database. Verify your MONGODB_URI connection string.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Database Synchronization & Seeder</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Populate your MongoDB database with existing project data, team members, blog posts, services, testimonials, FAQs, and sample careers.
        </p>
      </div>

      <Card className="glass-card border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" /> One-Click JSON to MongoDB Migration
          </CardTitle>
          <CardDescription>
            This action will read all files from <code className="text-primary font-mono">data/*.json</code> and upsert them safely into MongoDB without duplicate records.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-sm text-slate-300">
            <div className="font-semibold text-white">Collections to be populated:</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">✓ Team Members (from data/team.json)</li>
              <li className="flex items-center gap-2">✓ Portfolio Projects & Case Studies (from data/projects.json)</li>
              <li className="flex items-center gap-2">✓ Blog Articles & Notes (from data/blog.json)</li>
              <li className="flex items-center gap-2">✓ Services & Offerings (from data/services.json)</li>
              <li className="flex items-center gap-2">✓ FAQs (from data/faq.json)</li>
              <li className="flex items-center gap-2">✓ Testimonials (from data/testimonial.json)</li>
              <li className="flex items-center gap-2">✓ Sample Career Openings (Next.js, UI/UX, Mobile)</li>
            </ul>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Seeding Failed</div>
                <div className="text-xs mt-1">{error}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Tip: Ensure your <code className="text-primary font-mono">MONGODB_URI</code> is defined in your environment or <code className="text-primary font-mono">.env.local</code>.
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                {result.message}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {Object.entries(result.seededCounts || {}).map(([key, val]) => (
                  <div key={key} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-muted-foreground block capitalize">{key}</span>
                    <span className="text-lg font-bold text-white">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              onClick={handleSeed}
              disabled={loading}
              className="group"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Synchronizing with MongoDB...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Run Database Seeder
                </>
              )}
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/admin">
                Back to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
