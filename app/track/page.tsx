"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Compass,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  GitBranch,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  FileCheck2,
  Lock,
} from "lucide-react"

interface MilestonePhase {
  number: string
  name: string
  status: "completed" | "in_progress" | "upcoming"
  description: string
  date: string
}

interface ProjectRecord {
  id: string
  code: string
  name: string
  client: string
  tier: string
  leadArchitect: string
  startDate: string
  targetRelease: string
  overallProgress: number
  gitCommits: number
  phases: MilestonePhase[]
}

const mockProjects: Record<string, ProjectRecord> = {
  "RSN-DEMO-2026": {
    id: "proj_01",
    code: "RSN-DEMO-2026",
    name: "Aetheria Cloud Intelligence Platform",
    client: "Aetheria Global Ventures",
    tier: "Tier II • Professional Web App",
    leadArchitect: "Sachin Rathod (Lead Architect)",
    startDate: "September 15, 2026",
    targetRelease: "October 28, 2026",
    overallProgress: 72,
    gitCommits: 148,
    phases: [
      {
        number: "Phase 01",
        name: "Planning & Project Blueprint",
        status: "completed",
        description: "Technical requirements approved, database models planned, and API roadmap created.",
        date: "Completed • Sept 22, 2026",
      },
      {
        number: "Phase 02",
        name: "UI/UX Wireframes & Designs",
        status: "completed",
        description: "Figma design system, responsive prototypes, and final design approval.",
        date: "Completed • Sept 29, 2026",
      },
      {
        number: "Phase 03",
        name: "Core Development & Features",
        status: "in_progress",
        description: "Next.js frontend, database setup, payment gateway, and secure user logins.",
        date: "In Progress • Active Sprint",
      },
      {
        number: "Phase 04",
        name: "Automated Testing & Security Review",
        status: "upcoming",
        description: "Complete testing suites, security vulnerability check, and speed optimization.",
        date: "Target • Oct 16, 2026",
      },
      {
        number: "Phase 05",
        name: "Launch & Code Handover",
        status: "upcoming",
        description: "Cloud server setup, domain launch, and 100% full source code handover.",
        date: "Target • Oct 28, 2026",
      },
    ],
  },
  "RSN-STARTUP-01": {
    id: "proj_02",
    code: "RSN-STARTUP-01",
    name: "Veritas AI Document Search",
    client: "Veritas Legal Tech",
    tier: "Tier I • Starter Website",
    leadArchitect: "Anubhav Trivedi (CTO)",
    startDate: "September 24, 2026",
    targetRelease: "October 14, 2026",
    overallProgress: 90,
    gitCommits: 84,
    phases: [
      {
        number: "Phase 01",
        name: "Planning & Data Setup",
        status: "completed",
        description: "Document ingestion plan, search specifications, and prototype wireframes.",
        date: "Completed • Sept 27, 2026",
      },
      {
        number: "Phase 02",
        name: "Website Design & Search Interface",
        status: "completed",
        description: "Next.js interface, fast search filters, and mobile-friendly layouts.",
        date: "Completed • Oct 01, 2026",
      },
      {
        number: "Phase 03",
        name: "Final Testing & Launch",
        status: "in_progress",
        description: "Final client review, domain setup, and live server deployment.",
        date: "In Progress • Final Polish",
      },
    ],
  },
}

