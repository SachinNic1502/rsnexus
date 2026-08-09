"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ImageLightbox } from "@/components/image-lightbox"
import projectsData from "../../data/projects.json" // Ensure correct path

const projects = projectsData.projects

// Extract categories dynamically
const categories = ["All", ...new Set(projects.map((p) => p.category))]

// Labels that represent paid/real client engagements; everything else is an in-house build
const CLIENT_LABELS = ["Featured Project", "Internal Project", "Client Project"]

function isClientProject(project: any): boolean {
  return CLIENT_LABELS.includes(project.label)
}

// Function to generate URL-friendly slug
function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [preview, setPreview] = useState<{ images: string[]; title: string } | null>(null)
  const router = useRouter()

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  const clientProjects = filteredProjects.filter((project) => isClientProject(project))
  const conceptProjects = filteredProjects.filter((project) => !isClientProject(project))

  const handleViewLive = (url: string) => url && window.open(url, "_blank", "noopener,noreferrer")
  const handleViewGithub = (url: string) => url && window.open(url, "_blank", "noopener,noreferrer")
  const handleStartProject = () => router.push("/contact?type=project")
  const handleRequestQuote = () => router.push("/contact?type=quote")

  const handleOpenPreview = (project: any) => {
    const images: string[] = project.images?.length
      ? project.images
      : [project.image].filter(Boolean)
    if (images.length === 0) return
    setPreview({ images, title: project.title })
  }

  const renderProjectCard = (project: any, index: number) => (
    <Link key={index} href={`/portfolio/${slugify(project.title)}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="relative overflow-hidden">
          <button
            type="button"
            aria-label={`Preview images for ${project.title}`}
            className="block w-full cursor-zoom-in focus:outline-none"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleOpenPreview(project)
            }}
          >
            <Image
              src={project.images?.[0] || project.image || "/placeholder.svg"}
              alt={project.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
          <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
            <Badge variant="secondary">{project.category}</Badge>
            {(project as any).label && !isClientProject(project) && (
              <Badge variant="secondary">{(project as any).label}</Badge>
            )}
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Technologies */}
          {project.technologies?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-sm">Technologies Used</h4>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech: any, techIndex: number) => (
                  <Badge
                    key={techIndex}
                    variant="outline"
                    className="text-xs"
                    title={tech.description || ""}
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-sm">Key Features</h4>
              <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                {project.features.map((feature: string, featureIndex: number) => (
                  <div key={featureIndex} className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {project.results?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-sm">Results Achieved</h4>
              <div className="space-y-1 text-xs">
                {project.results.map((metric: string, metricIndex: number) => (
                  <div key={metricIndex} className="text-green-600">
                    ✓ {metric}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {project.liveUrl && (
              <Button
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault()
                  handleViewLive(project.liveUrl)
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  handleViewGithub(project.githubUrl)
                }}
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Portfolio
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Projects That Deliver Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our successful projects across industries. Each solution is designed with innovation, precision, and a focus on delivering measurable business outcomes.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="mb-2"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Project Sections */}
        <Tabs defaultValue="client" className="w-full mb-16">
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="client">Collaborations ({clientProjects.length})</TabsTrigger>
              <TabsTrigger value="concept">Made to Explore ({conceptProjects.length})</TabsTrigger>
            </TabsList>
          </div>

          {/* Client Work */}
          <TabsContent value="client">
            <section>
              <div className="text-center mb-8">
                <Badge variant="outline" className="mb-3">
                  Client Work
                </Badge>
                <h2 className="text-3xl font-bold mb-3">Built for Real Businesses</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Production systems delivered for clients and running in the real world.
                </p>
              </div>
              {clientProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {clientProjects.map((project, index) => renderProjectCard(project, index))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No client projects in this category.
                </p>
              )}
            </section>
          </TabsContent>

          {/* Concept Builds */}
          <TabsContent value="concept">
            <section>
              <div className="text-center mb-8">
                <Badge variant="outline" className="mb-3">
                  Concept Builds
                </Badge>
                <h2 className="text-3xl font-bold mb-3">Ideas We Engineered In-House</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Self-initiated products we designed and shipped to explore new stacks and prove out ideas.
                </p>
              </div>
              {conceptProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {conceptProjects.map((project, index) => renderProjectCard(project, index))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No concept projects in this category.
                </p>
              )}
            </section>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can build your vision into reality with custom software tailored to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" onClick={handleStartProject}>
              Start Your Project
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent" onClick={handleRequestQuote}>
              Request Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Full-image preview */}
      <ImageLightbox
        images={preview?.images ?? []}
        title={preview?.title}
        open={preview !== null}
        onOpenChange={(open) => {
          if (!open) setPreview(null)
        }}
      />
    </div>
  )
}
