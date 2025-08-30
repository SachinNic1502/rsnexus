"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GitHubGlobe = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const rotateX = (mousePosition.y / 400) * 20;
  const rotateY = (mousePosition.x / 400) * 20;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[400px] w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Globe Sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm" />
        
        {/* Grid Lines */}
        <div className="absolute inset-0 rounded-full">
          {/* Vertical lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`vertical-${i}`}
              className="absolute top-0 bottom-0 w-px bg-white/10"
              style={{
                left: `${(i / 12) * 100}%`,
                transform: `rotateY(${(i / 12) * 360}deg)`,
              }}
            />
          ))}
          
          {/* Horizontal lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`horizontal-${i}`}
              className="absolute left-0 right-0 h-px bg-white/10"
              style={{
                top: `${(i / 6) * 100}%`,
                transform: `rotateX(${(i / 6) * 180 - 90}deg)`,
              }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* GitHub-like dots representing contributions */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">RSNexus</div>
            <div className="text-sm opacity-80">Global Software Solutions</div>
            {children}
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />
      </motion.div>
    </div>
  );
};

export default GitHubGlobe; 