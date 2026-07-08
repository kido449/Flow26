"use client"

import { useEffect, useState } from "react"
import { getLiveSnapshot, type LiveSnapshot } from "@/lib/rag/live-feed"

// Polls the mock live feed on an interval. Starts null so server and client
// render the same initial (loading) markup, then hydrates on mount — this both
// avoids a hydration mismatch (feed depends on Date.now) and gives us a real
// loading state to show.
export function useLiveSnapshot(intervalMs = 5000) {
  const [snapshot, setSnapshot] = useState<LiveSnapshot | null>(null)

  useEffect(() => {
    setSnapshot(getLiveSnapshot())
    const id = setInterval(() => setSnapshot(getLiveSnapshot()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return { snapshot, loading: snapshot === null }
}
