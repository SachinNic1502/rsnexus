import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, ArrowRight, CheckCircle2, Shield, Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Assets & Logo System | RSNexus",
  description:
    "Official brand assets, vector logos, app icons, and identity guidelines for RSNexus Software Studio.",
  alternates: {
    canonical: "https://rsnexus.in/brand",
  },
};

const LOGO_TYPES = [
  {
    id: "horizontal-dark",
    name: "Primary Lockup (Dark Mode)",
    category: "Horizontal",
    desc: "Main brand lockup for dark backgrounds, headers, and media.",
    previewBg: "bg-slate-950",
    pngUrl: "/images/logo/logo-horizontal-dark.png",
    svgUrl: "/images/logo/logo-horizontal-dark.svg",
    resolution: "1200 × 340 px",
  },
  {
    id: "horizontal-light",
    name: "Primary Lockup (Light Mode)",
    category: "Horizontal",
    desc: "For clean light surfaces, documentation, invoices, and letterheads.",
    previewBg: "bg-slate-100",
    pngUrl: "/images/logo/logo-horizontal-light.png",
    svgUrl: "/images/logo/logo-horizontal-light.svg",
    resolution: "1200 × 340 px",
  },
  {
    id: "mark-circle",
    name: "3D Isometric Mark (Circle Badge)",
    category: "Logomark",
    desc: "Standalone 3D metallic RS emblem on circular dark navy disc.",
    previewBg: "bg-slate-900/60",
    pngUrl: "/images/logo/logo-mark-circle.png",
    svgUrl: "/images/logo/logo-mark.svg",
    resolution: "512 × 512 px",
    isSquareAspect: true,
  },
  {
    id: "mark-square",
    name: "Mobile & OS App Icon (Squircle)",
    category: "App Icon",
    desc: "High-resolution rounded app squircle for iOS, Android, and macOS.",
    previewBg: "bg-slate-900/60",
    pngUrl: "/images/logo/logo-mark-square.png",
    svgUrl: "/images/logo/logo-mark.svg",
    resolution: "512 × 512 px",
    isSquareAspect: true,
  },
  {
    id: "vertical-dark",
    name: "Stacked Lockup (Dark)",
    category: "Vertical",
    desc: "Centered vertical layout for posters, splash screens, and cards.",
    previewBg: "bg-slate-950",
    pngUrl: "/images/logo/logo-vertical-dark.png",
    svgUrl: "/images/logo/logo-vertical-dark.svg",
    resolution: "800 × 800 px",
    isSquareAspect: true,
  },
  {
    id: "vertical-light",
    name: "Stacked Lockup (Light)",
    category: "Vertical",
    desc: "Centered vertical layout for white & light backgrounds.",
    previewBg: "bg-slate-100",
    pngUrl: "/images/logo/logo-vertical-light.png",
    svgUrl: "/images/logo/logo-vertical-light.svg",
    resolution: "800 × 800 px",
    isSquareAspect: true,
  },
  {
    id: "gold-edition",
    name: "Luxury Gold Edition Mark",
    category: "Special",
    desc: "Warm amber & gold metallic edition matching classical branding.",
    previewBg: "bg-slate-950",
    pngUrl: "/images/logo/logo-gold.png",
    svgUrl: "/images/logo/logo-mark-gold.svg",
    resolution: "512 × 512 px",
    isSquareAspect: true,
  },
  {
    id: "monochrome",
    name: "Monochrome Silhouettes (White & Black)",
    category: "Monochrome",
    desc: "Pure black and white silhouettes for single-color print & stamps.",
    previewBg: "bg-slate-900/40",
    pngUrl: "/images/logo/logo-monochrome-white.png",
    svgUrl: "/images/logo/logo-mark-white.svg",
    resolution: "512 × 512 px",
    isSquareAspect: true,
  },
  {
    id: "og-social",
    name: "Social Share & OpenGraph Banner",
    category: "Social",
    desc: "Official 1200x630 preview card for Twitter, LinkedIn, and WhatsApp shares.",
    previewBg: "bg-slate-950",
    pngUrl: "/images/logo/og-image.png",
    svgUrl: "",
    resolution: "1200 × 630 px",
  },
];

const BRAND_COLORS = [
  { name: "Sapphire Royal", hex: "#0284c7", rgb: "2, 132, 199", use: "Primary Brand / Top Arch" },
  { name: "Electric Cyan", hex: "#00f2fe", rgb: "0, 242, 254", use: "Accent Glow / Bottom Chevron" },
  { name: "Classical Amber", hex: "#f59e0b", rgb: "245, 158, 11", use: "Brand Accent & Gold Highlights" },
  { name: "Midnight Navy", hex: "#060f22", rgb: "6, 15, 34", use: "Deep Background Canvas" },
  { name: "Clean Slate", hex: "#0f172a", rgb: "15, 23, 42", use: "Light Mode Typography" },
];

