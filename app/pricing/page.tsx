"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Zap, Crown, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const pricingPlans = [
  {
    name: "Starter",
    icon: Zap,
    price: "₹49,999",
    period: "per project",
    description: "Perfect for small businesses and startups looking to establish their digital presence in India.",
    features: [
      "Responsive Website (up to 5 pages)",
      "Basic SEO Optimization",
      "Contact Form Integration",
      "Mobile-First Design",
      "3 Months Support",
      "Basic Analytics Setup",
      "SSL Certificate",
      "2 Revision Rounds",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    icon: Star,
    price: "₹1,25,999",
    period: "per project",
    description: "Comprehensive solution for growing Indian businesses needing advanced functionality.",
    features: [
      "Custom Web Application",
      "Advanced SEO & Performance",
      "User Authentication System",
      "Database Integration",
      "API Development",
      "6 Months Support",
      "Advanced Analytics",
      "Payment Gateway Integration (Razorpay/PayU)",
      "Admin Dashboard",
      "5 Revision Rounds",
      "Content Management System",
      "Email Marketing Integration",
    ],
    popular: true,
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "₹3,99,999",
    period: "per project",
    description: "Full-scale solution for large Indian organizations requiring complex systems.",
    features: [
      "Full Stack Application",
      "Microservices Architecture",
      "Cloud Infrastructure Setup (AWS/Azure)",
      "Advanced Security Features",
      "Third-party Integrations",
      "12 Months Support",
      "Performance Monitoring",
      "Load Balancing",
      "Automated Testing",
      "DevOps Pipeline",
      "Unlimited Revisions",
      "24/7 Priority Support",
      "Training & Documentation",
      "Scalability Planning",
    ],
    popular: false,
    cta: "Contact Sales",
  },
]

const addOnServices = [
  {
    name: "Mobile App Development",
    price: "₹49,999",
    description: "iOS and Android app development for Indian market",
  },
  {
    name: "AI Integration",
    price: "₹49,999",
    description: "Custom AI features and chatbots in Hindi/English",
  },
  {
    name: "Advanced Analytics",
    price: "₹29,999",
    description: "Custom dashboards and reporting",
  },
  {
    name: "E-commerce Setup",
    price: "₹39,999",
    description: "Full online store with Indian payment gateways",
  },
  {
    name: "Maintenance Package",
    price: "₹9,999/month",
    description: "Ongoing updates and support",
  },
  {
    name: "Performance Optimization",
    price: "₹19,999",
    description: "Speed and SEO improvements",
  },
]

const monthlyPackages = [
  {
    name: "Development Retainer",
    price: "₹79,999",
    period: "per month",
    description: "Ongoing development support for your growing Indian business.",
    features: [
      "40 hours of development time",
      "Priority support",
      "Monthly strategy calls",
      "Performance monitoring",
      "Security updates",
      "Feature enhancements",
    ],
  },
  {
    name: "Full-Service Package",
    price: "₹1,49,999",
    period: "per month",
    description: "Complete digital solution with dedicated team support in India.",
    features: [
      "80 hours of development time",
      "Dedicated project manager",
      "Weekly progress reports",
      "Advanced analytics",
      "24/7 monitoring",
      "Unlimited minor updates",
      "Marketing automation",
    ],
  },
]

export default function PricingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal after 2 seconds when page loads
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 2000)

    return () => clearTimeout(timer)
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
      {/* Special Offer Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Special Startup Offer
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold mb-2">Basic Website Package</h3>
                <div className="text-3xl font-bold">₹6,000 - ₹10,000</div>
                <p className="text-sm opacity-90">Perfect for startups & small businesses</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-center">What's Included:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">5-6 Page Responsive Website</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Mobile-First Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Contact Form Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Basic SEO Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">SSL Certificate</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">1 Month Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">2 Revision Rounds</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleBasicWebsite}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Get This Offer - ₹6,000
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowModal(false)}
                className="w-full"
              >
                View All Plans
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              * Price varies based on specific requirements. Contact us for exact quote.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Pricing Plans - India
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent pricing for every business size in India. No hidden fees, no surprises. Get exactly what you
              need to succeed in the Indian market.
            </p>
          </div>

          {/* Special Basic Website Card */}
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
              <Card className="border-2 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4 mx-auto">
                    <Zap className="h-6 w-6 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">Basic Website</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-green-600">₹6,000</span>
                    <span className="text-muted-foreground ml-2">- ₹10,000</span>
                  </div>
                  <p className="text-muted-foreground mt-2">5-6 page responsive website for startups</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">5-6 Page Responsive Website</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Mobile-First Design</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Contact Form Integration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Basic SEO Setup</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">SSL Certificate</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">1 Month Support</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">2 Revision Rounds</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    onClick={handleBasicWebsite}
                  >
                    Get Started - ₹6,000
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Project-Based Pricing */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Advanced Project Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""} hover:shadow-xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
                      <plan.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handlePlanSelect(plan.name)}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Monthly Retainer Packages */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4">Monthly Retainer Packages</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              For Indian businesses that need ongoing development support and want to build long-term partnerships.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {monthlyPackages.map((pkg, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground ml-2">{pkg.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{pkg.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() => handlePlanSelect(pkg.name)}
                    >
                      Start Retainer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add-On Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">Add-On Services</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Enhance your project with additional features and services tailored to Indian market needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOnServices.map((addon, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handlePlanSelect(addon.name)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{addon.name}</h3>
                      <span className="font-bold text-primary">{addon.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Not sure which plan is right for your Indian business? Let's discuss your project requirements and find the
              perfect solution.
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
              ✓ Free consultation • ✓ Custom quotes available • ✓ Flexible payment terms • ✓ India-focused solutions
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
