"use client"

import { useEffect, useState } from "react"

function formatElapsed(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} min read`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr read`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? "s" : ""} read`
}

export function ReadTimeCounter({ slug, fallback }: { slug: string; fallback: string }) {
  const [label, setLabel] = useState(fallback)

  useEffect(() => {
    const key = `blog-first-read:${slug}`
    let startedAt = Number(localStorage.getItem(key))
    if (!startedAt) {
      startedAt = Date.now()
      localStorage.setItem(key, String(startedAt))
    }

    const update = () => setLabel(formatElapsed(Date.now() - startedAt))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [slug])

  return <>{label}</>
}
