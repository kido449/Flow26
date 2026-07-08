"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Sparkles, MapPin, Trophy, MessageSquare, Clock, ChevronRight } from "lucide-react"
import { AssistantView } from "@/components/assistant/assistant-view"
import { useApp } from "@/lib/state/app-context"

export function FanView() {
  const { t } = useApp()
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <div className="flex flex-col gap-8 animate-fade-up w-full">

      {/* ── 1. Live Match Scoreboard (Centered, max-w-4xl wide broadcast graphic) ── */}
      <div className="w-full max-w-4xl mx-auto rounded-2xl bg-card border border-border overflow-hidden shadow-xl" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        {/* Tournament label */}
        <div className="px-5 py-2.5 border-b border-border bg-muted/30">
          <span className="text-[11px] font-mono text-muted-foreground tracking-wide uppercase">
            {t("fan.scoreboard.tourney")}
          </span>
        </div>

        {/* Match body */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 sm:py-6">
          {/* Home team */}
          <div className="flex flex-col items-center gap-2.5 min-w-[100px]">
            <div className="size-14 sm:size-16 rounded-xl bg-red-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg border border-white/10">
              ✚
            </div>
            <span className="text-sm sm:text-base font-semibold text-foreground tracking-wide">Switzerland</span>
          </div>

          {/* Home score */}
          <span className="text-5xl sm:text-6xl font-bold text-foreground tabular-nums font-mono">0</span>

          {/* Match status */}
          <div className="flex flex-col items-center gap-1.5 px-4 text-center">
            <span className="text-sm sm:text-base font-semibold text-foreground">{t("fan.scoreboard.fulltime")}</span>
            <span className="text-xs text-muted-foreground">{t("fan.scoreboard.today")}</span>
            <span className="text-xs text-muted-foreground font-mono bg-foreground/10 px-2.5 py-0.5 rounded-full">{t("fan.scoreboard.penalties")}</span>
          </div>

          {/* Away score */}
          <span className="text-5xl sm:text-6xl font-bold text-foreground tabular-nums font-mono">0</span>

          {/* Away team */}
          <div className="flex flex-col items-center gap-2.5 min-w-[100px]">
            <div className="size-14 sm:size-16 rounded-xl overflow-hidden shadow-lg flex flex-col border border-white/10">
              <div className="flex-1 bg-[#FCD116]" />
              <div className="flex-1 bg-[#003893]" />
              <div className="flex-1 bg-[#CE1126]" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-foreground tracking-wide">Colombia</span>
          </div>
        </div>
      </div>

      {/* ── 2. Responsive Two-Column Desktop Grid (Left Sticky Info Panel + Right Copilot Chat) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 sm:mt-6 w-full">

        {/* LEFT COLUMN (4 columns): Sticky Hero / Info Panel + Quick Actions + Trophy Feed */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-4">
            <p className="mono-label text-xs uppercase tracking-widest text-muted-foreground">{t("fan.hero.label")}</p>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
              {t("fan.hero.title1")}<br />
              <span className="text-muted-foreground font-light">{t("fan.hero.title2")}</span>
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              {t("fan.hero.desc")}
            </p>

            {/* Quick Action Pills */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-2">
              <Link
                href="/fan/wayfinding"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border hover:border-foreground/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="size-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-foreground">{t("fan.chat.mapBtn")}</div>
                    <div className="text-[11px] text-muted-foreground">{t("fan.pill.fastest")}</div>
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border">
                <div className="size-9 rounded-xl bg-foreground/10 flex items-center justify-center text-foreground shrink-0">
                  <Clock className="size-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-foreground">{t("fan.pill.kickoff")}</div>
                  <div className="text-[11px] text-muted-foreground">Matchday Timeline Live</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border">
                <div className="size-9 rounded-xl bg-foreground/10 flex items-center justify-center text-foreground shrink-0">
                  <Sparkles className="size-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-foreground">{t("fan.pill.sensory")}</div>
                  <div className="text-[11px] text-muted-foreground">Calm zones & live alerts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trophy feed card */}
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-muted group transition-all duration-500 relative">
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
              <span className="mono-label">{t("fan.pill.trophy")}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (8 columns): Fan Copilot Assistant Interface */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <p className="mono-label text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <MessageSquare className="size-3.5" />
              <span>{t("fan.chat.label")}</span>
            </p>
            <Link href="/fan/wayfinding" className="pill-btn text-muted-foreground hover:text-foreground">
              <span>{t("fan.chat.mapBtn")}</span>
              <ChevronRight className="size-3" />
            </Link>
          </div>

          <div className="w-full bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl min-h-[60vh] p-5 sm:p-6 sm:px-8 shadow-2xl flex flex-col">
            <AssistantView />
          </div>
        </div>

      </div>
    </div>
  )
}
