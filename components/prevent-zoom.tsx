"use client"

import { useEffect } from "react"

export function PreventZoom() {
  useEffect(() => {
    // 1. Intercept wheel/trackpad pinch zoom on Windows & macOS in capture phase
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
    }

    // 2. Intercept keyboard zoom shortcuts (Ctrl/Cmd + +, -, =, 0, Numpad)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["+", "-", "=", "0", "Add", "Subtract", "_"].includes(e.key)
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // 3. Intercept Safari & precision touchpad gesture events
    const handleGesture = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }

    // 4. Intercept multi-finger touch pinch-to-zoom
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault()
      }
    }

    const opts = { passive: false, capture: true }

    // Attach to both document and window in capture phase
    window.addEventListener("wheel", handleWheel, opts)
    document.addEventListener("wheel", handleWheel, opts)

    window.addEventListener("keydown", handleKeyDown, { capture: true })
    document.addEventListener("keydown", handleKeyDown, { capture: true })

    window.addEventListener("gesturestart", handleGesture, opts)
    window.addEventListener("gesturechange", handleGesture, opts)
    window.addEventListener("gestureend", handleGesture, opts)
    document.addEventListener("gesturestart", handleGesture, opts)
    document.addEventListener("gesturechange", handleGesture, opts)
    document.addEventListener("gestureend", handleGesture, opts)

    window.addEventListener("touchmove", handleTouchMove, opts)
    document.addEventListener("touchmove", handleTouchMove, opts)

    return () => {
      window.removeEventListener("wheel", handleWheel, true)
      document.removeEventListener("wheel", handleWheel, true)

      window.removeEventListener("keydown", handleKeyDown, true)
      document.removeEventListener("keydown", handleKeyDown, true)

      window.removeEventListener("gesturestart", handleGesture, true)
      window.removeEventListener("gesturechange", handleGesture, true)
      window.removeEventListener("gestureend", handleGesture, true)
      document.removeEventListener("gesturestart", handleGesture, true)
      document.removeEventListener("gesturechange", handleGesture, true)
      document.removeEventListener("gestureend", handleGesture, true)

      window.removeEventListener("touchmove", handleTouchMove, true)
      document.removeEventListener("touchmove", handleTouchMove, true)
    }
  }, [])

  return null
}
