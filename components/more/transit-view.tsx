"use client"

import { Train, Car, Bus, Sparkles, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"
import { useApp } from "@/lib/state/app-context"
import { useLiveSnapshot } from "@/hooks/use-live-snapshot"

/**
 * TransitView — Live transportation info panel showing metro schedule,
 * parking/rideshare details, and post-match shuttle info. Content is backed
 * by RAG knowledge chunks (k-transport-metro, k-transport-parking) so the AI
 * copilot can answer follow-up questions about any item shown here.
 */
export function TransitView() {
  const { t } = useApp()
  const { snapshot } = useLiveSnapshot()

  // Simulate live queue wait for Gate B (nearest to metro) from the live feed
  const gateBQueue = snapshot?.queues.find((q) => q.id === "q-gate-b")
  const gateBWait = gateBQueue?.waitMinutes ?? 8

  const transitModes = [
    {
      icon: Train,
      titleKey: "transit.metro.title" as const,
      descKey: "transit.metro.desc" as const,
      color: "bg-sky-500/15 text-sky-400 border-sky-500/20",
      iconColor: "text-sky-400",
      liveInfo: `Gate B security: ~${gateBWait} min wait`,
    },
    {
      icon: Car,
      titleKey: "transit.parking.title" as const,
      descKey: "transit.parking.desc" as const,
      color: "bg-violet-500/15 text-violet-400 border-violet-500/20",
      iconColor: "text-violet-400",
      liveInfo: null,
    },
    {
      icon: Bus,
      titleKey: "transit.rideshare.title" as const,
      descKey: "transit.rideshare.desc" as const,
      color: "bg-amber-500/15 text-amber-400 border-amber-500/20",
      iconColor: "text-amber-400",
      liveInfo: null,
    },
  ]

  return (
    <div className="mx-auto max-w-2xl py-6 flex flex-col gap-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-sky-500/15 border border-sky-500/20">
            <Train className="size-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-2xl font-medium tracking-tight lowercase text-white">{t("transit.title")}</h1>
            <p className="text-xs text-white/40 lowercase tracking-tight mt-0.5">{t("transit.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Transit Mode Cards */}
      <div className="flex flex-col gap-4">
        {transitModes.map((mode) => {
          const Icon = mode.icon
          return (
            <div
              key={mode.titleKey}
              className="bg-neutral-900/90 backdrop-blur border border-white/5 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/10"
            >
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${mode.color}`}>
                <Icon className={`size-5 ${mode.iconColor}`} />
              </div>
              <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                <h3 className="text-sm font-medium lowercase tracking-tight text-white">{t(mode.titleKey)}</h3>
                <p className="text-xs text-white/60 leading-relaxed lowercase tracking-tight">{t(mode.descKey)}</p>
                {mode.liveInfo && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-sky-400" />
                    </span>
                    <span className="text-[11px] text-sky-400 font-medium lowercase tracking-tight flex items-center gap-1">
                      <Clock className="size-3" />
                      {mode.liveInfo}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Copilot CTA — connects transportation to the GenAI layer */}
      <div className="bg-neutral-900/90 backdrop-blur border border-white/5 rounded-2xl p-5 flex items-center gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10">
          <Sparkles className="size-5 text-white animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/60 leading-relaxed lowercase tracking-tight">{t("transit.aiTip")}</p>
        </div>
        <Link
          href="/assistant"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-black text-xs font-medium lowercase tracking-tight hover:bg-neutral-200 transition-colors shrink-0"
        >
          <MessageSquare className="size-3.5" />
          <span>ask copilot</span>
        </Link>
      </div>
    </div>
  )
}
