import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, MessageSquare, Layers, Gauge, Boxes, Code2, Workflow, Gem } from "lucide-react"

const reasons = [
  {
    icon: UserCheck,
    title: "Founder Directly Involved",
    description: "You work with the person building your product, not a rotating account manager.",
  },
  {
    icon: MessageSquare,
    title: "Fast Communication",
    description: "Questions get answered quickly because there's no relay between you and the developer.",
  },
  {
    icon: Layers,
    title: "No Unnecessary Management Layers",
    description: "Smaller team, fewer handoffs, less overhead — decisions happen fast.",
  },
  {
    icon: Gauge,
    title: "Performance-Focused Engineering",
    description: "Built with Core Web Vitals, load times, and scalability in mind from day one.",
  },
  {
    icon: Boxes,
    title: "Modern Architecture",
    description: "Current frameworks and patterns, not legacy approaches held together with workarounds.",
  },
  {
    icon: Code2,
    title: "Scalable Code",
    description: "Structured to grow with your product instead of needing a rewrite at the next milestone.",
  },
  {
    icon: Workflow,
    title: "Transparent Workflow",
    description: "You see progress as it happens, not just a status update at the end of the week.",
  },
  {
    icon: Gem,
    title: "Quality Over Quantity",
    description: "We take on fewer projects at a time so each one gets real attention.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-10 md:py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <Badge variant="outline" className="mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Honest Strengths, Not Sales Talk</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            We'd rather tell you what's actually true about working with us than make claims we can't back up.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="text-center p-4 md:p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg mb-4">
                  <reason.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-sm md:text-base">{reason.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
