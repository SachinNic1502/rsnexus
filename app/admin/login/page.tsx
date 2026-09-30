"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Database,
  Activity,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copiedDemo, setCopiedDemo] = useState(false);

  const demoKey = "rsnexus-admin-2026";

  const handleFillDemo = () => {
    setKey(demoKey);
    setCopiedDemo(true);
    setError("");
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError("Please enter your administrative secret key.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 800);
      } else {
        setError(data.message || "Invalid authentication key. Please verify credentials.");
      }
    } catch (err: any) {
      setError("Connection failure. Unable to reach authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* Dynamic Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-blue-600/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-[35%] left-[45%] w-[35vw] h-[35vw] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      {/* Top Bar Header */}
      <header className="relative z-10 w-full px-6 py-6 lg:px-12 flex items-center justify-between border-b border-slate-800/40 bg-slate-950/40 backdrop-blur-md">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative p-1.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
            <Image
              src={siteConfig.logoSecondary}
              alt={siteConfig.name}
              width={28}
              height={28}
              className="h-7 w-7 transition-transform group-hover:scale-105"
            />
          </div>
          <div>
            <span className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
              {siteConfig.name}
            </span>
            <span className="text-[10px] text-slate-400 block font-mono -mt-1 tracking-wider uppercase">
              Management Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 px-3.5 py-1.5 rounded-full transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Live Website</span>
        </Link>
      </header>

      {/* Main Dual-Panel Studio Body */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Panel: Studio Showcase & Telemetry (Visible on lg screens) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-8 pr-4">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                SECURE ACCESS CLEARANCE • TIER 4
              </div>

              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Unified Control <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  For Digital Systems.
                </span>
              </h1>

              <p className="text-slate-400 text-base leading-relaxed max-w-lg">
                Manage global portfolio showcases, review incoming candidate dossiers, publish studio insights, and orchestrate client inquiries in real time.
              </p>
            </div>

            {/* Live Infrastructure Telemetry Card */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800/80">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Cluster Telemetry
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Systems Nominal
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-start gap-2.5">
                  <Database className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Database Engine</span>
                    <span className="text-slate-200 font-medium">MongoDB Atlas</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">App Framework</span>
                    <span className="text-slate-200 font-medium">Next.js 16 Turbo</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 font-mono">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Encrypted Session • HttpOnly Token Authentication</span>
              </div>
            </div>

            {/* Platform Feature Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Careers & Resume Intake",
                "Dynamic Case Studies",
                "Articles & Tech Insights",
                "Direct Lead CRM",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-medium text-slate-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Panel: Executive Glassmorphism Console Card */}
          <div className="w-full lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md relative">
              {/* Outer Radiant Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-teal-500/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-2xl p-7 sm:p-9 space-y-6">
                
                {/* Console Badge & Header */}
                <div className="text-center space-y-3">
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/20 via-cyan-500/10 to-transparent border border-primary/30 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                    <KeyRound className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
                      Studio Console
                    </h2>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      Enter your administrative secret key to access the control center.
                    </p>
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-xs text-red-400 animate-in fade-in zoom-in-95 duration-200">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                    <span className="leading-snug">{error}</span>
                  </div>
                )}

                {/* Success Banner */}
                {success && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-400 animate-in fade-in zoom-in-95 duration-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span className="font-medium">Access Granted! Launching console...</span>
                  </div>
                )}

                {/* Authentication Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span>Administrative Key</span>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">
                        Key length: {key.length} chars
                      </span>
                    </label>

                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                        <Lock className="w-4 h-4" />
                      </div>

                      <Input
                        type={showKey ? "text" : "password"}
                        value={key}
                        onChange={(e) => {
                          setKey(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Enter master key..."
                        className="pl-10 pr-11 py-2.5 h-11 bg-slate-950/80 border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 font-mono text-sm rounded-xl transition-all"
                        disabled={loading || success}
                        autoFocus
                        required
                      />

                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-md transition-colors"
                        title={showKey ? "Hide key" : "Show key"}
                      >
                        {showKey ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* One-Click Quick Fill Chip */}
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-[11px] text-slate-400 font-mono truncate">
                        Default: <code className="text-cyan-300 font-semibold">{demoKey}</code>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleFillDemo}
                      className="px-2.5 py-1 rounded-md bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/50 text-[10px] font-mono text-cyan-300 hover:text-cyan-200 transition-colors shrink-0 flex items-center gap-1"
                    >
                      {copiedDemo ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <span>Auto-Fill</span>
                      )}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading || success}
                    className="w-full h-11 font-medium text-sm rounded-xl bg-gradient-to-r from-primary via-blue-600 to-cyan-500 hover:from-primary/90 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 group relative overflow-hidden"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        Verifying Clearance...
                      </span>
                    ) : success ? (
                      <span className="flex items-center gap-2 text-emerald-100 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        Access Confirmed
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Authenticate & Enter
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </form>

                {/* Footer Security Badges */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
                    TLS 1.3 Strict
                  </span>
                  <span>Session: 7 Days</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Page Footnote */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-500 font-mono border-t border-slate-900 bg-slate-950/60 backdrop-blur-md">
        © {new Date().getFullYear()} {siteConfig.legalName} • Studio Control Infrastructure
      </footer>
    </div>
  );
}
