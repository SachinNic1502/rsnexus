"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShieldCheck, Lock, CircleCheck, Activity } from "lucide-react";
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { Users, Target, Lightbulb, Award, MapPin, Phone, Mail, Globe } from "lucide-react"

const team = [
    {
        name: "Sachin Rathod",
        role: "CEO & Founder",
        image: "https://media.licdn.com/dms/image/v2/D4D03AQGNW7-tgqn0jQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1669641609996?e=1756339200&v=beta&t=xyl1favbYelaXzpC3aUtv6ixd-RofcEI2e4_7rk4PfQ",
        bio: "Full Stack MERN Developer and tech entrepreneur focused on empowering startups through innovative digital solutions and agile development practices.",
        linkedin: "https://www.linkedin.com/in/sachin-rathod-b20b83175/",
        email: "sachinrathodnic1@gmail.com",
        phone: "+91 9309931886",
    },
    {
        name: "Kushagra Ranjan",
        role: "Co-Founder",
        image: "https://media.licdn.com/dms/image/v2/D4E03AQH4g0mkIMZgPA/profile-displayphoto-shrink_800_800/B4EZY9QRwWHUAc-/0/1744784400879?e=1756339200&v=beta&t=FHhgZmBAHiDdZSnJIlzA56_HUKgqNBrfwf7V2dZ_gng",
        bio: "Frontend Developer specializing in responsive, modern web apps using React and Tailwind. Passionate about building fast, user-friendly interfaces for growing businesses.",
        linkedin: "https://www.linkedin.com/in/kushranjan/",
        email: "kushagra.ranjan21@gmail.com",
        phone: "+91 9852731566",
    }, {
        name: "Anubhav Trivedi ",
        role: "CTO ",
        image: "https://media.licdn.com/dms/image/v2/D5603AQEhRj-NeiZpiw/profile-displayphoto-shrink_800_800/B56ZOntQJoG8Ac-/0/1733685481259?e=1756339200&v=beta&t=KtSeiI4M_S5glxDDcTXddv2VaQ3IMIbVyJ7k9L13yRg",
        bio: "Full-Stack MERN Developer and Mobile App Specialist delivering innovative, AI-powered solutions for web and mobile platforms.",
        linkedin: "https://www.linkedin.com/in/anubhav-trivedi-developer/",
        email: "anubhavtrivedi222@gmail.com",
        phone: "+91 8218821466",
    }
]

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We aim for precision and quality in every line of code.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We build lasting partnerships grounded in transparency and trust.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We explore the edge of what's possible—bold ideas, smarter tech.",
  },
  {
    icon: Award,
    title: "Reliability",
    description: "We deliver consistent, scalable solutions that grow with your business.",
  },
]

const stats = [
  {
    icon: ShieldCheck,
    number: "99.9%",
    label: "System Uptime",
    description: "Highly reliable infrastructure with near-zero downtime"
  },
  {
    icon: Lock,
    number: "100%",
    label: "Data Security Compliance",
    description: "Adheres to global standards like GDPR & ISO 27001"
  },
  {
    icon: CircleCheck,
    number: "97%",
    label: "Successful Deliveries",
    description: "On-time, within scope, and budget-aligned project outcomes"
  },
  {
    icon: Activity,
    number: "92%",
    label: "Performance Optimization",
    description: "Projects launched with high-speed & scalable architecture"
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-xs md:text-sm">
            About RSNexus
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Driven by Innovation, Powered by Passion
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            RSNexus is a fast-growing team of passionate engineers and creative technologists. With over 4 years of experience and a portfolio of high-impact solutions, we help startups and enterprises worldwide bring digital products to life—scalable, reliable, and future-ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Delivering Solutions Worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Passionate Developers</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Building for 15+ Industries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-16 bg-primary/5 dark:bg-[#0f172a] transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05} transitionSpeed={400}>
                  <Card className="p-4 md:p-6 bg-white/20 dark:bg-slate-800/30 backdrop-blur-md rounded-xl shadow-lg">
                    <CardContent className="p-0">
                      <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg mb-4">
                        <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="font-semibold mb-1">{stat.label}</div>
                      <p className="text-xs md:text-sm text-muted-foreground">{stat.description}</p>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-10 md:py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Journey</h2>
              <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                RSNexus was founded to transform digital ideas into reality through modern, efficient technology. Starting in Mumbai, we’ve built a reputation for delivering reliable software solutions, with a focus on realistic demo projects that drive innovation across industries.
              </p>
              <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Our 4+ years of experience reflect a commitment to precision and a growth mindset. We collaborate with businesses worldwide, forging lasting partnerships to create scalable, impactful solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                At RSNexus, we’re on a journey to build better—empowering clients with technology that shapes the future.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/team-working.jpg"
                alt="RSNexus team collaborating on innovative projects"
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-10 md:py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Our values fuel our passion for innovation and guide our mission to deliver exceptional software solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg mb-4">
                    <value.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 md:py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Our leadership team combines passion and expertise to drive RSNexus’s vision of innovative software solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Avatar className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1 text-base md:text-lg">{member.name}</h3>
                  <p className="text-primary text-xs md:text-sm mb-3">{member.role}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-3 text-xs text-muted-foreground">
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
      <section className="py-8 md:py-12 bg-primary text-white text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-2">Ready to Build With Us?</h3>
        <p className="mb-6 text-sm md:text-base">Let’s turn your digital vision into a scalable product.</p>
        <a href="/contact" className="bg-white text-primary px-4 md:px-6 py-2 md:py-3 rounded-full font-medium hover:bg-slate-100 transition">
          Get in Touch
        </a>
      </section>
    </div>
  )
}