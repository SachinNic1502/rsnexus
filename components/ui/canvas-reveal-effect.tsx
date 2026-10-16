"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface CanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}

export const CanvasRevealEffect = ({
  animationSpeed = 1.2,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[56, 189, 248]],
  containerClassName,
  dotSize = 2.5,
  showGradient = true,
}: CanvasRevealEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      if (!canvas || !ctx || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      time += 0.016 * animationSpeed;

      const spacing = 14;
      const cols = Math.floor(w / spacing);
      const rows = Math.floor(h / spacing);

      const colorPalette = colors.length > 0 ? colors : [[56, 189, 248]];

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * spacing + (spacing / 2);
          const y = r * spacing + (spacing / 2);

          // Calculate wave or cursor proximity
          let factor = 0;
          if (mousePos) {
            const dx = x - mousePos.x;
            const dy = y - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            factor = Math.max(0, 1 - dist / 180);
          } else {
            // Ambient wave
            const wave = Math.sin(x * 0.02 + y * 0.02 + time * 2);
            factor = (wave + 1) / 2;
          }

          // Pseudo-random opacity index
          const noise = Math.sin(c * 12.9898 + r * 78.233 + time) * 43758.5453;
          const randomVal = Math.abs(noise - Math.floor(noise));
          const opacityIndex = Math.floor(randomVal * opacities.length);
          const baseOpacity = opacities[opacityIndex] || 0.4;
          const currentOpacity = Math.min(1, baseOpacity * (0.4 + factor * 0.6));

          // Color cycling from palette
          const colorIdx = (c + r) % colorPalette.length;
          const [cr, cg, cb] = colorPalette[colorIdx];

          const radius = (dotSize / 2) * (0.8 + factor * 0.8);

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${currentOpacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationSpeed, colors, dotSize, mousePos, opacities]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("h-full relative bg-slate-950 w-full overflow-hidden", containerClassName)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default CanvasRevealEffect;