export default function TrackPage() {
  const [searchCode, setSearchCode] = useState("RSN-DEMO-2026")
  const [activeProject, setActiveProject] = useState<ProjectRecord | null>(mockProjects["RSN-DEMO-2026"])
  const [errorMessage, setErrorMessage] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = searchCode.trim().toUpperCase()
    if (mockProjects[clean]) {
      setActiveProject(mockProjects[clean])
      setErrorMessage("")
    } else {
      setActiveProject(null)
      setErrorMessage("No active milestone record found for that Project Identifier. Try demo code 'RSN-DEMO-2026' or contact your assigned architect.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-foreground relative overflow-hidden py-16 md:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        {/* Classical Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 dark:bg-slate-900/80 border border-amber-500/30 mb-5 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-foreground/80">
              ✦ LIVE PROGRESS • PROJECT TRACKER ✦
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
            Client Project <span className="text-gradient-gold">Progress Tracker</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto">
            Track the live progress of your project. Check completed milestones, upcoming tasks, and launch dates anytime.
          </p>

          <div className="classical-divider max-w-xs mx-auto my-8">
            <span className="text-amber-500 font-serif text-xs">✦ PROJECT STATUS ✦</span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-14">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <Input
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Project Code (e.g. RSN-DEMO-2026)"
                className="pl-11 h-13 rounded-2xl border-border/80 bg-card/80 dark:bg-slate-900/80 font-mono text-sm uppercase focus-visible:ring-amber-500/30"
              />
            </div>
            <Button
              type="submit"
              className="h-13 px-8 font-serif font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-500 text-white rounded-2xl shadow-lg border-0"
            >
              Check Status
            </Button>
          </form>

          {/* Quick Demo Pill Bar */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>Try sample codes:</span>
            <button
              type="button"
              onClick={() => {
                setSearchCode("RSN-DEMO-2026")
                setActiveProject(mockProjects["RSN-DEMO-2026"])
                setErrorMessage("")
              }}
              className="font-mono text-amber-500 hover:underline"
            >
              RSN-DEMO-2026
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setSearchCode("RSN-STARTUP-01")
                setActiveProject(mockProjects["RSN-STARTUP-01"])
                setErrorMessage("")
              }}
              className="font-mono text-amber-500 hover:underline"
            >
              RSN-STARTUP-01
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-xs text-destructive text-center">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Active Project Card Display */}
        {activeProject && (
          <div className="space-y-8">
            {/* Overview Banner */}
            <div className="classical-card classical-frame rounded-3xl p-6 sm:p-8 border border-amber-500/40 bg-gradient-to-br from-card via-secondary/20 to-card shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold">
                      {activeProject.code}
                    </span>
                    <Badge variant="outline" className="font-serif text-[11px] border-border text-muted-foreground">
                      {activeProject.tier}
                    </Badge>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-foreground">
                    {activeProject.name}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Client: <strong>{activeProject.client}</strong> • Lead Engineer: {activeProject.leadArchitect}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-serif font-bold text-emerald-600 dark:text-emerald-400">
                    In Progress
                  </span>
                </div>
              </div>

              {/* Progress Metric Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-baseline text-xs font-serif">
                  <span className="text-muted-foreground uppercase tracking-wider font-semibold">
                    Overall Project Progress
                  </span>
                  <span className="font-mono font-bold text-amber-500 text-sm">
                    {activeProject.overallProgress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-secondary/80 rounded-full overflow-hidden border border-border/80">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-700 rounded-full"
                    style={{ width: `${activeProject.overallProgress}%` }}
                  />
                </div>
              </div>

              {/* Quick Meta Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-background/60 border border-border/70">
                  <span className="text-[10px] uppercase font-serif text-muted-foreground block">
                    Start Date
                  </span>
                  <span className="text-xs font-bold text-foreground mt-0.5 block">
                    {activeProject.startDate}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background/60 border border-border/70">
                  <span className="text-[10px] uppercase font-serif text-muted-foreground block">
                    Target Handover
                  </span>
                  <span className="text-xs font-bold text-foreground mt-0.5 block">
                    {activeProject.targetRelease}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background/60 border border-border/70">
                  <span className="text-[10px] uppercase font-serif text-muted-foreground block">
                    Code Commits
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-500 mt-0.5 block">
                    {activeProject.gitCommits} commits
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background/60 border border-border/70">
                  <span className="text-[10px] uppercase font-serif text-muted-foreground block">
                    Code Ownership
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                    100% Owned by You
                  </span>
                </div>
              </div>
            </div>

            {/* Phases Timeline */}
            <div className="classical-card classical-frame rounded-3xl p-6 sm:p-10 border border-border/80 bg-card/85">
              <span className="font-serif text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
                PROJECT STAGES
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-8">
                Project Milestone Progress
              </h3>

              <div className="space-y-6">
                {activeProject.phases.map((phase, idx) => {
                  const isDone = phase.status === "completed"
                  const isCurrent = phase.status === "in_progress"

                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? "border-amber-500/50 bg-amber-500/5 shadow-md"
                          : isDone
                          ? "border-border/70 bg-secondary/30"
                          : "border-border/40 opacity-60 bg-transparent"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                              isDone
                                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-500"
                                : isCurrent
                                ? "bg-amber-500/10 border border-amber-500/40 text-amber-500 animate-pulse"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <div>
                            <span className="font-serif text-[11px] font-bold text-amber-500 mr-2">
                              {phase.number}
                            </span>
                            <span className="font-serif text-base font-bold text-foreground">
                              {phase.name}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-xs font-serif px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                            isDone
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                              : isCurrent
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold"
                              : "bg-secondary border-border text-muted-foreground"
                          }`}
                        >
                          {phase.date}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground pl-9 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Direct Support & WhatsApp Callout */}
            <div className="classical-card classical-frame rounded-2xl p-6 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-foreground">
                    Have questions about your project or milestone?
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    You can speak directly with the developer building your project anytime.
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="font-serif text-xs border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 shrink-0"
              >
                <a href="https://wa.me/919309931886" target="_blank" rel="noopener noreferrer">
                  <span>Chat with Us on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
