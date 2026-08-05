"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Linkedin, Github } from "lucide-react"
import team from "@/data/team.json"

const founders = team.filter((member) => member.role === "Founder" || member.role === "Co-Founder")

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

export function FounderSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            Meet the Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Founder-Led, Not Outsourced</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            People hire people. Here's who you'll actually be working with — no account managers, no relayed
            requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((member, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4 overflow-hidden">
                  <AvatarImage className="object-cover w-full h-full" src={member.image} alt={member.name} />
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <Badge variant="secondary" className="mb-4 text-xs">
                  {member.role === "Co-Founder" ? "2+" : "3+"} Years of Development Experience
                </Badge>
                <div className="flex items-center gap-3">
                  <Button asChild size="sm" variant="outline">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  {member.github && (
                    <Button asChild size="sm" variant="outline">
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
