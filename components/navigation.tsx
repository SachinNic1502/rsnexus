"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Users,
  Briefcase,
  BookOpen,
  HelpCircle,
  Mail,
  Compass,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

const primaryNav = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

const secondaryNav = [
  { name: "Our Team", href: "/team", description: "Founders & engineers", icon: Users },
  { name: "Careers", href: "/careers", description: "Join our software team", icon: Briefcase },
  { name: "Engineering Blog", href: "/blog", description: "Articles & technical guides", icon: BookOpen },
  { name: "FAQ", href: "/faq", description: "Common questions & answers", icon: HelpCircle },
  { name: "Contact", href: "/contact", description: "Get in touch with our team", icon: Mail },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/contact");
  };

  // Do not render public website navigation within the dedicated administrative portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isCompanyActive = secondaryNav.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75 transition-all">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo & Classical Brand */}
          <div className="flex items-center">
            <Logo variant="horizontal" size="sm" priority />
          </div>

          {/* Desktop Navigation (Optimized 4 Primary + 1 Dropdown) */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {primaryNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-2 rounded-lg font-serif text-xs uppercase tracking-wider transition-all relative",
                      isActive
                        ? "text-foreground font-bold bg-secondary/80 dark:bg-slate-900 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-amber-500 rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* Company Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "px-3.5 py-2 rounded-lg font-serif text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5 focus:outline-none",
                      isCompanyActive
                        ? "text-foreground font-bold bg-secondary/80 dark:bg-slate-900 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    )}
                  >
                    <span>Company</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 p-2 bg-background/95 dark:bg-slate-900/95 backdrop-blur-xl border border-amber-500/20 shadow-2xl rounded-2xl"
                >
                  <div className="px-3 py-1.5 mb-1 border-b border-border/50">
                    <span className="font-serif text-[10px] uppercase tracking-widest text-amber-500 font-bold">
                      COMPANY & RESOURCES
                    </span>
                  </div>
                  {secondaryNav.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    const SubIcon = subItem.icon;
                    return (
                      <DropdownMenuItem key={subItem.name} asChild className="p-0 rounded-xl focus:bg-amber-500/10">
                        <Link
                          href={subItem.href}
                          className={cn(
                            "flex items-start gap-3 w-full p-2.5 rounded-xl transition-colors",
                            isSubActive ? "bg-amber-500/10 text-amber-500" : "text-foreground"
                          )}
                        >
                          <div className="p-1.5 rounded-lg bg-secondary/80 border border-border mt-0.5">
                            <SubIcon className="w-3.5 h-3.5 text-amber-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-serif text-xs font-bold leading-tight">{subItem.name}</span>
                            <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                              {subItem.description}
                            </span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Action & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            <Button
              onClick={handleGetStarted}
              className="font-serif text-xs uppercase tracking-wider px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-md rounded-xl group border-0"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="rounded-xl border border-border"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/80 py-4 px-2 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Primary Section */}
            <div className="space-y-1">
              <span className="text-[10px] font-serif uppercase tracking-widest text-muted-foreground px-3 mb-1 block">
                MAIN MENU
              </span>
              {primaryNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3.5 py-2 rounded-xl font-serif text-sm tracking-wide transition-colors",
                      isActive
                        ? "text-amber-500 font-bold bg-amber-500/10 border border-amber-500/30"
                        : "text-foreground hover:bg-secondary/60"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Company Section */}
            <div className="space-y-1 pt-2 border-t border-border/60">
              <span className="text-[10px] font-serif uppercase tracking-widest text-amber-500 font-bold px-3 mb-1 block">
                COMPANY
              </span>
              {secondaryNav.map((item) => {
                const isActive = pathname === item.href;
                const SubIcon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-serif text-sm tracking-wide transition-colors",
                      isActive
                        ? "text-amber-500 font-bold bg-amber-500/10 border border-amber-500/30"
                        : "text-foreground hover:bg-secondary/60"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <SubIcon className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Start Project CTA Button */}
            <div className="pt-2">
              <Button
                className="w-full font-serif text-xs uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white py-3 rounded-xl shadow-lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGetStarted();
                }}
              >
                <span>Start Project</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navigation;
