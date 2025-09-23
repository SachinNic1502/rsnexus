"use client";

import { GitHubGlobe } from "@/components/github-globe";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, Code2, TrendingUp } from "lucide-react";
import { GlobeDemo } from "./ui/GlobeDemo";

const globalStats = [
  {
    icon: Globe,
    number: "50+",
    label: "Countries Served",
    description: "Global presence across continents"
  },
  {
    icon: Users,
    number: "200+",
    label: "Happy Clients",
    description: "From startups to enterprises"
  },
  {
    icon: Code2,
    number: "500+",
    label: "Projects Delivered",
    description: "Successful implementations worldwide"
  },
  {
    icon: TrendingUp,
    number: "95%",
    label: "Success Rate",
    description: "Consistently high client satisfaction"
  }
];

export function GlobeShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Global Presence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Serving the World from India
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We deliver world-class software solutions across the globe, combining international standards with India’s renowned technology expertise.
          </p>

        </div>

        {/* Globe and Stats Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Globe Section */}
          <div className="flex justify-center">
            <div className="relative">

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Global Impact</h3>
             <p className="text-muted-foreground mb-8">
  We work entirely remotely, connecting with clients worldwide and delivering innovative solutions powered by India’s technology expertise.
</p>

            </div>

            <div className="grid grid-cols-2 gap-6">
              {globalStats.map((stat, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{stat.number}</div>
                        <div className="text-sm font-medium">{stat.label}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Global Offices */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Strategic Global Presence</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-blue-500" />
                </div>
                <h4 className="font-semibold mb-2">Asia Pacific</h4>
                <p className="text-sm text-muted-foreground">
                  Serving clients across India, Singapore, Australia, and Japan with localized solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-green-500" />
                </div>
                <h4 className="font-semibold mb-2">North America</h4>
                <p className="text-sm text-muted-foreground">
                  Partnering with US and Canadian businesses for innovative digital transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-purple-500" />
                </div>
                <h4 className="font-semibold mb-2">Europe & UK</h4>
                <p className="text-sm text-muted-foreground">
                  Delivering enterprise solutions to European markets with GDPR compliance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobeShowcase; 