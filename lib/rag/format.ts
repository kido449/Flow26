import type { ChatSource, Locale, RetrievedChunk } from "@/lib/types"

// FORMAT LAYER
// Pure helpers that turn retrieval results into (a) the grounding context given
// to the model and (b) the citation sources shown in the UI. Also owns the
// grounded refusal message. All pure + unit-tested.

export const NO_DATA_MESSAGE: Record<Locale, string> = {
  en: "I don't have that information in my stadium data, so I can't answer that reliably. Try asking about gates, seating, restrooms, medical stations, exits, transport, tickets, timing, accessibility, or food.",
  es: "No tengo esa información en mis datos del estadio, así que no puedo responder con fiabilidad. Pregúntame sobre puertas, asientos, baños, puestos médicos, salidas, transporte, entradas, horarios, accesibilidad o comida.",
  fr: "Je n'ai pas cette information dans mes données du stade, je ne peux donc pas répondre de façon fiable. Posez-moi des questions sur les portes, les sièges, les toilettes, les postes de secours, les sorties, les transports, les billets, les horaires, l'accessibilité ou la restauration.",
  pt: "Não tenho essa informação nos dados do estádio, então não posso responder com segurança. Pergunte sobre portões, assentos, banheiros, postos médicos, saídas, transporte, ingressos, horários, acessibilidade ou alimentação.",
}

export function toSources(retrieved: RetrievedChunk[]): ChatSource[] {
  return retrieved.map((r) => ({
    id: r.chunk.id,
    title: r.chunk.title,
    category: r.chunk.category,
    score: Math.round(r.score * 100) / 100,
  }))
}

// Builds the grounding block injected into the system prompt. Only retrieved
// chunks are included — the model must not see the rest of the knowledge base.
export function buildContext(retrieved: RetrievedChunk[]): string {
  if (retrieved.length === 0) return ""
  return retrieved
    .map((r, i) => `[Source ${i + 1}: ${r.chunk.title}]\n${r.chunk.text}`)
    .join("\n\n")
}

const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  pt: "Portuguese",
}

// System prompt enforcing strict grounding + response language.
export function buildSystemPrompt(context: string, locale: Locale, liveSummary: string): string {
  return [
    "You are Tournament Copilot, an assistant for fans and staff at a FIFA World Cup 2026 stadium.",
    `Always respond in ${LOCALE_NAME[locale]}.`,
    "Answer ONLY using the CONTEXT and LIVE DATA provided below.",
    "If the answer is not contained in the provided context, say you don't have that information — never invent gates, section numbers, times, or policies.",
    "Be concise and practical. Prefer short paragraphs or bullet points. When relevant, reference specific gates, sections, or times from the context.",
    "",
    "LIVE DATA:",
    liveSummary,
    "",
    "CONTEXT:",
    context,
  ].join("\n")
}
