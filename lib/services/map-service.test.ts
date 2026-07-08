import { describe, it, expect } from "vitest"
import { getMapService } from "./map-service"

describe("MapService", () => {
  it("returns a singleton instance", () => {
    const service1 = getMapService()
    const service2 = getMapService()
    expect(service1).toBe(service2)
  })

  it("returns all points of interest", () => {
    const service = getMapService()
    const pois = service.getPois()
    expect(pois.length).toBeGreaterThan(0)
    
    // Check that standard gates exist
    const gateA = pois.find(p => p.id === "gate-a")
    expect(gateA).toBeDefined()
    expect(gateA?.kind).toBe("gate")
  })

  it("finds a POI by ID", () => {
    const service = getMapService()
    const poi = service.getPoi("seat-215")
    expect(poi).toBeDefined()
    expect(poi?.label).toBe("Section 215 (Club)")
    
    expect(service.getPoi("non-existent-id")).toBeUndefined()
  })

  it("computes a valid route between same zone POIs", () => {
    const service = getMapService()
    const route = service.computeRoute("gate-a", "seat-112")
    expect(route).not.toBeNull()
    expect(route?.fromId).toBe("gate-a")
    expect(route?.toId).toBe("seat-112")
    expect(route?.steps.length).toBeGreaterThanOrEqual(2)
    expect(route?.estimatedMinutes).toBeGreaterThan(0)
  })

  it("computes a concourse routing step when traveling between different zones", () => {
    const service = getMapService()
    const route = service.computeRoute("gate-a", "gate-c")
    expect(route).not.toBeNull()
    // Traveling from z-north to z-south should route through a concourse
    expect(route?.zoneIds).toContain("z-north")
    expect(route?.zoneIds).toContain("z-south")
    
    const concourseStep = route?.steps.find(s => s.instruction.includes("concourse"))
    expect(concourseStep).toBeDefined()
  })

  it("returns null when origin or destination does not exist", () => {
    const service = getMapService()
    expect(service.computeRoute("gate-a", "invalid-destination")).toBeNull()
    expect(service.computeRoute("invalid-origin", "gate-b")).toBeNull()
  })
})
