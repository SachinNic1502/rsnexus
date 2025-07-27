import { ServiceCard } from "@/components/service-card"
import { Badge } from "@/components/ui/badge"
import { Code, Layers, Smartphone, Palette, Cloud, Brain } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Website Development",
    description: "Custom websites built with modern technologies for optimal performance and user experience.",
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
    icon: Layers,
    title: "Full Stack Development",
    description: "End-to-end application development from database design to user interface implementation.",
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
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android platforms.",
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
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design solutions that combine aesthetics with functionality.",
    features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Usability Testing", "Design Systems"],
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle"],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment solutions for modern applications.",
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
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Intelligent solutions powered by artificial intelligence and machine learning algorithms.",
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
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can help bring your ideas to life with our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Get Free Consultation
              </button>
              <button className="border border-input bg-background px-6 py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
