"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ImageLightboxProps {
  images: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
  startIndex?: number
  title?: string
}

/**
 * Full-screen image preview. Shows the complete image uncropped (object-contain),
 * with arrow / keyboard / swipe navigation and a thumbnail strip for galleries.
 */
export function ImageLightbox({
  images,
  open,
  onOpenChange,
  startIndex = 0,
  title,
}: ImageLightboxProps) {
  const total = images?.length ?? 0
  const [index, setIndex] = React.useState(startIndex)
  const touchStartX = React.useRef<number | null>(null)

  // Re-sync to the clicked image every time the preview is opened
  React.useEffect(() => {
    if (open && total > 0) {
      setIndex(Math.min(Math.max(startIndex, 0), total - 1))
    }
  }, [open, startIndex, total])

  const goPrev = React.useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const goNext = React.useCallback(() => {
    setIndex((prev) => (prev + 1) % total)
  }, [total])

  // Arrow-key navigation (Escape is handled by Radix)
  React.useEffect(() => {
    if (!open || total < 2) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, total, goPrev, goNext])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || total < 2) return
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev()
      else goNext()
    }
    touchStartX.current = null
  }

  if (total === 0) return null

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[100] flex flex-col focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onClick={() => onOpenChange(false)}
        >
          <DialogPrimitive.Title className="sr-only">
            {title ? `${title} — image preview` : "Image preview"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {`Image ${index + 1} of ${total}. Use the arrow keys to browse and Escape to close.`}
          </DialogPrimitive.Description>

          {/* Top bar */}
          <div
            className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              {title && (
                <p className="truncate text-sm font-medium text-white/90 sm:text-base">{title}</p>
              )}
              {total > 1 && (
                <p className="text-xs text-white/60">
                  {index + 1} / {total}
                </p>
              )}
            </div>
            <DialogPrimitive.Close className="rounded-full bg-white/10 p-2 text-white shadow backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50">
              <X className="h-5 w-5" />
              <span className="sr-only">Close preview</span>
            </DialogPrimitive.Close>
          </div>

          {/* Image stage */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-2 sm:px-16"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="relative h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={images[index]}
                src={images[index] || "/placeholder.svg"}
                alt={title ? `${title} screenshot ${index + 1}` : `Screenshot ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white shadow backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:left-4 sm:p-3"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white shadow backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:right-4 sm:p-3"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {total > 1 && (
            <div
              className="flex justify-center gap-2 overflow-x-auto px-4 py-4"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-2 transition-all sm:h-14 sm:w-20",
                    i === index
                      ? "ring-white opacity-100"
                      : "ring-transparent opacity-50 hover:opacity-90",
                  )}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
