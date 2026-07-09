"use client"

import React, { useMemo, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Navigation,
  MapPin,
  Search,
  X,
  ArrowUpRight,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react"
import { toast } from "sonner"
import { useLiveSnapshot } from "@/hooks/use-live-snapshot"
import { useApp } from "@/lib/state/app-context"

// Extended POI definitions including Gate 7 and Section 104 for the Rapido route
const RAPIDO_POIS = [
  { id: "gate-7", kind: "gate", label: "Gate 7 (West Entrance)", x: 180, y: 450, zoneId: "z-west" },
  { id: "sec-104", kind: "seat", label: "Section 104 (North-East Tier)", x: 750, y: 250, zoneId: "z-north" },
  { id: "gate-a", kind: "gate", label: "Gate A (North Plaza)", x: 600, y: 100, zoneId: "z-north" },
  { id: "gate-b", kind: "gate", label: "Gate B (East Atrium)", x: 1020, y: 450, zoneId: "z-east" },
  { id: "gate-c", kind: "gate", label: "Gate C (South Plaza)", x: 600, y: 800, zoneId: "z-south" },
  { id: "restroom-n", kind: "restroom", label: "Restrooms (North Concourse)", x: 500, y: 180, zoneId: "z-north" },
  { id: "restroom-s", kind: "restroom", label: "Restrooms (South Concourse)", x: 600, y: 720, zoneId: "z-south" },
  { id: "food-w", kind: "concession", label: "FIFA Gourmet Lounge (West)", x: 260, y: 450, zoneId: "z-west" },
  { id: "food-e", kind: "concession", label: "Matchday Taproom (East)", x: 940, y: 450, zoneId: "z-east" },
  { id: "med-1", kind: "medical", label: "Emergency Medical Center", x: 350, y: 260, zoneId: "z-north" },
]

function getCongestionPenalty(level?: string): number {
  if (level === "critical") return 5
  if (level === "high") return 3
  if (level === "moderate") return 1
  return 0
}

function getZonePct(zone?: { occupancy: number; capacity: number }): number {
  return zone && zone.capacity > 0 ? Math.round((zone.occupancy / zone.capacity) * 100) : 0
}

export function WayfindingView() {
  const { t, role } = useApp()
  const { snapshot } = useLiveSnapshot()

  const [fromId, setFromId] = useState<string>("gate-7")
  const [toId, setToId] = useState<string>("sec-104")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [isNavigating, setIsNavigating] = useState<boolean>(false)
  const [zoomLevel, setZoomLevel] = useState<number>(1)

  const toPoi = useMemo(() => {
    return RAPIDO_POIS.find((p) => p.id === toId) || RAPIDO_POIS[1]
  }, [toId])

  const fromPoi = useMemo(() => {
    return RAPIDO_POIS.find((p) => p.id === fromId) || RAPIDO_POIS[0]
  }, [fromId])

  useEffect(() => {
    setCurrentStepIndex(0)
  }, [fromId, toId])

  const matchingPois = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return RAPIDO_POIS.filter(
      (p) =>
        p.label.toLowerCase().includes(q) ||
        p.kind.toLowerCase().includes(q) ||
        p.zoneId.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const mapContainerRef = useRef<HTMLDivElement>(null)

  function handleSelectPoi(id: string) {
    if (id === fromId) return
    setToId(id)
    setSearchQuery("")
    setIsNavigating(true)
    setCurrentStepIndex(0)
    const p = RAPIDO_POIS.find((x) => x.id === id)
    toast.success(`Route calculated to ${p?.label || "destination"}`)
  }

  function handleSwapPoints() {
    setToId(fromId)
    setFromId(toId)
    setIsNavigating(true)
    setCurrentStepIndex(0)
    toast.info("Swapped start and destination points")
  }

  const distanceMeters = useMemo(() => {
    if (!fromPoi || !toPoi) return 340
    return Math.max(50, Math.round(Math.hypot(toPoi.x - fromPoi.x, toPoi.y - fromPoi.y)))
  }, [fromPoi, toPoi])

  const fromZone = useMemo(() => {
    return snapshot?.zones.find((z) => z.id === fromPoi?.zoneId)
  }, [snapshot, fromPoi])

  const toZone = useMemo(() => {
    return snapshot?.zones.find((z) => z.id === toPoi?.zoneId)
  }, [snapshot, toPoi])

  const etaMinutes = useMemo(() => {
    const baseMinutes = Math.max(3, Math.round(distanceMeters / 80))
    const fromPenalty = getCongestionPenalty(fromZone?.congestion)
    const toPenalty = getCongestionPenalty(toZone?.congestion)
    return baseMinutes + fromPenalty + toPenalty
  }, [distanceMeters, fromZone, toZone])

  const isCongested = useMemo(() => {
    return (
      fromZone?.congestion === "high" ||
      fromZone?.congestion === "critical" ||
      toZone?.congestion === "high" ||
      toZone?.congestion === "critical"
    )
  }, [fromZone, toZone])

  const rapidoPathD = useMemo(() => {
    if (!fromPoi || !toPoi) return "M 180 450 L 750 250"
    const midX = (fromPoi.x + toPoi.x) / 2
    const midY = Math.min(fromPoi.y, toPoi.y) - 60
    return `M ${fromPoi.x} ${fromPoi.y} Q ${midX} ${midY} ${toPoi.x} ${toPoi.y}`
  }, [fromPoi, toPoi])

  const { trackingX, trackingY } = useMemo(() => {
    if (!fromPoi || !toPoi) return { trackingX: [180, 750], trackingY: [450, 250] }
    const midX = (fromPoi.x + toPoi.x) / 2
    const midY = Math.min(fromPoi.y, toPoi.y) - 60
    const stepsCount = 10
    const xs: number[] = []
    const ys: number[] = []
    for (let i = 0; i <= stepsCount; i++) {
      const t = i / stepsCount
      const x = Math.round((1 - t) * (1 - t) * fromPoi.x + 2 * (1 - t) * t * midX + t * t * toPoi.x)
      const y = Math.round((1 - t) * (1 - t) * fromPoi.y + 2 * (1 - t) * t * midY + t * t * toPoi.y)
      xs.push(x)
      ys.push(y)
    }
    return { trackingX: xs, trackingY: ys }
  }, [fromPoi, toPoi])

  const steps = useMemo(() => [
    { instruction: `Start at ${fromPoi?.label || "Gate 7"} after security screening.` },
    { instruction: `Proceed along the express concourse toward ${toPoi?.zoneId.replace("z-", "")} zone.` },
    { instruction: "Follow the overhead wayfinding signs along the main corridor." },
    { instruction: `Arrive at ${toPoi?.label || "Section 104"}.` },
  ], [fromPoi, toPoi])

  const currentStep = steps[currentStepIndex]
  const nextStep = steps[currentStepIndex + 1]

  return (
    <div className="fixed inset-0 h-dvh w-dvw z-20 bg-black overflow-hidden select-none selection:bg-primary/30 selection:text-white">
      {/* 1. THE MAP LAYER (Background - Absolute Full Screen z-0) */}
      <div ref={mapContainerRef} className="absolute inset-0 h-screen w-screen z-0 overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <motion.div
          drag
          dragConstraints={{ left: -600, right: 600, top: -500, bottom: 500 }}
          dragElastic={0.15}
          whileDrag={{ cursor: "grabbing" }}
          animate={{ scale: zoomLevel }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="w-full h-full flex items-center justify-center cursor-grab select-none p-4 min-w-[1000px] min-h-[800px]"
        >
          <svg
            viewBox="0 0 1200 900"
            className="w-full max-w-7xl h-auto drop-shadow-2xl overflow-visible"
            aria-label="Interactive Stadium Map"
          >
            <defs>
              <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d9a520" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffd700" stopOpacity="1" />
                <stop offset="100%" stopColor="#d9a520" stopOpacity="0.8" />
              </linearGradient>
              <filter id="neonHalo" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- STADIUM ARCHITECTURE (Minimalist Geometric Shapes) --- */}
            <rect x="100" y="50" width="1000" height="800" rx="200" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <rect x="140" y="80" width="920" height="740" rx="170" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" strokeDasharray="12 12" />

            <rect x="180" y="110" width="840" height="680" rx="150" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
            <rect x="250" y="170" width="700" height="560" rx="110" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <rect x="320" y="230" width="560" height="440" rx="80" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />

            <line x1="320" y1="230" x2="180" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="880" y1="230" x2="1020" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="320" y1="670" x2="180" y2="790" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="880" y1="670" x2="1020" y2="790" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="600" y1="230" x2="600" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="600" y1="670" x2="600" y2="850" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="320" y1="450" x2="100" y2="450" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="880" y1="450" x2="1100" y2="450" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

            <rect x="400" y="290" width="400" height="320" rx="40" fill="#0a1a0f" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <line x1="600" y1="290" x2="600" y2="610" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <circle cx="600" cy="450" r="50" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <circle cx="600" cy="450" r="4" fill="rgba(255,255,255,0.3)" />
            <rect x="400" y="360" width="60" height="180" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <rect x="740" y="360" width="60" height="180" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />

            {/* --- STATIC POIS (Small Squares & Gates) --- */}
            <rect x="570" y="70" width="60" height="40" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="600" y="94" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace">GATE A</text>

            <rect x="1010" y="430" width="40" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="1030" y="465" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace" transform="rotate(90 1030 465)">GATE B</text>

            <rect x="570" y="790" width="60" height="40" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="600" y="815" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace">GATE C</text>

            <rect x="480" y="165" width="40" height="30" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <text x="500" y="184" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">WC</text>

            <rect x="245" y="435" width="30" height="30" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <text x="260" y="454" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">BAR</text>

            {/* --- KEY WAYPOINTS: Start & Destination Markers --- */}
            <g transform={`translate(${fromPoi ? Math.max(20, Math.min(1060, fromPoi.x - 75)) : 150}, ${fromPoi ? Math.max(20, Math.min(820, fromPoi.y - 35)) : 420})`}>
              <rect width="150" height="56" rx="12" fill="rgba(217,165,32,0.18)" stroke="#d9a520" strokeWidth="2" />
              <text x="75" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace" fontWeight="bold">{fromPoi?.label || "START"}</text>
              <text x="75" y="42" textAnchor="middle" fill="#d9a520" fontSize="9" fontFamily="monospace">START</text>
            </g>

            <g transform={`translate(${toPoi ? Math.max(20, Math.min(1060, toPoi.x - 75)) : 710}, ${toPoi ? Math.max(20, Math.min(820, toPoi.y - 35)) : 220})`}>
              <rect width="150" height="56" rx="12" fill="rgba(217,165,32,0.22)" stroke="#d9a520" strokeWidth="2" />
              <text x="75" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace" fontWeight="bold">{toPoi?.label || "DESTINATION"}</text>
              <text x="75" y="42" textAnchor="middle" fill="#d9a520" fontSize="9" fontFamily="monospace">DESTINATION</text>
            </g>

            {/* --- 2. THE ANIMATED ROUTE (SVG Path with Rapido Drawing Effect) --- */}
            {isNavigating && (
              <>
                <motion.path
                  d={rapidoPathD}
                  fill="none"
                  stroke="rgba(217, 165, 32, 0.4)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#neonHalo)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1,
                  }}
                />

                <motion.path
                  d={rapidoPathD}
                  fill="none"
                  stroke="#ffd700"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1,
                  }}
                />

                <motion.g
                  animate={{
                    x: trackingX,
                    y: trackingY,
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1,
                  }}
                >
                  <motion.circle
                    r="24"
                    fill="rgba(217, 165, 32, 0.35)"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <circle r="12" fill="rgba(217, 165, 32, 0.8)" stroke="#fff" strokeWidth="2" />
                  <circle r="5" fill="#ffffff" filter="drop-shadow(0 0 6px #fff)" />
                </motion.g>
              </>
            )}
          </svg>
        </motion.div>

        {/* Map Zoom Controls Panel (Right Middle) */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-2xl pointer-events-auto">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(2.2, z + 0.25))}
            className="p-2.5 rounded-xl hover:bg-neutral-800 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Zoom In"
          >
            <ZoomIn className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.25))}
            className="p-2.5 rounded-xl hover:bg-neutral-800 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Zoom Out"
          >
            <ZoomOut className="size-4" />
          </button>
          <div className="border-t border-white/10 my-0.5" />
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-2.5 rounded-xl hover:bg-neutral-800 text-primary transition-colors cursor-pointer"
            aria-label="Reset View"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>

      {/* 2. THE TOP OVERLAYS (Search Pill & Live Status - shown only when not actively navigating) */}
      {!isNavigating && (
        <div className="absolute top-24 md:top-6 left-0 right-0 z-10 pointer-events-none px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto gap-3">
          <div className="relative w-full sm:w-80 pointer-events-auto flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2.5 bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2.5 shadow-2xl transition-all duration-300 focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20">
              <Search className="size-4 text-primary shrink-0" />
              <input
                type="text"
                placeholder={t("wayfinding.findPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    if (matchingPois.length > 0) {
                      handleSelectPoi(matchingPois[0].id)
                    } else {
                      setIsNavigating(true)
                    }
                  }
                }}
                className="bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none w-full font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={handleSwapPoints}
              className="p-2.5 rounded-full bg-neutral-900/90 border border-white/15 hover:bg-neutral-800 text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Swap Start and Destination"
              aria-label="Swap Start and Destination"
            >
              <ArrowUpRight className="size-4" />
            </button>

            <AnimatePresence>
              {searchQuery && matchingPois.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-full bg-neutral-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-1.5 shadow-2xl max-h-60 overflow-y-auto z-50 divide-y divide-white/5"
                >
                  {matchingPois.map((p) => (
                    <div
                      key={p.id}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-neutral-800 text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MapPin className="size-4 text-primary shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white font-mono uppercase tracking-wider truncate">{p.label}</div>
                          <div className="text-[10px] text-white/40 font-sans capitalize">{p.kind} • {p.zoneId.replace("z-", "")}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setFromId(p.id)
                            setSearchQuery("")
                            toast.success(`Set start point to ${p.label}`)
                          }}
                          className="text-[10px] font-mono uppercase tracking-wider text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-full border border-white/20 cursor-pointer"
                        >
                          Start
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectPoi(p.id)}
                          className="text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded-full border border-primary/20 cursor-pointer"
                        >
                          Dest
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2.5 bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2.5 shadow-2xl pointer-events-auto shrink-0">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-medium">
              {t("wayfinding.liveSensor")}
            </span>
          </div>
        </div>
      )}

      {/* 3. SLEEK BOTTOM NAVIGATION BAR */}
      <AnimatePresence>
        {isNavigating && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl z-20 pointer-events-none">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-neutral-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-2xl flex items-center justify-between gap-4 text-white pointer-events-auto"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="size-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 shadow-inner">
                  <Navigation className="size-5 text-primary animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-white truncate font-sans">
                      {toPoi?.label || "Section 104"}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full shrink-0 font-bold">
                      {etaMinutes} {t("wayfinding.etaWalk")}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white/80 px-2 py-0.5 rounded-full shrink-0">
                      {distanceMeters}m
                    </span>
                  </div>
                  <p className="text-xs text-white/90 truncate font-sans mt-1 font-medium">
                    {currentStep?.instruction || "Proceed along step-free express concourse"}
                  </p>
                  {nextStep && (
                    <p className="text-[11px] text-white/50 truncate font-sans mt-0.5">
                      Next: {nextStep.instruction}
                    </p>
                  )}

                  {isCongested && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amber-400 font-mono">
                      <AlertTriangle className="size-3.5 shrink-0" />
                      {role === "staff" ? (
                        <span>
                          Warning: High crowd density ({fromPoi?.zoneId}: {getZonePct(fromZone)}% [{fromZone?.congestion}], {toPoi?.zoneId}: {getZonePct(toZone)}% [{toZone?.congestion}])
                        </span>
                      ) : (
                        <span>
                          Warning: Route crosses high-density concourse areas. Expect minor delays.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSwapPoints}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Swap Start and Destination"
                >
                  <ArrowUpRight className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Navigation completed. Arrived at destination!")
                    setIsNavigating(false)
                  }}
                  className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-mono uppercase tracking-widest text-xs font-bold transition-all shadow-lg shadow-red-600/30 cursor-pointer flex items-center gap-2"
                >
                  <X className="size-3.5" />
                  <span>End Navigation</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}