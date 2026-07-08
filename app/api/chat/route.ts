import { streamText } from "ai"
import type { Locale } from "@/lib/types"
import { LOCALES } from "@/lib/types"
import { retrieve } from "@/lib/rag/retrieval"
import { buildContext, buildSystemPrompt, NO_DATA_MESSAGE, toSources } from "@/lib/rag/format"
import { summarizeLiveFeed } from "@/lib/rag/live-feed"

export const maxDuration = 30

// [Tier 1: High Impact - Code Quality] Configurable model with secure production fallback.
const MODEL = process.env.AI_MODEL || "openai/gpt-4o-mini"

// [Tier 2: Medium Impact - Security] Maximum allowed character length for incoming chat prompts.
const MAX_MESSAGE_LENGTH = 800

function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as string[]).includes(v)
}

export async function POST(req: Request) {
  let body: { message?: unknown; locale?: unknown }
  try {
    body = await req.json()
  } catch {
    return new Response("Invalid JSON payload", { status: 400 })
  }

  const rawMessage = typeof body.message === "string" ? body.message.trim() : ""
  const locale: Locale = isLocale(body.locale) ? body.locale : "en"

  // [Tier 2: Medium Impact - Security] Input validation & DoS/token exhaustion prevention.
  if (!rawMessage) {
    return new Response("Missing message", { status: 400 })
  }
  if (rawMessage.length > MAX_MESSAGE_LENGTH) {
    return new Response(`Message exceeds maximum allowed length (${MAX_MESSAGE_LENGTH} characters)`, { status: 400 })
  }

  // 1) Retrieve grounding. This is the ONLY knowledge the model may use.
  const retrieved = retrieve(rawMessage)
  const sources = toSources(retrieved)

  // 2) No grounding -> refuse deterministically. We still stream a text response
  //    (and mark it) so the client handles one consistent response shape.
  if (retrieved.length === 0) {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(NO_DATA_MESSAGE[locale]))
        controller.close()
      },
    })
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-grounded": "false",
        "x-sources": encodeURIComponent(JSON.stringify(sources)),
      },
    })
  }

  // 3) Grounded answer: feed only retrieved chunks + live summary to the model.
  const context = buildContext(retrieved)
  const system = buildSystemPrompt(context, locale, summarizeLiveFeed())

  // [Tier 2: Medium Impact - Efficiency & Security] Pass abortSignal so client disconnects abort backend LLM streams immediately.
  const result = streamText({
    model: MODEL,
    system,
    prompt: rawMessage,
    temperature: 0.2,
    abortSignal: req.signal,
  })

  return result.toTextStreamResponse({
    headers: {
      "x-grounded": "true",
      "x-sources": encodeURIComponent(JSON.stringify(sources)),
    },
  })
}
