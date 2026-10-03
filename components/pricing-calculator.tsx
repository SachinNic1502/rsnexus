"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
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
  { id: "auth", label: "User Login & Role Permissions", price: 14999 },
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
    <Card className="max-w-4xl mx-auto classical-card classical-frame shadow-2xl border border-amber-500/30 overflow-hidden my-16 bg-background/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl">
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan-500/10 p-6 sm:p-8 border-b border-border/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-serif tracking-wider uppercase mb-2">
              <Calculator className="w-3.5 h-3.5 mr-1" />
              PROJECT COST ESTIMATOR
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-foreground">Estimate Your Project Cost</h3>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-sans">
              Select your options below to get an instant, transparent price estimate.
            </p>
          </div>
          <div className="text-left md:text-right bg-background/80 dark:bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-amber-500/30 shadow-md shrink-0">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-muted-foreground font-bold block mb-1">
              ESTIMATED COST
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-gradient-gold">
              ₹{estimate.min.toLocaleString("en-IN")} - ₹{estimate.max.toLocaleString("en-IN")}
            </div>
            <span className="text-xs text-muted-foreground font-mono">Tailored for {estimate.platformName}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 sm:p-8 md:p-10 space-y-8">
        {/* Step 1: Platform Selection */}
        <div>
          <label className="block font-serif text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
            1. Choose What to Build
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {PLATFORMS.map((item) => {
              const Icon = item.icon
              const isSelected = platform === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlatform(item.id)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between min-h-[110px] ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40"
                      : "border-border hover:border-amber-400/40 bg-secondary/40 dark:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isSelected ? "text-amber-500" : "text-muted-foreground"}`} />
                    {isSelected && <Check className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div>
                    <div className="font-serif font-bold text-sm text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 font-sans leading-tight">{item.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2: Scope Tier */}
        <div>
          <label className="block font-serif text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
            2. Project Size
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {SCOPE_TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setScope(tier.id)}
                className={`p-4 rounded-xl text-left border text-xs sm:text-sm font-medium transition-all ${
                  scope === tier.id
                    ? "border-amber-500 bg-amber-500/10 ring-1 ring-amber-500 text-foreground font-bold shadow-md"
                    : "border-border hover:border-amber-400/40 bg-secondary/40 dark:bg-slate-800/40 text-muted-foreground"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Addons */}
        <div>
          <label className="block font-serif text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
            3. Add-on Features & Modules
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ADDONS.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id)
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors min-h-[50px] ${
                    isChecked
                      ? "border-amber-500/80 bg-amber-500/10 text-foreground"
                      : "border-border hover:border-amber-400/40 bg-secondary/40 dark:bg-slate-800/40 text-muted-foreground"
                  }`}
                >
                  <span className="text-xs font-medium font-sans leading-tight">{addon.label}</span>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border text-xs ml-2 flex-shrink-0 transition-colors ${
                      isChecked ? "bg-amber-500 border-amber-500 text-slate-950 font-bold" : "border-muted-foreground/40"
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
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-serif">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            Includes setup, staging preview, and live production deployment.
          </div>
          <Button
            size="lg"
            onClick={handleConsultation}
            className="w-full sm:w-auto font-serif text-xs uppercase tracking-wider px-7 py-6 rounded-xl shadow-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white border-0 group shrink-0"
          >
            <span>Get Started With This Estimate</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PricingCalculator;
