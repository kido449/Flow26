import type { Congestion } from "@/lib/types"
import type { TranslationKey } from "@/lib/services/translation"

// Presentation helpers for the shared congestion scale. Colors reference the
// congestion tokens defined in globals.css so the whole app stays consistent.

export const CONGESTION_ORDER: Congestion[] = ["low", "moderate", "high", "critical"]

export function congestionLabelKey(c: Congestion): TranslationKey {
  return `congestion.${c}` as TranslationKey
}

// Tailwind classes keyed by congestion level.
export const CONGESTION_BG: Record<Congestion, string> = {
  low: "bg-congestion-low",
  moderate: "bg-congestion-moderate",
  high: "bg-congestion-high",
  critical: "bg-congestion-critical",
}

export const CONGESTION_TEXT: Record<Congestion, string> = {
  low: "text-congestion-low",
  moderate: "text-congestion-moderate",
  high: "text-congestion-high",
  critical: "text-congestion-critical",
}

// Foreground color to place on top of a solid congestion background.
export const CONGESTION_ON: Record<Congestion, string> = {
  low: "text-background",
  moderate: "text-background",
  high: "text-background",
  critical: "text-background",
}

export const CONGESTION_VAR: Record<Congestion, string> = {
  low: "var(--congestion-low)",
  moderate: "var(--congestion-moderate)",
  high: "var(--congestion-high)",
  critical: "var(--congestion-critical)",
}
