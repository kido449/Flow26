"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Sparkles, MapPin, Trophy, Clock, ChevronRight, AlertTriangle, ShieldCheck } from "lucide-react"
import { AssistantView } from "@/components/assistant/assistant-view"
import { useApp } from "@/lib/state/app-context"

export function FanView() {
  const { t } = useApp()
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden flex items-center justify-center py-10">
      {/* ── Hard-Bounded Dashboard Frame (Center Container) ── */}
      <div className="relative z-20 w-full max-w-[1200px] h-[85vh] max-h-[800px] bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mx-4">
        
        {/* ── Top Row: Scoreboard ── */}
        <div className="w-full h-16 border-b border-white/10 px-6 flex items-center justify-between bg-black/40 shrink-0" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          {/* Tournament tag */}
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider hidden sm:inline">
            {t("fan.scoreboard.tourney")}
          </span>

          {/* Match items */}
          <div className="flex items-center gap-6 sm:gap-10">
            {/* Home team */}
            <div className="flex items-center gap-2">
              <div className="size-6 rounded bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                ✚
              </div>
              <span className="text-sm font-semibold text-foreground">Switzerland</span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 font-mono">
              <span className="text-xl font-bold text-foreground">0</span>
              <span className="text-xs text-muted-foreground uppercase font-sans tracking-wide">Fulltime</span>
              <span className="text-xl font-bold text-foreground">0</span>
            </div>

            {/* Away team */}
            <div className="flex items-center gap-2">
              <div className="size-6 rounded overflow-hidden flex">
                <div className="flex-1 bg-[#FCD116]" />
                <div className="flex-1 bg-[#003893]" />
                <div className="flex-1 bg-[#CE1126]" />
              </div>
              <span className="text-sm font-semibold text-foreground">Colombia</span>
            </div>
          </div>

          {/* Status pill */}
          <span className="text-xs font-mono text-muted-foreground">
            {t("fan.scoreboard.today")}
          </span>
        </div>

        {/* ── Bottom Row: Rigid Two-Column Split Interface ── */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 h-full overflow-hidden">
          
          {/* Left Column: Actions Panel */}
          <div className="border-r border-white/10 p-6 flex flex-col gap-4 overflow-y-auto bg-neutral-950/30">
            <div className="flex flex-col gap-2">
              <p className="mono-label text-xs uppercase tracking-widest text-muted-foreground">
                {t("fan.hero.label")}
              </p>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {t("fan.hero.title1")}
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                {t("fan.hero.desc")}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/fan/wayfinding"
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="size-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">{t("fan.chat.mapBtn")}</div>
                    <div className="text-[10px] text-muted-foreground">{t("fan.pill.fastest")}</div>
                  </div>
                </div>
                <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-foreground transition-all" />
              </Link>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-white/10">
                <div className="size-7 rounded-lg bg-white/10 flex items-center justify-center text-foreground shrink-0">
                  <Clock className="size-3.5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">{t("fan.pill.kickoff")}</div>
                  <div className="text-[10px] text-muted-foreground">Matchday Schedule</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-white/10">
                <div className="size-7 rounded-lg bg-white/10 flex items-center justify-center text-foreground shrink-0">
                  <Sparkles className="size-3.5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">{t("fan.pill.sensory")}</div>
                  <div className="text-[10px] text-muted-foreground">Calm Zones & Guide</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-white/10">
                <div className="size-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <AlertTriangle className="size-3.5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">Emergency Hub</div>
                  <div className="text-[10px] text-muted-foreground">First Aid & Security</div>
                </div>
              </div>
            </div>

            {/* Trophy Feed Card */}
            <div className="mt-auto w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black/40 relative shrink-0">
              <video
                src="/FIFA_trophy_with_'26'_202607062242.mp4"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                onCanPlay={() => setVideoLoaded(true)}
                className="size-full object-cover object-center"
                style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
                onError={(e) => { e.currentTarget.style.display = "none" }}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur px-2.5 py-0.5 border border-white/10">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-white opacity-60 animate-pulse-ring" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                </span>
                <span className="mono-label text-[10px]">{t("fan.pill.trophy")}</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Chat Area */}
          <div className="p-6 flex flex-col h-full bg-black/10 overflow-hidden">
            <AssistantView />
          </div>

        </div>
      </div>
    </div>
  )
}
