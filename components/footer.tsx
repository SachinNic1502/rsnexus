"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Instagram, Facebook, Github, Linkedin, Twitter, Lock, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/logo";

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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle classical ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Company Info & Classical Insignia */}
          <div className="lg:col-span-2">
            <Logo variant="horizontal" size="md" theme="dark" className="mb-5" />

            <p className="text-slate-400 mb-6 max-w-md leading-relaxed text-sm font-sans">
              {siteConfig.description}
            </p>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="h-4 w-4 text-amber-500" />
                </div>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-amber-400 transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="h-4 w-4 text-amber-500" />
                </div>
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-amber-400 transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="h-4 w-4 text-amber-500" />
                </div>
                <span>{siteConfig.contact.address.display}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-amber-400 font-bold mb-4 text-xs uppercase tracking-widest">
              Our Services
            </h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-amber-300 transition-colors text-sm text-slate-400">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif text-amber-400 font-bold mb-4 text-xs uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-amber-300 transition-colors text-sm text-slate-400">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Quick Contact */}
          <div>
            <h3 className="font-serif text-amber-400 font-bold mb-4 text-xs uppercase tracking-widest">
              Support & Help
            </h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="hover:text-amber-300 transition-colors text-sm text-slate-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-800/80">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Classical Bottom Row */}
        <div className="border-t border-slate-800/80 mt-14 pt-8 flex flex-col lg:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <p className="font-serif tracking-wider">
              © {currentYear} {siteConfig.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
              <span>•</span>
              <Link href="/security" className="hover:text-amber-400 transition-colors">Security</Link>
              <span>•</span>
              <Link href="/track" className="hover:text-amber-400 transition-colors">Track Project</Link>
            </div>
          </div>

          <div className="flex space-x-2.5">
            {socialIcons.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all flex items-center justify-center group shadow-sm hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;