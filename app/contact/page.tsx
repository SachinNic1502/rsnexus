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
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Locations",
    details: [
      "At present, we work entirely remotely without a physical office.",
    ],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+91 8218821466", "+91 9852731566", "+91 9309931886"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["sr.nexus.it@gmail.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 10AM - 8PM IST", "Saturday: 10AM - 6PM IST", "Sunday: Closed"],
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
        message: `I'm interested in the ${plan} plan. Please provide more details.`,
      }))
    }

    if (type === "consultation") {
      setFormData((prev) => ({
        ...prev,
        message: "I would like to schedule a free consultation to discuss my project requirements.",
      }))
    }

    if (type === "sales") {
      setFormData((prev) => ({
        ...prev,
        message: "I would like to speak with your sales team about enterprise solutions.",
      }))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting RSNexus. We'll get back to you within 24 hours.",
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLiveChat = () => {
    toast({
      title: "Live Chat",
      description: "Live chat feature will be available soon. Please use the contact form for now.",
    })
  }

  const handleScheduleCall = () => {
    window.open("https://calendly.com/RSNexus", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Contact RSNexus
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Let's Build Something Amazing Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Get in touch with our team of experts in India and let's discuss
            how we can help your business succeed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Rajesh Kumar"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="rajesh@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="Your Company Pvt Ltd"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service">Service Needed</Label>
                    <Select onValueChange={(value) => handleChange("service", value)} value={formData.service}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website Development</SelectItem>
                        <SelectItem value="fullstack">Full Stack Development</SelectItem>
                        <SelectItem value="mobile">Mobile App Development</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                        <SelectItem value="cloud">Cloud Solutions</SelectItem>
                        <SelectItem value="ai">AI & Machine Learning</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="starter">Starter Plan</SelectItem>
                        <SelectItem value="professional">Professional Plan</SelectItem>
                        <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Project Budget (INR)</Label>
                    <Select onValueChange={(value) => handleChange("budget", value)} value={formData.budget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                        <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
                        <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
                        <SelectItem value="over-5l">Over ₹5,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us about your project, goals, and any specific requirements for the Indian market..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Button className="h-16 flex-col gap-2 bg-transparent" variant="outline" onClick={handleLiveChat}>
                <MessageCircle className="h-5 w-5" />
                <span>Live Chat</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-transparent" variant="outline" onClick={handleScheduleCall}>
                <Calendar className="h-5 w-5" />
                <span>Schedule Call</span>
              </Button>
            </div>

            {/* Contact Details */}
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Map Placeholder */}
            {/* <Card className="overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">Mumbai, Delhi, Bangalore Offices</p>
                </div>
              </div>
            </Card> */}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services and process in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How long does a typical project take in India?",
                answer:
                  "Project timelines vary based on complexity, but most projects are completed within 4-12 weeks with our Indian development team.",
              },
              {
                question: "Do you provide ongoing support for Indian businesses?",
                answer:
                  "Yes, we offer various support packages including maintenance, updates, and feature enhancements specifically for Indian market needs.",
              },
              {
                question: "Can you work with our existing Indian team?",
                answer:
                  "We can integrate with your existing team or work as an independent development partner across India.",
              },
              {
                question: "What's your development process for Indian clients?",
                answer:
                  "We follow an agile methodology with regular check-ins, transparent communication, and iterative development, all aligned with Indian business hours.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}