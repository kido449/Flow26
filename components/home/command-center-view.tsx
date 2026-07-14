"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  Activity,
  ShieldAlert,
  Users,
  Radio,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Send,
  RotateCcw,
  MapPin,
  Trophy,
  Filter,
  BarChart3,
  Sparkles,
  HeartPulse,
  Check,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { CongestionBadge } from "@/components/congestion-badge"
import { useLiveSnapshot } from "@/hooks/use-live-snapshot"
import { useApp } from "@/lib/state/app-context"
import { STADIUM_NAME } from "@/lib/rag/knowledge"
import { summarizeLiveFeed, type LiveSnapshot } from "@/lib/rag/live-feed"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface IncidentRow {
  id: string
  code: string
  time: string
  type: string
  zone: string
  severity: "critical" | "high" | "normal"
  unit: string
  status: "dispatched" | "in_progress" | "resolved"
}

const INITIAL_INCIDENTS: IncidentRow[] = [
  {
    id: "inc1",
    code: "#INC-409",
    time: "19:52",
    type: "Gate 3 Egress Bottleneck & Thermal Surge",
    zone: "Gate 3 South Plaza",
    severity: "critical",
    unit: "VOL-01 & SEC-12",
    status: "in_progress",
  },
  {
    id: "inc2",
    code: "#INC-408",
    time: "19:48",
    type: "Sensory Corridor Acoustic Barrier Adjustment",
    zone: "Concourse B West",
    severity: "high",
    unit: "VOL-02 & FAC-04",
    status: "dispatched",
  },
  {
    id: "inc3",
    code: "#INC-405",
    time: "19:35",
    type: "VIP Shuttle Arrival Delay & Credential Check",
    zone: "South Executive Tunnel",
    severity: "high",
    unit: "VOL-03 & CON-01",
    status: "in_progress",
  },
  {
    id: "inc4",
    code: "#INC-401",
    time: "19:15",
    type: "Concession Stand 4A Automated Soap Sensor Maintenance",
    zone: "Section 112 Amenities",
    severity: "normal",
    unit: "FAC-08",
    status: "resolved",
  },
]

/**
 * AiInsightCard — Read-only proactive intelligence card that sends
 * the current live-feed summary to /api/chat and displays the AI's
 * operational analysis. Includes loading, error, and fallback states.
 */
