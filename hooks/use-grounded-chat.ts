"use client"

import { useCallback, useRef, useState } from "react"
import type { ChatSource, Locale } from "@/lib/types"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: ChatSource[]
  grounded?: boolean
  pending?: boolean
  error?: boolean
}

function uid() {
  return Math.random().toString(36).slice(2)
}

function parseSources(header: string | null): ChatSource[] {
  if (!header) return []
  try {
    return JSON.parse(decodeURIComponent(header)) as ChatSource[]
  } catch {
    return []
  }
}

export function useGroundedChat(locale: Locale) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isStreaming) return

      const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed }
      const assistantId = uid()
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "", pending: true },
      ])
      setIsStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, locale }),
          signal: controller.signal,
        })

        if (!res.ok || !res.body) {
          throw new Error(`Request failed: ${res.status}`)
        }

        const grounded = res.headers.get("x-grounded") === "true"
        const sources = parseSources(res.headers.get("x-sources"))

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, grounded, sources } : m)),
        )

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let acc = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          acc += decoder.decode(value, { stream: true })
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: acc, pending: false } : m)),
          )
        }

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, pending: false } : m)),
        )
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setMessages((prev) => prev.filter((m) => m.id !== assistantId))
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, pending: false, error: true, content: "" } : m,
            ),
          )
        }
      } finally {
        setIsStreaming(false)
        abortRef.current = null
      }
    },
    [isStreaming, locale],
  )

  const retryLast = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user")
    if (!lastUser) return
    // Drop the last user turn and the failed assistant reply; send() re-adds them.
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === lastUser.id)
      return prev.slice(0, idx)
    })
    void send(lastUser.content)
  }, [messages, send])

  return { messages, isStreaming, send, retryLast }
}
