"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  Linkedin,
  Sparkles,
  Shield,
  Award,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import faqData from "@/data/faq.json"
import { siteConfig } from "@/config/site"
import { getServices } from "@/lib/services"

const budgetOptions = [
  { id: "under-50k", label: "< ₹50,000", tag: "Starter MVP" },
  { id: "50k-1l", label: "₹50k – ₹1L", tag: "Foundational" },
  { id: "1l-2l", label: "₹1L – ₹2L", tag: "Full-Stack" },
  { id: "2l-5l", label: "₹2L – ₹5L", tag: "Growing Business" },
  { id: "over-5l", label: "> ₹5,00,000", tag: "Custom Enterprise" },
]

const contactInfo = [
  {
    icon: MapPin,
    title: "Operating Studio",
    details: [siteConfig.contact.address.display],
    badge: "Global Remote",
  },
  {
    icon: Phone,
    title: "Direct Voice & WhatsApp",
    details: [siteConfig.contact.phone],
    badge: "< 15 Min SLA",
  },
  {
    icon: Mail,
    title: "Email Our Engineering Team",
    details: [siteConfig.contact.email, siteConfig.contact.supportEmail],
    badge: "Direct Reply",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [siteConfig.contact.workingHours],
    badge: "Mon – Sat",
  },
]

