import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { ReadTimeCounter } from "@/components/read-time-counter";

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    publishedDate: string;
    author: string;
  };
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <div className="relative rounded-2xl classical-card classical-frame bg-background/90 dark:bg-slate-900/90 border border-border/80 hover:border-amber-400/50 dark:hover:border-amber-400/40 backdrop-blur-xl p-6 sm:p-7 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.2)] hover:-translate-y-1.5 overflow-hidden">
        
        {/* Subtle ambient light sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
          <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-amber-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        <div className="relative z-10">
          {/* Header row: Category & Book Icon */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {post.category}
            </span>
            <div className="p-1.5 rounded-lg bg-secondary/80 text-muted-foreground group-hover:text-amber-500 transition-colors">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-3 line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5 font-sans">
            {post.excerpt}
          </p>
        </div>

        {/* Footer: Date, Read Time & Action Arrow */}
        <div className="relative z-10 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-500/80 shrink-0" />
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-500/80 shrink-0" />
              <ReadTimeCounter slug={post.slug} fallback={post.readTime} />
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-serif font-semibold text-xs group-hover:translate-x-1 transition-transform">
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>
    </Link>
  );
}

export default BlogCard;
