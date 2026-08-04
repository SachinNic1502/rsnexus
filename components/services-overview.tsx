"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Layers, Smartphone, Palette, Cloud, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

const services = [
  {
    icon: Code,
    title: "Website Development",
    description:
      "For businesses without a fast, credible web presence — we build performance-focused sites instead of templated ones.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    description: "For products that need a real backend, not just a frontend — API, database, and auth built to scale with usage.",
    features: ["API Development", "Database Design", "Scalable Architecture"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "For businesses that need a native-feeling app without maintaining two separate codebases.",
    features: ["Cross-platform", "Native Performance", "App Store Ready"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "For products where usability is the blocker — design that's tested with real users, not just visually polished.",
    features: ["User Research", "Prototyping", "Design Systems"],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "For applications outgrowing a single server — infrastructure that scales, deploys, and recovers automatically.",
    features: ["Auto-scaling", "DevOps", "Security & Compliance"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "For workflows that are still manual — automation and AI features scoped to a specific, measurable problem.",
    features: ["Custom AI Models", "NLP", "Predictive Analytics"],
  },
]

export function ServicesOverview() {
  const router = useRouter()

  const handleViewAllServices = () => {
    router.push("/services")
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services Worldwide
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Software Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From web development to AI integration, we offer a full spectrum of services to meet all your software
            development needs across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="group" onClick={handleViewAllServices}>
            View All Services
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
