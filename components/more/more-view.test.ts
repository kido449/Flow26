import { describe, it, expect } from "vitest"
import { STUB_MODULES } from "./more-view"
import { DICTIONARIES } from "@/lib/services/translation/dictionary"
import { NAV_ITEMS } from "@/components/nav-items"

describe("Stub Modules & Navigation Configuration", () => {
  it("defines all required stub modules for Tournament Copilot", () => {
    // Transit is excluded — a real TransitView with live data replaces the stub.
    expect(STUB_MODULES.length).toBe(5)
    const slugs = STUB_MODULES.map((m) => m.slug)
    expect(slugs).toContain("accessibility")
    expect(slugs).toContain("vip")
    expect(slugs).toContain("emergency")
    expect(slugs).toContain("concessions")
    expect(slugs).toContain("incidents")
  })

  it("ensures every stub module has valid title and description keys in all language dictionaries", () => {
    const locales = ["en", "es", "fr", "pt"] as const
    STUB_MODULES.forEach((mod) => {
      locales.forEach((locale) => {
        expect(DICTIONARIES[locale][mod.titleKey]).toBeDefined()
        expect(DICTIONARIES[locale][mod.descKey]).toBeDefined()
      })
    })
  })

  it("ensures stub badge and body keys exist in all language dictionaries", () => {
    const locales = ["en", "es", "fr", "pt"] as const
    locales.forEach((locale) => {
      expect(DICTIONARIES[locale]["stub.badge"]).toBeDefined()
      expect(DICTIONARIES[locale]["stub.body"]).toBeDefined()
      expect(DICTIONARIES[locale]["more.title"]).toBeDefined()
      expect(DICTIONARIES[locale]["more.subtitle"]).toBeDefined()
    })
  })

  it("verifies navigation items include wayfinding, crowd awareness, and more modes hub", () => {
    const hrefs = NAV_ITEMS.map((item) => item.href)
    expect(hrefs).toContain("/wayfinding")
    expect(hrefs).toContain("/crowd")
    expect(hrefs).toContain("/more")
  })

  it("ensures all navigation label keys exist across all languages", () => {
    const locales = ["en", "es", "fr", "pt"] as const
    NAV_ITEMS.forEach((item) => {
      locales.forEach((locale) => {
        expect(DICTIONARIES[locale][item.labelKey]).toBeDefined()
      })
    })
  })
})
