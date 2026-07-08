"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Activity, ArrowRight, MapPin, MessageSquare, Map as MapIcon, Users, Clock, Sparkles, Trophy } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { CongestionBadge } from "@/components/congestion-badge"
import { GlowButton } from "@/components/ui/glow-button"
import { MagicBento } from "@/components/ui/magic-bento"
import { useApp } from "@/lib/state/app-context"
import { useLiveSnapshot } from "@/hooks/use-live-snapshot"
import { STADIUM_NAME } from "@/lib/rag/knowledge"

function useQuickActions() {
  const { role } = useApp()
  const all = {
    assistant: { href: "/assistant", icon: MessageSquare, key: "nav.assistant" as const },
    wayfinding: { href: "/wayfinding", icon: MapIcon, key: "nav.wayfinding" as const },
    crowd: { href: "/crowd", icon: Users, key: "nav.crowd" as const },
  }
  if (role === "command") return [all.crowd, all.wayfinding, all.assistant]
  if (role === "staff") return [all.wayfinding, all.crowd, all.assistant]
  return [all.assistant, all.wayfinding, all.crowd]
}

export function HomeView() {
  const { t, role } = useApp()
  const { snapshot, loading } = useLiveSnapshot()
  const quickActions = useQuickActions()
  const [videoLoaded, setVideoLoaded] = useState(false)

  const busiest = snapshot
    ? [...snapshot.zones].sort((a, b) => b.occupancy / b.capacity - a.occupancy / a.capacity)[0]
    : null
  const longest = snapshot ? [...snapshot.queues].sort((a, b) => b.waitMinutes - a.waitMinutes)[0] : null

  const bentoQuickActions = quickActions.map((a) => ({
    title: t(a.key),
    description:
      a.href === "/assistant"
        ? "Grounded matchday RAG copilot answering localized stadium policy, transit schedules, and accessibility queries instantly."
        : a.href === "/wayfinding"
        ? "Interactive stadium routing with sensory-friendly corridors, accessible elevators, and express overflow lanes."
        : "Live thermal crowd density tracking, automated unit dispatch, and dynamic queue wait time estimation.",
    label: a.href === "/assistant" ? "AI Copilot" : a.href === "/wayfinding" ? "Interactive Map" : "Live Telemetry",
    href: a.href,
    icon: a.icon,
  }))

  return (
    <div className="flex flex-col gap-12 animate-fade-up">
      {/* Hero Greeting Section with Trophy Video Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
        {/* Left Column: Text & CTA Content */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.3em] text-xs text-primary">
            <MapPin className="size-3.5 text-primary shrink-0" />
            <span>{STADIUM_NAME} • organic intelligence copilot</span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[7vw] font-serif font-bold tracking-tight text-foreground leading-[0.92]">
            fifa world cup <span className="italic font-normal text-primary">copilot</span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-xl leading-relaxed font-sans mt-2">{t("home.subtitle")}</p>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mt-1">
            <Sparkles className="size-3.5 text-primary" />
            <span>{t(`role.${role}.desc`)}</span>
          </div>
          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <GlowButton href="/assistant" variant="white" className="px-8 py-4 text-base">
              {t("nav.assistant")}
            </GlowButton>
            <GlowButton href="/wayfinding" variant="dark" className="px-8 py-4 text-base">
              {t("nav.wayfinding")}
            </GlowButton>
          </div>
        </div>

        {/* Right Column: FIFA Trophy '26 Auto-Play Video Container */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Glowing Radial Halo Backlight */}
          <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-primary/30 via-amber-500/20 to-transparent blur-3xl animate-mesh-drift -z-10" />

          {/* Glass Video Frame */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-border bg-card/90 backdrop-blur shadow-2xl group transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/50 hover:shadow-primary/20 hover:scale-[1.01]">
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
                // Keep video hidden if not found yet, revealing our fallback UI below
                e.currentTarget.style.display = "none"
                setVideoLoaded(false)
              }}
            />

            {/* Fallback Overlay / Loading Skeleton */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4 bg-gradient-to-b from-transparent via-card/50 to-card transition-opacity duration-500"
              style={{ opacity: videoLoaded ? 0 : 1, pointerEvents: videoLoaded ? "none" : "auto" }}
            >
              <div className="size-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center animate-button-pulse shadow-inner">
                <Trophy className="size-10 text-primary" />
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-sm font-mono uppercase tracking-[0.25em] text-foreground font-bold">
                  fifa trophy &apos;26 video showcase
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground max-w-xs leading-relaxed">
                  loading trophy feed... <code className="text-primary font-bold">FIFA_trophy_with_&apos;26&apos;_202607062242.mp4</code>
                </span>
              </div>
            </div>

            {/* Top Right Live Telemetry Badge */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-3.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground border border-border shadow-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              <span>fifa &apos;26 trophy feed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Stats Block with Staggered Diagonal Divider Layout (/) */}
      <section aria-labelledby="live-status" className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-foreground/80">
          <Activity className="size-4 text-primary" />
          <h2 id="live-status" className="font-mono">
            {t("home.liveStatus")}
          </h2>
          <span className="relative ml-1 flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
        </div>

        <div className="bg-card/90 backdrop-blur border border-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/40">
          {/* Stat 1: Overall Fill */}
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{t("home.fill")}</span>
            {loading || !snapshot ? (
              <Skeleton className="h-10 w-28 bg-secondary rounded-xl" />
            ) : (
              <div className="flex flex-col gap-2.5">
                <span className="text-4xl font-serif font-bold tracking-tight text-foreground tabular-nums">
                  {Math.round(snapshot.overallFill * 100)}%
                </span>
                <Progress value={Math.round(snapshot.overallFill * 100)} className="h-1.5 bg-secondary" />
              </div>
            )}
          </div>

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

          <div className="hidden md:flex text-border font-light text-4xl select-none px-4">/</div>
          <div className="md:hidden border-t border-border my-1" />

          {/* Stat 3: Longest Wait Queue */}
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{t("home.longestWait")}</span>
            {loading || !longest ? (
              <Skeleton className="h-10 w-32 bg-secondary rounded-xl" />
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-bold tracking-tight text-foreground tabular-nums">{longest.waitMinutes}</span>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">{t("crowd.minutes")}</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.1em] text-muted-foreground truncate">
                  <Clock className="size-3.5 text-primary" />
                  <span className="truncate">{longest.label}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive MagicBento Grid for Matchday Core Systems */}
      <section aria-labelledby="quick-actions" className="flex flex-col gap-2">
        <h2 id="quick-actions" className="text-xs font-mono uppercase tracking-[0.3em] text-foreground/80 px-1">
          {t("home.quickActions")} • magic bento intelligence grid
        </h2>
        <MagicBento
          cards={bentoQuickActions}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="217, 165, 32"
        />
      </section>
    </div>
  )
}
