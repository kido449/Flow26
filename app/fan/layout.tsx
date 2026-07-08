"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, Map, LogOut, Trophy } from "lucide-react"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useApp } from "@/lib/state/app-context"
import { cn } from "@/lib/utils"
import { LightRays } from "@/components/ui/light-rays"

export default function FanLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { t } = useApp()

  const navItems = [
    { href: "/fan", icon: Home, label: t("nav.home") },
    { href: "/fan/assistant", icon: MessageSquare, label: t("nav.assistant") },
    { href: "/fan/wayfinding", icon: Map, label: t("nav.wayfinding") },
  ]

  return (
    <div className="dark flex min-h-dvh w-full bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden">
      {/* Atmospheric WebGL LightRays Background */}
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

      <div className="flex-1 flex flex-col min-w-0 relative z-10 pointer-events-auto">

        {/* Header — thin 1px border, flat, no shadow, no backdrop blur orbs */}
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-6 py-3 flex items-center justify-between text-white transition-colors duration-300">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="flex size-7 items-center justify-center rounded-sm bg-white text-black transition-transform duration-300 group-hover:scale-105">
                <Trophy className="size-3.5" />
              </span>
              <span className="text-sm font-semibold tracking-tight text-white">{t("app.name")}</span>
            </Link>
            <div className="divider h-4 w-px bg-white/15" />
            <span className="mono-label text-white/70">[ 01 ] {t("fan.mode")}</span>
          </div>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <Link
              href="/"
              className="pill-btn border-white/20 text-white/70 hover:bg-white hover:text-black hover:border-white ml-2"
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
