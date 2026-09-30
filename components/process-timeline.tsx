"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Search, ClipboardList, Palette, Code2, TestTube, Rocket, LifeBuoy } from "lucide-react"

const steps = [
  { step: "01", icon: Search, title: "Discovery", description: "Goals, user personas, architecture constraints & competitive landscape." },
  { step: "02", icon: ClipboardList, title: "Analysis", description: "Technical specifications, data models, milestones & delivery criteria." },
  { step: "03", icon: Palette, title: "UI/UX Design", description: "Interactive Figma prototypes, design tokens & user validation." },
  { step: "04", icon: Code2, title: "Engineering", description: "Clean Next.js & TypeScript code, git branch workflow & peer reviews." },
  { step: "05", icon: TestTube, title: "QA Testing", description: "Unit, integration, performance & security checks before launch." },
  { step: "06", icon: Rocket, title: "Deployment", description: "Zero-downtime CI/CD pipelines, SSL & telemetry monitoring." },
  { step: "07", icon: LifeBuoy, title: "Evolution", description: "Post-launch support, telemetry analytics & feature iterations." },
]

export function ProcessTimeline() {
  return (
    <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4 px-3 py-1 bg-background/50 border-primary/30">
            Engineering Methodology
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Our Development Process
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A transparent, agile pipeline designed to engineer robust software on schedule without communication gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 lg:gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >
              <Card className="w-full h-full glass-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl relative z-10 flex flex-col justify-between">
                <CardContent className="p-5 flex flex-col items-center flex-1">
                  <div className="w-full flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {step.step}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all" />
                  </div>

                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl mb-3.5 transition-colors">
                    <step.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="font-bold text-base mb-1.5 text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
