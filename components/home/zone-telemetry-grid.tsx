"use client"

import React from "react"
import { BarChart3 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { CongestionBadge } from "@/components/congestion-badge"
import type { LiveSnapshot } from "@/lib/rag/live-feed"

/**
 * ZoneTelemetryGrid — Displays overall stadium zone capacity & thermal density
 * breakdown across active zones. Renders in the command center dashboard.
 */
export function ZoneTelemetryGrid({ snapshot }: { snapshot: LiveSnapshot | null }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-foreground/80">
          <BarChart3 className="size-4 text-primary" />
          <span>overall stadium zone capacity & thermal density breakdown</span>
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">7 active zones monitored</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snapshot?.zones.map((zone) => {
          const pct = Math.round((zone.occupancy / zone.capacity) * 100)
          return (
            <div key={zone.id} className="bg-card/90 backdrop-blur border border-border rounded-3xl p-5 flex flex-col gap-3.5 transition-all duration-300 hover:border-primary/40">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif font-bold text-lg text-foreground tracking-tight">{zone.label}</h3>
                <CongestionBadge level={zone.congestion} />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>occupancy load</span>
                  <span className="font-bold text-foreground tabular-nums">{pct}%</span>
                </div>
                <Progress value={pct} className="h-2 bg-secondary" />
              </div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.1em] text-muted-foreground pt-1 border-t border-border/60">
                <span>load: {zone.occupancy.toLocaleString()}</span>
                <span>cap: {zone.capacity.toLocaleString()}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
