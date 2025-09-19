import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "RSNexus - Leading Software Development Company in India",
    template: "%s | RSNexus",
  },
  description:
    "RSNexus is a premier software development company in India, offering expert web development, mobile apps, AI solutions, and cloud services in Mumbai, Delhi, Bangalore, and globally.",
  keywords: [
    "software development India",
    "web development Mumbai",
    "mobile app development Delhi",
    "AI solutions Bangalore",
    "cloud services India",
    "custom software development",
    "RSNexus",
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
        <meta name="color-scheme" content="light dark" />
        <link rel="dns-prefetch" href="https://rsnexus.in" />
        <link rel="preconnect" href="https://rsnexus.in" crossOrigin="anonymous" />
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
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
