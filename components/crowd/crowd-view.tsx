"use client"

import { useMemo, useState } from "react"
import {
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  ShieldAlert,
  CheckCircle2,
  MapPin,
  AlertTriangle,
  Radio,
  Filter,
  Sparkles,
  Send,
  RefreshCw,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CongestionBadge } from "@/components/congestion-badge"
import { StadiumMap } from "@/components/map/stadium-map"
import { useLiveSnapshot } from "@/hooks/use-live-snapshot"
import { useApp } from "@/lib/state/app-context"
import { getMapService } from "@/lib/services/map-service"
import { CONGESTION_ORDER, CONGESTION_VAR } from "@/lib/congestion"
import { toast } from "sonner"
import type { Congestion, QueuePoint, Zone } from "@/lib/types"

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

  const filteredQueues = useMemo(() => {
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

      {/* KPI Overview Grid with Staggered Diagonal Divider Layout (/) */}
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

      {/* Live Heatmap Card */}
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
              onClick={() => setSelectedZoneId(null)}
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
              onSelectPoi={handleSelectPoiOnMap}
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

      {/* 2-Column Details Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Stadium Zones List */}
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
                            onClick={() => handleDispatchUnit(z.label)}
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

        {/* Queues and Wait Times */}
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
                  onClick={() => setQueueCategory(cat)}
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
                            onClick={() => handleOpenExpressLane(q.label)}
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
      </div>
    </div>
  )
}
