"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Sparkles, MapPin, Trophy, MessageSquare, Clock, ChevronRight, AlertTriangle, HelpCircle } from "lucide-react"
import { AssistantView } from "@/components/assistant/assistant-view"
import { useApp } from "@/lib/state/app-context"

export function FanView() {
  const { t } = useApp()
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8 min-h-screen flex flex-col justify-start animate-fade-up">

      {/* ── 1. Normalized Scoreboard Widget (max-w-3xl header banner size) ── */}
      <div className="w-full max-w-3xl mx-auto mb-6 rounded-xl bg-card border border-border overflow-hidden shadow-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        {/* Tournament label */}
        <div className="px-5 py-2 border-b border-border bg-muted/40">
          <span className="text-[11px] font-mono text-muted-foreground tracking-wide uppercase">
            {t("fan.scoreboard.tourney")}
          </span>
        </div>

        {/* Compact match body */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 px-6 py-5">
          {/* Home team */}
          <div className="flex flex-col items-center gap-2 w-24">
            <div className="size-12 sm:size-14 rounded-lg bg-red-600 flex items-center justify-center text-white text-2xl font-bold shadow">
              ✚
            </div>
            <span className="text-sm font-semibold text-foreground tracking-wide">Switzerland</span>
          </div>

          {/* Home score */}
          <span className="text-4xl sm:text-5xl font-bold text-foreground tabular-nums font-mono">0</span>

          {/* Match status */}
          <div className="flex flex-col items-center gap-1 px-3 text-center">
            <span className="text-sm font-semibold text-foreground">{t("fan.scoreboard.fulltime")}</span>
            <span className="text-xs text-muted-foreground">{t("fan.scoreboard.today")}</span>
            <span className="text-xs text-muted-foreground font-mono bg-foreground/10 px-2 py-0.5 rounded-full">{t("fan.scoreboard.penalties")}</span>
          </div>

          {/* Away score */}
          <span className="text-4xl sm:text-5xl font-bold text-foreground tabular-nums font-mono">0</span>

          {/* Away team */}
          <div className="flex flex-col items-center gap-2 w-24">
            <div className="size-12 sm:size-14 rounded-lg overflow-hidden shadow flex flex-col">
              <div className="flex-1 bg-[#FCD116]" />
              <div className="flex-1 bg-[#003893]" />
              <div className="flex-1 bg-[#CE1126]" />
            </div>
            <span className="text-sm font-semibold text-foreground tracking-wide">Colombia</span>
          </div>
        </div>
      </div>

      {/* ── 2. Responsive Proportional Grid Layout (lg:grid-cols-3) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mt-2">

        {/* LEFT PANEL (1 column): Vertical Stack for Quick Actions, Emergency Options & Info */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          {/* Hero text */}
          <div className="flex flex-col gap-3">
            <p className="mono-label text-xs uppercase tracking-widest text-muted-foreground">{t("fan.hero.label")}</p>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-snug">
              {t("fan.hero.title1")}<br />
              <span className="text-muted-foreground font-light">{t("fan.hero.title2")}</span>
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              {t("fan.hero.desc")}
            </p>
          </div>

          {/* Quick Action Navigation & Emergency Options */}
          <div className="flex flex-col gap-2.5">
            <Link
              href="/fan/wayfinding"
              className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border hover:border-foreground/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-foreground">{t("fan.chat.mapBtn")}</div>
                  <div className="text-[11px] text-muted-foreground">{t("fan.pill.fastest")}</div>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </Link>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border">
              <div className="size-8 rounded-lg bg-foreground/10 flex items-center justify-center text-foreground shrink-0">
                <Clock className="size-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-foreground">{t("fan.pill.kickoff")}</div>
                <div className="text-[11px] text-muted-foreground">Matchday Schedule</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border">
              <div className="size-8 rounded-lg bg-foreground/10 flex items-center justify-center text-foreground shrink-0">
                <Sparkles className="size-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-foreground">{t("fan.pill.sensory")}</div>
                <div className="text-[11px] text-muted-foreground">Calm Zones & Sensory Guide</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border">
              <div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <AlertTriangle className="size-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-foreground">Emergency Services</div>
                <div className="text-[11px] text-muted-foreground">First Aid & Security Hubs</div>
              </div>
            </div>
          </div>

          {/* Trophy Live Video Card */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-muted group transition-all duration-500 relative">
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
                <div className="size-10 rounded-full bg-foreground/5 border border-border flex items-center justify-center">
                  <Trophy className="size-5 text-muted-foreground" />
                </div>
              </div>
            )}
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 border border-border">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full rounded-full bg-foreground opacity-40 animate-pulse-ring" />
                <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
              </span>
              <span className="mono-label text-[11px]">{t("fan.pill.trophy")}</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (2 columns): Fixed Proportional Height AI Chat Display Box */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <p className="mono-label text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <MessageSquare className="size-3.5" />
              <span>{t("fan.chat.label")}</span>
            </p>
            <Link href="/fan/wayfinding" className="pill-btn text-xs text-muted-foreground hover:text-foreground">
              <span>{t("fan.chat.mapBtn")}</span>
              <ChevronRight className="size-3" />
            </Link>
          </div>

          <div className="w-full h-[65vh] max-h-[650px] bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col overflow-hidden p-5 sm:p-6 shadow-xl">
            <AssistantView />
          </div>
        </div>

      </div>

    </div>
  )
}
