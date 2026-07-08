// Shared domain types for Tournament Copilot (FIFA WC 2026)

export type Role = "fan" | "staff" | "command"

export type Locale = "en" | "es" | "fr" | "pt"

export const ROLES: Role[] = ["fan", "staff", "command"]
export const LOCALES: Locale[] = ["en", "es", "fr", "pt"]

// Congestion level used across crowd, wayfinding, and dashboards.
export type Congestion = "low" | "moderate" | "high" | "critical"

// A point of interest on the stadium map.
export type PoiKind = "gate" | "seat" | "restroom" | "medical" | "exit" | "concourse" | "concession"

export interface Poi {
  id: string
  kind: PoiKind
  label: string
  // Normalized 0..100 coordinates on the SVG map viewbox.
  x: number
  y: number
  zoneId: string
}

export interface Zone {
  id: string
  label: string
  // Polygon points (normalized 0..100) for the SVG map.
  points: string
  congestion: Congestion
  // Estimated people currently in the zone.
  occupancy: number
  capacity: number
}

export interface RouteStep {
  poiId: string
  instruction: string
}

export interface Route {
  fromId: string
  toId: string
  steps: RouteStep[]
  // Zones this route passes through, used to flag congestion.
  zoneIds: string[]
  avoidsCongestion: boolean
  estimatedMinutes: number
}

// A single queue / service point tracked by the live feed.
export interface QueuePoint {
  id: string
  label: string
  zoneId: string
  waitMinutes: number
  congestion: Congestion
  trend: "rising" | "steady" | "falling"
}

// RAG knowledge + retrieval types.
export interface KnowledgeChunk {
  id: string
  // Short human title shown as a citation.
  title: string
  // Category used to scope retrieval and display grouping.
  category: "gates" | "seating" | "amenities" | "rules" | "timing" | "transport" | "safety" | "tickets"
  text: string
  // Extra keywords to boost retrieval beyond the raw text.
  keywords: string[]
}

export interface RetrievedChunk {
  chunk: KnowledgeChunk
  score: number
}

export interface ChatSource {
  id: string
  title: string
  category: KnowledgeChunk["category"]
  score: number
}
