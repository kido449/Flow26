"use client"

import React from "react"
import { Clock, MapPin, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { CongestionBadge } from "@/components/congestion-badge"
import type { QueuePoint, Zone } from "@/lib/types"

interface CrowdQueuesListProps {
  queues: QueuePoint[]
  zones: Zone[]
  selectedZoneId: string | null
  queueCategory: "all" | "gates" | "amenities"
  onSelectCategory: (cat: "all" | "gates" | "amenities") => void
  loading: boolean
  role: string
  onOpenExpressLane: (targetName: string) => void
  t: (key: any) => string
}

export function CrowdQueuesList({
  queues,
  zones,
  selectedZoneId,
  queueCategory,
  onSelectCategory,
  loading,
  role,
  onOpenExpressLane,
  t,
}: CrowdQueuesListProps) {
  const filteredQueues = React.useMemo(() => {
    let list = queues
    if (selectedZoneId) {
      list = list.filter((q) => q.zoneId === selectedZoneId)
    }
    if (queueCategory === "gates") {
      list = list.filter((q) => q.id.includes("gate"))
    } else if (queueCategory === "amenities") {
      list = list.filter((q) => !q.id.includes("gate"))
    }
    return list
  }, [queues, selectedZoneId, queueCategory])

  return (
    <div className="bg-neutral-900/90 backdrop-blur border border-white/5 rounded-3xl p-6 flex flex-col shadow-none">
      <div className="pb-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium lowercase tracking-tight text-white flex items-center gap-2">
            <Clock className="size-4 text-white" />
            <span>{t("crowd.queues")}</span>
          </h3>
          <p className="text-xs text-white/40 lowercase tracking-tight">
            live estimated wait times and directional crowd trends
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-full border border-white/5">
          {(["all", "gates", "amenities"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors lowercase tracking-tight cursor-pointer ${
                queueCategory === cat ? "bg-white text-black font-medium shadow-none" : "text-white/70 hover:text-white"
              }`}
            >
              {t(`crowd.filter${cat.charAt(0).toUpperCase() + cat.slice(1)}` as any)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 pt-5 flex flex-col gap-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-2xl bg-neutral-800" />)
        ) : filteredQueues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-white/40">
            <Clock className="size-8 mb-2 opacity-40" />
            <p className="text-sm font-medium lowercase tracking-tight">no active queues in this filter.</p>
            <p className="text-xs lowercase tracking-tight">try selecting a different zone or category.</p>
          </div>
        ) : (
          filteredQueues.map((q) => {
            const zone = zones.find((z) => z.id === q.zoneId)
            const isLong = q.waitMinutes >= 18
            return (
              <div
                key={q.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-neutral-800/40 p-4 transition-all hover:bg-neutral-800/80"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium lowercase tracking-tight text-sm text-white truncate">{q.label}</span>
                    <CongestionBadge level={q.congestion} className="scale-90 origin-left" />
                  </div>
                  <span className="text-xs text-white/40 lowercase tracking-tight truncate flex items-center gap-1">
                    <MapPin className="size-3 text-white/70" /> <span>{zone?.label ?? q.zoneId}</span>
                  </span>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Trend Badge */}
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-xs font-medium border border-white/5">
                    {q.trend === "rising" && <TrendingUp className="size-3.5 text-white" />}
                    {q.trend === "falling" && <TrendingDown className="size-3.5 text-white/70" />}
                    {q.trend === "steady" && <Minus className="size-3.5 text-white/40" />}
                    <span className="text-white/70 lowercase tracking-tight">{t(`crowd.trend.${q.trend}` as any)}</span>
                  </div>

                  {/* Wait time */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-medium tracking-tight text-white tabular-nums">
                        {q.waitMinutes}
                      </span>
                      <span className="text-xs text-white/40 lowercase tracking-tight">{t("crowd.minutes")}</span>
                    </div>
                    {role === "command" && isLong && (
                      <button
                        onClick={() => onOpenExpressLane(q.label)}
                        className="text-[10px] text-white underline hover:text-white/80 font-medium lowercase tracking-tight mt-0.5 cursor-pointer"
                      >
                        + express lane
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
