"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const projects = [
  {
    title: "SwadeshiMart E-commerce",
    category: "E-commerce",
    description:
      "A comprehensive e-commerce platform for Indian businesses with Razorpay integration, multi-language support (Hindi/English), and GST compliance features.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Next.js", "TypeScript", "Razorpay", "PostgreSQL", "Tailwind CSS"],
    features: ["Payment Processing", "GST Integration", "Multi-language", "Mobile Responsive"],
    liveUrl: "https://swadeshimart-demo.vercel.app",
    githubUrl: "https://github.com/rsnecus/swadeshimart",
    results: {
      metric1: "500% increase in online sales",
      metric2: "60% faster load times",
      metric3: "98% user satisfaction in India",
    },
  },
  {
    title: "AyurVeda Health Portal",
    category: "Healthcare",
    description:
      "A comprehensive Ayurvedic healthcare management system with patient records, online consultations, and medicine delivery across India.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Chart.js"],
    features: ["Telemedicine", "Appointment System", "Medicine Delivery", "Hindi Support"],
    liveUrl: "https://ayurveda-portal-demo.vercel.app",
    githubUrl: "https://github.com/rsnecus/ayurveda-portal",
    results: {
      metric1: "75% reduction in admin time",
      metric2: "1000+ active patients",
      metric3: "99.8% uptime across India",
    },
  },
  {
    title: "UPI Payment App",
    category: "Finance",
    description:
      "A secure UPI-based payment application with biometric authentication, real-time transactions, and support for all major Indian banks.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React Native", "Firebase", "UPI API", "Redux", "TypeScript"],
    features: ["UPI Integration", "Biometric Auth", "Bank Integration", "QR Payments"],
    liveUrl: "https://upi-app-demo.vercel.app",
    githubUrl: "https://github.com/rsnecus/upi-payment-app",
    results: {
      metric1: "50K+ downloads in India",
      metric2: "4.9/5 Play Store rating",
      metric3: "₹10Cr+ transactions processed",
    },
  },
  {
    title: "AI Crop Prediction System",
    category: "AI/ML",
    description:
      "An intelligent agricultural platform using machine learning to provide crop predictions and farming insights for Indian farmers.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    features: ["Crop Prediction", "Weather Integration", "Hindi Interface", "SMS Alerts"],
    liveUrl: "https://crop-ai-demo.vercel.app",
    githubUrl: "https://github.com/rsnecus/crop-prediction",
    results: {
      metric1: "85% accurate predictions",
      metric2: "10K+ farmers helped",
      metric3: "30% increase in crop yield",
    },
  },
  {
    title: "EdTech Learning Platform",
    category: "Education",
    description:
      "An interactive online learning platform for Indian students with video streaming, progress tracking, and support for regional languages.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Vue.js", "Laravel", "MySQL", "AWS", "WebRTC"],
    features: ["Video Streaming", "Progress Tracking", "Regional Languages", "Offline Mode"],
    liveUrl: "https://edtech-india-demo.vercel.app",
    githubUrl: "https://github.com/rsnecus/edtech-platform",
    results: {
      metric1: "25K+ active students",
      metric2: "92% completion rate",
      metric3: "4.8/5 user rating in India",
    },
  },
  {
    title: "Smart City IoT Dashboard",
    category: "IoT",
    description:
      "A real-time IoT monitoring dashboard for Indian smart cities, featuring air quality monitoring, traffic management, and energy optimization.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Angular", "Node.js", "InfluxDB", "MQTT", "D3.js"],
    features: ["Air Quality Monitoring", "Traffic Management", "Energy Optimization", "Real-time Alerts"],
    liveUrl: "https://smart-city-demo.vercel.app",
    githubUrl: "https://github.com/rsnecus/smart-city-iot",
    results: {
      metric1: "40% improvement in air quality",
      metric2: "500+ sensors monitored",
      metric3: "24/7 uptime across cities",
    },
  },
]

const categories = ["All", "E-commerce", "Healthcare", "Finance", "AI/ML", "Education", "IoT"]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const router = useRouter()

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const handleViewLive = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleViewGithub = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleStartProject = () => {
    router.push("/contact?type=project")
  }

  const handleRequestQuote = () => {
    router.push("/contact?type=quote")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Portfolio - India
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Projects That Drive Results in India
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our successful projects across various industries in India. Each solution is crafted with precision,
            innovation, and a focus on delivering measurable business value for Indian businesses.
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
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
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
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <p className="text-muted-foreground">{project.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
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

                {/* Results */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Results Achieved</h4>
                  <div className="space-y-1 text-xs">
                    <div className="text-green-600">✓ {project.results.metric1}</div>
                    <div className="text-green-600">✓ {project.results.metric2}</div>
                    <div className="text-green-600">✓ {project.results.metric3}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1" onClick={() => handleViewLive(project.liveUrl)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewGithub(project.githubUrl)}>
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project in India?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life with a custom software solution tailored to your
            specific needs and the Indian market.
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
