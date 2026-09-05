"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Star, Zap, type LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { usePricing } from "@/hooks/use-pricing"
import { AddOnCard } from "@/components/pricing/add-on-card"
import { BasicPackageCard } from "@/components/pricing/basic-package-card"
import { ProjectPlanCard } from "@/components/pricing/project-plan-card"
import { RetainerCard } from "@/components/pricing/retainer-card"
import { SpecialOfferDialog } from "@/components/pricing/special-offer-dialog"
import { PricingAddOnSkeleton, PricingCardSkeleton, PricingStateCard } from "@/components/pricing/pricing-states"
import type { PricingCardView } from "@/lib/pricing/pricing.types"

/** Card icons are presentation only — the API carries no icon field. */
const PROJECT_PLAN_ICONS: LucideIcon[] = [Zap, Star, Crown]

const PROMO_MODAL_DELAY_MS = 2000
const REDIRECT_DELAY_MS = 1500

export default function PricingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { content, isLoading, error, refetch } = usePricing()
  const [showModal, setShowModal] = useState(false)

  const basicPlan = content.basic

  useEffect(() => {
    // Show the offer once the package it promotes is available.
    if (!basicPlan) return

    const timer = setTimeout(() => {
      setShowModal(true)
    }, PROMO_MODAL_DELAY_MS)

    return () => clearTimeout(timer)
  }, [basicPlan])

  const goToContact = (plan: PricingCardView) => {
    router.push(plan.ctaUrl ?? `/contact?plan=${plan.slug}`)
  }

  const handlePlanSelect = (plan: PricingCardView) => {
    toast({
      title: "Plan Selected!",
      description: `You've selected the ${plan.name} plan. Redirecting to contact form...`,
    })
    setTimeout(() => {
      goToContact(plan)
    }, REDIRECT_DELAY_MS)
  }

  const handleConsultation = () => {
    router.push("/contact?type=consultation")
  }

  const handleContactSales = () => {
    router.push("/contact?type=sales")
  }

  const handleBasicWebsite = (plan: PricingCardView) => {
    setShowModal(false)
    toast({
      title: `${plan.name} Selected!`,
      description: "Redirecting to contact form for your website...",
    })
    setTimeout(() => {
      goToContact(plan)
    }, REDIRECT_DELAY_MS)
  }

  // A section stays mounted while loading so its skeletons hold the layout, then
  // drops out of the page entirely once the API returns nothing for it.
  const showBasic = isLoading || Boolean(basicPlan)
  const showProjects = isLoading || content.projects.length > 0
  const showRetainers = isLoading || content.retainers.length > 0
  const showAddOns = isLoading || content.addOns.length > 0

  return (
    <>
      {/* Special Offer Modal */}
      {basicPlan && (
        <SpecialOfferDialog
          open={showModal}
          onOpenChange={setShowModal}
          plan={basicPlan}
          onAccept={handleBasicWebsite}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Pricing Plans
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent pricing for every business size worldwide. No hidden fees, no surprises. Get exactly what you need to succeed in the global market.
            </p>
          </div>

          {!isLoading && error && (
            <div className="max-w-md mx-auto mb-20">
              <PricingStateCard message={error} onRetry={refetch} />
            </div>
          )}

          {/* Special Basic Website Card */}
          {showBasic && (
            <div className="mb-20">
              <div className="text-center mb-8">
                <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white mb-4">
                  Most Popular for Startups
                </Badge>
                <h2 className="text-3xl font-bold mb-4">Basic Website Package</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Perfect for startups and small businesses who need a professional online presence quickly and affordably.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                {isLoading ? (
                  <PricingCardSkeleton featureCount={7} />
                ) : basicPlan ? (
                  <BasicPackageCard plan={basicPlan} onSelect={handleBasicWebsite} />
                ) : null}
              </div>
            </div>
          )}

          {/* Project-Based Pricing */}
          {showProjects && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">Advanced Project Solutions</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <PricingCardSkeleton key={index} featureCount={8} />
                  ))}
                </div>
              ) : content.projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {content.projects.map((plan, index) => (
                    <ProjectPlanCard
                      key={plan.id}
                      plan={plan}
                      icon={PROJECT_PLAN_ICONS[index % PROJECT_PLAN_ICONS.length]}
                      onSelect={handlePlanSelect}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {/* Monthly Retainer Packages */}
          {showRetainers && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-4">Monthly Retainer Packages</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                For businesses worldwide that need ongoing development support and want to build long-term partnerships.
              </p>

              <div className="max-w-4xl mx-auto">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <PricingCardSkeleton key={index} featureCount={6} />
                    ))}
                  </div>
                ) : content.retainers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.retainers.map((plan) => (
                      <RetainerCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Add-On Services */}
          {showAddOns && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-4">Add-On Services</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Enhance your project with additional features and services tailored to diverse market needs.
              </p>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <PricingAddOnSkeleton key={index} />
                  ))}
                </div>
              ) : content.addOns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.addOns.map((plan) => (
                    <AddOnCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choosing the right plan can be tricky — let’s connect to understand your project and deliver the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8" onClick={handleConsultation}>
                Schedule Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-transparent" onClick={handleContactSales}>
                Contact Sales Team
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
  ✓ Free consultation • ✓ Custom quotes available • ✓ Flexible payment terms • ✓ Market-focused solutions
</p>

          </div>
        </div>
      </div>
    </>
  )
}
