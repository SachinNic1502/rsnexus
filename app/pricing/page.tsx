"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PricingCalculator } from "@/components/pricing-calculator"
import {
  Check,
  Star,
  Zap,
  Crown,
  Sparkles,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Smartphone,
  Bot,
  BarChart3,
  ShoppingBag,
  ShieldCheck,
  Code2,
  FileCheck,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"

interface PricingPlan {
  tier: string
  name: string
  tagline: string
  icon: LucideIcon
  price: string
  period: string
  deliveryTime: string
  description: string
  features: string[]
  popular: boolean
  cta: string
}

const pricingPlans: PricingPlan[] = [
  {
    tier: "TIER I",
    name: "Starter",
    tagline: "Essential Web Presence",
    icon: Zap,
    price: "₹49,999",
    period: "fixed price",
    deliveryTime: "2–3 Weeks Delivery",
    description: "Great for small businesses and startups wanting a clean, fast, and high-converting website.",
    features: [
      "Responsive Website (up to 5 pages)",
      "Basic SEO Optimization",
      "Contact Form Integration",
      "Mobile-Friendly Design",
      "3 Months Free Support",
      "Google Analytics Setup",
      "Free SSL Certificate",
      "2 Rounds of Revisions",
    ],
    popular: false,
    cta: "Choose Starter Plan",
  },
  {
    tier: "TIER II",
    name: "Professional",
    tagline: "Custom Web Application",
    icon: Star,
    price: "₹1,25,999",
    period: "milestone payments",
    deliveryTime: "4–6 Weeks Delivery",
    description: "Complete web solution for growing businesses that need custom features, database setup, and fast performance.",
    features: [
      "Custom Web Application",
      "Advanced SEO & Speed Optimization",
      "User Accounts & Login System",
      "Database Integration",
      "API Development",
      "6 Months Free Support",
      "Detailed Analytics Dashboard",
      "Online Payment Gateway (Razorpay/Stripe)",
      "Admin Management Dashboard",
      "5 Rounds of Revisions",
      "Content Management System",
      "Email Marketing Setup",
    ],
    popular: true,
    cta: "Choose Professional Plan",
  },
  {
    tier: "TIER III",
    name: "Enterprise",
    tagline: "Large-Scale Enterprise Platform",
    icon: Crown,
    price: "₹3,99,999",
    period: "custom quote",
    deliveryTime: "8–12 Weeks Delivery",
    description: "Full-scale cloud platform for companies needing high-traffic reliability, custom integrations, and dedicated engineering.",
    features: [
      "Full-Stack Web & Cloud Application",
      "Microservices & Modular Setup",
      "Cloud Hosting Setup (AWS/GCP)",
      "Advanced Security & Data Protection",
      "Third-Party Software Integrations",
      "12 Months Dedicated Support",
      "Continuous Speed & Uptime Tracking",
      "High-Traffic Load Balancing",
      "Automated Testing & QA",
      "Automated Deployment Pipeline",
      "Unlimited Revisions",
      "24/7 Priority Support",
      "Team Training & Documentation",
      "Long-Term Growth Planning",
    ],
    popular: false,
    cta: "Get Enterprise Plan",
  },
]

interface AddOnService {
  name: string
  price: string
  description: string
  icon: LucideIcon
  badge: string
}

const addOnServices: AddOnService[] = [
  {
    name: "Mobile App Development",
    price: "₹49,999",
    description: "Native iOS and Android mobile apps with offline support and smooth performance.",
    icon: Smartphone,
    badge: "iOS & Android",
  },
  {
    name: "AI Integration",
    price: "₹49,999",
    description: "Custom AI chatbots, smart assistants, and automated customer support tools.",
    icon: Bot,
    badge: "Smart AI Assistant",
  },
  {
    name: "Analytics & Reporting",
    price: "₹29,999",
    description: "Live analytics dashboards, visitor tracking, and weekly conversion reports.",
    icon: BarChart3,
    badge: "Analytics & Reports",
  },
  {
    name: "E-commerce Setup",
    price: "₹39,999",
    description: "Online store with secure payments, inventory tracking, and multiple currencies.",
    icon: ShoppingBag,
    badge: "Online Store",
  },
  {
    name: "Maintenance Package",
    price: "₹9,999/month",
    description: "Regular security updates, bug fixes, speed improvements, and priority support.",
    icon: ShieldCheck,
    badge: "Reliable Uptime",
  },
  {
    name: "Speed Optimization",
    price: "₹19,999",
    description: "Speed audit and optimization to make your site load in under 1 second.",
    icon: Zap,
    badge: "Fast Loading",
  },
]

interface MonthlyPackage {
  roman: string
  name: string
  price: string
  period: string
  hours: string
  sla: string
  description: string
  features: string[]
}

const monthlyPackages: MonthlyPackage[] = [
  {
    roman: "PLAN I",
    name: "Monthly Developer Retainer",
    price: "₹79,999",
    period: "per month",
    hours: "40 Hours of Development",
    sla: "< 4h Response Time",
    description: "Dedicated development time for businesses that need new features, regular updates, and ongoing technical support.",
    features: [
      "40 hours of dedicated developer time",
      "Priority bug fixes and quick issue resolution",
      "Bi-weekly strategy and planning calls",
      "Continuous speed and uptime monitoring",
      "Regular security and software updates",
      "Direct Slack or WhatsApp access to developers",
    ],
  },
  {
    roman: "PLAN II",
    name: "Full-Service Team Package",
    price: "₹1,49,999",
    period: "per month",
    hours: "80 Hours of Development",
    sla: "< 1h Priority Response",
    description: "Complete technical care with a dedicated developer, project manager, and fast turnaround for all requests.",
    features: [
      "80 hours of full-stack developer time",
      "Dedicated project manager and lead developer",
      "Weekly progress reports and demo calls",
      "24/7 uptime and performance monitoring",
      "Unlimited small design and text updates",
      "Email marketing and automation setup",
      "Fast emergency fixes whenever needed",
    ],
  },
]

const pricingFaqs = [
  {
    question: "How do your milestone-based payments work?",
    answer:
      "We split the project cost into clear, simple milestones (for example: 30% project start, 40% core development, 30% final testing and launch). You only pay each milestone once you review and approve the work.",
  },
  {
    question: "Do we receive 100% intellectual property & code ownership?",
    answer:
      "Yes, 100%. All source code, design files, databases, and login credentials belong completely to you from day one. You are never locked into our service.",
  },
  {
    question: "Can we customize or combine tier deliverables?",
    answer:
      "Yes, absolutely! Every plan can be adjusted to match your exact goals. You can use our cost calculator below or talk directly with our team to get a tailored quote.",
  },
  {
    question: "What happens after the initial warranty and support period?",
    answer:
      "After your project is launched, we provide 3 to 12 months of free bug-fix support and warranty. After that, you can choose one of our affordable monthly maintenance plans, or manage it yourself.",
  },
]

export default function PricingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Only prompt offer once per browser session
    try {
      const seen = sessionStorage.getItem("rsnexus_offer_seen")
      if (!seen) {
        const timer = setTimeout(() => {
          setShowModal(true)
          sessionStorage.setItem("rsnexus_offer_seen", "true")
        }, 3500)
        return () => clearTimeout(timer)
      }
    } catch {
      // Ignore if sessionStorage is restricted
    }
  }, [])

  const handlePlanSelect = (planName: string) => {
    toast({
      title: "Plan Selected!",
      description: `You've selected the ${planName} plan. Redirecting to contact form...`,
    })
    setTimeout(() => {
      router.push(`/contact?plan=${planName.toLowerCase()}`)
    }, 1500)
  }

  const handleConsultation = () => {
    router.push("/contact?type=consultation")
  }

  const handleContactSales = () => {
    router.push("/contact?type=sales")
  }

  const handleBasicWebsite = () => {
    setShowModal(false)
    toast({
      title: "Basic Website Selected!",
      description: "Redirecting to contact form for your 5-6 page website...",
    })
    setTimeout(() => {
      router.push("/contact?plan=basic-website&budget=6k-10k")
    }, 1500)
  }

  return (
    <>
      {/* Special Offer Modal - Classical Atelier Style */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-lg classical-card classical-frame border border-amber-500/40 dark:border-amber-500/30 bg-background/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 rounded-3xl">
          <DialogHeader className="text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 w-fit">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
              <span className="font-serif text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                ✦ SPECIAL OFFER • STARTUP WEBSITE ✦
              </span>
            </div>
            <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Starter Website <span className="text-gradient-gold">Package</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Gilded Price Ribbon */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-500/15 via-amber-600/5 to-transparent border border-amber-500/30 relative overflow-hidden">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-serif text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Complete Website Package
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  5–7 Days Delivery
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-black text-foreground">₹6,000</span>
                <span className="text-sm font-medium text-muted-foreground">to ₹10,000</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                A clean, fast, mobile-friendly website built for new businesses, founders, and professionals.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5">
              <h4 className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-semibold">
                What's Included:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  "5–6 Page Responsive Website",
                  "Mobile-Friendly Design",
                  "Contact Form with Email Alerts",
                  "Free SSL Security Certificate",
                  "Basic Google SEO Setup",
                  "1 Month Free Support",
                  "2 Full Rounds of Revisions",
                  "100% Full Code Ownership",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-500">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleBasicWebsite}
                className="flex-1 font-serif py-5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-lg shadow-amber-500/20 border-0"
              >
                Claim Starter Offer - ₹6,000
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="font-serif py-5 border-border hover:bg-secondary/60 bg-transparent"
              >
                View Full Plans
              </Button>
            </div>

            <p className="text-[11px] text-center text-muted-foreground">
              * Final price depends on any custom pages or extra integrations requested.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-amber-500/10 dark:bg-amber-500/8 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          {/* Classical Hero Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
                ✦ HONEST & TRANSPARENT PRICING ✦
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-foreground tracking-tight leading-tight">
              Simple, Milestone-Based <span className="text-gradient-gold">Pricing Plans</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-sans">
              Clear, fixed pricing for startups and growing businesses. Pay per approved milestone, with zero hidden fees and guaranteed delivery dates.
            </p>

            {/* Classical Trust Tokens Strip */}
            <div className="mt-10 pt-6 border-t border-border/60 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {[
                { icon: Shield, title: "Milestone Payments", sub: "Pay per approved stage" },
                { icon: Code2, title: "100% Code Ownership", sub: "You own all files & code" },
                { icon: Award, title: "Clean Code", sub: "Well-documented & tested" },
                { icon: Clock, title: "Clear Deadlines", sub: "On-time delivery guarantee" },
              ].map((token, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-background/60 dark:bg-slate-900/60 border border-border/70 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-foreground">
                    <token.icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{token.title}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground block mt-0.5">{token.sub}</span>
                </div>
              ))}
            </div>

            <div className="classical-divider max-w-xs mx-auto mt-12">
              <span className="text-amber-500 font-serif text-xs">✦ PROJECT PLANS ✦</span>
            </div>
          </div>

          {/* Special Accelerator Initiative Showcase (Basic Website) */}
          <div className="mb-24 max-w-4xl mx-auto">
            <div className="relative rounded-3xl classical-card classical-frame border border-amber-500/30 overflow-hidden shadow-2xl p-6 sm:p-10 bg-gradient-to-br from-card via-secondary/30 to-card">
              {/* Top Accent Ribbon */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500/20 to-transparent px-6 py-2 rounded-bl-2xl border-l border-b border-amber-500/30 hidden sm:block">
                <span className="font-serif text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  ✦ SPECIAL STARTUP OFFER ✦
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    <Zap className="h-3.5 w-3.5" />
                    <span className="font-serif text-xs font-bold uppercase tracking-wider">
                      Ready-to-Launch Package
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-extrabold text-foreground tracking-tight">
                    Basic Website <span className="text-gradient-gold">Package</span>
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-black text-foreground">₹6,000</span>
                    <span className="text-muted-foreground text-sm font-medium">to ₹10,000 fixed</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A clean, high-converting 5–6 page website built for startups and businesses wanting to launch quickly and look professional.
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={handleBasicWebsite}
                      className="w-full sm:w-auto px-6 py-5 font-serif text-sm font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-xl shadow-amber-500/15 border-0"
                    >
                      Get Starter Website - ₹6,000
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Right Checklist */}
                <div className="lg:col-span-7 bg-background/80 dark:bg-slate-900/80 rounded-2xl p-6 border border-border/80 shadow-inner">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
                    <span className="font-serif text-xs uppercase tracking-wider text-foreground font-semibold">
                      What's Included
                    </span>
                    <span className="text-xs font-serif font-bold text-amber-500">5–7 Days Delivery</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "5–6 Page Responsive Website",
                      "Mobile-Friendly Clean Design",
                      "Working Contact Form & Leads",
                      "Basic Google SEO Setup",
                      "Free SSL Security Certificate",
                      "1 Month Free Support",
                      "2 Rounds of Revisions",
                      "100% Full Code Ownership",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-500">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-xs text-foreground/90 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Includes hosting configuration & domain setup</span>
                    <span className="text-foreground font-medium">Zero Monthly Lock-In</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Project Solutions (Starter, Professional, Enterprise) */}
          <div className="mb-28">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Fixed-Price <span className="text-gradient-gold">Project Plans</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base">
                Built for complete software projects with clear payment milestones, thorough testing, and clean documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => {
                const IconComponent = plan.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className={`relative rounded-3xl classical-card classical-frame flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                      plan.popular
                        ? "border-amber-500/60 dark:border-amber-500/50 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/30 bg-card/95 dark:bg-slate-900/95 lg:-translate-y-3"
                        : "border-border/80 dark:border-slate-800/80 hover:border-amber-500/40 bg-card/85 dark:bg-slate-900/85"
                    }`}
                  >
                    {/* Commended Banner for Tier II */}
                    {plan.popular && (
                      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-center py-2 px-4 shadow-sm">
                        <div className="flex items-center justify-center gap-1.5 font-serif text-xs font-bold uppercase tracking-widest">
                          <Crown className="w-3.5 h-3.5" />
                          <span>Most Popular Choice</span>
                        </div>
                      </div>
                    )}

                    <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                      {/* Plan Header */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/90 border border-border/80">
                            <span className="font-serif text-[11px] font-bold uppercase tracking-wider text-amber-500">
                              {plan.tier}
                            </span>
                          </div>
                          <span className="text-xs font-serif font-medium text-muted-foreground">
                            {plan.deliveryTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${
                              plan.popular
                                ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-500"
                                : "bg-secondary/70 border-border/70 text-foreground"
                            }`}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-foreground">{plan.name}</h3>
                            <span className="text-xs text-muted-foreground font-medium block">
                              {plan.tagline}
                            </span>
                          </div>
                        </div>

                        {/* Price Tag */}
                        <div className="my-6 p-4 rounded-2xl bg-secondary/50 dark:bg-slate-950/50 border border-border/60">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-4xl font-black text-foreground tracking-tight">
                              {plan.price}
                            </span>
                            <span className="text-xs font-serif uppercase tracking-wider text-muted-foreground font-medium">
                              {plan.period}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Feature List */}
                        <div className="space-y-3 mb-8">
                          <span className="font-serif text-xs uppercase tracking-wider text-foreground/80 font-bold block mb-2">
                            What's Included:
                          </span>
                          <ul className="space-y-2.5">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                                    plan.popular
                                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                                  }`}
                                >
                                  <Check className="h-2.5 w-2.5" />
                                </div>
                                <span className="text-xs text-foreground/90 font-medium leading-tight">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className={`w-full py-6 font-serif text-sm font-bold transition-all shadow-md ${
                          plan.popular
                            ? "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-amber-500/20 border-0"
                            : "bg-secondary/90 hover:bg-secondary text-foreground border border-border/80"
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handlePlanSelect(plan.name)}
                      >
                        <span>{plan.cta}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Interactive Scope & Price Estimator */}
          <div className="my-24">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-amber-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
                  ✦ ESTIMATE YOUR COST • CALCULATOR ✦
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Interactive Project Cost & <span className="text-gradient-gold">Scope Estimator</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base mt-2">
                Select your platform, number of screens, and optional add-on features to calculate an instant cost estimate.
              </p>
            </div>

            <PricingCalculator />
          </div>

          {/* Monthly Retainer Packages */}
          <div className="mb-28">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
                <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
                  ✦ MONTHLY RETAINERS • DEDICATED DEVELOPERS ✦
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Monthly Retainers & <span className="text-gradient-gold">Dedicated Support</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Ongoing development and maintenance for growing businesses that need regular updates, fast bug fixes, and a dedicated engineering team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {monthlyPackages.map((pkg, index) => (
                <div
                  key={index}
                  className="rounded-3xl classical-card classical-frame border border-border/80 dark:border-slate-800/80 p-8 sm:p-10 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 bg-card/85 dark:bg-slate-900/85"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-xs font-bold uppercase tracking-widest text-amber-500">
                        {pkg.roman}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-serif text-[11px] border-amber-500/30 text-amber-600 dark:text-amber-400">
                          {pkg.hours}
                        </Badge>
                        <Badge variant="outline" className="font-serif text-[11px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                          {pkg.sla}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="p-4 rounded-2xl bg-secondary/50 dark:bg-slate-950/50 border border-border/60 mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl sm:text-4xl font-black text-foreground">
                          {pkg.price}
                        </span>
                        <span className="text-xs text-muted-foreground font-serif uppercase tracking-wider">
                          {pkg.period}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <span className="font-serif text-xs uppercase tracking-wider text-foreground/80 font-bold block mb-2">
                        What's Included:
                      </span>
                      <ul className="space-y-2.5">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-500">
                              <Check className="h-2.5 w-2.5" />
                            </div>
                            <span className="text-xs text-foreground/90 font-medium">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    className="w-full py-6 font-serif text-sm font-bold bg-transparent border border-border/80 hover:bg-secondary/70 text-foreground transition-all hover:border-amber-500/50"
                    variant="outline"
                    onClick={() => handlePlanSelect(pkg.name)}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Add-On Services */}
          <div className="mb-28">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
                <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
                  ✦ OPTIONAL ADD-ONS & SERVICES ✦
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Additional <span className="text-gradient-gold">Services & Features</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Enhance your project with mobile apps, AI integrations, payment gateways, or custom analytics dashboards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {addOnServices.map((addon, index) => {
                const AddonIcon = addon.icon
                return (
                  <div
                    key={index}
                    onClick={() => handlePlanSelect(addon.name)}
                    className="group relative rounded-2xl classical-card classical-frame p-6 border border-border/80 dark:border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between bg-card/80 dark:bg-slate-900/80"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                          <AddonIcon className="w-5 h-5" />
                        </div>
                        <Badge variant="outline" className="font-serif text-[10px] border-border text-muted-foreground">
                          {addon.badge}
                        </Badge>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-foreground mb-1 group-hover:text-amber-500 transition-colors">
                        {addon.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {addon.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                      <span className="font-serif font-black text-lg text-foreground">
                        {addon.price}
                      </span>
                      <span className="inline-flex items-center text-xs font-serif font-semibold text-amber-500 group-hover:translate-x-1 transition-transform">
                        Select Add-On
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Architectural Assurance & FAQ Section */}
          <div className="mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-amber-500/30 mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
                  ✦ PRICING & PAYMENT FAQS ✦
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Frequently Asked <span className="text-gradient-gold">Pricing Questions</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mt-2">
                Clear answers about code ownership, milestone payments, and free support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl classical-card classical-frame p-6 border border-border/80 dark:border-slate-800/80 bg-card/70 dark:bg-slate-900/70"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-500">
                      <FileCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-foreground mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classical Conversion Citadel (CTA Section) */}
          <div className="relative max-w-4xl mx-auto">
            <Card className="classical-card classical-frame rounded-3xl border border-amber-500/40 dark:border-amber-500/30 overflow-hidden shadow-2xl bg-gradient-to-br from-card via-secondary/40 to-card">
              <CardContent className="p-8 sm:p-12 md:p-16 text-center relative z-10">
                {/* Classical Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/90 border border-amber-500/30 mb-6 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
                    START YOUR PROJECT • TALK TO US
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 text-foreground tracking-tight leading-tight">
                  Ready to Build Your <span className="text-gradient-gold">Next Project</span>?
                </h2>

                <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
                  Not sure which plan is right for your goals? Schedule a free 30-minute call with our lead engineers. We&apos;ll help you pick the best approach and provide an exact, transparent quote.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="font-serif text-base px-8 py-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-xl shadow-amber-500/20 border-0"
                    onClick={handleConsultation}
                  >
                    Schedule Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-serif text-base px-8 py-6 border-border hover:bg-background/80 bg-background/50"
                    onClick={handleContactSales}
                  >
                    Contact Sales Team
                  </Button>
                </div>

                {/* Classical Trust Proofs */}
                <div className="mt-12 pt-8 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { icon: Shield, text: "Milestone-Based Payments" },
                    { icon: Award, text: "100% Code Ownership" },
                    { icon: Clock, text: "Under 2h Fast Response" },
                    { icon: Sparkles, text: "Clean & Modern Code" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-2 text-xs font-serif text-foreground/80"
                    >
                      <item.icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
