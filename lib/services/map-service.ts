import type { Poi, Route, RouteStep } from "@/lib/types"
import { getLiveSnapshot } from "@/lib/rag/live-feed"

// MAP SERVICE
// Provides stadium POIs and computes simple routes. Congestion-aware routing is
// mocked: routes prefer paths through calmer concourse zones. Interface-first so
// a real routing/geo backend can replace the mock implementation.

export interface MapService {
  getPois(): Poi[]
  getPoi(id: string): Poi | undefined
  computeRoute(fromId: string, toId: string): Route | null
}

// Normalized 0..100 coordinates matching the SVG map viewbox.
const POIS: Poi[] = [
  { id: "gate-a", kind: "gate", label: "Gate A (North)", x: 50, y: 12, zoneId: "z-north" },
  { id: "gate-b", kind: "gate", label: "Gate B (East)", x: 86, y: 50, zoneId: "z-east" },
  { id: "gate-c", kind: "gate", label: "Gate C (South)", x: 50, y: 88, zoneId: "z-south" },
  { id: "gate-d", kind: "gate", label: "Gate D (West)", x: 14, y: 50, zoneId: "z-west" },
  { id: "seat-112", kind: "seat", label: "Section 112", x: 60, y: 22, zoneId: "z-north" },
  { id: "seat-136", kind: "seat", label: "Section 136", x: 42, y: 78, zoneId: "z-south" },
  { id: "seat-215", kind: "seat", label: "Section 215 (Club)", x: 80, y: 40, zoneId: "z-east" },
  { id: "restroom-n", kind: "restroom", label: "Restroom (North)", x: 44, y: 31, zoneId: "z-concourse-n" },
  { id: "restroom-s", kind: "restroom", label: "Restroom (South)", x: 56, y: 69, zoneId: "z-concourse-s" },
  { id: "medical-108", kind: "medical", label: "Medical (Sec 108)", x: 38, y: 24, zoneId: "z-north" },
  { id: "medical-215", kind: "medical", label: "Medical (Club 215)", x: 78, y: 46, zoneId: "z-east" },
  { id: "exit-w", kind: "exit", label: "Emergency Exit (West)", x: 18, y: 40, zoneId: "z-west" },
  { id: "concession-n", kind: "concession", label: "Concession (North)", x: 56, y: 32, zoneId: "z-concourse-n" },
]

// Central pitch reference used to route "around" the bowl via a concourse.
const CONCOURSE_HOPS = ["z-concourse-n", "z-concourse-s"]

function distance(a: Poi, b: Poi): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

class MockMapService implements MapService {
  getPois(): Poi[] {
    return POIS
  }

  getPoi(id: string): Poi | undefined {
    return POIS.find((p) => p.id === id)
  }

  computeRoute(fromId: string, toId: string): Route | null {
    const from = this.getPoi(fromId)
    const to = this.getPoi(toId)
    if (!from || !to) return null

    const snapshot = getLiveSnapshot()
    const congestionByZone = new Map(snapshot.zones.map((z) => [z.id, z.congestion]))

    const steps: RouteStep[] = [{ poiId: from.id, instruction: `Start at ${from.label}` }]
    const zoneIds = [from.zoneId]

    // If crossing between different stands, route via the calmer concourse hop.
    if (from.zoneId !== to.zoneId) {
      const hop = [...CONCOURSE_HOPS].sort((a, b) => {
        const rank = { low: 0, moderate: 1, high: 2, critical: 3 } as const
        return rank[congestionByZone.get(a) ?? "low"] - rank[congestionByZone.get(b) ?? "low"]
      })[0]
      const hopPoi = POIS.find((p) => p.zoneId === hop)
      if (hopPoi) {
        steps.push({
          poiId: hopPoi.id,
          instruction: `Take the ${hopPoi.zoneId === "z-concourse-n" ? "north" : "south"} concourse (lighter crowds)`,
        })
        zoneIds.push(hop)
      }
    }

    steps.push({ poiId: to.id, instruction: `Arrive at ${to.label}` })
    zoneIds.push(to.zoneId)

    const passedCongested = zoneIds.some((z) => {
      const c = congestionByZone.get(z)
      return c === "high" || c === "critical"
    })

    const baseMinutes = distance(from, to) / 10 // ~10 units per minute walking
    const penalty = passedCongested ? 3 : 0

    return {
      fromId,
      toId,
      steps,
      zoneIds,
      avoidsCongestion: !passedCongested,
      estimatedMinutes: Math.max(1, Math.round(baseMinutes + penalty)),
    }
  }
}

let instance: MapService | null = null

export function getMapService(): MapService {
  if (!instance) instance = new MockMapService()
  return instance
}
