"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Calculator, Sparkles, ArrowRight, Layers, Smartphone, Globe, Brain } from "lucide-react"

type PlatformType = "website" | "fullstack" | "mobile" | "ai"

interface AddonOption {
  id: string
  label: string
  price: number
}

const PLATFORMS: { id: PlatformType; name: string; icon: any; basePrice: number; desc: string }[] = [
  { id: "website", name: "Modern Website", icon: Globe, basePrice: 24999, desc: "Fast Next.js SEO & Marketing site" },
  { id: "fullstack", name: "Full-Stack SaaS", icon: Layers, basePrice: 79999, desc: "Database, Auth & Custom APIs" },
  { id: "mobile", name: "Mobile App", icon: Smartphone, basePrice: 89999, desc: "React Native / Flutter Cross-Platform" },
  { id: "ai", name: "AI Solution", icon: Brain, basePrice: 69999, desc: "Custom LLMs, Agents & Automations" },
]

const SCOPE_TIERS = [
  { id: "small", label: "Compact (1-5 pages/screens)", multiplier: 1.0 },
  { id: "medium", label: "Standard (6-12 pages/screens)", multiplier: 1.35 },
  { id: "large", label: "Comprehensive (12+ screens)", multiplier: 1.8 },
]

const ADDONS: AddonOption[] = [
  { id: "auth", label: "Secure User Auth & RBAC", price: 14999 },
  { id: "payments", label: "Payments (Razorpay / Stripe)", price: 19999 },
  { id: "admin", label: "Admin & Operations Portal", price: 29999 },
  { id: "seo", label: "Advanced SEO & Analytics Suite", price: 9999 },
  { id: "support", label: "6 Months Dedicated Support", price: 24999 },
]

export function PricingCalculator() {
  const router = useRouter()
  const [platform, setPlatform] = useState<PlatformType>("website")
  const [scope, setScope] = useState<string>("small")
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["auth", "payments"])

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const estimate = useMemo(() => {
    const activePlatform = PLATFORMS.find((p) => p.id === platform) || PLATFORMS[0]
    const activeScope = SCOPE_TIERS.find((s) => s.id === scope) || SCOPE_TIERS[0]
    const baseWithScope = activePlatform.basePrice * activeScope.multiplier

    const addonsTotal = selectedAddons.reduce((acc, addonId) => {
      const item = ADDONS.find((a) => a.id === addonId)
      return acc + (item ? item.price : 0)
    }, 0)

    const total = Math.round((baseWithScope + addonsTotal) / 1000) * 1000
    const minEstimate = Math.round(total * 0.9 / 1000) * 1000
    const maxEstimate = Math.round(total * 1.15 / 1000) * 1000

    return {
      min: minEstimate,
      max: maxEstimate,
      total,
      platformName: activePlatform.name,
    }
  }, [platform, scope, selectedAddons])

  const handleConsultation = () => {
    const addonsQuery = selectedAddons.join(",")
    router.push(
      `/contact?type=estimate&platform=${platform}&scope=${scope}&budget=${estimate.min}-${estimate.max}&addons=${addonsQuery}`
    )
  }

  return (
    <Card className="max-w-4xl mx-auto glass-card shadow-2xl border border-primary/20 overflow-hidden my-16">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-cyan-500/10 p-6 md:p-8 border-b border-border/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="outline" className="mb-2 bg-background/50 border-primary/30">
              <Calculator className="w-3.5 h-3.5 mr-1 text-primary" /> Interactive Scope Estimator
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold">Estimate Your Project Investment</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Select your specifications for an immediate, transparent ballpark estimate.
            </p>
          </div>
          <div className="text-left md:text-right bg-background/60 backdrop-blur-md p-4 rounded-xl border border-border/60">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Estimated Range</span>
            <div className="text-2xl md:text-3xl font-extrabold text-primary">
              ₹{estimate.min.toLocaleString("en-IN")} - ₹{estimate.max.toLocaleString("en-IN")}
            </div>
            <span className="text-xs text-muted-foreground">Tailored for {estimate.platformName}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 md:p-8 space-y-8">
        {/* Step 1: Platform Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            1. Select Solution Platform
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PLATFORMS.map((item) => {
              const Icon = item.icon
              const isSelected = platform === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlatform(item.id)}
                  className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2: Scope Tier */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            2. Approximate Project Scope
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SCOPE_TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setScope(tier.id)}
                className={`p-3.5 rounded-xl text-left border text-sm font-medium transition-all ${
                  scope === tier.id
                    ? "border-primary bg-primary/10 ring-1 ring-primary text-primary"
                    : "border-border hover:border-primary/40 bg-card text-muted-foreground"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Addons */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            3. Essential Features & Architecture Modules
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ADDONS.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id)
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    isChecked
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border hover:border-primary/30 bg-card text-muted-foreground"
                  }`}
                >
                  <span className="text-xs font-medium">{addon.label}</span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border text-xs ml-2 flex-shrink-0 ${
                      isChecked ? "bg-primary border-primary text-white" : "border-muted-foreground/40"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            Ballpark includes architecture design, staging sandbox & production deployment.
          </div>
          <Button
            size="lg"
            onClick={handleConsultation}
            className="w-full sm:w-auto px-6 py-6 shadow-md shadow-primary/20 hover:shadow-primary/35 text-base group"
          >
            Lock in this Estimate
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
