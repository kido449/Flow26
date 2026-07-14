"use client"

import { useMemo, useState } from "react"
import { Users, Sparkles, RefreshCw } from "lucide-react"
import { useLiveSnapshot } from "@/hooks/use-live-snapshot"
import { useApp } from "@/lib/state/app-context"
import { getMapService } from "@/lib/services/map-service"
import { toast } from "sonner"
import { CrowdKpiGrid } from "@/components/crowd/crowd-kpi-grid"
import { CrowdHeatmapCard } from "@/components/crowd/crowd-heatmap-card"
import { CrowdZonesList } from "@/components/crowd/crowd-zones-list"
import { CrowdQueuesList } from "@/components/crowd/crowd-queues-list"

export function CrowdView() {
  const { t, role } = useApp()
  const { snapshot, loading } = useLiveSnapshot(4000)
  const mapService = getMapService()
  const pois = useMemo(() => mapService.getPois(), [mapService])

  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null)
  const [queueCategory, setQueueCategory] = useState<"all" | "gates" | "amenities">("all")

  const zones = snapshot?.zones ?? []
  const queues = snapshot?.queues ?? []

  // Derived stats
  const busiestZone = useMemo(() => {
    if (!zones.length) return null
    return [...zones].sort((a, b) => b.occupancy / b.capacity - a.occupancy / a.capacity)[0]
  }, [zones])

  const calmestZone = useMemo(() => {
    if (!zones.length) return null
    return [...zones].sort((a, b) => a.occupancy / a.capacity - b.occupancy / b.capacity)[0]
  }, [zones])

  const longestQueue = useMemo(() => {
    if (!queues.length) return null
    return [...queues].sort((a, b) => b.waitMinutes - a.waitMinutes)[0]
  }, [queues])

  const totalOccupancy = useMemo(() => zones.reduce((acc, z) => acc + z.occupancy, 0), [zones])
  const totalCapacity = useMemo(() => zones.reduce((acc, z) => acc + z.capacity, 0), [zones])

  const selectedZone = useMemo(() => zones.find((z) => z.id === selectedZoneId), [zones, selectedZoneId])

  function handleSelectPoiOnMap(poiId: string) {
    const poi = pois.find((p) => p.id === poiId)
    if (poi) {
      setSelectedZoneId((prev) => (prev === poi.zoneId ? null : poi.zoneId))
    }
  }

  function handleDispatchUnit(targetName: string) {
    toast.success(`Support team dispatched to ${targetName}.`, {
      description: "Estimated arrival in 3-5 minutes.",
    })
  }

  function handleOpenExpressLane(targetName: string) {
    toast.success(`Express overflow lane requested for ${targetName}.`, {
      description: "Command Center notified to adjust gate barriers.",
    })
  }

  const formatTime = (ts?: number) => {
    if (!ts) return "Just now"
    const date = new Date(ts)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white text-black font-bold">
            <Users className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-medium tracking-tight lowercase text-white">{t("crowd.title")}</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium lowercase tracking-tight text-white border border-white/10">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex size-1.5 rounded-full bg-white"></span>
                </span>
                <span>live feed</span>
              </span>
            </div>
            <p className="text-xs text-white/40 lowercase tracking-tight mt-0.5">{t("crowd.subtitle")}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-white/40 lowercase tracking-tight">
          <span className="flex items-center gap-2 bg-neutral-800 px-3 py-1.5 rounded-full border border-white/5">
            <RefreshCw className={`size-3.5 text-white ${loading ? "animate-spin" : ""}`} />
            <span>{t("crowd.updated")}: <strong className="text-white font-medium">{formatTime(snapshot?.updatedAt)}</strong></span>
          </span>
        </div>
      </header>

      {/* Role Notice Banner */}
      <div className="flex items-center gap-3 rounded-full bg-neutral-900/90 backdrop-blur px-5 py-3 text-xs md:text-sm text-white border border-white/5 shadow-none">
        <Sparkles className="size-4 shrink-0 text-white animate-pulse" />
        <span className="flex-1 font-medium lowercase tracking-tight">{t(`crowd.roleNotice.${role}` as any)}</span>
      </div>

      {/* KPI Overview Grid */}
      <CrowdKpiGrid
        snapshot={snapshot}
        loading={loading}
        busiestZone={busiestZone}
        calmestZone={calmestZone}
        longestQueue={longestQueue}
        totalOccupancy={totalOccupancy}
        totalCapacity={totalCapacity}
        t={t}
      />

      {/* Live Heatmap Card */}
      <CrowdHeatmapCard
        zones={zones}
        pois={pois}
        selectedZone={selectedZone}
        selectedZoneId={selectedZoneId}
        onSelectPoi={handleSelectPoiOnMap}
        onClearFilter={() => setSelectedZoneId(null)}
        t={t}
      />

      {/* 2-Column Details Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CrowdZonesList
          zones={zones}
          selectedZoneId={selectedZoneId}
          loading={loading}
          role={role}
          onDispatchUnit={handleDispatchUnit}
          t={t}
        />

        <CrowdQueuesList
          queues={queues}
          zones={zones}
          selectedZoneId={selectedZoneId}
          queueCategory={queueCategory}
          onSelectCategory={setQueueCategory}
          loading={loading}
          role={role}
          onOpenExpressLane={handleOpenExpressLane}
          t={t}
        />
      </div>
    </div>
  )
}
