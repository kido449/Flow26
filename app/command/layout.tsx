"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Activity, Users, ShieldAlert, Radio, HeartPulse, LogOut } from "lucide-react"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { useApp } from "@/lib/state/app-context"
import { cn } from "@/lib/utils"
import { LightRays } from "@/components/ui/light-rays"

export default function CommandLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { t } = useApp()

  const commandNavItems = [
    { href: "/command", icon: Activity, label: "Telemetry" },
    { href: "/command/crowd", icon: Users, label: "Heatmaps" },
    { href: "/command#incidents", icon: ShieldAlert, label: "Incidents" },
    { href: "/command#broadcast", icon: Radio, label: "Broadcast" },
    { href: "/command/more", icon: HeartPulse, label: "Health" },
  ]

  const isActive = (href: string) => {
    if (href === "/command" || href.includes("#")) return pathname === "/command"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div className="dark flex min-h-dvh w-full bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden">
      {/* Immersive WebGL LightRays Atmospheric Background for Command Center */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1.2}
        lightSpread={1.4}
        rayLength={2.0}
        followMouse={true}
        mouseInfluence={0.25}
        noiseAmount={0.03}
        distortion={0.06}
        className="opacity-70 fixed inset-0 z-0 pointer-events-none"
      />

      {/* Command Center Sidebar — dark section, desktop only */}
      <aside className="hidden md:flex flex-col justify-between shrink-0 w-56 bg-[#0a0a0a] text-white border-r border-white/10 h-dvh sticky top-0 py-6 px-4 z-40">
        <div>
          <Link href="/" className="flex items-center gap-2.5 group mb-8">
            <span className="flex size-7 items-center justify-center rounded-sm bg-white text-black transition-transform duration-300 group-hover:scale-105">
              <Trophy className="size-3.5" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{t("app.name")}</span>
          </Link>

          <p className="mono-label text-white/40 mb-4">[ 03 ] DEFCON Ops</p>

          <hr className="border-white/10 mb-4" />

          <nav className="flex flex-col gap-0.5">
            {commandNavItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300",
                    active
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  )}
                >
                  <Icon className="size-3.5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <hr className="border-white/10" />
          <LocaleSwitcher />
          <Link href="/" className="pill-btn border-white/20 text-white/60 w-full justify-center hover:bg-white hover:text-black hover:border-white">
            <LogOut className="size-3" />
            <span>Exit</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-5 py-3 flex items-center justify-between text-white transition-colors duration-300">
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-sm bg-foreground text-background">
                <Trophy className="size-3.5" />
              </span>
              <span className="text-sm font-semibold">{t("app.name")}</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <span className="mono-label">[ 03 ] Command</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-foreground opacity-40 animate-pulse-ring" />
              <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
            </span>
            <span className="mono-label">Global Command Ops • Telemetry Streaming Active</span>
          </div>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <Link href="/" className="pill-btn text-muted-foreground md:hidden">
              <LogOut className="size-3" />
            </Link>
          </div>
        </header>

        <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pb-28 md:pb-10 pt-8 animate-reveal">
          {children}
        </main>
      </div>

      {/* Mobile nav dock */}
      <nav className="fixed inset-x-4 bottom-4 z-50 md:hidden bg-[#0a0a0a]/90 backdrop-blur-md border border-white/15 rounded-full py-1.5 px-2 flex items-center justify-around shadow-sm max-w-sm mx-auto text-white">
        {commandNavItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1 px-2.5 py-2 rounded-full text-xs transition-all duration-300",
                active ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              <span className="mono-label text-inherit">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
