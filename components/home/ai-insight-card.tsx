"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Sparkles } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { summarizeLiveFeed, type LiveSnapshot } from "@/lib/rag/live-feed"

/**
 * AiInsightCard — Read-only proactive intelligence card that sends
 * the current live-feed summary to /api/chat and displays the AI's
 * operational analysis. Includes loading, error, and fallback states.
 */
export function AiInsightCard({ snapshot, loading }: { snapshot: LiveSnapshot | null; loading: boolean }) {
  const [insight, setInsight] = useState<string | null>(null)
  const [insightError, setInsightError] = useState(false)
  const [insightLoading, setInsightLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchInsight = useCallback(async (snap: LiveSnapshot) => {
    setInsightLoading(true)
    setInsightError(false)
    const controller = new AbortController()
    // Timeout after 10s to avoid hanging in degraded network conditions.
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      const feedSummary = summarizeLiveFeed(snap)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Based on this live crowd data, provide a single concise proactive operational insight or recommendation for the command center (max 2 sentences): ${feedSummary}`,
          locale: "en",
        }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        throw new Error(`Insight request failed: ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
      }
      // Guard: AI gateway may return 200 with an empty/error body when auth fails.
      if (!acc.trim() || acc.length < 10) {
        throw new Error("AI response was empty or too short — falling back")
      }
      setInsight(acc)
    } catch {
      setInsightError(true)
      // Deterministic fallback: derive a simple insight from raw live-feed data.
      const fallback = deriveFallbackInsight(snap)
      setInsight(fallback)
    } finally {
      clearTimeout(timeout)
      setInsightLoading(false)
      setHasFetched(true)
    }
  }, [])

  useEffect(() => {
    if (snapshot && !hasFetched && !insightLoading) {
      void fetchInsight(snapshot)
    }
  }, [snapshot, hasFetched, insightLoading, fetchInsight])

  // Don't render until snapshot is available.
  if (loading || !snapshot) return null

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-foreground/80">
          <Sparkles className="size-4 text-primary" />
          <span>ai-generated operational insight</span>
        </div>
        {insightError && (
          <span className="text-xs font-mono uppercase tracking-[0.15em] text-amber-400">fallback mode</span>
        )}
      </div>

      <div className="bg-card/90 backdrop-blur border border-border rounded-3xl p-6 md:p-8 shadow-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/40">
        <div className="flex items-start gap-4">
          <div className="size-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
            <Sparkles className="size-5 text-primary" />
          </div>
          <div className="flex flex-col gap-2 min-w-0">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary font-semibold">
              proactive intelligence
            </h3>
            {insightLoading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full bg-secondary rounded-xl" />
                <Skeleton className="h-4 w-3/4 bg-secondary rounded-xl" />
              </div>
            ) : (
              <p className="text-sm text-foreground/90 leading-relaxed font-sans">
                {insight}
              </p>
            )}
            {insightError && (
              <p className="text-xs text-amber-400/80 font-mono mt-1">
                ⚠ AI endpoint unavailable — showing deterministic fallback analysis.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * deriveFallbackInsight — Generates a deterministic operational insight
 * from raw live-feed data when the AI endpoint is unavailable.
 */
function deriveFallbackInsight(snap: LiveSnapshot): string {
  const busiest = [...snap.zones].sort((a, b) => b.occupancy / b.capacity - a.occupancy / a.capacity)[0]
  const longestQ = [...snap.queues].sort((a, b) => b.waitMinutes - a.waitMinutes)[0]
  const fillPct = Math.round(snap.overallFill * 100)

  if (fillPct >= 90) {
    return `Stadium is at ${fillPct}% capacity — consider activating overflow protocols and opening auxiliary gates. ${busiest.label} is the most congested zone.`
  }
  if (longestQ.waitMinutes >= 20) {
    return `${longestQ.label} has a ${longestQ.waitMinutes}-minute wait — recommend dispatching additional staff or opening express lanes to reduce queue buildup.`
  }
  return `Stadium at ${fillPct}% fill with manageable crowd levels. ${busiest.label} is the busiest area — monitor for trend changes as the match approaches.`
}
