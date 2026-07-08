"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className="h-9 w-9 rounded-full bg-secondary text-secondary-foreground border border-border shadow-none p-0"
        aria-label="Toggle Theme"
      >
        <Sun className="size-4 text-primary" />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 gap-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border border-border shadow-none font-mono uppercase tracking-[0.2em] text-xs px-3.5 cursor-pointer select-none"
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      {isDark ? (
        <>
          <Moon className="size-3.5 text-primary animate-pulse" />
          <span className="hidden sm:inline font-semibold">Dark</span>
        </>
      ) : (
        <>
          <Sun className="size-3.5 text-primary animate-pulse" />
          <span className="hidden sm:inline font-semibold">Light</span>
        </>
      )}
    </Button>
  )
}
