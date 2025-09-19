"use client"

import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import projectsData from "../../../data/projects.json"

function slugify(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
}

export default function ProjectView() {
  const { slug } = useParams() as { slug: string }
  const router = useRouter()
  const project = projectsData.projects.find((p: any) => slugify(p.title) === slug)

  const [currentImg, setCurrentImg] = useState(0)

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-8 text-center"
      >
        <p className="text-lg font-medium text-muted-foreground">⚠️ Project not found.</p>
        <Button onClick={() => router.back()} className="mt-4 rounded-full px-6 py-2 shadow">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </motion.div>
    )
  }

  const nextImage = () => setCurrentImg((prev) => (prev + 1) % project.images.length)
  const prevImage = () =>
    setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4 relative">
        {/* Floating Back Button */}
        {/* Back Button just below navbar */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="rounded-full px-5 py-2 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>


        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Project Image Slider */}
          <Card className="overflow-hidden rounded-2xl shadow-lg relative">
            <div className="relative w-full h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImg}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full h-full"
                >
                  <Image
                    src={project.images[currentImg] || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav Buttons */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 dark:bg-slate-800/70 rounded-full p-2 shadow hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 dark:bg-slate-800/70 rounded-full p-2 shadow hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </Card>

          {/* Info Tabs */}
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Badge variant="secondary" className="w-fit mb-4 text-sm px-3 py-1 rounded-full">
              {project.category}
            </Badge>

            {/* Title + Live button */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
              {project.liveUrl && (
                <Button
  onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
  className="rounded-full px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2"
>
  <ExternalLink className="h-4 w-4" />
  View Live
</Button>

              )}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{project.description}</p>

            <Tabs defaultValue="tech" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="tech">Technologies</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="tech">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="text-lg font-semibold mb-3">🛠️ Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: any, idx: number) => (
                        <Badge key={idx} variant="outline">
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="text-lg font-semibold mb-3">✨ Key Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {project.features.map((f: string, idx: number) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="text-lg font-semibold mb-3">🏆 Results Achieved</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {project.results.map((r: string, idx: number) => (
                        <li key={idx}>✓ {r}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* GitHub Button only */}
            {project.githubUrl && (
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => window.open(project.githubUrl, "_blank", "noopener,noreferrer")}
                >
                  <Github className="mr-2 h-4 w-4" /> View GitHub
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
