import { describe, it, expect } from "vitest"
import { getLiveSnapshot, summarizeLiveFeed } from "./live-feed"

describe("LiveFeed", () => {
  it("generates a valid live snapshot with zones and queues", () => {
    const snapshot = getLiveSnapshot()
    expect(snapshot.zones.length).toBeGreaterThan(0)
    expect(snapshot.queues.length).toBeGreaterThan(0)
    expect(snapshot.overallFill).toBeGreaterThanOrEqual(0)
    expect(snapshot.overallFill).toBeLessThanOrEqual(1)
    expect(snapshot.updatedAt).toBeGreaterThan(0)
  })

  it("assigns valid congestion levels to all zones", () => {
    const snapshot = getLiveSnapshot()
    const validLevels = ["low", "moderate", "high", "critical"]
    snapshot.zones.forEach((zone) => {
      expect(validLevels).toContain(zone.congestion)
      expect(zone.occupancy).toBeGreaterThanOrEqual(0)
      expect(zone.occupancy).toBeLessThanOrEqual(zone.capacity)
    })
  })

  it("assigns valid trends and wait minutes to all queues", () => {
    const snapshot = getLiveSnapshot()
    const validTrends = ["rising", "steady", "falling"]
    snapshot.queues.forEach((queue) => {
      expect(validTrends).toContain(queue.trend)
      expect(queue.waitMinutes).toBeGreaterThan(0)
    })
  })

  it("produces a concise summary string for assistant grounding", () => {
    const summary = summarizeLiveFeed()
    expect(summary).toContain("stadium is")
    expect(summary).toContain("Busiest area is")
    expect(summary).toContain("Longest wait is")
  })
})
