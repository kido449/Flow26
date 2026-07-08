"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, Map, LogOut, Trophy } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useApp } from "@/lib/state/app-context"
import { cn } from "@/lib/utils"
import { GhostCursor } from "@/components/ui/ghost-cursor"

export default function FanLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { t } = useApp()

  const navItems = [
    { href: "/fan", icon: Home, label: t("nav.home") },
    { href: "/fan/assistant", icon: MessageSquare, label: t("nav.assistant") },
    { href: "/fan/wayfinding", icon: Map, label: t("nav.wayfinding") },
  ]

  return (
    <div className="flex min-h-dvh w-full bg-background text-foreground font-sans relative overflow-x-hidden">
      {/* Cinematic Smoky GhostCursor Background for Fan Mode */}
      <GhostCursor
        color="#B19EEF"
        brightness={1.3}
        trailLength={35}
        inertia={0.4}
        bloomStrength={0.4}
        grainIntensity={0.04}
        className="fixed inset-0 z-0 pointer-events-none opacity-70"
        zIndex={0}
      />

      <div className="flex-1 flex flex-col min-w-0 relative z-10 pointer-events-auto">

        {/* Header — thin 1px border, flat, no shadow, no backdrop blur orbs */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-6 py-3 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="flex size-7 items-center justify-center rounded-sm bg-foreground text-background transition-transform duration-300 group-hover:scale-105">
                <Trophy className="size-3.5" />
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">{t("app.name")}</span>
            </Link>
            <div className="divider h-4 w-px bg-border" />
            <span className="mono-label">[ 01 ] {t("fan.mode")}</span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <LocaleSwitcher />
            <Link
              href="/"
              className="pill-btn text-muted-foreground ml-2"
            >
              <LogOut className="size-3" />
              <span className="hidden sm:inline">{t("fan.exit")}</span>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-5 md:px-8 pb-28 pt-8 animate-reveal">
          {children}
        </main>
      </div>

      {/* Bottom Navigation Dock — editorial pill style */}
      <nav className="fixed inset-x-4 bottom-4 z-50 max-w-xs mx-auto bg-background/90 backdrop-blur-md border border-border rounded-full py-1.5 px-2 flex items-center justify-around shadow-sm transition-all duration-300 pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || (item.href !== "/fan" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs transition-all duration-300",
                active
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
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
