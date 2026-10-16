"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderGit2,
  FileText,
  Inbox,
  Sparkles,
  Database,
  ExternalLink,
  Layers,
  HelpCircle,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Careers & Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Applications", href: "/admin/applications", icon: Inbox },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Portfolio Projects", href: "/admin/portfolio", icon: FolderGit2 },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Leads & Inquiries", href: "/admin/inquiries", icon: Sparkles },
  { label: "Data Seeder Tool", href: "/admin/seed", icon: Database },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div>
        {/* Header / Brand */}
        <div className="flex items-center space-x-3 mb-6 px-2 pb-4 border-b border-slate-800/80">
          <div className="relative">
            <Image
              src={siteConfig.logoSecondary}
              alt={siteConfig.name}
              width={34}
              height={34}
              className="h-8 w-8 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
            />
            <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <span className="font-bold text-base text-white block leading-tight tracking-wide">
              {siteConfig.name}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              <span className="text-[11px] text-cyan-400 font-mono uppercase tracking-wider font-semibold">
                Studio Console
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary/25 to-cyan-500/10 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-primary/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                )}
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]" : "text-slate-400 group-hover:text-primary"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls & telemetry */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            DB Cluster
          </span>
          <span className="text-emerald-400 font-semibold">Online</span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            Live Platform
          </span>
          <span className="text-[10px] text-slate-500 font-mono">↗</span>
        </Link>
        <AdminLogoutButton />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shrink-0">
        <div className="flex items-center space-x-2.5">
          <Image
            src={siteConfig.logoSecondary}
            alt={siteConfig.name}
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="font-bold text-sm text-white tracking-wide">
            Studio Console
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 focus:outline-none"
          aria-label="Toggle navigation drawer"
        >
          {mobileOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] bg-slate-900 border-r border-slate-800 p-5 z-50 md:hidden overflow-y-auto overscroll-y-contain admin-scrollbar transition-transform duration-300 ease-in-out shadow-2xl flex flex-col justify-between",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1 text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:h-full bg-slate-900/95 border-r border-slate-800/80 p-5 flex-col justify-between shrink-0 shadow-xl backdrop-blur-xl overflow-y-auto overscroll-y-contain admin-scrollbar z-20">
        {sidebarContent}
      </aside>
    </>
  );
}
