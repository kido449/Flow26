import { describe, expect, it } from "vitest"
import { tokenize } from "./retrieval"
import { KNOWLEDGE_BASE, STADIUM_NAME } from "./knowledge"

describe("RAG retrieval & knowledge base integrity", () => {
  it("tokenize strips stop words and punctuation", () => {
    const tokens = tokenize("Where is Gate A near section 104?")
    expect(tokens).toContain("gate")
    expect(tokens).toContain("section")
    expect(tokens).toContain("104")
    expect(tokens).not.toContain("where")
    expect(tokens).not.toContain("is")
    expect(tokens).not.toContain("near")
  })

  it("stadium name is defined and knowledge base contains core categories", () => {
    expect(STADIUM_NAME).toBe("Atlas Metropolitan Stadium")
    expect(KNOWLEDGE_BASE.length).toBeGreaterThanOrEqual(8)

    const categories = new Set(KNOWLEDGE_BASE.map((k) => k.category))
    expect(categories.has("gates")).toBe(true)
    expect(categories.has("seating")).toBe(true)
    expect(categories.has("amenities")).toBe(true)
    expect(categories.has("safety")).toBe(true)
  })

  it("every knowledge chunk has valid non-empty fields", () => {
    for (const chunk of KNOWLEDGE_BASE) {
      expect(chunk.id).toBeTruthy()
      expect(chunk.title).toBeTruthy()
      expect(chunk.category).toBeTruthy()
      expect(chunk.text.length).toBeGreaterThan(10)
      expect(Array.isArray(chunk.keywords)).toBe(true)
      expect(chunk.keywords.length).toBeGreaterThan(0)
    }
  })
})
