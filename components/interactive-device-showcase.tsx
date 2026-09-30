"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Laptop,
  Smartphone,
  Tablet,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageLightbox } from "@/components/image-lightbox";

export type DeviceType = "desktop" | "tablet" | "mobile";

interface InteractiveDeviceShowcaseProps {
  images: string[];
  title: string;
  liveUrl?: string;
  category?: string;
}

export function InteractiveDeviceShowcase({
  images,
  title,
  liveUrl,
  category,
}: InteractiveDeviceShowcaseProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [is3dEnabled, setIs3dEnabled] = useState(true);

  const total = images.length || 1;
  const currentImage = images[currentIndex] || "/placeholder.svg";

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  // Specifications based on device type
  const deviceConfigs = {
    desktop: {
      label: "MacBook Pro",
      icon: Laptop,
      resolution: "1512 × 982",
      wrapperClass: "w-full max-w-4xl",
      screenClass: "aspect-[16/10] w-full",
    },
    tablet: {
      label: "iPad Pro",
      icon: Tablet,
      resolution: "1024 × 768",
      wrapperClass: "w-full max-w-2xl",
      screenClass: "aspect-[4/3] w-full",
    },
    mobile: {
      label: "iPhone 16 Pro",
      icon: Smartphone,
      resolution: "393 × 852",
      wrapperClass: "w-full max-w-xs",
      screenClass: "aspect-[9/19.5] w-full",
    },
  };

  const currentConfig = deviceConfigs[device];

  const content = (
    <div className="relative mx-auto flex flex-col items-center select-none">
      {/* MACBOOK DESKTOP FRAME */}
      {device === "desktop" && (
        <div className="w-full flex flex-col items-center">
          {/* Laptop Lid / Screen */}
          <div className="w-full relative rounded-t-2xl bg-slate-900 border-[7px] sm:border-[10px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* macOS Browser Header Bar */}
            <div className="h-8 bg-slate-950/90 border-b border-slate-800/80 px-3 flex items-center justify-between">
              {/* Window Controls */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* Simulated Address Bar */}
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-900/90 border border-slate-800/80 text-[11px] font-mono text-slate-400 max-w-xs truncate">
                <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">
                  {liveUrl
                    ? liveUrl.replace(/^https?:\/\//, "")
                    : `rsnexus.in/showcase/${title.toLowerCase().replace(/\s+/g, "-")}`}
                </span>
              </div>

              {/* Camera Notch Dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>

            {/* Screen Display */}
            <div
              className={cn("relative overflow-hidden cursor-zoom-in group/screen", currentConfig.screenClass)}
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentIndex}-${device}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={currentImage}
                    alt={`${title} - view ${currentIndex + 1}`}
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Subtle Screen Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />

              {/* Zoom Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-white text-xs font-mono flex items-center gap-1.5 shadow-xl">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Click to Expand
                </span>
              </div>
            </div>
          </div>

          {/* Laptop Base / Keyboard Deck */}
          <div className="relative w-[106%] h-3.5 sm:h-5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-xl border-t border-slate-600 shadow-2xl flex items-center justify-center">
            {/* Center thumb notch */}
            <div className="w-16 h-1.5 bg-slate-950/80 rounded-b-md" />
          </div>
          {/* Subtle desk shadow */}
          <div className="w-[85%] h-3 bg-cyan-500/10 blur-xl rounded-full mt-1" />
        </div>
      )}

      {/* TABLET / IPAD FRAME */}
      {device === "tablet" && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full relative rounded-[28px] bg-slate-900 border-[8px] sm:border-[12px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* Tablet Camera */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-700 z-20" />

            <div
              className={cn("relative overflow-hidden cursor-zoom-in group/screen", currentConfig.screenClass)}
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentIndex}-${device}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={currentImage}
                    alt={`${title} - tablet`}
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-white text-xs font-mono flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Expand
                </span>
              </div>
            </div>
          </div>
          <div className="w-[80%] h-3 bg-cyan-500/10 blur-xl rounded-full mt-2" />
        </div>
      )}

      {/* MOBILE / IPHONE FRAME */}
      {device === "mobile" && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full relative rounded-[44px] bg-slate-950 border-[8px] sm:border-[10px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/15">
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-end pr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
            </div>

            <div
              className={cn("relative overflow-hidden cursor-zoom-in group/screen", currentConfig.screenClass)}
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentIndex}-${device}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={currentImage}
                    alt={`${title} - mobile`}
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-white text-xs font-mono flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Expand
                </span>
              </div>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-20 pointer-events-none" />
          </div>
          <div className="w-[60%] h-3 bg-cyan-500/15 blur-xl rounded-full mt-2" />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Top Device & Viewport Switcher Toolbar */}
      <div className="w-full max-w-4xl p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-xl shadow-lg flex flex-wrap items-center justify-between gap-3">
        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/70 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
          {(["desktop", "tablet", "mobile"] as DeviceType[]).map((type) => {
            const config = deviceConfigs[type];
            const Icon = config.icon;
            const active = device === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() => setDevice(type)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  active
                    ? "bg-primary text-white shadow-sm font-semibold"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Meta & 3D Tilt Toggle */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-[11px]">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {currentConfig.resolution} px
          </span>

          <button
            type="button"
            onClick={() => setIs3dEnabled(!is3dEnabled)}
            className={cn(
              "px-2.5 py-1 rounded-lg border text-[11px] transition-colors",
              is3dEnabled
                ? "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/30"
                : "bg-slate-100 dark:bg-slate-950/60 text-slate-400 border-slate-200 dark:border-slate-800"
            )}
            title="Toggle 3D perspective tilt on hover"
          >
            3D Tilt: {is3dEnabled ? "On" : "Off"}
          </button>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary dark:text-cyan-400 hover:underline text-xs font-sans font-medium"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Main Interactive Showcase Area */}
      <div className={cn("w-full flex justify-center py-4", currentConfig.wrapperClass)}>
        {is3dEnabled ? (
          <Tilt
            tiltMaxAngleX={7}
            tiltMaxAngleY={7}
            perspective={1200}
            scale={1.01}
            transitionSpeed={1200}
            gyroscope={true}
            className="w-full flex justify-center"
          >
            {content}
          </Tilt>
        ) : (
          content
        )}
      </div>

      {/* Gallery Carousel & Navigation Bar */}
      {total > 1 && (
        <div className="w-full max-w-4xl flex items-center justify-between gap-4 pt-2">
          {/* Previous / Next Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous slide"
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-400 shadow-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400">
              {currentIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next slide"
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-400 shadow-sm transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Preview Strip */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-[65%]">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "relative w-14 h-9 rounded-lg overflow-hidden border transition-all shrink-0",
                  idx === currentIndex
                    ? "border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] scale-105"
                    : "border-slate-300 dark:border-slate-800 opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Fullscreen Expand Action */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-cyan-500/50 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-400 shadow-sm transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <ImageLightbox
        images={images}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        startIndex={currentIndex}
        title={title}
      />
    </div>
  );
}
