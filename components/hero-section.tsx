"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { GlobeDemo } from "@/components/ui/GlobeDemo"
import { SparklesPreview } from "@/components/SparklesPreview"
export function HeroSection() {
  const router = useRouter()

  const handleStartProject = () => {
    router.push("/contact")
  }

  const handleWatchDemo = () => {
    // You can replace this with actual demo video URL
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }

  return (
    
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Background Pattern */}
      
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-700 bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Badge variant="outline" className="mb-4 inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Leading Software Solutions in India
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
                Transform Ideas
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Into Digital Reality
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            We’re a growing software development team helping startups and businesses turn their ideas into powerful digital products—serving clients across India and around the world
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-6 group" onClick={handleStartProject}>
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 group bg-transparent"
                onClick={handleWatchDemo}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Innovative & Scalable Digital Products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>Agile & End-to-End Product Engineering</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              
              <GlobeDemo/>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  )
}

