import { describe, expect, it } from "vitest"
import { LOCALES, ROLES } from "./types"

describe("Domain type constants & integrity", () => {
  it("defines all 3 supported operational roles", () => {
    expect(ROLES).toEqual(["fan", "staff", "command"])
  })

  it("defines all 4 official FIFA tournament locales", () => {
    expect(LOCALES).toEqual(["en", "es", "fr", "pt"])
  })
})
