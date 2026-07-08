import type { Locale } from "@/lib/types"

// Localized starter questions. Kept as content (not UI chrome) alongside the
// translation module. All map to topics that exist in the knowledge base.
export const SUGGESTIONS: Record<Locale, string[]> = {
  en: [
    "Which gate do I use for section 112?",
    "Where is the nearest medical station?",
    "What items are prohibited?",
    "How do I get here by metro?",
  ],
  es: [
    "¿Qué puerta uso para la sección 112?",
    "¿Dónde está el puesto médico más cercano?",
    "¿Qué objetos están prohibidos?",
    "¿Cómo llego en metro?",
  ],
  fr: [
    "Quelle porte pour la section 112 ?",
    "Où est le poste de secours le plus proche ?",
    "Quels objets sont interdits ?",
    "Comment venir en métro ?",
  ],
  pt: [
    "Qual portão uso para a seção 112?",
    "Onde fica o posto médico mais próximo?",
    "Quais itens são proibidos?",
    "Como chego de metrô?",
  ],
}
