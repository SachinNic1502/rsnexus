"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
      setLoggingOut(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={loggingOut}
      onClick={handleLogout}
      className="w-full justify-start text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 px-3 py-2 rounded-lg transition-all"
    >
      {loggingOut ? (
        <>
          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin text-rose-400" />
          Signing out...
        </>
      ) : (
        <>
          <LogOut className="w-3.5 h-3.5 mr-2 text-rose-400" />
          End Session
        </>
      )}
    </Button>
  );
}
