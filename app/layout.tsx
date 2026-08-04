import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rsnexus.in"),
  title: {
    default: "RSNexus - Leading Software Development Company in India",
    template: "%s | RSNexus",
  },
  description:
    "RSNexus is a premier software development company in India, offering expert web development, mobile apps, AI solutions, and cloud services in Mumbai, Delhi, Bangalore, and globally.",
  keywords: [
  // Brand
  "RSNexus",
  "RS Nexus",
  "rsnexus.in",
  "rsnexus",
  "RSNexus software company",
  "RSNexus web development",
  "RSNexus app development",

  // Software Development
  "software development company",
  "software development services",
  "custom software development",
  "enterprise software development",
  "software development agency",
  "software development outsourcing",
  "software development firm",
  "software solutions company",
  "software consulting services",

  // Web Development
  "web development company",
  "website development company",
  "custom website development",
  "business website development",
  "responsive website development",
  "Next.js development company",
  "React development company",
  "frontend development services",
  "backend development services",
  "full stack development company",

  // Mobile Apps
  "mobile app development company",
  "Android app development",
  "iOS app development",
  "Flutter app development",
  "React Native app development",
  "cross platform app development",
  "mobile application development",

  // AI
  "AI development company",
  "artificial intelligence solutions",
  "AI automation services",
  "AI chatbot development",
  "OpenAI integration",
  "ChatGPT integration",
  "Generative AI development",
  "machine learning development",
  "AI software company",

  // SaaS
  "SaaS development company",
  "SaaS application development",
  "cloud SaaS solutions",
  "multi tenant SaaS",
  "B2B SaaS development",

  // Cloud
  "cloud application development",
  "cloud migration services",
  "AWS development company",
  "Azure development company",
  "Google Cloud development",
  "cloud consulting services",

  // UI UX
  "UI UX design company",
  "website redesign services",
  "modern website design",
  "web UI design",
  "dashboard design",
  "mobile UI UX",

  // Digital
  "digital transformation company",
  "IT consulting company",
  "technology solutions company",
  "digital solutions company",

  // SEO & Marketing
  "SEO services",
  "digital marketing company",
  "search engine optimization",
  "local SEO services",

  // E-commerce
  "ecommerce website development",
  "Shopify development",
  "WooCommerce development",
  "online store development",

  // Industries
  "hospital management software",
  "clinic management software",
  "healthcare software development",
  "CRM software development",
  "ERP software development",
  "school management software",
  "inventory management software",
  "real estate software",
  "hotel management software",

  // India
  "software development company India",
  "web development company India",
  "mobile app development India",
  "AI development India",
  "IT company India",
  "software outsourcing India",

  // USA
  "software development company USA",
  "web development company USA",
  "mobile app development USA",
  "AI development USA",
  "software outsourcing USA",

  // United Kingdom
  "software development company UK",
  "web development company UK",
  "mobile app development UK",
  "AI development UK",

  // Canada
  "software development company Canada",
  "web development company Canada",
  "mobile app development Canada",

  // Australia
  "software development company Australia",
  "web development company Australia",
  "mobile app development Australia",

  // UAE
  "software development company Dubai",
  "web development company Dubai",
  "mobile app development Dubai",
  "AI development Dubai",

  // Singapore
  "software development company Singapore",
  "web development Singapore",
  "mobile app development Singapore",

  // Germany
  "software development company Germany",
  "web development Germany",

  // France
  "software development company France",

  // Netherlands
  "software development company Netherlands",

  // Saudi Arabia
  "software development company Saudi Arabia",

  // Qatar
  "software development company Qatar",

  // New Zealand
  "software development company New Zealand",

  // Popular Cities
  "software development New York",
  "software development London",
  "software development Toronto",
  "software development Sydney",
  "software development Dubai",
  "software development Singapore",
  "software development Berlin",
  "software development Paris",
  "software development San Francisco",
  "software development Los Angeles",

  // Hiring
  "hire software developers",
  "hire web developers",
  "hire app developers",
  "hire React developers",
  "hire Next.js developers",
  "hire Flutter developers",
  "hire AI developers",
  "dedicated development team",
  "remote software developers",

  // Long-tail Keywords
  "best software development company",
  "top software development company",
  "affordable software development company",
  "custom software development services",
  "enterprise web application development",
  "AI software development company",
  "web application development company",
  "business software solutions",
  "digital product development",
  "startup software development company",
  "software company for startups",
  "custom CRM development",
  "ERP software development company",
  "cloud based software development",
  "website design and development company",
  "full service software company",
],
  authors: [{ name: "RSNexus Team", url: "https://rsnexus.in" }],
  creator: "RSNexus",
  publisher: "RSNexus",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rsnexus.in",
  },
  openGraph: {
    title: "RSNexus - Software Development Experts in India",
    description:
      "Discover top-tier software solutions with RSNexus, specializing in web, mobile, AI, and cloud services across India and beyond.",
    url: "https://rsnexus.in",
    siteName: "RSNexus",
    images: [
      {
        url :"https://res.cloudinary.com/dl2xsc49w/image/upload/v1758306621/baby_logo_e55lkq.png",
        width: 512,
        height: 512,
        alt: "RSNexus Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RSNexus - Software Development Company in India",
    description:
      "Expert software solutions by RSNexus, including web development, mobile apps, AI, and cloud services in Mumbai, Delhi, and Bangalore.",
    images: ["https://res.cloudinary.com/dl2xsc49w/image/upload/v1758306621/baby_logo_e55lkq.png"],
    creator: "@RSNexus",
  },
  verification: {
    google: "googleca875dd608b6a676",
  },
  icons: {
    icon: "https://res.cloudinary.com/dl2xsc49w/image/upload/v1758306621/baby_logo_e55lkq.png",
    apple: "https://res.cloudinary.com/dl2xsc49w/image/upload/v1758306621/baby_logo_e55lkq.png",
    shortcut: "https://res.cloudinary.com/dl2xsc49w/image/upload/v1758306621/baby_logo_e55lkq.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "RSNexus",
      url: "https://rsnexus.in",
      inLanguage: "en",
      publisher: {
        "@type": "Organization",
        name: "RSNexus",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "RSNexus",
      url: "https://rsnexus.in",
      logo: "https://res.cloudinary.com/dl2xsc49w/image/upload/v1758306621/baby_logo_e55lkq.png",
      sameAs: [
        "https://www.linkedin.com/company/rsnexus",
        "https://twitter.com/RSNexus",
        "https://www.facebook.com/RSNexus",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9309931886",
        contactType: "customer support",
        email: "sachinrathodnic1@gmail.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400001",
        addressCountry: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rsnexus.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://rsnexus.in/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Contact",
          item: "https://rsnexus.in/contact",
        },
      ],
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="dark light" />
        <link rel="dns-prefetch" href="https://rsnexus.in" />
        <link rel="preconnect" href="https://rsnexus.in" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="googleca875dd608b6a676"></meta>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="shortcut icon" href="https://res.cloudinary.com/dl2xsc49w/image/upload/v1758306621/baby_logo_e55lkq.png" type="image/x-icon" />
        
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Analytics />
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

