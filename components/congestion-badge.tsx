"use client"

import type { Congestion } from "@/lib/types"
import { CONGESTION_VAR, congestionLabelKey } from "@/lib/congestion"
import { useApp } from "@/lib/state/app-context"
import { cn } from "@/lib/utils"

export function CongestionBadge({ level, className }: { level: Congestion; className?: string }) {
  const { t } = useApp()
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] border border-[#e5e5e5]/15 transition-all duration-300",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklch, ${CONGESTION_VAR[level]} 20%, rgba(23, 23, 23, 0.95))`,
        color: CONGESTION_VAR[level],
      }}
    >
      <span className="size-1.5 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: CONGESTION_VAR[level] }} />
      <span>{t(congestionLabelKey(level))}</span>
    </span>
  )
}
