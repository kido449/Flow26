"use client"

import React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { CongestionBadge } from "@/components/congestion-badge"
import type { Zone, QueuePoint } from "@/lib/types"
import type { LiveSnapshot } from "@/lib/rag/live-feed"

interface CrowdKpiGridProps {
  snapshot: LiveSnapshot | null
  loading: boolean
  busiestZone: Zone | null
  calmestZone: Zone | null
  longestQueue: QueuePoint | null
  totalOccupancy: number
  totalCapacity: number
  t: (key: any) => string
}

export function CrowdKpiGrid({
  snapshot,
  loading,
  busiestZone,
  calmestZone,
  longestQueue,
  totalOccupancy,
  totalCapacity,
  t,
}: CrowdKpiGridProps) {
  return (
    <section aria-labelledby="kpi-overview" className="flex flex-col gap-3">
      <h2 id="kpi-overview" className="text-sm font-medium tracking-tight lowercase text-white">
        stadium telemetry summary
      </h2>
      <div className="bg-neutral-900/90 backdrop-blur border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 shadow-none">
        {/* Stat 1: Total Fill */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-xs font-medium lowercase tracking-tight text-white/40">{t("crowd.overall")}</span>
          {loading || !snapshot ? (
            <Skeleton className="h-10 w-32 bg-neutral-800 rounded-xl" />
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-4xl font-medium tracking-tight text-white tabular-nums">
                  {Math.round(snapshot.overallFill * 100)}%
                </span>
                <span className="text-xs font-medium text-white/40 tabular-nums">
                  {totalOccupancy.toLocaleString()} / {totalCapacity.toLocaleString()}
                </span>
              </div>
              <Progress value={Math.round(snapshot.overallFill * 100)} className="h-1.5 bg-neutral-800" />
            </div>
          )}
        </div>

        <div className="hidden lg:flex text-white/20 font-light text-4xl select-none px-2">/</div>
        <div className="lg:hidden border-t border-white/5 my-1" />

        {/* Stat 2: Busiest Area */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-xs font-medium lowercase tracking-tight text-white/40">{t("crowd.busiestZone")}</span>
          {loading || !busiestZone ? (
            <Skeleton className="h-10 w-36 bg-neutral-800 rounded-xl" />
          ) : (
            <div className="flex flex-col gap-2 items-start">
              <span className="truncate text-lg font-medium tracking-tight text-white">{busiestZone.label}</span>
              <CongestionBadge level={busiestZone.congestion} />
            </div>
          )}
        </div>

        <div className="hidden lg:flex text-white/20 font-light text-4xl select-none px-2">/</div>
        <div className="lg:hidden border-t border-white/5 my-1" />

        {/* Stat 3: Recommended Concourse */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-xs font-medium lowercase tracking-tight text-white/40">{t("crowd.calmestZone")}</span>
          {loading || !calmestZone ? (
            <Skeleton className="h-10 w-36 bg-neutral-800 rounded-xl" />
          ) : (
            <div className="flex flex-col gap-2 items-start">
              <span className="truncate text-lg font-medium tracking-tight text-white">{calmestZone.label}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-2.5 py-0.5 text-[10px] text-white border border-white/10 lowercase tracking-tight font-medium">
                optimal flow ({Math.round((calmestZone.occupancy / calmestZone.capacity) * 100)}%)
              </span>
            </div>
          )}
        </div>

        <div className="hidden lg:flex text-white/20 font-light text-4xl select-none px-2">/</div>
        <div className="lg:hidden border-t border-white/5 my-1" />

        {/* Stat 4: Longest Queue */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-xs font-medium lowercase tracking-tight text-white/40">{t("crowd.longestQueue")}</span>
          {loading || !longestQueue ? (
            <Skeleton className="h-10 w-32 bg-neutral-800 rounded-xl" />
          ) : (
            <div className="flex flex-col gap-1 items-start">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-medium tracking-tight text-white tabular-nums">{longestQueue.waitMinutes}</span>
                <span className="text-sm font-medium text-white/70 lowercase tracking-tight">{t("crowd.minutes")}</span>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-white/40 truncate">
                {longestQueue.trend === "rising" && <TrendingUp className="size-3.5 text-white" />}
                {longestQueue.trend === "falling" && <TrendingDown className="size-3.5 text-white/70" />}
                {longestQueue.trend === "steady" && <Minus className="size-3.5 text-white/40" />}
                <span className="truncate lowercase tracking-tight">{longestQueue.label}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
