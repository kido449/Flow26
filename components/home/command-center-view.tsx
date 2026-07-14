"use client"

import React, { useState } from "react"
import { Activity, Users, Clock, CheckCircle2, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { CongestionBadge } from "@/components/congestion-badge"
import { useLiveSnapshot } from "@/hooks/use-live-snapshot"
import { useApp } from "@/lib/state/app-context"
import { STADIUM_NAME } from "@/lib/rag/knowledge"
import { toast } from "sonner"
import { AiInsightCard } from "@/components/home/ai-insight-card"
import { IncidentTable, INITIAL_INCIDENTS, type IncidentRow } from "@/components/home/incident-table"
import { ZoneTelemetryGrid } from "@/components/home/zone-telemetry-grid"
import { BroadcastPanel } from "@/components/home/broadcast-panel"

export function CommandCenterView() {
  const { t } = useApp()
  const { snapshot, loading } = useLiveSnapshot(3000)
  const [incidents, setIncidents] = useState<IncidentRow[]>(INITIAL_INCIDENTS)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const busiest = snapshot
    ? [...snapshot.zones].sort((a, b) => b.occupancy / b.capacity - a.occupancy / a.capacity)[0]
    : null
  const longest = snapshot ? [...snapshot.queues].sort((a, b) => b.waitMinutes - a.waitMinutes)[0] : null

  const activeCount = incidents.filter((i) => i.status !== "resolved").length

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

      {/* AI-Generated Proactive Insight Card */}
      <AiInsightCard snapshot={snapshot} loading={loading} />

      {/* Live Incident Tables */}
      <IncidentTable incidents={incidents} onResolve={resolveIncident} />

      {/* Overall Stadium Capacity & Zone Telemetry Breakdown */}
      <ZoneTelemetryGrid snapshot={snapshot} />

      {/* Emergency Mass Broadcast Control Panel */}
      <BroadcastPanel />
    </div>
  )
}
