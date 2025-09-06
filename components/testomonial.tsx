"use client"

import { useState } from "react"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import TestimonialData from "@/data/testimonial.json"
import { Badge } from "@/components/ui/badge"

interface TestimonialItem {
  src?: string
  name: string
  designation: string
  quote: string
}

export function Testimonial() {
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({})

  // Get initials from full name
  const getInitials = (name: string) => {
    const parts = name.split(" ")
    const first = parts[0]?.charAt(0).toUpperCase() || ""
    const last = parts[parts.length - 1]?.charAt(0).toUpperCase() || ""
    return first + last
  }

  const testimonials: TestimonialItem[] = TestimonialData.map((item, index) => ({
    ...item,
    src: item.src && !imageErrorMap[index] ? item.src : undefined,
    fallback: (
      <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-700 text-white font-bold text-xl">
        {getInitials(item.name)}
      </div>
    ),
    onError: () => setImageErrorMap((prev) => ({ ...prev, [index]: true })),
  }))

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 text-sm md:text-base">
            Client Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Our Clients Love Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our clients across the globe have transformed their businesses with our 
            innovative software solutions and dedicated support.
          </p>
        </div>

        {/* Testimonials */}
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  )
}
