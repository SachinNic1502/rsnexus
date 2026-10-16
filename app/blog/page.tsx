import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { getBlogPosts } from "@/lib/data-fetchers";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Software Engineering Notes | RSNexus",
  description:
    "Practical, honest writing on modern web development, Next.js, AI integrations, and building startups without fluff or hype.",
  alternates: {
    canonical: "https://rsnexus.in/blog",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
              ARTICLES & INSIGHTS • ENGINEERING BLOG
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
            Notes on Building <span className="text-gradient-gold">Software</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto">
            Practical, honest insights on modern web development, Next.js, cloud databases, and building software — zero hype.
          </p>

          <div className="classical-divider max-w-xs mx-auto my-6">
            <span className="text-amber-500 font-serif text-xs">✦ LATEST ARTICLES ✦</span>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post: any) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
