import { describe, it, expect } from "vitest"
import {
  CONGESTION_ORDER,
  congestionLabelKey,
  CONGESTION_BG,
  CONGESTION_TEXT,
  CONGESTION_VAR,
} from "./congestion"
import type { Congestion } from "./types"

describe("congestion helpers", () => {
  it("defines the correct order of congestion levels", () => {
    expect(CONGESTION_ORDER).toEqual(["low", "moderate", "high", "critical"])
  })

  it("generates correct translation keys for congestion levels", () => {
    expect(congestionLabelKey("low")).toBe("congestion.low")
    expect(congestionLabelKey("moderate")).toBe("congestion.moderate")
    expect(congestionLabelKey("high")).toBe("congestion.high")
    expect(congestionLabelKey("critical")).toBe("congestion.critical")
  })

  it("provides Tailwind background classes for all levels", () => {
    CONGESTION_ORDER.forEach((level: Congestion) => {
      expect(CONGESTION_BG[level]).toBe(`bg-congestion-${level}`)
    })
  })

  it("provides Tailwind text classes for all levels", () => {
    CONGESTION_ORDER.forEach((level: Congestion) => {
      expect(CONGESTION_TEXT[level]).toBe(`text-congestion-${level}`)
    })
  })

  it("provides CSS variable mappings for all levels", () => {
    CONGESTION_ORDER.forEach((level: Congestion) => {
      expect(CONGESTION_VAR[level]).toBe(`var(--congestion-${level})`)
    })
  })
})