export default function ContactPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })

  useEffect(() => {
    const plan = searchParams.get("plan")
    const type = searchParams.get("type")

    if (plan) {
      setFormData((prev) => ({
        ...prev,
        service: plan,
        message: `I'm interested in the ${plan.toUpperCase()} plan. Please share project details and estimated timeline.`,
      }))
    }

    if (type === "consultation") {
      setFormData((prev) => ({
        ...prev,
        message: "I would like to schedule a free 30-minute consultation to review my project ideas and requirements.",
      }))
    }

    if (type === "sales") {
      setFormData((prev) => ({
        ...prev,
        message: "I would like to discuss custom enterprise requirements, dedicated team support, and cloud systems.",
      }))
    }

    if (type === "estimate") {
      const platformParam = searchParams.get("platform") || ""
      const scopeParam = searchParams.get("scope") || ""
      const budgetParam = searchParams.get("budget") || ""
      const addonsParam = searchParams.get("addons") || ""

      let budgetSelection = ""
      const minVal = parseInt(budgetParam.split("-")[0] || "0", 10)
      if (minVal > 0) {
        if (minVal < 50000) budgetSelection = "under-50k"
        else if (minVal <= 100000) budgetSelection = "50k-1l"
        else if (minVal <= 200000) budgetSelection = "1l-2l"
        else if (minVal <= 500000) budgetSelection = "2l-5l"
        else budgetSelection = "over-5l"
      }

      setFormData((prev) => ({
        ...prev,
        service: platformParam || prev.service,
        budget: budgetSelection || prev.budget,
        message: `I would like to discuss building a ${platformParam.toUpperCase()} project (${scopeParam} scope). Modules: ${addonsParam.replace(/,/g, ", ") || "Core architecture"}. Estimated ballpark: ₹${budgetParam}.`,
      }))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: data.message || "Thank you. Our team will review your message and reply within 24 hours.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        })
      } else {
        toast({
          title: "Sending Error",
          description: data.message || "Failed to send your message. Please reach out directly on WhatsApp.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Connection Error",
        description: "An unexpected network error occurred. Please contact us via WhatsApp.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleScheduleCall = () => {
    window.open("https://calendly.com/RSNexus", "_blank")
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden">
      {/* Ambient atmospheric glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-[45%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              ✦ GET IN TOUCH • TALK TO OUR ENGINEERS ✦
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-foreground tracking-tight leading-tight">
            Book a Free <span className="text-gradient-gold">Project Consultation</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-sans">
            Talk directly with our lead software engineers. We&apos;ll review your requirements, share honest technical advice, and outline a clear roadmap with zero middle-management runarounds.
          </p>

          {/* Quick Commitments Bar */}
          <div className="mt-8 pt-6 border-t border-border/60 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { icon: Shield, title: "Strict NDA Guard", sub: "Confidentiality guaranteed" },
              { icon: Clock, title: "< 24h Response", sub: "Fast team reply" },
              { icon: Award, title: "Direct Engineers", sub: "No account managers" },
              { icon: Lock, title: "100% IP Security", sub: "Zero vendor lock-in" },
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

          <div className="classical-divider max-w-xs mx-auto mt-10">
            <span className="text-amber-500 font-serif text-xs">✦ SEND US A MESSAGE ✦</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-7xl mx-auto">
          {/* Main Contact Form */}
          <div className="lg:col-span-7">
            <div className="classical-card classical-frame rounded-3xl p-6 sm:p-10 border border-amber-500/30 bg-card/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/70">
                <div>
                  <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-semibold">
                    QUICK PROJECT INTAKE
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-1">
                    Tell Us About Your Project
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-serif">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Team Available</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-serif text-xs uppercase tracking-wider text-foreground/80">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      required
                      className="rounded-xl border-border/80 focus-visible:ring-amber-500/30 bg-background/50 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-serif text-xs uppercase tracking-wider text-foreground/80">
                      Work Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="rajesh@enterprise.com"
                      required
                      className="rounded-xl border-border/80 focus-visible:ring-amber-500/30 bg-background/50 h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-serif text-xs uppercase tracking-wider text-foreground/80">
                      Phone / WhatsApp Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 93099 31886"
                      className="rounded-xl border-border/80 focus-visible:ring-amber-500/30 bg-background/50 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-serif text-xs uppercase tracking-wider text-foreground/80">
                      Organization / Venture Name
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="Nexus Systems Inc."
                      className="rounded-xl border-border/80 focus-visible:ring-amber-500/30 bg-background/50 h-12"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="font-serif text-xs uppercase tracking-wider text-foreground/80">
                    What Service Do You Need?
                  </Label>
                  <Select onValueChange={(value) => handleChange("service", value)} value={formData.service}>
                    <SelectTrigger className="rounded-xl border-border/80 focus:ring-amber-500/30 bg-background/50 h-12">
                      <SelectValue placeholder="Select a service or plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {getServices().map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="basic-website">Starter Web Package (₹6,000 - ₹10,000)</SelectItem>
                      <SelectItem value="starter">Tier I • Starter Plan (₹49,999)</SelectItem>
                      <SelectItem value="professional">Tier II • Professional Plan (₹1,25,999)</SelectItem>
                      <SelectItem value="enterprise">Tier III • Enterprise Custom (₹3,99,999)</SelectItem>
                      <SelectItem value="consultation">Free 30-Min Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interactive Budget Chips */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label className="font-serif text-xs uppercase tracking-wider text-foreground/80">
                      Estimated Budget Range (INR)
                    </Label>
                    <span className="text-[11px] text-muted-foreground font-mono">Milestone payments</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetOptions.map((opt) => {
                      const isSelected = formData.budget === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleChange("budget", opt.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all duration-200 ${
                            isSelected
                              ? "border-amber-500 bg-amber-500/10 text-foreground ring-1 ring-amber-500/40"
                              : "border-border/70 bg-background/40 hover:border-amber-500/30 hover:bg-secondary/40 text-muted-foreground"
                          }`}
                        >
                          <div className="font-serif font-bold text-xs text-foreground">{opt.label}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{opt.tag}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Message / Scope description */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-serif text-xs uppercase tracking-wider text-foreground/80">
                    Project Vision & Requirements *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Describe your product goals, desired deadlines, existing tech stack, and any specific third-party APIs required..."
                    rows={5}
                    required
                    className="rounded-xl border-border/80 focus-visible:ring-amber-500/30 bg-background/50 leading-relaxed text-sm resize-none"
                  />
                </div>

                {/* Submit Trigger */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full py-6 font-serif text-base font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white shadow-xl shadow-amber-500/20 border-0 transition-all group"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message to Our Team</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-center text-muted-foreground">
                  By submitting, you agree to our standard non-disclosure and project evaluation terms.
                </p>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Channels & Atelier Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Instant Priority Dispatch Cards */}
            <div className="rounded-3xl classical-card classical-frame p-6 sm:p-7 border border-amber-500/30 bg-gradient-to-br from-card via-secondary/20 to-card shadow-xl">
              <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-1">
                QUICK CONNECT
              </span>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Need a Quick Answer?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Skip the form and reach out directly through WhatsApp or book a video call.
              </p>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full py-6 font-serif text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 border-0 flex items-center justify-between px-5"
                >
                  <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-2.5">
                      <MessageCircle className="w-5 h-5" />
                      <span>Chat on WhatsApp</span>
                    </span>
                    <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                      &lt; 15m reply
                    </span>
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleScheduleCall}
                  className="w-full py-6 font-serif text-sm font-bold border-border/80 hover:bg-secondary/70 bg-background/50 flex items-center justify-between px-5"
                >
                  <span className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    <span>Book a 30-Min Video Call</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full py-6 font-serif text-sm font-bold border-border/80 hover:bg-secondary/70 bg-background/50 flex items-center justify-between px-5"
                >
                  <a href="https://www.linkedin.com/in/sachin-rathod-b20b83175/" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-2.5">
                      <Linkedin className="w-5 h-5 text-blue-500" />
                      <span>Connect on LinkedIn</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Atelier Matrix Cards */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const InfoIcon = info.icon
                return (
                  <div
                    key={index}
                    className="classical-card classical-frame rounded-2xl p-5 border border-border/80 dark:border-slate-800/80 bg-card/80 dark:bg-slate-900/80 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500">
                        <InfoIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-serif text-sm font-bold text-foreground">{info.title}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
                            {info.badge}
                          </span>
                        </div>
                        {info.details.map((detail, dIdx) => (
                          <p key={dIdx} className="text-xs text-muted-foreground leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Classical FAQ Grid */}
        <div className="mt-28 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-amber-500/30 mb-3">
              <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
                ✦ FREQUENTLY ASKED QUESTIONS ✦
              </span>
            </div>
            <h2 className="font-serif text-3xl font-extrabold text-foreground tracking-tight">
              Common Questions Before <span className="text-gradient-gold">You Start</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">
              Helpful answers regarding our discovery calls, quotes, timelines, and contract process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqData.slice(0, 4).map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl classical-card classical-frame p-6 border border-border/80 dark:border-slate-800/80 bg-card/70 dark:bg-slate-900/70"
              >
                <h3 className="font-serif text-base font-bold text-foreground mb-2 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="font-serif rounded-full px-6 border-border">
              <Link href="/faq">
                <span>View All FAQs</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}