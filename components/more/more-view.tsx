"use client"

import React from "react"
import { Sparkles, Shield, Globe, Cpu, Radio, Lock, Zap, Accessibility, Crown, AlertTriangle, Coffee, ShieldAlert, type LucideIcon } from "lucide-react"
import { MagicBento } from "@/components/ui/magic-bento"
import { useApp } from "@/lib/state/app-context"
import { STADIUM_NAME } from "@/lib/rag/knowledge"
import type { TranslationKey } from "@/lib/services/translation"

export interface StubModule {
  slug: string
  titleKey: TranslationKey
  descKey: TranslationKey
  icon: LucideIcon
}

// Transit is excluded — a real TransitView with live data exists at components/more/transit-view.tsx.
export const STUB_MODULES: StubModule[] = [
  { slug: "accessibility", titleKey: "stub.accessibility.title", descKey: "stub.accessibility.desc", icon: Accessibility },
  { slug: "vip", titleKey: "stub.vip.title", descKey: "stub.vip.desc", icon: Crown },
  { slug: "emergency", titleKey: "stub.emergency.title", descKey: "stub.emergency.desc", icon: AlertTriangle },
  { slug: "concessions", titleKey: "stub.concessions.title", descKey: "stub.concessions.desc", icon: Coffee },
  { slug: "incidents", titleKey: "stub.incidents.title", descKey: "stub.incidents.desc", icon: ShieldAlert },
]

export function MoreView() {
  const { t, role } = useApp()

  const advancedModules = [
    {
      title: "Real-Time Telemetry & Thermal Mapping",
      description:
        "High-density LiDAR and thermal sensor feeds aggregating crowd density, queue velocity, and zone congestion in real time across all 4 stadium gates.",
      label: "Sensor Fusion",
      href: "/crowd",
      icon: Cpu,
    },
    {
      title: "Grounded AI RAG Copilot",
      description:
        "Multilingual conversational engine backed by FIFA matchday operations handbooks, accessibility protocols, and real-time transit schedules.",
      label: "Intelligence",
      href: "/assistant",
      icon: Sparkles,
    },
    {
      title: "Sensory-Aware Wayfinding Routing",
      description:
        "Dynamic routing engine offering standard, express, sensory-friendly (low noise/lighting), and step-free accessible navigation paths.",
      label: "Navigation",
      href: "/wayfinding",
      icon: Globe,
    },
    {
      title: "Stadium Sustainability Programs",
      description:
        "Zero-waste-to-landfill operations, solar-powered lighting, water refill stations, and carbon offset partnerships for eco-friendly matchdays.",
      label: "Sustainability",
      href: "/sustainability",
      icon: Globe,
    },
    {
      title: "Live Transportation & Transit Hub",
      description:
        "Metro Line 2 schedules, parking lot availability, rideshare pickup zones, and post-match shuttle tracking with live crowd data integration.",
      label: "Transit",
      href: "/transit",
      icon: Radio,
    },
    {
      title: "Role-Based Command Layouts",
      description:
        "Customized UI workspaces tailored for Fan chat assistance, Staff operational dashboards, and Command Center strategic bird's-eye monitoring.",
      label: "Access Control",
      href: "/more",
      icon: Shield,
    },
    {
      title: "Global Multilingual Translation",
      description:
        "Instantaneous translation and localization across English, Spanish, French, and Portuguese with dialect-aware sports terminology.",
      label: "Localization",
      href: "/assistant",
      icon: Radio,
    },
  ]

  return (
    <div className="flex flex-col gap-10 animate-fade-up py-4">
      {/* Header section */}
      <section className="flex flex-col gap-3 border-b border-border pb-8">
        <div className="flex items-center gap-2 font-mono uppercase tracking-[0.3em] text-xs text-primary">
          <Zap className="size-3.5 text-primary shrink-0" />
          <span>{STADIUM_NAME} • system architecture</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-foreground">
          copilot <span className="italic font-normal text-primary">modules</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl font-sans leading-relaxed">
          Explore the full suite of Organic Intelligence microservices powering safety, wayfinding, and real-time operations for the FIFA World Cup 2026.
        </p>
      </section>

      {/* MagicBento Grid for All Modules */}
      <section aria-labelledby="modules-grid" className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground px-1">
          <span>active system grid ({advancedModules.length} nodes)</span>
          <span className="flex items-center gap-1.5 text-primary">
            <Lock className="size-3" /> role: {role}
          </span>
        </div>
        <MagicBento
          cards={advancedModules}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={350}
          particleCount={15}
          glowColor="217, 165, 32"
        />
      </section>
    </div>
  )
}
