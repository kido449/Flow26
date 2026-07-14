"use client"

import React from "react"
import { Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StadiumMap } from "@/components/map/stadium-map"
import { CONGESTION_ORDER, CONGESTION_VAR } from "@/lib/congestion"
import type { Congestion, Zone, Poi } from "@/lib/types"

interface CrowdHeatmapCardProps {
  zones: Zone[]
  pois: Poi[]
  selectedZone: Zone | undefined
  selectedZoneId: string | null
  onSelectPoi: (poiId: string) => void
  onClearFilter: () => void
  t: (key: any) => string
}

export function CrowdHeatmapCard({
  zones,
  pois,
  selectedZone,
  selectedZoneId,
  onSelectPoi,
  onClearFilter,
  t,
}: CrowdHeatmapCardProps) {
  return (
    <div className="bg-neutral-900/90 backdrop-blur border border-white/5 rounded-3xl overflow-hidden shadow-none">
      <div className="py-4 px-6 border-b border-white/5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Activity className="size-4 text-white" />
          <h3 className="text-sm font-medium lowercase tracking-tight text-white">{t("crowd.liveHeatmap")}</h3>
          {selectedZone && (
            <span className="rounded-full bg-neutral-800 text-white px-3 py-0.5 text-xs font-medium lowercase tracking-tight border border-white/10">
              filtered: {selectedZone.label}
            </span>
          )}
        </div>
        {selectedZoneId && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs px-3 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors lowercase tracking-tight font-medium"
            onClick={onClearFilter}
          >
            clear filter
          </Button>
        )}
      </div>
      <div className="p-0">
        <div className="aspect-[21/9] min-h-[260px] max-h-[380px] w-full bg-black/40 relative">
          <StadiumMap
            zones={zones}
            pois={pois}
            route={null}
            fromId={null}
            toId={null}
            onSelectPoi={onSelectPoi}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 px-6 py-3">
          <div className="flex items-center gap-4 flex-wrap">
            {CONGESTION_ORDER.map((c: Congestion) => (
              <div key={c} className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: CONGESTION_VAR[c] }}
                  aria-hidden
                />
                <span className="text-xs font-medium lowercase tracking-tight text-white/70">{t(`congestion.${c}`)}</span>
              </div>
            ))}
          </div>
          <span className="text-xs text-white/40 lowercase tracking-tight hidden md:inline">
            click any point on the map to filter zones and queues below
          </span>
        </div>
      </div>
    </div>
  )
}
