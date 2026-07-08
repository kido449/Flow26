import { describe, expect, it } from "vitest"
import { DICTIONARIES } from "./dictionary"
import type { Locale } from "@/lib/types"

describe("Dictionary translation parity & completeness", () => {
  const locales: Locale[] = ["en", "es", "fr", "pt"]

  it("all dictionaries have app.name set to Pulse (Flow26)", () => {
    for (const locale of locales) {
      expect(DICTIONARIES[locale]["app.name"]).toBe("Pulse (Flow26)")
    }
  })

  it("es, fr, and pt have identical key set to en dictionary", () => {
    const enKeys = Object.keys(DICTIONARIES.en).sort()

    for (const locale of locales) {
      if (locale === "en") continue
      const targetKeys = Object.keys(DICTIONARIES[locale]).sort()
      expect(targetKeys).toEqual(enKeys)
    }
  })

  it("no translation values are empty strings", () => {
    for (const locale of locales) {
      const dict = DICTIONARIES[locale]
      for (const [key, value] of Object.entries(dict)) {
        expect(value.trim().length, `Key ${key} in ${locale} is empty`).toBeGreaterThan(0)
      }
    }
  })
})
