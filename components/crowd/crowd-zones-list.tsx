"use client"

import React from "react"
import { MapPin, AlertTriangle, Send } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CongestionBadge } from "@/components/congestion-badge"
import type { Zone } from "@/lib/types"

interface CrowdZonesListProps {
  zones: Zone[]
  selectedZoneId: string | null
  loading: boolean
  role: string
  onDispatchUnit: (targetName: string) => void
  t: (key: any) => string
}

export function CrowdZonesList({
  zones,
  selectedZoneId,
  loading,
  role,
  onDispatchUnit,
  t,
}: CrowdZonesListProps) {
  return (
    <div className="bg-neutral-900/90 backdrop-blur border border-white/5 rounded-3xl p-6 flex flex-col shadow-none">
      <div className="pb-4 border-b border-white/5 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium lowercase tracking-tight text-white flex items-center gap-2">
            <MapPin className="size-4 text-white" />
            <span>{t("crowd.zones")}</span>
          </h3>
          <span className="rounded-full bg-neutral-800 text-white/70 px-3 py-0.5 text-xs font-medium lowercase tracking-tight border border-white/5">
            {zones.length} monitored areas
          </span>
        </div>
        <p className="text-xs text-white/40 lowercase tracking-tight">
          real-time occupancy vs. rated stadium code capacity
        </p>
      </div>
      <div className="flex-1 pt-5 flex flex-col gap-3.5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-2xl bg-neutral-800" />)
        ) : (
          zones
            .filter((z) => !selectedZoneId || z.id === selectedZoneId)
            .map((z) => {
              const fillRatio = Math.round((z.occupancy / z.capacity) * 100)
              const isHigh = z.congestion === "high" || z.congestion === "critical"
              return (
                <div
                  key={z.id}
                  className={`flex flex-col gap-2.5 rounded-2xl border p-4 transition-colors ${
                    selectedZoneId === z.id ? "border-white/30 bg-white/5" : "border-white/5 bg-neutral-800/40 hover:bg-neutral-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium lowercase tracking-tight text-sm text-white">{z.label}</span>
                      {selectedZoneId === z.id && (
                        <span className="rounded-full bg-white text-black text-[10px] font-medium px-2 py-0.5 lowercase">selected</span>
                      )}
                    </div>
                    <CongestionBadge level={z.congestion} />
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/40 tabular-nums lowercase tracking-tight">
                    <span>occupancy: <strong className="text-white font-medium">{z.occupancy.toLocaleString()}</strong></span>
                    <span>capacity: <strong className="text-white font-medium">{z.capacity.toLocaleString()}</strong> ({fillRatio}%)</span>
                  </div>

                  <Progress value={fillRatio} className="h-1.5 bg-neutral-800" />

                  {/* Operational Action for Staff/Command */}
                  {(role === "command" || role === "staff") && isHigh && (
                    <div className="mt-1 pt-2.5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-white/70 flex items-center gap-1.5 font-medium lowercase tracking-tight">
                        <AlertTriangle className="size-3.5 text-white" /> high crowd density
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 text-xs gap-1.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors font-medium cursor-pointer shadow-none px-3.5"
                        onClick={() => onDispatchUnit(z.label)}
                      >
                        <Send className="size-3 text-black" />
                        <span>{role === "command" ? "dispatch unit" : "alert command"}</span>
                      </Button>
                    </div>
                  )}
                </div>
              )
            })
        )}
      </div>
    </div>
  )
}
