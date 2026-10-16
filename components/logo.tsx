"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export type LogoVariant = "full" | "horizontal" | "vertical" | "mark" | "icon" | "badge" | "square";
export type LogoTheme = "auto" | "dark" | "light" | "gold";
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface LogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  withSubtext?: boolean;
  subtext?: string;
  asLink?: boolean;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

const SIZE_MAP = {
  xs: { img: 24, text: "text-base", sub: "text-[8px] tracking-[0.18em]" },
  sm: { img: 34, text: "text-xl sm:text-2xl", sub: "text-[9px] tracking-[0.2em]" },
  md: { img: 44, text: "text-2xl sm:text-3xl", sub: "text-[10px] tracking-[0.22em]" },
  lg: { img: 64, text: "text-4xl sm:text-5xl", sub: "text-xs tracking-[0.25em]" },
  xl: { img: 96, text: "text-5xl sm:text-6xl", sub: "text-sm tracking-[0.28em]" },
};

export function Logo({
  variant = "full",
  theme = "auto",
  size = "sm",
  withSubtext = true,
  subtext = "SOFTWARE STUDIO",
  asLink = true,
  className = "",
  priority = false,
  onClick,
}: LogoProps) {
  const sizeConfig = SIZE_MAP[size] || SIZE_MAP.sm;

  // Resolve image source based on variant & theme
  let imgSrc: string = siteConfig.logos.gold || siteConfig.logos.mark || "/images/logo/logo-gold.png";
  if (variant === "square") {
    imgSrc = siteConfig.logos.markSquare || "/images/logo/logo-mark-square.png";
  } else if (variant === "badge") {
    imgSrc = siteConfig.logos.markCircle || "/images/logo/logo-mark-circle.png";
  } else if (theme === "gold") {
    imgSrc = siteConfig.logos.gold || "/images/logo/logo-gold.png";
  }

  // Text colors based on theme
  let primaryTextColor = "text-foreground group-hover:text-amber-500 transition-colors";
  let nexusTextColor = "text-amber-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-amber-400 dark:to-amber-200";
  let subtextColor = "text-muted-foreground/80";

  if (theme === "dark") {
    primaryTextColor = "text-white group-hover:text-amber-400 transition-colors";
    nexusTextColor = "bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent";
    subtextColor = "text-slate-400";
  } else if (theme === "light") {
    primaryTextColor = "text-slate-900 group-hover:text-amber-600 transition-colors";
    nexusTextColor = "text-amber-600";
    subtextColor = "text-slate-500";
  } else if (theme === "gold") {
    primaryTextColor = "text-amber-400";
    nexusTextColor = "text-amber-300";
    subtextColor = "text-amber-600/80";
  }

  const markElement = (
    <div className="relative shrink-0">
      <Image
        src={imgSrc}
        alt={siteConfig.name}
        width={sizeConfig.img}
        height={sizeConfig.img}
        priority={priority}
        className="object-contain group-hover:scale-105 transition-transform drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)] rounded-md"
        style={{ width: sizeConfig.img, height: sizeConfig.img }}
      />
      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 group-hover:animate-ping" />
    </div>
  );

  // Standalone Mark / Icon / Square / Badge
  if (variant === "mark" || variant === "icon" || variant === "badge" || variant === "square") {
    if (asLink) {
      return (
        <Link
          href="/"
          onClick={onClick}
          className={`inline-flex items-center group focus:outline-none ${className}`}
          aria-label={`${siteConfig.name} Home`}
        >
          {markElement}
        </Link>
      );
    }
    return <div className={`inline-flex items-center group ${className}`}>{markElement}</div>;
  }

  const HORIZONTAL_SIZE_MAP: Record<LogoSize, string> = {
    xs: "h-7 sm:h-8",
    sm: "h-9 sm:h-10 md:h-11",
    md: "h-12 sm:h-14 md:h-16",
    lg: "h-16 sm:h-18 md:h-20",
    xl: "h-20 sm:h-24 md:h-28",
  };

  // Horizontal Brand Logo Lockup (Seamless Light & Dark Mode)
  if (variant === "horizontal") {
    const heightClass = HORIZONTAL_SIZE_MAP[size] || HORIZONTAL_SIZE_MAP.sm;

    const horizontalContent = (
      <div className={`relative inline-flex items-center group ${className}`}>
        {/* Light mode logo (shown on light backgrounds) */}
        <Image
          src="/images/logo/logo-horizontal-light.png"
          alt={`${siteConfig.name} - Software Studio`}
          width={280}
          height={75}
          priority={priority}
          className={`${heightClass} w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
            theme === "auto" ? "block dark:hidden" : theme === "light" ? "block" : "hidden"
          }`}
        />
        {/* Dark mode logo (shown on dark backgrounds) */}
        <Image
          src="/images/logo/logo-horizontal-dark.png"
          alt={`${siteConfig.name} - Software Studio`}
          width={280}
          height={75}
          priority={priority}
          className={`${heightClass} w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)] ${
            theme === "auto" ? "hidden dark:block" : theme === "dark" ? "block" : "hidden"
          }`}
        />
      </div>
    );

    if (asLink) {
      return (
        <Link href="/" onClick={onClick} className="inline-flex items-center focus:outline-none" aria-label={siteConfig.name}>
          {horizontalContent}
        </Link>
      );
    }
    return horizontalContent;
  }

  // Vertical / Stacked Brand Logo Lockup
  if (variant === "vertical") {
    const verticalContent = (
      <div className={`relative inline-flex flex-col items-center group ${className}`}>
        {/* Light mode vertical */}
        <Image
          src="/images/logo/logo-vertical-light.png"
          alt={`${siteConfig.name} - Software Studio`}
          width={180}
          height={180}
          priority={priority}
          className={`h-24 sm:h-28 w-auto object-contain group-hover:scale-105 transition-all duration-300 rounded-lg ${
            theme === "auto" ? "block dark:hidden" : theme === "light" ? "block" : "hidden"
          }`}
        />
        {/* Dark mode vertical */}
        <Image
          src="/images/logo/logo-vertical-dark.png"
          alt={`${siteConfig.name} - Software Studio`}
          width={180}
          height={180}
          priority={priority}
          className={`h-24 sm:h-28 w-auto object-contain group-hover:scale-105 transition-all duration-300 drop-shadow-[0_4px_16px_rgba(245,158,11,0.25)] rounded-lg ${
            theme === "auto" ? "hidden dark:block" : theme === "dark" ? "block" : "hidden"
          }`}
        />
      </div>
    );

    if (asLink) {
      return (
        <Link href="/" onClick={onClick} className="inline-block focus:outline-none" aria-label={siteConfig.name}>
          {verticalContent}
        </Link>
      );
    }
    return verticalContent;
  }

  // Full / Horizontal Lockup (Default)
  const fullContent = (
    <div className={`flex items-center space-x-3 group ${className}`}>
      {markElement}
      <div className="flex flex-col">
        <span className={`font-serif font-black tracking-tight leading-none ${sizeConfig.text} ${primaryTextColor}`}>
          RS<span className={nexusTextColor}>Nexus</span>
        </span>
        {withSubtext && (
          <span className={`font-serif font-bold uppercase ${sizeConfig.sub} ${subtextColor} mt-1`}>
            {subtext}
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" onClick={onClick} className="inline-flex items-center focus:outline-none" aria-label={siteConfig.name}>
        {fullContent}
      </Link>
    );
  }

  return fullContent;
}

export default Logo;
