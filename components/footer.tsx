"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Mail, Phone, MapPin, Instagram, Facebook, Github, Linkedin, Twitter, Lock } from "lucide-react"
import { siteConfig } from "@/config/site"

const socialIcons = [
  { name: "GitHub", href: siteConfig.social.github, icon: Github },
  { name: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
  { name: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
  { name: "Facebook", href: siteConfig.social.facebook, icon: Facebook },
  { name: "Twitter", href: siteConfig.social.twitter, icon: Twitter },
].filter((s) => Boolean(s.href));

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Do not render public website footer within the dedicated administrative portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src={siteConfig.logoSecondary}
                alt={siteConfig.name}
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold text-white">{siteConfig.name}</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed text-sm">
              {siteConfig.description}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.contact.address.display}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Quick Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact & Support</h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-800/60">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} {siteConfig.legalName}. All rights reserved.
          </p>

          <div className="flex space-x-5 mt-4 md:mt-0">
            {socialIcons.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-primary transition-colors p-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}