import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Sparkles,
  Share2,
  Bookmark,
  ArrowRight,
  Shield,
  Award,
} from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data-fetchers";
import { ReadTimeCounter } from "@/components/read-time-counter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | RSNexus Blog",
    };
  }

  return {
    title: `${post.title} | RSNexus Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://rsnexus.in/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const contentParagraphs: string[] = Array.isArray(post.content)
    ? post.content
    : [post.content];

  const relatedPosts = allPosts
    .filter((p: any) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden py-14 sm:py-20">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Navigation & Category Bar */}
        <div className="flex items-center justify-between mb-8">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-5 py-2 font-serif text-xs border-border bg-background/70 backdrop-blur-md hover:bg-secondary"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-amber-500/30">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="font-serif text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
              {post.category}
            </span>
          </div>
        </div>

        {/* Article Title & Metadata Header */}
        <div className="mb-10 text-center sm:text-left space-y-4">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans border-l-2 border-amber-500/40 pl-4 py-1 italic">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-muted-foreground pt-3 border-t border-border/60">
            <span className="flex items-center gap-1.5 font-serif">
              <User className="h-3.5 w-3.5 text-amber-500" />
              <span className="font-semibold text-foreground">{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-500" />
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <ReadTimeCounter
                slug={post.slug}
                fallback={post.readTime}
                content={contentParagraphs}
              />
            </span>
          </div>
        </div>

        {/* Main Article Content Container */}
        <div className="classical-card classical-frame rounded-3xl p-6 sm:p-10 md:p-12 border border-border/80 dark:border-slate-800/80 bg-card/90 dark:bg-slate-900/90 shadow-2xl mb-14">
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/90 font-sans text-base sm:text-lg leading-relaxed">
            {contentParagraphs.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Signature & Guild Endorsement */}
          <div className="mt-12 pt-8 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-serif font-bold">
                RS
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-foreground">
                  Published by the RSNexus Engineering Team
                </h4>
                <p className="text-xs text-muted-foreground">
                  Founder-led software engineering and insights.
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="font-serif text-xs border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
            >
              <Link href="/about">About Our Team</Link>
            </Button>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-foreground">
                Related <span className="text-gradient-gold">Articles</span>
              </h3>
              <Link href="/blog" className="text-xs font-serif text-amber-500 hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related: any) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="classical-card classical-frame rounded-2xl p-6 border border-border/80 dark:border-slate-800/80 hover:border-amber-500/40 transition-all hover:-translate-y-1 block bg-card/80"
                >
                  <span className="font-serif text-[10px] uppercase tracking-wider text-amber-500 font-bold block mb-2">
                    {related.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Article Bottom Consultation Callout */}
        <div className="classical-card classical-frame rounded-3xl p-8 sm:p-10 border border-amber-500/30 bg-gradient-to-br from-card via-secondary/30 to-card shadow-2xl text-center">
          <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
            BUILD WITH US
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
            Ready to Build Your Next Project?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
            Our lead software engineers can review your existing system or build your new project from scratch with clean, reliable code.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="font-serif px-8 py-5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white border-0 shadow-lg"
            >
              <Link href="/contact?type=consultation">
                <span>Book a Free Technical Review</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-serif px-8 py-5 border-border">
              <Link href="/portfolio">View Our Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
