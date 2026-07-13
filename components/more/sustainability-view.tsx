"use client"

import { Leaf, Droplets, Sun, Bus, Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useApp } from "@/lib/state/app-context"

/**
 * SustainabilityView — Real sustainability info panel showing the stadium's
 * environmental programs. Content is backed by RAG knowledge chunks so the
 * AI copilot can answer follow-up questions about any item shown here.
 */
export function SustainabilityView() {
  const { t } = useApp()

  const programs = [
    {
      icon: Droplets,
      titleKey: "sustainability.waste.title" as const,
      descKey: "sustainability.waste.desc" as const,
      color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      icon: Sun,
      titleKey: "sustainability.energy.title" as const,
      descKey: "sustainability.energy.desc" as const,
      color: "bg-amber-500/15 text-amber-400 border-amber-500/20",
      iconColor: "text-amber-400",
    },
    {
      icon: Bus,
      titleKey: "sustainability.transport.title" as const,
      descKey: "sustainability.transport.desc" as const,
      color: "bg-sky-500/15 text-sky-400 border-sky-500/20",
      iconColor: "text-sky-400",
    },
  ]

  return (
    <div className="mx-auto max-w-2xl py-6 flex flex-col gap-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/20">
            <Leaf className="size-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-medium tracking-tight lowercase text-white">{t("sustainability.title")}</h1>
            <p className="text-xs text-white/40 lowercase tracking-tight mt-0.5">{t("sustainability.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Program Cards */}
      <div className="flex flex-col gap-4">
        {programs.map((program) => {
          const Icon = program.icon
          return (
            <div
              key={program.titleKey}
              className="bg-neutral-900/90 backdrop-blur border border-white/5 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/10"
            >
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${program.color}`}>
                <Icon className={`size-5 ${program.iconColor}`} />
              </div>
              <div className="flex flex-col gap-1.5 min-w-0">
                <h3 className="text-sm font-medium lowercase tracking-tight text-white">{t(program.titleKey)}</h3>
                <p className="text-xs text-white/60 leading-relaxed lowercase tracking-tight">{t(program.descKey)}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Copilot CTA — connects sustainability to the GenAI layer */}
      <div className="bg-neutral-900/90 backdrop-blur border border-white/5 rounded-2xl p-5 flex items-center gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10">
          <Sparkles className="size-5 text-white animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/60 leading-relaxed lowercase tracking-tight">{t("sustainability.aiTip")}</p>
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