function AiInsightCard({ snapshot, loading }: { snapshot: LiveSnapshot | null; loading: boolean }) {
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

export function CommandCenterView() {
  const { t } = useApp()
  const { snapshot, loading } = useLiveSnapshot(3000)
  const [incidents, setIncidents] = useState<IncidentRow[]>(INITIAL_INCIDENTS)
  const [filter, setFilter] = useState<"all" | "active" | "critical" | "resolved">("active")
  const [broadcastMsg, setBroadcastMsg] = useState("")
  const [broadcasting, setBroadcasting] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const busiest = snapshot
    ? [...snapshot.zones].sort((a, b) => b.occupancy / b.capacity - a.occupancy / a.capacity)[0]
    : null
  const longest = snapshot ? [...snapshot.queues].sort((a, b) => b.waitMinutes - a.waitMinutes)[0] : null

  const activeCount = incidents.filter((i) => i.status !== "resolved").length

  const filteredIncidents = incidents.filter((item) => {
    if (filter === "active") return item.status !== "resolved"
    if (filter === "critical") return item.severity === "critical"
    if (filter === "resolved") return item.status === "resolved"
    return true
  })

  function resolveIncident(id: string) {
    setIncidents((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "resolved" ? "in_progress" : "resolved"
          toast.success(`Incident ${item.code} ${nextStatus === "resolved" ? "marked resolved" : "reopened"}`, {
            description: nextStatus === "resolved" ? "Unit released back to standby ops." : "Assigned unit notified of reopening.",
          })
          return { ...item, status: nextStatus }
        }
        return item
      })
    )
  }

  function handleBroadcast(e: React.FormEvent) {
    e.preventDefault()
    if (!broadcastMsg.trim()) return
    setBroadcasting(true)
    setTimeout(() => {
      setBroadcasting(false)
      toast.success("Mass Broadcast Transmitted!", {
        description: `Delivered to 84,200 Fan devices & 420 Staff terminals: "${broadcastMsg}"`,
      })
      setBroadcastMsg("")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-10 animate-fade-up pt-2">
      {/* Command Center Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-card/90 backdrop-blur border border-border rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-none">
        <div className="absolute -top-[50%] left-[20%] size-[60vw] rounded-full bg-gradient-to-br from-primary/25 via-amber-600/15 to-transparent blur-3xl pointer-events-none" />

        <div className="lg:col-span-7 flex flex-col gap-4 z-10">
          <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span>{STADIUM_NAME} • global command operations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-foreground leading-tight">
            stadium command <span className="italic font-normal text-primary">center</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl font-sans leading-relaxed">
            {t("role.command.desc")} Live LiDAR & thermal sensor fusion, stadium fill capacity monitoring, real-time incident command dispatch, and emergency mass broadcast controls.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-400 px-3 py-1 text-xs font-mono uppercase tracking-[0.15em] border border-emerald-500/30">
              <CheckCircle2 className="size-3 text-emerald-400" /> defcon: level 1 normal
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-foreground px-3 py-1 text-xs font-mono uppercase tracking-[0.15em] border border-border">
              <Activity className="size-3 text-primary" /> lidar sensors: 100% online
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-foreground px-3 py-1 text-xs font-mono uppercase tracking-[0.15em] border border-border">
              <Users className="size-3 text-primary" /> deployed staff: 420 units
            </span>
          </div>
        </div>

        {/* Right Column: Large FIFA Trophy '26 Video Showcase for Command */}
        <div className="lg:col-span-5 relative flex items-center justify-center z-10">
          {/* Glowing Radial Backlight */}
          <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-primary/30 via-amber-500/20 to-transparent blur-3xl animate-mesh-drift -z-10" />

          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-card/90 backdrop-blur shadow-2xl group transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/50 hover:shadow-primary/25 hover:scale-[1.01]">
            <video
              src="/FIFA_trophy_with_'26'_202607062242.mp4"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              onCanPlay={() => setVideoLoaded(true)}
              className="size-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 z-10 relative"
              style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
              onError={(e) => {
                e.currentTarget.style.display = "none"
                setVideoLoaded(false)
              }}
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4 bg-gradient-to-b from-transparent via-card/50 to-card transition-opacity duration-500"
              style={{ opacity: videoLoaded ? 0 : 1, pointerEvents: videoLoaded ? "none" : "auto" }}
            >
              <div className="size-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center animate-button-pulse shadow-inner">
                <Trophy className="size-8 text-primary" />
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-foreground font-bold">fifa &apos;26 trophy feed</span>
            </div>
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/80 backdrop-blur px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-primary border border-white/10 shadow-lg">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 animate-pulse-ring" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span>command cam feed #01</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards with Staggered Diagonal Dividers (/) */}
      <section id="dashboard" aria-labelledby="live-status" className="flex flex-col gap-3 scroll-mt-24">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-foreground/80">
            <Activity className="size-4 text-primary" />
            <h2 id="live-status" className="font-mono">
              stadium telemetry & capacity fill • diagonal command grid
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.15em] text-primary">real-time sync 3s</span>
        </div>

        <div className="bg-card/90 backdrop-blur border border-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/40">
          {/* Stat 1: Overall Stadium Capacity (Fill) */}
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{t("home.fill")}</span>
            {loading || !snapshot ? (
              <Skeleton className="h-10 w-28 bg-secondary rounded-xl" />
            ) : (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-serif font-bold tracking-tight text-foreground tabular-nums">
                    {Math.round(snapshot.overallFill * 100)}%
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">{Math.round(snapshot.overallFill * 84200).toLocaleString()} / 84,200</span>
                </div>
                <Progress value={Math.round(snapshot.overallFill * 100)} className="h-1.5 bg-secondary" />
              </div>
            )}
          </div>

          {/* Staggered Diagonal Divider (/) */}
          <div className="hidden md:flex text-border font-light text-4xl select-none px-4">/</div>
          <div className="md:hidden border-t border-border my-1" />

          {/* Stat 2: Busiest Area */}
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{t("home.busiest")}</span>
            {loading || !busiest ? (
              <Skeleton className="h-10 w-36 bg-secondary rounded-xl" />
            ) : (
              <div className="flex flex-col gap-2.5 items-start">
                <span className="truncate text-xl font-serif italic font-bold tracking-tight text-foreground">{busiest.label}</span>
                <CongestionBadge level={busiest.congestion} />
              </div>
            )}
          </div>

          {/* Staggered Diagonal Divider (/) */}
          <div className="hidden md:flex text-border font-light text-4xl select-none px-4">/</div>
          <div className="md:hidden border-t border-border my-1" />

          {/* Stat 3: Active Incidents & Longest Wait */}
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">active dispatches & wait</span>
            {loading || !longest ? (
              <Skeleton className="h-10 w-32 bg-secondary rounded-xl" />
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif font-bold tracking-tight text-foreground tabular-nums">{activeCount}</span>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">incidents</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{longest.waitMinutes} min max queue</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.1em] text-muted-foreground truncate">
                  <Clock className="size-3.5 text-primary" />
                  <span className="truncate">longest: {longest.label}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AI-Generated Proactive Insight Card — read-only, uses live-feed data */}
      <AiInsightCard snapshot={snapshot} loading={loading} />

      {/* Live Incident Tables */}
      <section id="incidents" className="flex flex-col gap-5 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
          <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-foreground">
            <ShieldAlert className="size-4 text-primary" />
            <span>live incident dispatch table ({incidents.length} logs)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-secondary/80 p-1 rounded-full border border-border w-fit">
            {(["active", "critical", "resolved", "all"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.15em] transition-all cursor-pointer",
                  filter === f ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f} ({f === "active" ? activeCount : f === "critical" ? incidents.filter((i) => i.severity === "critical").length : f === "resolved" ? incidents.filter((i) => i.status === "resolved").length : incidents.length})
              </button>
            ))}
          </div>
        </div>

        {/* Data Table Wrapper */}
        <div className="bg-card/90 backdrop-blur border border-border rounded-3xl overflow-hidden shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="py-4 px-6 font-semibold">Incident ID & Time</th>
                  <th className="py-4 px-6 font-semibold">Type & Description</th>
                  <th className="py-4 px-6 font-semibold">Zone / Location</th>
                  <th className="py-4 px-6 font-semibold">Severity</th>
                  <th className="py-4 px-6 font-semibold">Assigned Unit</th>
                  <th className="py-4 px-6 font-semibold text-right">Action / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {filteredIncidents.map((inc) => (
                  <tr
                    key={inc.id}
                    className={cn(
                      "transition-colors duration-200 hover:bg-secondary/40",
                      inc.status === "resolved" && "opacity-50 bg-secondary/10"
                    )}
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-primary text-xs uppercase tracking-[0.15em]">{inc.code}</span>
                        <span className="text-xs font-mono text-muted-foreground">{inc.time} UTC</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn("font-serif font-bold text-base block tracking-tight", inc.status === "resolved" && "line-through text-muted-foreground")}>
                        {inc.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-mono uppercase tracking-[0.1em] text-foreground/80 border border-border">
                        <MapPin className="size-3 text-primary" /> {inc.zone}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.15em] font-bold",
                          inc.severity === "critical"
                            ? "bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse"
                            : inc.severity === "high"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-secondary text-muted-foreground border border-border"
                        )}
                      >
                        {inc.severity}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-mono text-xs text-foreground/90 font-medium bg-secondary/80 px-2 py-1 rounded border border-border">
                        {inc.unit}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-right">
                      <Button
                        size="sm"
                        variant={inc.status === "resolved" ? "secondary" : "default"}
                        onClick={() => resolveIncident(inc.id)}
                        className={cn(
                          "rounded-full font-mono text-xs uppercase tracking-[0.15em] h-8 px-4 cursor-pointer transition-all",
                          inc.status === "resolved"
                            ? "bg-secondary text-muted-foreground hover:bg-secondary/80"
                            : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20"
                        )}
                      >
                        {inc.status === "resolved" ? (
                          <>
                            <Check className="size-3.5 text-emerald-400 mr-1" />
                            <span>Resolved</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw className="size-3.5 mr-1" />
                            <span>Mark Resolved</span>
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredIncidents.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground font-mono uppercase text-xs tracking-[0.2em]">
                      no incidents matching current filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Overall Stadium Capacity & Zone Telemetry Breakdown */}
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

      {/* Emergency Mass Broadcast Control Panel */}
      <section id="broadcast" className="bg-card/90 backdrop-blur border border-border rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-none relative scroll-mt-24 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary animate-pulse shrink-0">
              <Radio className="size-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-xl font-serif font-bold tracking-tight text-foreground">Emergency Mass Broadcast Control</h3>
              <p className="text-xs text-muted-foreground font-sans">Instantly transmit high-priority push notifications to all 84,200 Fan devices and 420 Staff terminals.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 text-red-400 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] border border-red-500/30 shrink-0 w-fit">
            <Flame className="size-3.5 animate-pulse" /> override channel ready
          </span>
        </div>

        <form onSubmit={handleBroadcast} className="flex flex-col sm:flex-row items-stretch gap-3">
          <input
            type="text"
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            placeholder="Type stadium-wide broadcast announcement (e.g. 'Post-match express shuttles departing Gate 2 North Plaza')..."
            className="flex-1 bg-secondary rounded-full border border-border px-6 py-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <Button
            type="submit"
            disabled={!broadcastMsg.trim() || broadcasting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono uppercase tracking-[0.2em] text-xs px-8 py-4 rounded-full gap-2 shadow-lg shadow-primary/25 transition-all cursor-pointer disabled:opacity-50 shrink-0 h-auto"
          >
            {broadcasting ? (
              <>
                <RotateCcw className="size-4 animate-spin" />
                <span>broadcasting...</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>transmit broadcast</span>
              </>
            )}
          </Button>
        </form>
      </section>
    </div>
  )
}
