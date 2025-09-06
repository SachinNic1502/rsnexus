"use client"

import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"
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

  const [currentImage, setCurrentImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!project) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto p-8 text-center">
        <p className="text-lg font-medium text-muted-foreground">⚠️ Project not found.</p>
        <Button onClick={() => router.back()} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </motion.div>
    )
  }

  const images = project.images || [project.image || "/placeholder.svg"]

  const handlePrev = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const handleNext = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <Button variant="outline" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Carousel */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(event, info) => {
                    if (info.offset.x > 50) handlePrev()
                    if (info.offset.x < -50) handleNext()
                  }}
                  className="w-full h-full cursor-zoom-in"
                  onClick={() => setIsFullscreen(true)}
                >
                  <Image
                    src={images[currentImage]}
                    alt={`${project.title} image ${currentImage + 1}`}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
                    onClick={handlePrev}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {/* Dots */}
                  <div className="flex justify-center mt-2 gap-2">
                    {images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full cursor-pointer ${
                          idx === currentImage ? "bg-blue-600" : "bg-gray-400"
                        }`}
                        onClick={() => setCurrentImage(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </Card>
          </motion.div>

          {/* Fullscreen Modal */}
          <AnimatePresence>
            {isFullscreen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  variant="ghost"
                  className="absolute top-4 right-4 text-white"
                  onClick={() => setIsFullscreen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="relative max-w-full max-h-full"
                >
                  <Image
                    src={images[currentImage]}
                    alt={`${project.title} fullscreen`}
                    width={1200}
                    height={800}
                    className="object-contain max-h-[90vh] max-w-[90vw]"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Info */}
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-4 text-sm px-3 py-1 rounded-full">
              {project.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{project.description}</p>

            {/* Technologies */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="mb-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-md">
                <CardContent className="p-4">
                  <h4 className="text-lg font-semibold mb-3">🛠️ Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: any, index: number) => (
                      <Badge key={index} variant="outline" title={tech.description || ""}>
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="mb-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-md">
                <CardContent className="p-4">
                  <h4 className="text-lg font-semibold mb-3">✨ Key Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {project.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="mb-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-md">
                <CardContent className="p-4">
                  <h4 className="text-lg font-semibold mb-3">🏆 Results Achieved</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {project.results.map((result: string, index: number) => (
                      <li key={index}>✓ {result}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-4">
              {project.liveUrl && (
                <Button onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")} className="transition hover:scale-105">
                  <ExternalLink className="mr-2 h-4 w-4" /> View Live
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" onClick={() => window.open(project.githubUrl, "_blank", "noopener,noreferrer")} className="transition hover:scale-105">
                  <Github className="mr-2 h-4 w-4" /> View GitHub
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
