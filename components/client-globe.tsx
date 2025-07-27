"use client";
import dynamic from "next/dynamic";

// Dynamically import the Globe components with SSR disabled
export const World = dynamic(() => import("./ui/globe").then(mod => ({ default: mod.World })), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-[400px]">Loading Globe...</div>
});

export const Globe = dynamic(() => import("./ui/globe").then(mod => ({ default: mod.Globe })), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-[400px]">Loading Globe...</div>
});

export type { GlobeConfig } from "./ui/globe"; 