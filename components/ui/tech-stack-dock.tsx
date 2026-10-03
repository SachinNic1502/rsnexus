"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Globe2,
  Database,
  Cloud,
  Terminal,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  category: string;
  icon: LucideIcon;
  color: string;
  badge: string;
}

const DEFAULT_TECH_STACK: TechItem[] = [
  { name: "Next.js 16", category: "Full-Stack Framework", icon: Zap, color: "#38bdf8", badge: "App Router" },
  { name: "React 19", category: "Modern UI Library", icon: Cpu, color: "#60a5fa", badge: "React Server Components" },
  { name: "TypeScript", category: "Type-Safe Architecture", icon: ShieldCheck, color: "#818cf8", badge: "Strict Mode" },
  { name: "Tailwind CSS", category: "Modern Design System", icon: Sparkles, color: "#2dd4bf", badge: "Responsive" },
  { name: "Node.js", category: "High-Throughput Backend", icon: Terminal, color: "#34d399", badge: "Async I/O" },
  { name: "MongoDB", category: "Scalable NoSQL Database", icon: Database, color: "#4ade80", badge: "Atlas Cloud" },
  { name: "AWS & Cloud", category: "Edge Infrastructure", icon: Cloud, color: "#fb923c", badge: "Serverless" },
  { name: "AI Integration", category: "Autonomous Systems", icon: Layers, color: "#c084fc", badge: "Agentic AI" },
];

function TechIconCard({
  item,
  mouseX,
  onHover,
}: {
  item: TechItem;
  mouseX: any;
  onHover: (item: TechItem | null, el: HTMLElement | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = cardRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [52, 74, 52]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 });

  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.25, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 160, damping: 14 });

  const ySync = useTransform(distance, [-150, 0, 150], [0, -10, 0]);
  const y = useSpring(ySync, { mass: 0.1, stiffness: 160, damping: 14 });

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{ width, height: width, scale, y }}
      onMouseEnter={(e) => onHover(item, e.currentTarget)}
      onMouseLeave={() => onHover(null, null)}
      className="relative flex items-center justify-center rounded-2xl bg-slate-900/80 dark:bg-slate-950/80 border border-slate-800/80 hover:border-cyan-400/50 shadow-lg backdrop-blur-md cursor-pointer transition-colors duration-200 group"
    >
      {/* Subtle Glow Behind Icon */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md pointer-events-none"
        style={{ backgroundColor: item.color }}
      />
      <Icon className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" style={{ color: item.color }} />
    </motion.div>
  );
}

export function TechStackDock({
  className,
  title = "Our Core Technology Stack",
}: {
  className?: string;
  title?: string;
}) {
  const mouseX = useMotionValue(Infinity);
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = (item: TechItem | null, el: HTMLElement | null) => {
    setActiveItem(item);
    if (el && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setTooltipPos({
        x: elRect.left - containerRect.left + elRect.width / 2,
      });
    } else {
      setTooltipPos(null);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setActiveItem(null);
        setTooltipPos(null);
      }}
      className={cn("relative flex flex-col items-center justify-center py-4", className)}
    >
      {/* Gliding Magnetic Tooltip */}
      <AnimatePresence>
        {activeItem && tooltipPos && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: -48, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{ left: tooltipPos.x }}
            className="absolute top-0 -translate-x-1/2 pointer-events-none z-30 flex flex-col items-center"
          >
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl backdrop-blur-xl flex items-center gap-2">
              <span className="text-xs font-semibold text-white whitespace-nowrap">{activeItem.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-400 font-mono">
                {activeItem.badge}
              </span>
            </div>
            {/* Arrow pointer */}
            <div className="w-2 h-2 rotate-45 bg-slate-950 border-r border-b border-slate-800 -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Shelf Container */}
      <div className="w-full max-w-full overflow-x-auto no-scrollbar flex justify-center py-2 px-2">
        <div className="flex items-center gap-2 sm:gap-3.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl bg-slate-950/60 dark:bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl shrink-0">
          {DEFAULT_TECH_STACK.map((tech) => (
            <TechIconCard
              key={tech.name}
              item={tech}
              mouseX={mouseX}
              onHover={handleHover}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStackDock;
