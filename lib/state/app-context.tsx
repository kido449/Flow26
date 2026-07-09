"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Locale, Role } from "@/lib/types"
import { getTranslator, type TranslationKey } from "@/lib/services/translation"

// Combined client state for the active role and locale, plus a translation
// helper. Persists both to localStorage purely as a UX convenience (remembering
// a demo selection), not as application data.

interface AppState {
  role: Role
  locale: Locale
  setRole: (role: Role) => void
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const AppContext = createContext<AppState | null>(null)

const ROLE_KEY = "tc.role"
const LOCALE_KEY = "tc.locale"

export function isRole(v: string | null): v is Role {
  return v === "fan" || v === "staff" || v === "command"
}
export function isLocale(v: string | null): v is Locale {
  return v === "en" || v === "es" || v === "fr" || v === "pt"
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("fan")
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const storedRole = localStorage.getItem(ROLE_KEY)
    const storedLocale = localStorage.getItem(LOCALE_KEY)
    if (isRole(storedRole)) setRoleState(storedRole)
    if (isLocale(storedLocale)) setLocaleState(storedLocale)
  }, [])

  const setRole = useCallback((r: Role) => {
    setRoleState(r)
    localStorage.setItem(ROLE_KEY, r)
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(LOCALE_KEY, l)
  }, [])

  const translator = useMemo(() => getTranslator(locale), [locale])

  const value = useMemo<AppState>(
    () => ({ role, locale, setRole, setLocale, t: translator.t }),
    [role, locale, setRole, setLocale, translator],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
