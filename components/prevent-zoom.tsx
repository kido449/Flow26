"use client"

import { useEffect } from "react"

export function PreventZoom() {
  useEffect(() => {
    // 1. Prevent trackpad pinch-to-zoom and Ctrl + MouseWheel zoom
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
      }
    }

    // 2. Prevent keyboard shortcut zooming (Ctrl/Cmd + '+', '-', '=', '0')
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(e.key)) {
        e.preventDefault()
      }
    }

    // 3. Prevent Safari trackpad/touch gesture zooming
    const handleGesture = (e: Event) => {
      e.preventDefault()
    }

    // 4. Prevent multi-finger touch pinch-to-zoom on touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault()
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("gesturestart", handleGesture)
    window.addEventListener("gesturechange", handleGesture)
    window.addEventListener("gestureend", handleGesture)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("gesturestart", handleGesture)
      window.removeEventListener("gesturechange", handleGesture)
      window.removeEventListener("gestureend", handleGesture)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return null
}
