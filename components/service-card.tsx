import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ArrowRight, type LucideIcon } from "lucide-react"

interface ServiceCardProps {
  service: {
    id?: string
    icon: LucideIcon
    title: string
    description: string
    features: string[]
    technologies: string[]
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group glass-card rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_35px_-8px_rgba(56,189,248,0.22)] flex flex-col justify-between h-full overflow-hidden">
      <div>
        <CardHeader className="pb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 via-cyan-500/10 to-transparent border border-primary/20 rounded-2xl mb-4 group-hover:from-primary/30 group-hover:to-cyan-500/20 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all">
            <service.icon className="h-7 w-7 text-primary dark:text-cyan-400" />
          </div>
          <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{service.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>

          <div>
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-foreground/80">Key Capabilities</h4>
            <div className="space-y-2">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-foreground/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-foreground/80">Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </div>

      <div className="p-6 pt-0 border-t border-border/40 mt-4">
        <Button asChild variant="ghost" size="sm" className="w-full text-primary hover:text-primary hover:bg-primary/10 group/btn mt-4">
          <Link href={`/contact?plan=${service.id || "service"}`}>
            Discuss {service.title}
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
