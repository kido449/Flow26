"use client"

import React, { useState } from "react"
import { ShieldAlert, MapPin, RotateCcw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

/** A single incident row in the command center dispatch table. */
export interface IncidentRow {
  id: string
  code: string
  time: string
  type: string
  zone: string
  severity: "critical" | "high" | "normal"
  unit: string
  status: "dispatched" | "in_progress" | "resolved"
}

/** Default mock incidents seeded for the demo dashboard. */
export const INITIAL_INCIDENTS: IncidentRow[] = [
  {
    id: "inc1",
    code: "#INC-409",
    time: "19:52",
    type: "Gate 3 Egress Bottleneck & Thermal Surge",
    zone: "Gate 3 South Plaza",
    severity: "critical",
    unit: "VOL-01 & SEC-12",
    status: "in_progress",
  },
  {
    id: "inc2",
    code: "#INC-408",
    time: "19:48",
    type: "Sensory Corridor Acoustic Barrier Adjustment",
    zone: "Concourse B West",
    severity: "high",
    unit: "VOL-02 & FAC-04",
    status: "dispatched",
  },
  {
    id: "inc3",
    code: "#INC-405",
    time: "19:35",
    type: "VIP Shuttle Arrival Delay & Credential Check",
    zone: "South Executive Tunnel",
    severity: "high",
    unit: "VOL-03 & CON-01",
    status: "in_progress",
  },
  {
    id: "inc4",
    code: "#INC-401",
    time: "19:15",
    type: "Concession Stand 4A Automated Soap Sensor Maintenance",
    zone: "Section 112 Amenities",
    severity: "normal",
    unit: "FAC-08",
    status: "resolved",
  },
]

/**
 * IncidentTable — Live incident dispatch table with filter pills and
 * resolve/reopen toggling. Renders in the command center dashboard.
 */
export function IncidentTable({
  incidents: propIncidents,
  onResolve,
}: {
  incidents?: IncidentRow[]
  onResolve?: (id: string) => void
} = {}) {
  const [localIncidents, setLocalIncidents] = useState<IncidentRow[]>(INITIAL_INCIDENTS)
  const incidents = propIncidents ?? localIncidents
  const [filter, setFilter] = useState<"all" | "active" | "critical" | "resolved">("active")

  const activeCount = incidents.filter((i) => i.status !== "resolved").length

  const filteredIncidents = incidents.filter((item) => {
    if (filter === "active") return item.status !== "resolved"
    if (filter === "critical") return item.severity === "critical"
    if (filter === "resolved") return item.status === "resolved"
    return true
  })

  /** Toggle an incident between resolved and in_progress. */
  function resolveIncident(id: string) {
    if (onResolve) {
      onResolve(id)
    } else {
      setLocalIncidents((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            const nextStatus = item.status === "resolved" ? "in_progress" : "resolved"
            toast.success(`Incident ${item.code} ${nextStatus === "resolved" ? "marked resolved" : "reopened"}`, {
              description: nextStatus === "resolved" ? "Unit released back to standby ops." : "Assigned unit notified of reopening.",
            })
            return { ...item, status: nextStatus }
          }
          return item
        })
      )
    }
  }

  return (
    <section id="incidents" className="flex flex-col gap-5 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-foreground">
          <ShieldAlert className="size-4 text-primary" />
          <span>live incident dispatch table ({incidents.length} logs)</span>
        </div>

        <div className="flex items-center gap-1.5 bg-secondary/80 p-1 rounded-full border border-border w-fit">
          {(["active", "critical", "resolved", "all"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.15em] transition-all cursor-pointer",
                filter === f ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f} ({f === "active" ? activeCount : f === "critical" ? incidents.filter((i) => i.severity === "critical").length : f === "resolved" ? incidents.filter((i) => i.status === "resolved").length : incidents.length})
            </button>
          ))}
        </div>
      </div>

      {/* Data Table Wrapper */}
      <div className="bg-card/90 backdrop-blur border border-border rounded-3xl overflow-hidden shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <th className="py-4 px-6 font-semibold">Incident ID & Time</th>
                <th className="py-4 px-6 font-semibold">Type & Description</th>
                <th className="py-4 px-6 font-semibold">Zone / Location</th>
                <th className="py-4 px-6 font-semibold">Severity</th>
                <th className="py-4 px-6 font-semibold">Assigned Unit</th>
                <th className="py-4 px-6 font-semibold text-right">Action / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {filteredIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  className={cn(
                    "transition-colors duration-200 hover:bg-secondary/40",
                    inc.status === "resolved" && "opacity-50 bg-secondary/10"
                  )}
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-primary text-xs uppercase tracking-[0.15em]">{inc.code}</span>
                      <span className="text-xs font-mono text-muted-foreground">{inc.time} UTC</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={cn("font-serif font-bold text-base block tracking-tight", inc.status === "resolved" && "line-through text-muted-foreground")}>
                      {inc.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-mono uppercase tracking-[0.1em] text-foreground/80 border border-border">
                      <MapPin className="size-3 text-primary" /> {inc.zone}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.15em] font-bold",
                        inc.severity === "critical"
                          ? "bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse"
                          : inc.severity === "high"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "bg-secondary text-muted-foreground border border-border"
                      )}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="font-mono text-xs text-foreground/90 font-medium bg-secondary/80 px-2 py-1 rounded border border-border">
                      {inc.unit}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    <Button
                      size="sm"
                      variant={inc.status === "resolved" ? "secondary" : "default"}
                      onClick={() => resolveIncident(inc.id)}
                      className={cn(
                        "rounded-full font-mono text-xs uppercase tracking-[0.15em] h-8 px-4 cursor-pointer transition-all",
                        inc.status === "resolved"
                          ? "bg-secondary text-muted-foreground hover:bg-secondary/80"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20"
                      )}
                    >
                      {inc.status === "resolved" ? (
                        <>
                          <Check className="size-3.5 text-emerald-400 mr-1" />
                          <span>Resolved</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="size-3.5 mr-1" />
                          <span>Mark Resolved</span>
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredIncidents.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground font-mono uppercase text-xs tracking-[0.2em]">
                    no incidents matching current filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
