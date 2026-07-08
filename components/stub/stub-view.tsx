"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, CheckCircle, BellRing, Layers, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/state/app-context"
import { toast } from "sonner"
import type { TranslationKey } from "@/lib/services/translation"

interface StubViewProps {
  titleKey: TranslationKey
  descKey: TranslationKey
  icon: LucideIcon
  actionLabel?: string
  mockNotificationText?: string
}

export function StubView({
  titleKey,
  descKey,
  icon: Icon,
  actionLabel = "simulate module interaction",
  mockNotificationText = "test signal sent successfully to command center.",
}: StubViewProps) {
  const { t, role } = useApp()
  const [simulated, setSimulated] = useState(false)

  function handleSimulate() {
    setSimulated(true)
    toast.success(mockNotificationText, {
      description: `role context (${role}) attached to request.`,
    })
    setTimeout(() => setSimulated(false), 3000)
  }

  return (
    <div className="mx-auto max-w-2xl py-6 flex flex-col gap-6 animate-fade-up">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1.5 text-white/70 hover:text-white rounded-full font-medium lowercase tracking-tight">
          <Link href="/more">
            <ArrowLeft className="size-4" />
            <span>{t("stub.back" as any)}</span>
          </Link>
        </Button>
      </div>

      <div className="border border-white/5 shadow-none overflow-hidden relative bg-neutral-900/90 backdrop-blur rounded-3xl p-8 flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="relative">
            <div className="flex size-16 items-center justify-center rounded-full bg-neutral-800 text-white border border-white/10">
              <Icon className="size-8" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-white text-black font-bold border border-black">
              <Sparkles className="size-3" />
            </span>
          </div>

          <span className="rounded-full bg-neutral-800 text-white border border-white/10 font-medium px-3.5 py-1 text-xs mt-1 lowercase tracking-tight">
            {t("stub.badge")}
          </span>

          <h1 className="text-3xl font-medium tracking-tight lowercase text-white text-balance mt-2">
            {t(titleKey)}
          </h1>

          <p className="text-sm max-w-md mx-auto text-balance leading-relaxed text-white/70 lowercase tracking-tight">
            {t(descKey)}
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
          <div className="flex items-start gap-3 rounded-2xl bg-neutral-800/50 p-4 border border-white/5">
            <ShieldCheck className="size-5 text-white shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-medium lowercase tracking-tight text-white">architectural readiness</h4>
              <p className="text-xs text-white/70 leading-relaxed lowercase tracking-tight">
                {t("stub.body")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-neutral-800/30 p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium lowercase tracking-tight text-white flex items-center gap-1.5">
                <Layers className="size-3.5" />
                <span>active role scaffolding: <strong className="text-white font-medium">{role}</strong></span>
              </span>
              <span className="text-[11px] text-white/40 lowercase tracking-tight">live simulation</span>
            </div>
            <p className="text-xs text-white/70 lowercase tracking-tight leading-relaxed">
              {role === "command" && "in production, command center operators will have full read/write override privileges for this service."}
              {role === "staff" && "in production, concierge and stadium staff will receive live telemetry and task assignments through this view."}
              {role === "fan" && "in production, fans will receive real-time push updates and personalized ai guidance for this module."}
            </p>
            <div className="pt-2 flex justify-end">
              <Button
                variant={simulated ? "secondary" : "default"}
                size="sm"
                onClick={handleSimulate}
                disabled={simulated}
                className={`text-xs gap-1.5 rounded-full font-medium lowercase tracking-tight px-4 h-9 shadow-none cursor-pointer ${
                  simulated ? "bg-neutral-800 text-white" : "bg-white text-black hover:bg-neutral-200"
                }`}
              >
                {simulated ? (
                  <>
                    <CheckCircle className="size-3.5 text-emerald-400" />
                    <span>signal sent</span>
                  </>
                ) : (
                  <>
                    <BellRing className="size-3.5" />
                    <span>{actionLabel}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/40 lowercase tracking-tight">
          <span>next.js 16 • turbopack • multi-locale</span>
          <Button variant="secondary" size="sm" asChild className="text-xs rounded-full bg-neutral-800 text-white hover:bg-neutral-700 px-3.5 font-medium shadow-none">
            <Link href="/more">explore all modules</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
