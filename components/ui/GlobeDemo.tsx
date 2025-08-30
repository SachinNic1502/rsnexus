"use client";

import { useEffect, useRef } from 'react';

export function GlobeDemo() {
  const globeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Main globe container */}
      <div 
        ref={globeRef}
        className="relative w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 backdrop-blur-sm border border-primary/20 overflow-hidden glow-hover"
      >
        {/* Rotating grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-spin" style={{ animationDuration: '20s' }} />
        
        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary-glow rounded-full animate-float-delay opacity-80" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-70" />
        <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-primary/50 rounded-full animate-float-delay opacity-50" />
        
        {/* Center core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/30 rounded-full animate-glow-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/60 rounded-full animate-pulse" />
      </div>

      {/* 3D Orbital rings with website development elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main orbital ring with rotating tech elements */}
        <div className="relative w-96 h-96 border border-primary/20 rounded-full animate-spin opacity-60" style={{ animationDuration: '20s' }}>
          {/* Floating tech icons on the ring */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
            JS
          </div>
          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
            ⚛
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-glow rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
            TS
          </div>
          <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-foreground">
            CSS
          </div>
        </div>

        {/* Second orbital ring - reverse rotation */}
        <div className="absolute w-[420px] h-[420px] border border-primary/15 rounded-full animate-spin opacity-50" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
          {/* Code blocks floating around */}
          <div className="absolute -top-3 left-1/4 w-6 h-4 bg-primary/30 rounded-sm opacity-70 animate-pulse" />
          <div className="absolute top-1/4 -right-3 w-4 h-6 bg-accent/30 rounded-sm opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-3 right-1/4 w-5 h-5 bg-primary-glow/30 rounded-sm opacity-80 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 -left-3 w-6 h-3 bg-muted/50 rounded-sm opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Third outer ring with web symbols */}
        <div className="absolute w-[480px] h-[480px] border border-primary/10 rounded-full animate-spin opacity-30" style={{ animationDuration: '40s' }}>
          <div className="absolute -top-1 left-1/3 w-3 h-3 bg-primary rounded-full opacity-60">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50" />
          </div>
          <div className="absolute top-1/3 -right-1 w-2 h-2 bg-accent rounded-full opacity-70 animate-pulse" />
          <div className="absolute -bottom-1 right-1/3 w-3 h-3 bg-primary-glow rounded-full opacity-50">
            <div className="absolute inset-0 bg-primary-glow rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute bottom-1/3 -left-1 w-2 h-2 bg-secondary rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Floating code snippets */}
        <div className="absolute w-[360px] h-[360px] animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 px-2 py-1 bg-background/20 backdrop-blur-sm rounded text-xs text-primary border border-primary/20 opacity-70">
            &lt;/&gt;
          </div>
          <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2 px-2 py-1 bg-background/20 backdrop-blur-sm rounded text-xs text-accent border border-accent/20 opacity-60">
            API
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 px-2 py-1 bg-background/20 backdrop-blur-sm rounded text-xs text-primary-glow border border-primary-glow/20 opacity-80">
            UI/UX
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2 px-2 py-1 bg-background/20 backdrop-blur-sm rounded text-xs text-muted-foreground border border-muted/20 opacity-50">
            DB
          </div>
        </div>

        {/* Inner fast rotating ring with dots */}
        <div className="absolute w-72 h-72 border-dashed border border-primary/30 rounded-full animate-spin opacity-40" style={{ animationDuration: '12s' }}>
          <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
          <div className="absolute top-1/2 -right-0.5 transform -translate-y-1/2 w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="absolute top-1/2 -left-0.5 transform -translate-y-1/2 w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.9s' }} />
        </div>
      </div>

      {/* Dynamic 3D Particle Field Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Morphing background shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl animate-float opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-accent/25 to-primary-glow/15 rounded-full blur-xl animate-float-delay opacity-50" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-primary-glow/30 to-accent/20 rounded-full blur-lg animate-float opacity-60" />
        
        {/* Floating particles with different sizes and speeds */}
        <div className="particles-container">
          {/* Large particles */}
          <div className="absolute top-10 left-20 w-3 h-3 bg-primary/60 rounded-full animate-float opacity-80 shadow-[0_0_10px_hsl(var(--primary)/0.5)]" style={{ animationDelay: '0s', animationDuration: '4s' }} />
          <div className="absolute top-32 right-16 w-2 h-2 bg-accent/70 rounded-full animate-float-delay opacity-70 shadow-[0_0_8px_hsl(var(--accent)/0.4)]" style={{ animationDelay: '1s', animationDuration: '5s' }} />
          <div className="absolute bottom-24 left-32 w-4 h-4 bg-primary-glow/50 rounded-full animate-float opacity-60 shadow-[0_0_12px_hsl(var(--primary-glow)/0.6)]" style={{ animationDelay: '2s', animationDuration: '6s' }} />
          <div className="absolute bottom-40 right-20 w-2.5 h-2.5 bg-primary/40 rounded-full animate-float-delay opacity-75 shadow-[0_0_6px_hsl(var(--primary)/0.3)]" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
          
          {/* Medium particles */}
          <div className="absolute top-20 left-40 w-1.5 h-1.5 bg-accent/80 rounded-full animate-float opacity-85" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
          <div className="absolute top-48 right-32 w-1 h-1 bg-primary-glow/90 rounded-full animate-float-delay opacity-90" style={{ animationDelay: '2.5s', animationDuration: '3s' }} />
          <div className="absolute bottom-32 left-16 w-2 h-2 bg-primary/60 rounded-full animate-float opacity-70" style={{ animationDelay: '0.8s', animationDuration: '4.2s' }} />
          <div className="absolute bottom-16 right-40 w-1.5 h-1.5 bg-accent/65 rounded-full animate-float-delay opacity-80" style={{ animationDelay: '1.8s', animationDuration: '3.8s' }} />
          
          {/* Small particles */}
          <div className="absolute top-16 left-28 w-1 h-1 bg-primary/70 rounded-full animate-float opacity-60" style={{ animationDelay: '0.3s', animationDuration: '2.5s' }} />
          <div className="absolute top-40 right-24 w-0.5 h-0.5 bg-primary-glow/80 rounded-full animate-float-delay opacity-85" style={{ animationDelay: '1.3s', animationDuration: '2.8s' }} />
          <div className="absolute bottom-20 left-36 w-1 h-1 bg-accent/75 rounded-full animate-float opacity-70" style={{ animationDelay: '2.3s', animationDuration: '2.2s' }} />
          <div className="absolute bottom-36 right-28 w-0.5 h-0.5 bg-primary/85 rounded-full animate-float-delay opacity-75" style={{ animationDelay: '0.7s', animationDuration: '2.6s' }} />
        </div>
        
        {/* Dynamic energy waves */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 border border-primary/10 rounded-full animate-ping opacity-30" style={{ animationDuration: '3s' }} />
          <div className="absolute w-80 h-80 border border-accent/15 rounded-full animate-ping opacity-25" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          <div className="absolute w-[420px] h-[420px] border border-primary-glow/10 rounded-full animate-ping opacity-20" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>
        
        {/* Rotating geometric shapes */}
        <div className="absolute top-12 right-12 w-8 h-8 border-2 border-primary/30 rotate-45 animate-spin opacity-60" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-12 left-12 w-6 h-6 border-2 border-accent/40 animate-spin opacity-70" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 left-8 w-4 h-4 bg-primary-glow/20 rotate-45 animate-spin opacity-50" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 right-8 w-5 h-5 border border-primary/25 rotate-12 animate-spin opacity-55" style={{ animationDuration: '7s', animationDirection: 'reverse' }} />
      </div>
    </div>
  );
}