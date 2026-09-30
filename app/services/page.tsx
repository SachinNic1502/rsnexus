import type { Metadata } from "next";
import { ServiceCard } from "@/components/service-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceIcon } from "@/lib/services";
import { getServicesData } from "@/lib/data-fetchers";

export const metadata: Metadata = {
  title: "Software Engineering & Development Services | RSNexus",
  description:
    "Comprehensive end-to-end software development services including web apps, mobile apps, SaaS systems, AI integrations, and cloud infrastructure.",
  alternates: {
    canonical: "https://rsnexus.in/services",
  },
};

export default async function ServicesPage() {
  const services = await getServicesData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Comprehensive Software Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to deployment, we provide end-to-end software development services tailored to your business
            needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service: any) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <div key={service.id || service.serviceId} id={service.id || service.serviceId} className="scroll-mt-24">
                <ServiceCard service={{ ...service, icon: Icon }} />
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can help bring your ideas to life with our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-md">
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">
                  View Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
