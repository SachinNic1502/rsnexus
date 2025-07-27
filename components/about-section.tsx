import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Clock, Target } from "lucide-react"

const stats = [
  {
    icon: Users,
   // value: "💼 ",
    label: "Ready to Serve",
    description: "Collaborating with businesses to build lasting partnerships",
  },
  {
    icon: Award,
    // value: "🧪",
    label: "10+ In-House Projects Launched",
    description: "Realistic simulations for diverse industries",
  },
  {
    icon: Clock,
    // value: "⏳",
    label: "4+ Years Development Experience",
    description: "Deep technical expertise in building scalable software",
  },
  {
    icon: Target,
    //value: "🚀",
    label: "On a Journey to Build Better",
    description: "Delivering reliable solutions through precision and growth mindset",
  },
]

export function AboutSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About RSNecus India
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Driven by Innovation, Powered by Passion</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          At RSNexus, we’re a passionate team of developers focused on delivering innovative and scalable software solutions. With a growing portfolio of demo projects and 3+ years of hands-on experience, we help businesses worldwide turn digital ideas into reality through modern, efficient, and reliable technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                {/* <div className="text-3xl font-bold mb-2">{stat.value}</div> */}
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Mission in India</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We believe in the transformative power of technology to drive India's digital revolution. Our mission is
              to help Indian businesses and global companies leverage cutting-edge software solutions that are not just
              functional, but exceptional in every aspect.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From Mumbai startups to Delhi enterprises, from Bangalore tech companies to international corporations, we
              partner with our clients to understand their unique challenges and deliver tailored solutions that drive
              growth, efficiency, and success in the Indian market and beyond.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Innovation First</h4>
                <p className="text-muted-foreground">
                  We stay ahead of global technology trends while understanding local Indian market needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Quality Assurance</h4>
                <p className="text-muted-foreground">
                  Rigorous testing and quality control ensure reliable, robust software that meets international
                  standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Client Partnership</h4>
                <p className="text-muted-foreground">
                  We build lasting relationships through transparent communication and collaborative development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
