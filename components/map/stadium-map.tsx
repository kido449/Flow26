"use client"

import type { Poi, Route, Zone } from "@/lib/types"
import { CONGESTION_VAR } from "@/lib/congestion"

interface StadiumMapProps {
  zones: Zone[]
  pois: Poi[]
  route: Route | null
  fromId: string | null
  toId: string | null
  onSelectPoi: (id: string) => void
}

const POI_GLYPH: Record<Poi["kind"], string> = {
  gate: "G",
  seat: "S",
  restroom: "WC",
  medical: "+",
  exit: "E",
  concourse: "C",
  concession: "F",
}

export function StadiumMap({ zones, pois, route, fromId, toId, onSelectPoi }: StadiumMapProps) {
  const routePoints = route
    ? route.steps
        .map((s) => pois.find((p) => p.id === s.poiId))
        .filter((p): p is Poi => Boolean(p))
    : []

  const polyline = routePoints.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="Stadium map showing zones colored by crowd level, points of interest, and the selected route"
    >
      {/* Pitch */}
      <rect x="34" y="34" width="32" height="32" rx="2" className="fill-[var(--pitch)]" />
      <line x1="50" y1="34" x2="50" y2="66" className="stroke-[var(--pitch-line)]" strokeWidth="0.4" />
      <circle cx="50" cy="50" r="5" className="fill-none stroke-[var(--pitch-line)]" strokeWidth="0.4" />

      {/* Zones */}
      {zones.map((z) => (
        <polygon
          key={z.id}
          points={z.points}
          fill={CONGESTION_VAR[z.congestion]}
          fillOpacity={0.55}
          stroke="var(--border)"
          strokeWidth={0.3}
        >
          <title>{`${z.label}: ${z.congestion} (${Math.round((z.occupancy / z.capacity) * 100)}% full)`}</title>
        </polygon>
      ))}

      {/* Route line */}
      {routePoints.length > 1 && (
        <polyline
          points={polyline}
          className="fill-none stroke-[var(--primary)]"
          strokeWidth={1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 1.5"
        />
      )}

      {/* POIs */}
      {pois.map((p) => {
        const isEndpoint = p.id === fromId || p.id === toId
        return (
          <g
            key={p.id}
            transform={`translate(${p.x}, ${p.y})`}
            className="cursor-pointer"
            onClick={() => onSelectPoi(p.id)}
            role="button"
            aria-label={`${p.label}${p.id === fromId ? ", start" : p.id === toId ? ", destination" : ""}`}
          >
            <circle
              r={isEndpoint ? 2.6 : 1.9}
              className={
                isEndpoint
                  ? "fill-[var(--primary)] stroke-[var(--primary-foreground)]"
                  : "fill-[var(--card)] stroke-[var(--border)]"
              }
              strokeWidth={0.4}
            />
            <text
              x="0"
              y="0.9"
              textAnchor="middle"
              fontSize="2.2"
              className={isEndpoint ? "fill-[var(--primary-foreground)]" : "fill-[var(--foreground)]"}
              style={{ pointerEvents: "none", fontWeight: 700 }}
            >
              {POI_GLYPH[p.kind]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
