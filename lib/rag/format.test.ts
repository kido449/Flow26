import { describe, expect, it } from "vitest"
import { NO_DATA_MESSAGE, buildContext, buildSystemPrompt, toSources } from "./format"
import type { RetrievedChunk } from "@/lib/types"

describe("RAG format helpers", () => {
  it("toSources maps retrieved chunks correctly and rounds score", () => {
    const retrieved: RetrievedChunk[] = [
      {
        chunk: {
          id: "chunk-1",
          title: "Gate 1 Policy",
          category: "rules",
          text: "Clear bags only.",
          keywords: [],
        },
        score: 0.85432,
      },
    ]

    const sources = toSources(retrieved)
    expect(sources).toHaveLength(1)
    expect(sources[0]).toEqual({
      id: "chunk-1",
      title: "Gate 1 Policy",
      category: "rules",
      score: 0.85,
    })
  })

  it("buildContext creates formatted sources block", () => {
    const retrieved: RetrievedChunk[] = [
      {
        chunk: {
          id: "1",
          title: "First Aid",
          category: "safety",
          text: "Located at section 104.",
          keywords: [],
        },
        score: 0.9,
      },
      {
        chunk: {
          id: "2",
          title: "Water Stations",
          category: "amenities",
          text: "Near gates A and B.",
          keywords: [],
        },
        score: 0.8,
      },
    ]

    const context = buildContext(retrieved)
    expect(context).toContain("[Source 1: First Aid]")
    expect(context).toContain("Located at section 104.")
    expect(context).toContain("[Source 2: Water Stations]")
    expect(context).toContain("Near gates A and B.")
  })

  it("buildContext returns empty string if retrieved is empty", () => {
    expect(buildContext([])).toBe("")
  })

  it("buildSystemPrompt injects persona, language, context and live summary", () => {
    const prompt = buildSystemPrompt("Sample context", "es", "Live status normal")
    expect(prompt).toContain("You are Pulse (Flow26)")
    expect(prompt).toContain("Always respond in Spanish.")
    expect(prompt).toContain("Sample context")
    expect(prompt).toContain("Live status normal")
  })

  it("has NO_DATA_MESSAGE defined for all 4 locales", () => {
    expect(NO_DATA_MESSAGE.en).toBeDefined()
    expect(NO_DATA_MESSAGE.es).toBeDefined()
    expect(NO_DATA_MESSAGE.fr).toBeDefined()
    expect(NO_DATA_MESSAGE.pt).toBeDefined()
  })
})