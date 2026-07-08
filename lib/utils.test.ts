import { describe, expect, it } from "vitest"
import { cn } from "./utils"

describe("cn utility helper", () => {
  it("merges class names correctly and resolves tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
    expect(cn("text-red-500", false && "hidden", "font-bold")).toBe("text-red-500 font-bold")
  })
})
