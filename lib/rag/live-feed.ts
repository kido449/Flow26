import type { Congestion, QueuePoint, Zone } from "@/lib/types"

// LIVE FEED LAYER
// Mock real-time crowd / queue signals. Deterministic base values plus a small
// time-based wobble so the dashboard feels "live" without a backend. Swappable
// for a websocket / polling source behind the same shape.

export interface LiveSnapshot {
  zones: Zone[]
  queues: QueuePoint[]
  // Overall stadium fill 0..1
  overallFill: number
  updatedAt: number
}

const BASE_ZONES: Omit<Zone, "congestion" | "occupancy">[] = [
  { id: "z-north", label: "North Stand (Gate A)", points: "30,8 70,8 66,28 34,28", capacity: 12000 },
  { id: "z-east", label: "East Stand (Gate B)", points: "72,30 92,34 92,66 72,70", capacity: 13000 },
  { id: "z-south", label: "South Stand (Gate C)", points: "34,72 66,72 70,92 30,92", capacity: 12000 },
  { id: "z-west", label: "West Stand (Gate D)", points: "8,34 28,30 28,70 8,66", capacity: 13000 },
  { id: "z-concourse-n", label: "North Concourse", points: "34,28 66,28 66,34 34,34", capacity: 4000 },
  { id: "z-concourse-s", label: "South Concourse", points: "34,66 66,66 66,72 34,72", capacity: 4000 },
]

const BASE_QUEUES: Omit<QueuePoint, "waitMinutes" | "congestion" | "trend">[] = [
  { id: "q-gate-a", label: "Gate A security", zoneId: "z-north" },
  { id: "q-gate-b", label: "Gate B security", zoneId: "z-east" },
  { id: "q-gate-c", label: "Gate C security", zoneId: "z-south" },
  { id: "q-gate-d", label: "Gate D security", zoneId: "z-west" },
  { id: "q-conc-n", label: "North concession", zoneId: "z-concourse-n" },
  { id: "q-rest-s", label: "South restrooms", zoneId: "z-concourse-s" },
]

// Fixed "personality" per zone so the demo is stable but varied.
const ZONE_LOAD: Record<string, number> = {
  "z-north": 0.62,
  "z-east": 0.88,
  "z-south": 0.41,
  "z-west": 0.55,
  "z-concourse-n": 0.78,
  "z-concourse-s": 0.94,
}

function fillToCongestion(fill: number): Congestion {
  if (fill >= 0.9) return "critical"
  if (fill >= 0.72) return "high"
  if (fill >= 0.5) return "moderate"
  return "low"
}

function wobble(seed: number, tick: number): number {
  // Small deterministic oscillation in the range ~[-0.06, 0.06].
  return Math.sin(seed * 12.9898 + tick) * 0.06
}

export function getLiveSnapshot(now: number = Date.now()): LiveSnapshot {
  // Advance a slow "tick" every ~5s so repeated reads drift a little.
  const tick = now / 5000

  const zones: Zone[] = BASE_ZONES.map((z, i) => {
    const base = ZONE_LOAD[z.id] ?? 0.5
    const fill = Math.min(0.99, Math.max(0.05, base + wobble(i + 1, tick)))
    return {
      ...z,
      occupancy: Math.round(fill * z.capacity),
      congestion: fillToCongestion(fill),
    }
  })

  const queues: QueuePoint[] = BASE_QUEUES.map((q, i) => {
    const zone = zones.find((z) => z.id === q.zoneId)
    const fill = zone ? zone.occupancy / zone.capacity : 0.5
    const waitMinutes = Math.max(1, Math.round(fill * 28 + wobble(i + 7, tick) * 10))
    const w = wobble(i + 3, tick)
    const trend: QueuePoint["trend"] = w > 0.02 ? "rising" : w < -0.02 ? "falling" : "steady"
    return {
      ...q,
      waitMinutes,
      congestion: fillToCongestion(fill),
      trend,
    }
  })

  const overallFill =
    zones.reduce((sum, z) => sum + z.occupancy, 0) / zones.reduce((sum, z) => sum + z.capacity, 0)

  return { zones, queues, overallFill, updatedAt: now }
}

// A compact, model-friendly summary of the live feed for grounding the assistant.
export function summarizeLiveFeed(snapshot: LiveSnapshot = getLiveSnapshot()): string {
  const busiest = [...snapshot.zones].sort((a, b) => b.occupancy / b.capacity - a.occupancy / a.capacity)[0]
  const calmest = [...snapshot.zones].sort((a, b) => a.occupancy / a.capacity - b.occupancy / b.capacity)[0]
  const longestQueue = [...snapshot.queues].sort((a, b) => b.waitMinutes - a.waitMinutes)[0]
  return `Current crowd snapshot: stadium is ${(snapshot.overallFill * 100).toFixed(0)}% full. Busiest area is ${busiest.label} (${busiest.congestion} congestion). Calmest area is ${calmest.label} (${calmest.congestion}). Longest wait is ${longestQueue.label} at about ${longestQueue.waitMinutes} minutes.`
}
