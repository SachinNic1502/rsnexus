"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { useRouter } from "next/navigation"
import projectsData from "@/data/projects.json"

const projects = projectsData.projects

function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
}

// Show Featured Projects first, then a mix of the rest, capped for a homepage teaser
const featured = [...projects]
  .sort((a: any, b: any) => (a.label === "Featured Project" ? -1 : 0) - (b.label === "Featured Project" ? -1 : 0))
  .slice(0, 4)

export function FeaturedProjects() {
  const router = useRouter()

  const handleViewLive = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleViewGithub = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 text-sm md:text-base">
            Featured Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Products We've Built
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A mix of live products, internal tools, and technical showcases — built to demonstrate how we design,
            engineer, and ship real software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featured.map((project: any, index: number) => (
            <Link key={index} href={`/portfolio/${slugify(project.title)}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.images?.[0] || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary">{project.label}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 5).map((tech: any, techIndex: number) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {project.liveUrl && (
                      <Button size="sm" className="flex-1" onClick={(e) => handleViewLive(e, project.liveUrl)}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" onClick={(e) => handleViewGithub(e, project.githubUrl)}>
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="group" onClick={() => router.push("/portfolio")}>
            View Full Portfolio
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
