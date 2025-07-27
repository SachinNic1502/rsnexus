import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Target, Lightbulb, Award, MapPin, Phone, Mail, Globe, Code2, TrendingUp, Shield, Clock } from "lucide-react"

const team = [
  {
    name: "Sachin Rathod",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
    bio: "15+ years in software development with expertise in scaling Indian tech companies. Former senior developer at Infosys and Wipro.",
    linkedin: "https://www.linkedin.com/in/sachin-rathod-b1b1b1b1b1/",
    email: "sachin@rsnecus.in",
    phone: "+91 98260 00000",
  },
  {
    name: "Kushagra Ranjan",
    role: "CTO & Co-Founder",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Former TCS engineer specializing in cloud architecture and AI solutions. Expert in AWS, Azure, and Google Cloud for Indian market.",
    linkedin: "https://www.linkedin.com/in/kushagra-ranjan-b1b1b1b1b1/",
    email: "kushagra@rsnecus.in",
    phone: "+91 98260 00001",
  }
]

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for perfection in every line of code and every pixel of design for Indian businesses.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and transparent communication across Indian time zones.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of global technology trends while understanding local Indian market needs.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "We maintain the highest international standards while serving Indian businesses.",
  },
]

const stats = [
  {
    icon: Code2,
    number: "200+",
    label: "Projects Completed",
    description: "Successfully delivered across India and globally"
  },
  {
    icon: Users,
    number: "50+",
    label: "Happy Clients",
    description: "From startups to enterprise companies"
  },
  {
    icon: TrendingUp,
    number: "95%",
    label: "Client Satisfaction",
    description: "Consistently high ratings and feedback"
  },
  {
    icon: Clock,
    number: "6+",
    label: "Years Experience",
    description: "Serving the Indian tech ecosystem since 2017"
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4">
            About RSNecus India
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Building the Future of Software in India
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Founded in 2017 in Mumbai, RSNecus has grown from a small startup to India's leading software development
            company, helping businesses across Mumbai, Delhi, Bangalore, and globally transform their ideas into
            powerful digital solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>3 Offices across India</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>25+ Team Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Serving 50+ Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-0 bg-white/50 dark:bg-slate-800/50">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story in India</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                RSNecus was born from a simple belief: that great software can transform Indian businesses and improve
                lives across the subcontinent. What started as a small team of passionate developers in Mumbai has
                evolved into a comprehensive software development company serving clients from Bangalore to Delhi and
                beyond.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Today, we're proud to have delivered over 200 successful projects, helped dozens of Indian startups
                scale, and partnered with enterprise clients to modernize their technology infrastructure while
                understanding the unique challenges of the Indian market.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our journey reflects the growth of India's tech ecosystem - from serving local businesses to becoming
                a trusted partner for international companies looking to establish their presence in the Indian market.
              </p>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="RSNecus team working in Mumbai office"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our Indian clients and each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Indian Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of Indian experts brings together years of experience in software development, design,
              and business strategy tailored for the Indian market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