export default function BrandAssetsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground py-16 md:py-24 relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-[-5%] w-[450px] h-[450px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80 font-bold">
              OFFICIAL BRAND ASSETS • LOGO SYSTEM
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 text-foreground leading-tight">
            RSNexus <span className="text-gradient-gold">Logo System</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-sans">
            Download official, production-ready vector SVGs, high-resolution PNGs, app icons, and color palettes for all digital and print applications.
          </p>

          <div className="classical-divider max-w-xs mx-auto mt-6">
            <span className="text-amber-500 font-serif text-xs">✦ COMPLETE LOGO SUITE ✦</span>
          </div>
        </div>

        {/* Live Interactive Logo Component Demo */}
        <div className="mb-20 rounded-3xl p-8 sm:p-10 border border-amber-500/30 bg-card/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-1">
              LIVE CODE COMPONENT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Dynamic &lt;Logo /&gt; Component
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Responsive, accessible, and theme-adaptive component used across the application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center p-6 rounded-2xl bg-secondary/30 border border-border/70">
            {/* Horizontal Default */}
            <div className="p-6 rounded-xl bg-background/80 dark:bg-slate-950/80 border border-border flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-[11px] font-mono text-muted-foreground">variant="full" (default)</span>
              <Logo size="sm" asLink={false} />
            </div>

            {/* Vertical Stacked */}
            <div className="p-6 rounded-xl bg-background/80 dark:bg-slate-950/80 border border-border flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-[11px] font-mono text-muted-foreground">variant="vertical"</span>
              <Logo variant="vertical" size="sm" asLink={false} />
            </div>

            {/* App Icon Mark */}
            <div className="p-6 rounded-xl bg-background/80 dark:bg-slate-950/80 border border-border flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-[11px] font-mono text-muted-foreground">variant="square" (squircle)</span>
              <Logo variant="square" size="md" asLink={false} />
            </div>
          </div>
        </div>

        {/* All Logo Types Grid */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-border/70">
            <div>
              <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-1">
                ASSET CATALOG
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-foreground">
                All Required Logo Types
              </h2>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
              {LOGO_TYPES.length} Formats Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LOGO_TYPES.map((logo) => (
              <Card
                key={logo.id}
                className="classical-card classical-frame group rounded-3xl overflow-hidden border border-border/80 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Visual Preview Box */}
                  <div className={`relative h-56 w-full ${logo.previewBg} p-6 flex items-center justify-center overflow-hidden border-b border-border/60`}>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={logo.pngUrl}
                        alt={logo.name}
                        width={logo.isSquareAspect ? 160 : 280}
                        height={logo.isSquareAspect ? 160 : 90}
                        className="object-contain max-h-40 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      />
                    </div>
                    <Badge variant="outline" className="absolute top-3.5 right-3.5 font-mono text-[10px] bg-background/80 backdrop-blur-md">
                      {logo.category}
                    </Badge>
                  </div>

                  {/* Details */}
                  <CardContent className="p-6 pb-2">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                      {logo.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {logo.desc}
                    </p>
                    <span className="text-[11px] font-mono text-muted-foreground/80 block">
                      Dimensions: {logo.resolution}
                    </span>
                  </CardContent>
                </div>

                {/* Actions: Direct Downloads */}
                <div className="p-6 pt-3 flex items-center gap-2.5 border-t border-border/60">
                  <Button asChild size="sm" className="flex-1 font-serif text-xs rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                    <a href={logo.pngUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      PNG
                    </a>
                  </Button>
                  {logo.svgUrl && (
                    <Button asChild size="sm" variant="outline" className="flex-1 font-serif text-xs rounded-xl border-border hover:bg-secondary">
                      <a href={logo.svgUrl} download target="_blank" rel="noopener noreferrer">
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        SVG
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Brand Colors Palette */}
        <div className="mb-20 rounded-3xl p-8 sm:p-10 border border-border/80 bg-card/90 dark:bg-slate-900/90 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-amber-500" />
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Official Brand Color Palette
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BRAND_COLORS.map((col) => (
              <div key={col.hex} className="rounded-2xl border border-border/80 p-4 bg-background/60 space-y-3">
                <div className="h-16 rounded-xl w-full shadow-inner border border-white/10" style={{ backgroundColor: col.hex }} />
                <div>
                  <h4 className="font-serif text-sm font-bold text-foreground">{col.name}</h4>
                  <p className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">{col.hex}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{col.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="font-serif rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow-xl">
            <Link href="/">
              <span>Return to Main Site</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
