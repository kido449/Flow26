import { describe, expect, it } from "vitest"
import { tokenize, retrieve, hasGrounding } from "./retrieval"
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

  describe("retrieve() function", () => {
    const testChunk: typeof KNOWLEDGE_BASE[number] = {
      id: "test-safety-1",
      title: "First Aid Station",
      category: "safety",
      text: "Medical emergencies and first aid located at Gate B.",
      keywords: ["medical", "first aid", "doctor"],
    }

    const testChunkLowScore: typeof KNOWLEDGE_BASE[number] = {
      id: "test-safety-2",
      title: "Gate Information",
      category: "gates",
      text: "Gate B is on the east side.",
      keywords: ["gate b"],
    }

    it("returns matching chunks with correctly calculated normalized scores for single and multi-word keywords", () => {
      // Trace: "medical doctor" -> tokens ["medical", "doctor"] (length 2)
      // Both match keywordSet (+2 each) and haystackSet (+1 each) = 6 total
      // Normalized score: 6 / sqrt(2)
      const res = retrieve("medical doctor", [testChunk])
      expect(res).toHaveLength(1)
      expect(res[0].chunk.id).toBe("test-safety-1")
      expect(res[0].score).toBeCloseTo(6 / Math.sqrt(2), 5)

      // Trace: "first aid" -> tokens ["first", "aid"] (length 2)
      // Neither single token is in keywordSet ("first aid" is multi-word), but both are in haystackSet (+1 + +1 = 2)
      // Multi-word phrase "first aid" matches raw query (+3) -> total 5
      // Normalized score: 5 / sqrt(2)
      const resPhrase = retrieve("first aid", [testChunk])
      expect(resPhrase).toHaveLength(1)
      expect(resPhrase[0].score).toBeCloseTo(5 / Math.sqrt(2), 5)
    })

    it("returns empty array for empty input, stop-words-only queries, or non-matching queries", () => {
      expect(retrieve("", [testChunk])).toEqual([])
      expect(retrieve("the is at", [testChunk])).toEqual([])
      expect(retrieve("quantum physics spacecraft", [testChunk])).toEqual([])
    })

    it("handles threshold filtering, topK slicing, sorting order, and token cache reuse", () => {
      // First call primes CHUNK_TOKEN_CACHE for testChunk and testChunkLowScore
      const sorted = retrieve("medical doctor gate b", [testChunkLowScore, testChunk], { threshold: 0.5 })
      expect(sorted.length).toBeGreaterThanOrEqual(1)
      // Higher score chunk should be first
      expect(sorted[0].chunk.id).toBe("test-safety-1")

      // Second call exercises CHUNK_TOKEN_CACHE hit branch
      const cachedRes = retrieve("medical doctor gate b", [testChunkLowScore, testChunk], { threshold: 0.5, topK: 1 })
      expect(cachedRes).toHaveLength(1)
      expect(cachedRes[0].chunk.id).toBe("test-safety-1")

      // High threshold filters out chunks
      expect(retrieve("medical doctor", [testChunk], { threshold: 100 })).toEqual([])

      // Threshold 0 includes 0-score chunks on empty query
      const zeroThresholdRes = retrieve("", [testChunk], { threshold: 0 })
      expect(zeroThresholdRes).toHaveLength(1)
      expect(zeroThresholdRes[0].score).toBe(0)
    })
  })

  describe("hasGrounding() function", () => {
    it("returns true for clear match queries against KNOWLEDGE_BASE", () => {
      expect(hasGrounding("Where are the restrooms located?")).toBe(true)
      expect(hasGrounding("medical station and emergency help point")).toBe(true)
    })

    it("returns false for empty input or non-matching queries", () => {
      expect(hasGrounding("")).toBe(false)
      expect(hasGrounding("the is at")).toBe(false)
      expect(hasGrounding("quantum physics extraterrestrial spacecraft")).toBe(false)
    })

    it("respects custom threshold options passed to hasGrounding", () => {
      expect(hasGrounding("Where are the restrooms located?", { threshold: 100 })).toBe(false)
      expect(hasGrounding("Where are the restrooms located?", { threshold: 0.1 })).toBe(true)
    })
  })
})
