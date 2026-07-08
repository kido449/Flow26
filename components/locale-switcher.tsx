"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp } from "@/lib/state/app-context"
import { LOCALES, type Locale } from "@/lib/types"
import { cn } from "@/lib/utils"

export function LocaleSwitcher() {
  const { locale, setLocale, t } = useApp()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className="h-9 gap-2 rounded-full bg-secondary text-secondary-foreground border border-border shadow-none font-mono uppercase tracking-[0.2em] text-xs px-3.5 select-none"
        aria-label={`${t("locale.label")}: ${locale}`}
      >
        <Globe className="size-3.5 text-primary" />
        <span className="uppercase">{locale}</span>
        <ChevronDown className="size-3.5 opacity-70" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="h-9 gap-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border border-border shadow-none font-mono uppercase tracking-[0.2em] text-xs px-3.5 cursor-pointer select-none"
          aria-label={`${t("locale.label")}: ${locale}`}
        >
          <Globe className="size-3.5 text-primary" />
          <span className="uppercase">{locale}</span>
          <ChevronDown className="size-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover text-popover-foreground border border-border rounded-2xl shadow-2xl p-1.5 min-w-[140px] transition-all duration-300">
        {LOCALES.map((l: Locale) => {
          const active = l === locale
          return (
            <DropdownMenuItem
              key={l}
              onSelect={() => setLocale(l)}
              className={cn(
                "flex items-center justify-between py-2 px-3 rounded-xl cursor-pointer font-mono uppercase tracking-[0.2em] text-xs transition-colors mt-0.5 first:mt-0",
                active ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              )}
            >
              <span>{t(`locale.${l}`)}</span>
              {active && <Check className="size-3.5 text-primary-foreground" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
