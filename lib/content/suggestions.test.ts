import { describe, expect, it } from "vitest"
import { SUGGESTIONS } from "./suggestions"
import type { Locale } from "@/lib/types"

describe("Suggestions localization integrity", () => {
  const locales: Locale[] = ["en", "es", "fr", "pt"]

  it("provides 5 starter suggestions for every supported locale", () => {
    for (const locale of locales) {
      const list = SUGGESTIONS[locale]
      expect(Array.isArray(list)).toBe(true)
      expect(list).toHaveLength(5)
      for (const q of list) {
        expect(typeof q).toBe("string")
        expect(q.length).toBeGreaterThan(10)
      }
    }
  })

  it("suggestions reference core stadium topics", () => {
    expect(SUGGESTIONS.en[0]).toContain("gate")
    expect(SUGGESTIONS.en[1]).toContain("medical")
    expect(SUGGESTIONS.en[2]).toContain("prohibited")
    expect(SUGGESTIONS.en[3]).toContain("metro")
    expect(SUGGESTIONS.en[4]).toContain("sustainability")
  })
})
