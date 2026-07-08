"use client"

import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ChatSource } from "@/lib/types"
import { useApp } from "@/lib/state/app-context"

export function SourcesPanel({ sources }: { sources: ChatSource[] }) {
  const { t } = useApp()

  if (sources.length === 0) {
    return <p className="text-xs text-white/40 lowercase tracking-tight">{t("assistant.noSources")}</p>
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-1.5 text-[11px] font-medium lowercase tracking-tight text-white/40">
        <FileText className="size-3 text-white" />
        <span>{t("assistant.sources")}</span>
      </span>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((s) => (
          <span key={s.id} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-800 px-3 py-1 text-xs text-white">
            <span className="font-medium lowercase tracking-tight">{s.title}</span>
            <span className="text-[10px] tabular-nums text-white/40">({s.score.toFixed(1)})</span>
          </span>
        ))}
      </div>
    </div>
  )
}
