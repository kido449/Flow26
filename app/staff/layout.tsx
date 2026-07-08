"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, ClipboardList, AlertTriangle, Map, MessageSquare, LogOut, ShieldCheck } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useApp } from "@/lib/state/app-context"
import { cn } from "@/lib/utils"
import { GhostCursor } from "@/components/ui/ghost-cursor"

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { t } = useApp()

  const staffNavItems = [
    { href: "/staff#tasks", icon: ClipboardList, label: "Tasks" },
    { href: "/staff#report", icon: AlertTriangle, label: "Incidents" },
    { href: "/staff/wayfinding", icon: Map, label: "Map" },
    { href: "/staff/assistant", icon: MessageSquare, label: "Copilot" },
  ]

  const isActive = (href: string) => {
    if (href.includes("#")) return pathname === "/staff"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div className="flex min-h-dvh w-full bg-background text-foreground font-sans relative overflow-x-hidden">
      {/* Cinematic Smoky GhostCursor Background for Staff Mode */}
      <GhostCursor
        color="#10b981"
        brightness={1.3}
        trailLength={35}
        inertia={0.45}
        bloomStrength={0.4}
        grainIntensity={0.04}
        className="fixed inset-0 z-0 pointer-events-none opacity-70"
        zIndex={0}
      />

      {/* Sidebar — desktop only, flat 1px right border */}
      <aside className="hidden md:flex flex-col justify-between shrink-0 w-56 bg-background/80 backdrop-blur-md border-r border-border h-dvh sticky top-0 py-6 px-4 z-40 pointer-events-auto">
        <div>
          <Link href="/" className="flex items-center gap-2.5 group mb-8">
            <span className="flex size-7 items-center justify-center rounded-sm bg-foreground text-background transition-transform duration-300 group-hover:scale-105">
              <Trophy className="size-3.5" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{t("app.name")}</span>
          </Link>

          <p className="mono-label mb-4">[ 02 ] Staff Portal</p>

          <div className="divider mb-4" />

          <nav className="flex flex-col gap-0.5">
            {staffNavItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
          <div className="divider" />
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </div>
          <Link href="/" className="pill-btn text-muted-foreground w-full justify-center">
            <LogOut className="size-3" />
            <span>Exit</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 pointer-events-auto">
        {/* Mobile / compact header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-5 py-3 flex items-center justify-between md:justify-end transition-colors duration-300">
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-sm bg-foreground text-background">
                <Trophy className="size-3.5" />
              </span>
              <span className="text-sm font-semibold">{t("app.name")}</span>
            </Link>
            <div className="divider h-4 w-px bg-border" />
            <span className="mono-label">[ 02 ] Staff</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-foreground opacity-40 animate-pulse-ring" />
              <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
            </span>
            <span className="mono-label">Staff Volunteer Copilot • Ops Active</span>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitcher />
            <LocaleSwitcher />
            <Link href="/" className="pill-btn text-muted-foreground">
              <LogOut className="size-3" />
            </Link>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-5 md:px-8 pb-28 md:pb-10 pt-8 animate-reveal">
          {children}
        </main>
      </div>

      {/* Mobile nav dock */}
      <nav className="fixed inset-x-4 bottom-4 z-50 md:hidden bg-background/90 backdrop-blur-md border border-border rounded-full py-1.5 px-2 flex items-center justify-around shadow-sm max-w-xs mx-auto pointer-events-auto">
        {staffNavItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs transition-all duration-300",
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
