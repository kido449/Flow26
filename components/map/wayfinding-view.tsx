"use client"

import React, { useMemo, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Navigation,
  MapPin,
  Clock,
  Search,
  X,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react"
import { toast } from "sonner"
import { getMapService } from "@/lib/services/map-service"
import { useLiveSnapshot } from "@/hooks/use-live-snapshot"
import { useApp } from "@/lib/state/app-context"
import { cn } from "@/lib/utils"

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

export function WayfindingView() {
  const { t, role } = useApp()
  const mapService = getMapService()
  const { snapshot } = useLiveSnapshot()

  const [fromId, setFromId] = useState<string>("gate-7")
  const [toId, setToId] = useState<string>("sec-104")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [isNavigating, setIsNavigating] = useState<boolean>(true)
  const [zoomLevel, setZoomLevel] = useState<number>(1)

  // Map constraints reference for drag
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Reset step index whenever route changes
  useEffect(() => {
    setCurrentStepIndex(0)
    setIsNavigating(true)
  }, [fromId, toId])

  const toPoi = useMemo(() => RAPIDO_POIS.find((p) => p.id === toId) || RAPIDO_POIS[1], [toId])
  const fromPoi = useMemo(() => RAPIDO_POIS.find((p) => p.id === fromId) || RAPIDO_POIS[0], [fromId])

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

  function handleSelectPoi(id: string) {
    if (id === fromId) return
    setToId(id)
    setSearchQuery("")
    const p = RAPIDO_POIS.find((x) => x.id === id)
    toast.success(`Route calculated to ${p?.label || "destination"}`)
  }

  // Rapido Route coordinates: Gate 7 (180, 450) -> West Concourse -> North Concourse -> Section 104 (750, 250)
  const rapidoPathD = "M 180 450 L 260 450 C 260 300, 350 180, 500 180 L 680 180 L 750 250"
  
  // Exact coordinate waypoints for the live tracking beacon animation
  const trackingX = [180, 260, 280, 340, 420, 500, 600, 680, 715, 750]
  const trackingY = [450, 450, 360, 260, 200, 180, 180, 180, 215, 250]

  const steps = [
    { instruction: "Start at Gate 7 (West Entrance Plaza) after security screening." },
    { instruction: "Walk straight along the West Concourse past the FIFA Gourmet Lounge." },
    { instruction: "Turn right and follow the curved corridor into the North Concourse." },
    { instruction: "Continue straight along North Concourse past Restroom Block N." },
    { instruction: "Turn right into Portal 104 tunnel to access your seating section." },
  ]

  const currentStep = steps[currentStepIndex]
  const nextStep = steps[currentStepIndex + 1]
  const distanceMeters = 340
  const etaMinutes = 4

  return (
    <div className="fixed inset-0 h-dvh w-dvw z-20 bg-black overflow-hidden select-none selection:bg-primary/30 selection:text-white">
      {/* 1. THE MAP LAYER (Background - Absolute Full Screen z-0) */}
      <div ref={mapContainerRef} className="absolute inset-0 h-screen w-screen z-0 overflow-hidden bg-black flex items-center justify-center">
        {/* Spatial background blueprint dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        {/* Interactive Drag & Zoom Workspace */}
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
            
            {/* Outer Stadium Facade & Walkway Ring */}
            <rect x="100" y="50" width="1000" height="800" rx="200" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <rect x="140" y="80" width="920" height="740" rx="170" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" strokeDasharray="12 12" />

            {/* Upper Seating Tier (Segmented Ring) */}
            <rect x="180" y="110" width="840" height="680" rx="150" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
            
            {/* Club Level / Concourse Corridor Ring */}
            <rect x="250" y="170" width="700" height="560" rx="110" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            
            {/* Lower Seating Tier Ring */}
            <rect x="320" y="230" width="560" height="440" rx="80" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />

            {/* Radial Section Divider Lines */}
            <line x1="320" y1="230" x2="180" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="880" y1="230" x2="1020" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="320" y1="670" x2="180" y2="790" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="880" y1="670" x2="1020" y2="790" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="600" y1="230" x2="600" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="600" y1="670" x2="600" y2="850" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="320" y1="450" x2="100" y2="450" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="880" y1="450" x2="1100" y2="450" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

            {/* --- PITCH AREA (Very faint dark green fill="#0a1a0f") --- */}
            <rect x="400" y="290" width="400" height="320" rx="40" fill="#0a1a0f" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            {/* Pitch Markings */}
            <line x1="600" y1="290" x2="600" y2="610" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <circle cx="600" cy="450" r="50" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <circle cx="600" cy="450" r="4" fill="rgba(255,255,255,0.3)" />
            {/* Penalty Boxes */}
            <rect x="400" y="360" width="60" height="180" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <rect x="740" y="360" width="60" height="180" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />

            {/* --- STATIC POIS (Small Squares & Gates) --- */}
            {/* Gate A (North) */}
            <rect x="570" y="70" width="60" height="40" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="600" y="94" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace">GATE A</text>

            {/* Gate B (East) */}
            <rect x="1010" y="430" width="40" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="1030" y="465" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace" transform="rotate(90 1030 465)">GATE B</text>

            {/* Gate C (South) */}
            <rect x="570" y="790" width="60" height="40" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="600" y="815" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace">GATE C</text>

            {/* Concession Stand & Restroom Icons */}
            <rect x="480" y="165" width="40" height="30" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <text x="500" y="184" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">WC</text>

            <rect x="245" y="435" width="30" height="30" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <text x="260" y="454" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">BAR</text>

            {/* --- KEY WAYPOINTS: Gate 7 (Start) & Section 104 (End) --- */}
            {/* Gate 7 Plaza (West) */}
            <g transform="translate(150, 420)">
              <rect width="60" height="60" rx="14" fill="rgba(217,165,32,0.15)" stroke="#d9a520" strokeWidth="2.5" />
              <text x="30" y="32" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace" fontWeight="bold">GATE 7</text>
              <text x="30" y="46" textAnchor="middle" fill="#d9a520" fontSize="9" fontFamily="monospace">START</text>
            </g>

            {/* Section 104 (North-East Tier) */}
            <g transform="translate(710, 220)">
              <rect width="80" height="60" rx="14" fill="rgba(217,165,32,0.2)" stroke="#d9a520" strokeWidth="2.5" />
              <text x="40" y="32" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="monospace" fontWeight="bold">SEC 104</text>
              <text x="40" y="48" textAnchor="middle" fill="#d9a520" fontSize="10" fontFamily="monospace">DESTINATION</text>
            </g>

            {/* --- 2. THE ANIMATED ROUTE (SVG Path with Rapido Drawing Effect) --- */}
            {isNavigating && (
              <>
                {/* Background blurred neon gold halo */}
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

                {/* Solid glowing FIFA Gold path */}
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

                {/* --- 3. THE LIVE TRACKING DOT (Framer Motion Beacon along coordinates) --- */}
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
                  {/* Outer Gold Halo Radar Pulse */}
                  <motion.circle
                    r="24"
                    fill="rgba(217, 165, 32, 0.35)"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Mid Gold Ring */}
                  <circle r="12" fill="rgba(217, 165, 32, 0.8)" stroke="#fff" strokeWidth="2" />
                  {/* Inner White Core Dot */}
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

      {/* 2. THE TOP OVERLAYS (Search Pill & Live Status - pointer-events-none wrapper) */}
      <div className="absolute top-24 md:top-6 left-0 right-0 z-10 pointer-events-none px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto gap-3">
        {/* Floating Glass Search Pill */}
        <div className="relative w-full sm:w-80 pointer-events-auto">
          <div className="flex items-center gap-2.5 bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2.5 shadow-2xl transition-all duration-300 focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20">
            <Search className="size-4 text-primary shrink-0" />
            <input
              type="text"
              placeholder={t("wayfinding.findPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Search Results Dropdown */}
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
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPoi(p.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-neutral-800 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="size-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs font-semibold text-white font-mono uppercase tracking-wider">{p.label}</div>
                        <div className="text-[10px] text-white/40 font-sans capitalize">{p.kind} • {p.zoneId.replace("z-", "")}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      Navigate
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Sensor Status Badge */}
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

      {/* 3. THE BOTTOM OVERLAY (The Route Card Fix - Pinned to bottom, max-h-[50vh], center 50% empty) */}
      <AnimatePresence>
        {isNavigating && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-10 pointer-events-none">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-h-[50vh] overflow-y-auto bg-neutral-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-white pointer-events-auto scrollbar-thin scrollbar-thumb-white/10"
            >
              {/* Top Destination Title Bar */}
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3.5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 shadow-inner">
                    <Navigation className="size-5 text-primary animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary font-bold block">
                      {t("wayfinding.activeRoute")}
                    </span>
                    <h2 className="text-lg font-serif font-bold tracking-tight text-white leading-tight mt-0.5">
                      {t("wayfinding.navigatingTo")} {toPoi?.label || "Section 104"}
                    </h2>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] bg-neutral-800 border border-white/10 px-2.5 py-1 rounded-full text-white/70 shrink-0">
                  {toPoi?.kind || "seat"}
                </span>
              </div>

              {/* Big ETA & Distance Row */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                <div className="bg-neutral-800/60 rounded-2xl p-3.5 border border-white/5 flex flex-col justify-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-1">
                    <Clock className="size-3 text-primary" />
                    ETA
                  </span>
                  <span className="text-2xl font-serif font-bold text-white mt-1 tabular-nums">
                    {etaMinutes} {t("wayfinding.etaWalk")}
                  </span>
                </div>
                <div className="bg-neutral-800/60 rounded-2xl p-3.5 border border-white/5 flex flex-col justify-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-1">
                    <MapPin className="size-3 text-primary" />
                    {t("wayfinding.distance")}
                  </span>
                  <span className="text-2xl font-serif font-bold text-white mt-1 tabular-nums">
                    {distanceMeters} {t("wayfinding.meters")}
                  </span>
                </div>
              </div>

              {/* Live Crowd Warning Badge */}
              <div className="flex items-start gap-2.5 rounded-2xl p-3 text-xs border bg-primary/10 border-primary/30 text-white/90 shrink-0">
                <AlertTriangle className="size-4 shrink-0 mt-0.5 text-primary" />
                <div className="font-sans leading-snug">
                  <strong className="uppercase font-mono tracking-wider mr-1.5 font-bold text-primary">
                    {t("wayfinding.rapidoActive")}
                  </strong>
                  {t("wayfinding.rapidoDesc")}
                </div>
              </div>

              {/* Step-by-Step Instruction Area */}
              <div className="bg-neutral-800/50 rounded-2xl p-4 border border-white/5 flex flex-col gap-2.5 shrink-0">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 border-b border-white/5 pb-2">
                  <span>{t("wayfinding.stepOf")} {currentStepIndex + 1} / {steps.length}</span>
                  {currentStepIndex < steps.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStepIndex((i) => Math.min(steps.length - 1, i + 1))}
                      className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t("wayfinding.nextStep")}</span>
                      <ArrowUpRight className="size-3" />
                    </button>
                  )}
                </div>

                {/* Current Step in Bold White */}
                <div className="flex items-start gap-3 mt-0.5">
                  <span className="size-6 rounded-full bg-primary text-primary-foreground text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-primary/20">
                    {currentStepIndex + 1}
                  </span>
                  <p className="text-base font-bold text-white leading-snug font-sans">
                    {currentStep?.instruction}
                  </p>
                </div>

                {/* Next Step in Muted text-white/40 */}
                {nextStep && (
                  <div className="pl-9 pt-1 flex items-start gap-1.5 text-xs text-white/40 font-sans leading-relaxed border-t border-white/5 mt-1.5">
                    <span className="font-mono uppercase text-[10px] tracking-wider text-primary font-semibold shrink-0">
                      Then:
                    </span>
                    <span>{nextStep.instruction}</span>
                  </div>
                )}
              </div>

              {/* Prominent Gold Action Button Row */}
              <div className="grid grid-cols-2 gap-3 pt-1 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Navigation completed. Arrived at Section 104!")
                    setIsNavigating(false)
                  }}
                  className="w-full py-3.5 px-4 rounded-full bg-primary text-primary-foreground font-mono uppercase tracking-[0.15em] text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 cursor-pointer flex items-center justify-center gap-2 scale-100 hover:scale-[1.02]"
                >
                  <CheckCircle2 className="size-4" />
                  <span>End Navigation</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.info("Obstacle reported! Recalculating alternative step-free concourse...")
                    if (currentStepIndex < steps.length - 1) {
                      setCurrentStepIndex((i) => i + 1)
                    }
                  }}
                  className="w-full py-3.5 px-4 rounded-full bg-neutral-800 text-white/90 border border-white/10 font-mono uppercase tracking-[0.15em] text-xs font-semibold hover:bg-neutral-700 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 scale-100 hover:scale-[1.02]"
                >
                  <AlertTriangle className="size-4 text-primary" />
                  <span>Report Blocked</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* If navigation ended, allow easy re-engaging */}
      {!isNavigating && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex justify-center">
          <button
            type="button"
            onClick={() => setIsNavigating(true)}
            className="py-3.5 px-8 rounded-full bg-primary text-primary-foreground font-mono uppercase tracking-[0.2em] text-xs font-bold shadow-2xl shadow-primary/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 pointer-events-auto"
          >
            <Navigation className="size-4" />
            <span>Resume Rapido Route</span>
          </button>
        </div>
      )}
    </div>
  )
}
