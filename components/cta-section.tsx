"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function CTASection() {
  const router = useRouter()

  const handleGetConsultation = () => {
    router.push("/contact")
  }

  const handleViewWork = () => {
    router.push("/portfolio")
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business in India?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss your project and explore how RSNecus can help you achieve your goals with innovative
              software solutions tailored for the Indian market.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 group bg-white text-primary hover:bg-white/90"
                onClick={handleGetConsultation}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 bg-transparent"
                onClick={handleViewWork}
              >
                View Our Work
              </Button>
            </div>

            <div className="mt-8 text-sm opacity-75">
              <p>✓ Free consultation • ✓ No commitment • ✓ Expert advice • ✓ India-focused solutions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
