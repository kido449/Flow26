import type { Locale } from "@/lib/types"
import { DICTIONARIES, type TranslationKey } from "@/lib/services/translation/dictionary"

// TRANSLATION SERVICE
// Single typed entry point for UI copy. Backed by a static dictionary today;
// the same interface could later delegate to a translation API without changing
// any calling component.

export type { TranslationKey }

export interface Translator {
  locale: Locale
  t: (key: TranslationKey) => string
}

export function getTranslator(locale: Locale): Translator {
  const dict = DICTIONARIES[locale] ?? DICTIONARIES.en
  return {
    locale,
    t: (key: TranslationKey) => dict[key] ?? DICTIONARIES.en[key] ?? key,
  }
}
