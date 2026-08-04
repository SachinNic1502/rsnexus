"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Search, ClipboardList, Palette, Code2, TestTube, Rocket, LifeBuoy } from "lucide-react"

const steps = [
  { icon: Search, title: "Discovery", description: "Understanding your goals, users, and constraints." },
  { icon: ClipboardList, title: "Requirement Analysis", description: "Defining scope, features, and success criteria." },
  { icon: Palette, title: "UI/UX", description: "Wireframes and design that match how your users think." },
  { icon: Code2, title: "Development", description: "Clean, version-controlled, reviewed implementation." },
  { icon: TestTube, title: "Testing", description: "Manual and automated checks before anything ships." },
  { icon: Rocket, title: "Deployment", description: "Production rollout with monitoring in place." },
  { icon: LifeBuoy, title: "Support", description: "Ongoing fixes, updates, and iteration after launch." },
]

export function ProcessTimeline() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            How We Work
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Development Process</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A transparent, repeatable process — so you always know what's happening and why.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 lg:gap-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-1/2 w-full h-px bg-border" />
              )}
              <Card className="w-full hover:shadow-lg transition-shadow relative z-10">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-semibold text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
