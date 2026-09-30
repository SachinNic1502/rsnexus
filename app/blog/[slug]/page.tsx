import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/data-fetchers";
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
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentParagraphs: string[] = Array.isArray(post.content)
    ? post.content
    : [post.content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-5 py-2 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>

        <div>
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <ReadTimeCounter
                slug={post.slug}
                fallback={post.readTime}
                content={contentParagraphs}
              />
            </span>
          </div>

          <Card className="glass-card shadow-lg">
            <CardContent className="p-6 md:p-8 space-y-5">
              {contentParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
