"use client"

import React from "react"

export function ReadTimeCounter({
  slug,
  fallback = "5 min read",
  content,
}: {
  slug?: string
  fallback?: string
  content?: string[] | string
}) {
  const calculatedTime = React.useMemo(() => {
    if (!content) return fallback
    const text = Array.isArray(content) ? content.join(" ") : content
    const wordCount = text.trim().split(/\s+/).length
    const minutes = Math.max(1, Math.ceil(wordCount / 200))
    return `${minutes} min read`
  }, [content, fallback])

  return <span>{calculatedTime}</span>
}

