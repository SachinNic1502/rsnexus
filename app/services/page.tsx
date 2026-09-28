import { ServiceCard } from "@/components/service-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Layers, Smartphone, Palette, Cloud, Brain, ArrowRight } from "lucide-react"

const services = [
  {
    id: "website",
    icon: Code,
    title: "Website Development",
    description: "For businesses without a fast, credible web presence. We build performance-focused sites tailored to your content and goals — not templated ones. Ideal for founders and small teams who need a site that loads fast and ranks well.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Performance Optimization",
      "Content Management Systems",
      "E-commerce Solutions",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "fullstack",
    icon: Layers,
    title: "Full Stack Development",
    description: "For products that need a real backend, not just a frontend. We build the API, database, and auth layer to actually support your business logic. Ideal for startups building their first product from scratch.",
    features: [
      "API Development",
      "Database Design",
      "Authentication Systems",
      "Real-time Features",
      "Scalable Architecture",
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    description: "For businesses that need a native-feeling app without maintaining two separate codebases. Ideal for teams that want to ship to iOS and Android from one codebase without compromising on performance.",
    features: [
      "Cross-platform Development",
      "Native Performance",
      "Push Notifications",
      "Offline Functionality",
      "App Store Deployment",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    description: "For products where usability, not visuals, is the real blocker. We design and validate flows with real users before development starts. Ideal for teams that have an idea but no tested interface yet.",
    features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Usability Testing", "Design Systems"],
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle"],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Solutions",
    description: "For applications outgrowing a single server or manual deployments. We set up infrastructure that scales, deploys, and recovers automatically. Ideal for growing products that can't afford downtime.",
    features: [
      "Cloud Migration",
      "Auto-scaling Infrastructure",
      "DevOps & CI/CD",
      "Monitoring & Analytics",
      "Security & Compliance",
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI & Machine Learning",
    description: "For workflows that are still manual and repetitive. We scope automation and AI features to a specific, measurable problem instead of bolting on AI for its own sake. Ideal for teams with a clear, well-defined use case.",
    features: [
      "Custom AI Models",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Analytics",
      "AI Integration",
    ],
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Comprehensive Software Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to deployment, we provide end-to-end software development services tailored to your business
            needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} id={service.id} className="scroll-mt-24">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can help bring your ideas to life with our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-md">
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">
                  View Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
