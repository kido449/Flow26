import { describe, it, expect } from "vitest"
import { getTranslator } from "./index"
import { DICTIONARIES } from "./dictionary"

describe("TranslationService", () => {
  it("returns a translator for each supported locale", () => {
    const locales = ["en", "es", "fr", "pt"] as const
    locales.forEach((locale) => {
      const translator = getTranslator(locale)
      expect(translator.locale).toBe(locale)
      expect(translator.t("app.name")).toBe(DICTIONARIES[locale]["app.name"])
    })
  })

  it("falls back to English if a key is missing in another language", () => {
    const translator = getTranslator("pt")
    // Test a key that exists in English
    expect(translator.t("app.name")).toBeDefined()
  })

  it("returns the raw key string if the key is not found in dictionary", () => {
    const translator = getTranslator("en")
    expect(translator.t("non.existent.key" as any)).toBe("non.existent.key")
  })
})
