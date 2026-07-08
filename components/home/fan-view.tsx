"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Sparkles, MapPin, Trophy, ArrowRight, MessageSquare, Map as MapIcon, Clock, ChevronRight } from "lucide-react"
import { AssistantView } from "@/components/assistant/assistant-view"
import { useApp } from "@/lib/state/app-context"
import { STADIUM_NAME } from "@/lib/rag/knowledge"

export function FanView() {
  const { t, role } = useApp()
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <div className="flex flex-col gap-10 animate-fade-up">

      {/* ── Live Match Scoreboard ── */}
      <div className="w-full rounded-xl bg-card border border-border overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        {/* Tournament label */}
        <div className="px-4 py-2 border-b border-border">
          <span className="text-[11px] font-mono text-muted-foreground tracking-wide">
            2026 FIFA World Cup &nbsp;·&nbsp; Round of 16
          </span>
        </div>

        {/* Match body */}
        <div className="flex items-center justify-between px-6 py-5">
          {/* Home team */}
          <div className="flex flex-col items-center gap-2 min-w-[90px]">
            <div className="size-14 rounded-lg bg-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              ✚
            </div>
            <span className="text-sm font-semibold text-foreground tracking-wide">Switzerland</span>
          </div>

          {/* Home score */}
          <span className="text-5xl font-bold text-foreground tabular-nums font-mono">0</span>

          {/* Match status */}
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-sm font-semibold text-foreground">Full-time</span>
            <span className="text-xs text-muted-foreground">Today</span>
            <span className="text-xs text-muted-foreground font-mono">Fine: 4-3</span>
          </div>

          {/* Away score */}
          <span className="text-5xl font-bold text-foreground tabular-nums font-mono">0</span>

          {/* Away team */}
          <div className="flex flex-col items-center gap-2 min-w-[90px]">
            <div className="size-14 rounded-lg overflow-hidden shadow-lg flex flex-col">
              <div className="flex-1 bg-[#FCD116]" />
              <div className="flex-1 bg-[#003893]" />
              <div className="flex-1 bg-[#CE1126]" />
            </div>
            <span className="text-sm font-semibold text-foreground tracking-wide">Colombia</span>
          </div>
        </div>
      </div>


      {/* ── [ 01 ] Hero ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2 pb-8 border-b border-border">
        <div className="lg:col-span-7 flex flex-col gap-5">
          <p className="mono-label">[ 01 ] {STADIUM_NAME} • Matchday Fan Copilot</p>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
            Fan Copilot<br />
            <span className="text-muted-foreground font-light">Assistant</span>
          </h1>

          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed font-light">
            Ask any question. Get instant, multilingual answers, live queue heatmaps, and AI-optimised Pathfinder routing. Grounded in official FIFA World Cup 2026 stadium policies and real-time sensory corridor data.
          </p>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="pill-btn text-muted-foreground">
              <Clock className="size-3" />
              <span>Kickoff in 2h 15m</span>
            </span>
            <span className="pill-btn text-muted-foreground">
              <MapPin className="size-3" />
              <span>Gate 4 Fastest</span>
            </span>
            <span className="pill-btn text-muted-foreground">
              <Sparkles className="size-3" />
              <span>Sensory Safe Corridors</span>
            </span>
          </div>
        </div>

        {/* Trophy feed panel */}
        <div className="lg:col-span-5 relative">
          <div className="w-full aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden border border-border bg-muted group transition-all duration-500 hover:border-foreground/30">
            <video
              src="/FIFA_trophy_with_'26'_202607062242.mp4"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              onCanPlay={() => setVideoLoaded(true)}
              className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
              onError={(e) => { e.currentTarget.style.display = "none" }}
            />
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 rounded-full bg-foreground/5 border border-border flex items-center justify-center">
                  <Trophy className="size-6 text-muted-foreground" />
                </div>
              </div>
            )}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-3 py-1 border border-border">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full rounded-full bg-foreground opacity-40 animate-pulse-ring" />
                <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
              </span>
              <span className="mono-label">Live Trophy Feed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── [ 02 ] Matchday Chat ── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="mono-label">[ 02 ] AI Copilot Chat</p>
          <Link href="/fan/wayfinding" className="pill-btn text-muted-foreground hover:text-foreground">
            <span>Pathfinder AI Map</span>
            <ChevronRight className="size-3" />
          </Link>
        </div>

        <div className="border border-border rounded-lg p-5 sm:p-6 bg-card">
          <AssistantView />
        </div>
      </section>

    </div>
  )
}
