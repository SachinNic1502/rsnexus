"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import projectsData from "../../data/projects.json" // Ensure correct path

const projects = projectsData.projects

// Extract categories dynamically
const categories = ["All", ...new Set(projects.map((p) => p.category))]

// Function to generate URL-friendly slug
function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const router = useRouter()

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  const handleViewLive = (url: string) => url && window.open(url, "_blank", "noopener,noreferrer")
  const handleViewGithub = (url: string) => url && window.open(url, "_blank", "noopener,noreferrer")
  const handleStartProject = () => router.push("/contact?type=project")
  const handleRequestQuote = () => router.push("/contact?type=quote")

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <Link key={index} href={`/portfolio/${slugify(project.title)}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.images?.[0] || project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{project.category}</Badge>
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
                        {project.features.map((feature, featureIndex) => (
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
                        {project.results.map((metric, metricIndex) => (
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
          ))}
        </div>

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
    </div>
  )
}
