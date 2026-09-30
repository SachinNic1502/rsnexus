import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Clock, Target, LucideIcon } from "lucide-react"
import { siteConfig } from "@/config/site"

const statIcons: Record<string, LucideIcon> = {
  Users,
  Award,
  Clock,
  Target,
};

export function AboutSection() {
  return (
    <section className="py-24 bg-slate-50/30 dark:bg-slate-950/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-background/50 border-primary/30">
            About {siteConfig.name}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Driven by Innovation, Powered by Passion
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {siteConfig.stats.map((stat) => {
            const IconComponent = statIcons[stat.iconName] || Target;
            return (
              <Card
                key={stat.id}
                className="text-center p-6 glass-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-extrabold text-gradient-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
             We believe in the transformative power of technology to drive the global digital revolution. Our mission is to help businesses and organizations around the world leverage cutting-edge software solutions that are not just functional, but exceptional in every aspect.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From startups to large enterprises, from tech innovators to international corporations, we partner with our clients to understand their unique challenges and deliver tailored solutions that drive growth, efficiency, and success across the globe.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Innovation First</h4>
               <p className="text-muted-foreground">
  We stay ahead of global technology trends while addressing the unique needs of diverse markets.
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