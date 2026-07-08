import { streamText } from "ai"
import type { Locale } from "@/lib/types"
import { LOCALES } from "@/lib/types"
import { retrieve } from "@/lib/rag/retrieval"
import { buildContext, buildSystemPrompt, NO_DATA_MESSAGE, toSources } from "@/lib/rag/format"
import { summarizeLiveFeed } from "@/lib/rag/live-feed"

export const maxDuration = 30

// Fast, multilingual model via the Vercel AI Gateway (no provider package needed).
const MODEL = "openai/gpt-4o-mini"

function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as string[]).includes(v)
}

export async function POST(req: Request) {
  let body: { message?: unknown; locale?: unknown }
  try {
    body = await req.json()
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  const message = typeof body.message === "string" ? body.message.trim() : ""
  const locale: Locale = isLocale(body.locale) ? body.locale : "en"

  if (!message) {
    return new Response("Missing message", { status: 400 })
  }

  // 1) Retrieve grounding. This is the ONLY knowledge the model may use.
  const retrieved = retrieve(message)
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

  const result = streamText({
    model: MODEL,
    system,
    prompt: message,
    temperature: 0.2,
  })

  return result.toTextStreamResponse({
    headers: {
      "x-grounded": "true",
      "x-sources": encodeURIComponent(JSON.stringify(sources)),
    },
  })
}
