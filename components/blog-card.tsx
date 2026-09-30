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
      <div className="relative rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 backdrop-blur-xl p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_-8px_rgba(56,189,248,0.22)] hover:-translate-y-1 overflow-hidden">
        
        {/* Subtle ambient light sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
          <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        <div className="relative z-10">
          {/* Header row: Category & Book Icon */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary dark:text-cyan-400 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {post.category}
            </span>
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-400 group-hover:text-primary transition-colors">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2.5 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-5">
            {post.excerpt}
          </p>
        </div>

        {/* Footer: Date, Read Time & Action Arrow */}
        <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-primary/70 shrink-0" />
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-cyan-500/70 shrink-0" />
              <ReadTimeCounter slug={post.slug} fallback={post.readTime} />
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-primary dark:text-cyan-400 font-sans font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>

      </div>
    </Link>
  );
}
