"use client"

import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { motion } from "framer-motion"
import blogData from "@/data/blog.json"

export default function BlogPostPage() {
  const { slug } = useParams() as { slug: string }
  const router = useRouter()
  const post = blogData.find((p) => p.slug === slug)

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-8 text-center"
      >
        <p className="text-lg font-medium text-muted-foreground">⚠️ Article not found.</p>
        <Button onClick={() => router.back()} className="mt-4 rounded-full px-6 py-2 shadow">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/blog")}
            className="rounded-full px-5 py-2 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
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
              {post.readTime}
            </span>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-5">
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <div className="text-center mt-10">
            <Button size="lg" onClick={() => router.push("/contact")}>
              Discuss Your Project
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
