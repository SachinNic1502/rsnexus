import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, type LucideIcon } from "lucide-react"

interface ServiceCardProps {
  service: {
    icon: LucideIcon
    title: string
    description: string
    features: string[]
    technologies: string[]
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-slate-800 border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
          <service.icon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{service.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">{service.description}</p>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">Key Features</h4>
          <div className="space-y-2">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
