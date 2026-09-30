"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Linkedin, Github } from "lucide-react"
import team from "@/data/team.json"

const defaultFounders = team.filter((member) => member.role === "Founder" || member.role === "Co-Founder")

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

interface FounderSectionProps {
  initialFounders?: any[];
}

export function FounderSection({ initialFounders }: FounderSectionProps = {}) {
  const founders = initialFounders && initialFounders.length > 0 ? initialFounders : defaultFounders;

  return (
    <section className="py-20 md:py-24 bg-slate-50/40 dark:bg-slate-950/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 bg-background/50 border-primary/30">
            Meet the Team
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Founder-Led, Not Outsourced
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            People hire people. Here's who you'll actually collaborate with — direct access to founders without account managers or filtered requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((member, index) => (
            <Card key={index} className="text-center p-8 glass-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-0 flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20 overflow-hidden">
                  <AvatarImage className="object-cover w-full h-full" src={member.image} alt={member.name} />
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                <Badge variant="secondary" className="mb-5 text-xs px-3 py-1">
                  {member.role === "Co-Founder" ? "2+" : "3+"} Years Engineering Experience
                </Badge>
                <div className="flex items-center gap-3">
                  <Button asChild size="sm" variant="outline" className="rounded-full px-4">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2 text-[#0A66C2]" />
                      LinkedIn
                    </a>
                  </Button>
                  {member.github && (
                    <Button asChild size="sm" variant="outline" className="rounded-full px-4">
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
