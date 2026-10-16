export const siteConfig = {
  name: "RSNexus",
  legalName: "RSNexus Technologies",
  domain: "rsnexus.in",
  url: "https://rsnexus.in",
  logo: "/images/logo/logo-gold.png",
  logoSecondary: "/images/logo/logo-mark-circle.png",
  logos: {
    // Logomarks
    mark: "/images/logo/logo-gold.png",
    markCircle: "/images/logo/logo-mark-circle.png",
    markSquare: "/images/logo/logo-mark-square.png",
    markSvg: "/images/logo/logo-mark.svg",
    markGoldSvg: "/images/logo/logo-mark-gold.svg",
    markWhiteSvg: "/images/logo/logo-mark-white.svg",
    markBlackSvg: "/images/logo/logo-mark-black.svg",

    // Horizontal Lockups (Icon + Typography)
    horizontalDark: "/images/logo/logo-horizontal-dark.png",
    horizontalLight: "/images/logo/logo-horizontal-light.png",
    horizontalDarkSvg: "/images/logo/logo-horizontal-dark.svg",
    horizontalLightSvg: "/images/logo/logo-horizontal-light.svg",

    // Vertical / Stacked Lockups
    verticalDark: "/images/logo/logo-vertical-dark.png",
    verticalLight: "/images/logo/logo-vertical-light.png",
    verticalDarkSvg: "/images/logo/logo-vertical-dark.svg",
    verticalLightSvg: "/images/logo/logo-vertical-light.svg",

    // Special Editions
    gold: "/images/logo/logo-gold.png",
    monochromeWhite: "/images/logo/logo-monochrome-white.png",
    monochromeBlack: "/images/logo/logo-monochrome-black.png",

    // Web App & Social Icons
    favicon: "/favicon.ico",
    faviconSvg: "/favicon.svg",
    favicon16: "/favicon-16x16.png",
    favicon32: "/favicon-32x32.png",
    appleTouchIcon: "/apple-touch-icon.png",
    android192: "/android-chrome-192x192.png",
    android512: "/android-chrome-512x512.png",
    ogImage: "/images/logo/og-image.png",

    // Cloudinary Backups
    cloudinaryMark: "https://res.cloudinary.com/dl2xsc49w/image/upload/v1758306621/baby_logo_e55lkq.png",
    cloudinaryFull: "https://res.cloudinary.com/dn7a3a8ej/image/upload/v1757102616/Logo_z7appo.png",
  },
  tagline: "Transform Ideas Into Digital Excellence",
  description:
    "RSNexus is a premier software development studio delivering high-performance web applications, mobile apps, SaaS platforms, AI integrations, and cloud solutions worldwide.",
  contact: {
    email: "sr.nexus.it@gmail.com",
    supportEmail: "sachinrathodnic1@gmail.com",
    phone: "+91 93099 31886",
    phoneRaw: "+919309931886",
    whatsappNumber: "919309931886",
    whatsappUrl: "https://wa.me/919309931886",
    address: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400001",
      display: "Mumbai, Maharashtra, India (Operating Remotely Worldwide)",
    },
    workingHours: "Mon - Sat: 9:00 AM - 8:00 PM IST",
  },
  social: {
    github: "https://github.com/SachinNic1502/rsnexus",
    linkedin: "https://www.linkedin.com/company/rsnexus",
    instagram: "https://www.instagram.com/rs.nexus/",
    facebook: "https://www.facebook.com/profile.php?id=61580499203785",
    twitter: "https://twitter.com/RSNexus",
  },
  stats: [
    {
      id: "projects",
      value: "10+",
      label: "Products Built & Deployed",
      description: "Production web applications, concept showcases, and client platforms",
      iconName: "Award",
    },
    {
      id: "experience",
      value: "3+",
      label: "Years Engineering Experience",
      description: "Deep full-stack proficiency in modern TypeScript, Next.js, and cloud systems",
      iconName: "Clock",
    },
    {
      id: "service",
      value: "100%",
      label: "Founder-Led Commitment",
      description: "Direct engineering collaboration from initial architecture to final launch",
      iconName: "Users",
    },
    {
      id: "quality",
      value: "99.9%",
      label: "Clean Code & Reliability",
      description: "Scalable architecture built for speed, security, and effortless maintenance",
      iconName: "Target",
    },
  ],
  nav: [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
  ],
  footerNav: {
    services: [
      { name: "Website Development", href: "/services#website" },
      { name: "Full Stack Development", href: "/services#fullstack" },
      { name: "Mobile App Development", href: "/services#mobile" },
      { name: "UI/UX Design", href: "/services#design" },
      { name: "Cloud Solutions", href: "/services#cloud" },
      { name: "AI & Machine Learning", href: "/services#ai" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Pricing", href: "/pricing" },
      { name: "Brand & Logos", href: "/brand" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Milestone Tracker", href: "/track" },
      { name: "Security Overview", href: "/security" },
      { name: "FAQ", href: "/faq" },
      { name: "Direct WhatsApp", href: "https://wa.me/919309931886" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security Standards", href: "/security" },
    ],
  },
  trustSignals: [
    "Founder-Led Development",
    "Modern React 19 & Next.js",
    "Transparent Milestone Delivery",
    "Free Technical Consultation",
    "Scalable Cloud Architecture",
    "Clean, Documented Code",
    "Direct WhatsApp & Slack Updates",
    "Security & SEO Best Practices",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Generate a pre-filled WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
