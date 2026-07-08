import type { KnowledgeChunk, RetrievedChunk } from "@/lib/types"
import { KNOWLEDGE_BASE } from "@/lib/rag/knowledge"

// RETRIEVAL LAYER
// Pure, deterministic keyword/token scoring over the static knowledge base.
// No network, no model. Returns chunks that pass a relevance threshold so the
// caller can decide whether there is enough grounding to answer at all.

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "am", "was", "were", "to", "of", "in", "on", "at", "for",
  "and", "or", "my", "me", "i", "you", "your", "how", "what", "where", "when", "which", "can",
  "do", "does", "did", "with", "from", "get", "there", "here", "it", "this", "that", "please",
  "find", "near", "nearest",
])

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
}

// [Tier 2: Medium Impact - Efficiency] Cache token sets per chunk ID to avoid O(N * L) re-tokenizing on every query
const CHUNK_TOKEN_CACHE = new Map<string, { haystackSet: Set<string>; keywordSet: Set<string> }>()

function getCachedChunkTokens(chunk: KnowledgeChunk) {
  let cached = CHUNK_TOKEN_CACHE.get(chunk.id)
  if (!cached) {
    const haystack = tokenize(`${chunk.title} ${chunk.text} ${chunk.keywords.join(" ")}`)
    cached = {
      haystackSet: new Set(haystack),
      keywordSet: new Set(chunk.keywords.map((k) => k.toLowerCase())),
    }
    CHUNK_TOKEN_CACHE.set(chunk.id, cached)
  }
  return cached
}

function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk): number {
  if (queryTokens.length === 0) return 0
  // [Tier 2: Medium Impact - Efficiency] O(1) cache lookup for static chunk tokens
  const { haystackSet, keywordSet } = getCachedChunkTokens(chunk)
  const rawQuery = queryTokens.join(" ")

  let score = 0
  for (const token of queryTokens) {
    if (keywordSet.has(token)) score += 2 // exact keyword hit weighs more
    if (haystackSet.has(token)) score += 1
  }
  // Multi-word keyword phrases (e.g. "first aid") present in the raw query.
  for (const kw of keywordSet) {
    if (kw.includes(" ") && rawQuery.includes(kw)) score += 3
  }
  // Normalize by query length so long questions are not unfairly favored.
  return score / Math.sqrt(queryTokens.length)
}

export interface RetrieveOptions {
  // Minimum normalized score for a chunk to count as relevant.
  threshold?: number
  // Max chunks returned.
  topK?: number
}

export function retrieve(
  query: string,
  base: KnowledgeChunk[] = KNOWLEDGE_BASE,
  options: RetrieveOptions = {},
): RetrievedChunk[] {
  const { threshold = 0.9, topK = 4 } = options
  const queryTokens = tokenize(query)

  const scored = base
    .map((chunk) => ({ chunk, score: scoreChunk(queryTokens, chunk) }))
    .filter((r) => r.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)

  return scored
}

// True when the query has no adequately relevant grounding — the caller must
// then refuse rather than let the model invent an answer.
export function hasGrounding(query: string, options?: RetrieveOptions): boolean {
  return retrieve(query, KNOWLEDGE_BASE, options).length > 0
}
