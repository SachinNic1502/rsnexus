import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import TestimonialData from "@/data/testimonial.json";
import { Badge } from "@/components/ui/badge";

export function Testimonial() {
  const testimonials = TestimonialData.map((item) => ({
    src: item.src,
    name: item.name,
    designation: item.designation,
    quote: item.quote,
  }));

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 text-sm md:text-base">
            Client Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Our Clients Love Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our clients across the globe have transformed their businesses with our 
            innovative software solutions and dedicated support.
          </p>
        </div>

        {/* Testimonials */}
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
