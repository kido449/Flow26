"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle, MessageSquare, RotateCcw, Send, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SourcesPanel } from "@/components/assistant/sources-panel"
import { useApp } from "@/lib/state/app-context"
import { useGroundedChat } from "@/hooks/use-grounded-chat"
import { SUGGESTIONS } from "@/lib/content/suggestions"
import { cn } from "@/lib/utils"

export function AssistantView() {
  const { t, locale } = useApp()
  const { messages, isStreaming, send, retryLast } = useGroundedChat(locale)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  function submit() {
    if (!input.trim() || isStreaming) return
    void send(input)
    setInput("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault()
      submit()
    }
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden">

      {/* Header */}
      <header className="flex flex-col gap-1 pb-4 border-b border-border">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
          <MessageSquare className="size-4 text-foreground" />
          <span>{t("assistant.title")}</span>
        </h2>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground font-light">
          <ShieldCheck className="size-3.5 text-muted-foreground" />
          <span>{t("assistant.subtitle")}</span>
        </p>
      </header>

      {/* Messages Window */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-hide">
        {!hasMessages && (
          <div className="flex flex-col gap-5 border border-border rounded-lg bg-muted/30 p-7 text-center max-w-lg mx-auto my-4">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-foreground text-background border border-border">
              <Sparkles className="size-4" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">Welcome to Fan &amp; Staff Copilot</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">{t("assistant.empty")}</p>
            </div>
            <div className="flex flex-col gap-3 pt-1">
              <span className="mono-label justify-center">{t("assistant.suggestions")}</span>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS[locale].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="pill-btn text-muted-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] md:max-w-[75%]", m.role === "user" ? "" : "w-full")}>
              {m.role === "user" ? (
                /* User bubble — solid foreground fill */
                <div className="bg-foreground text-background rounded-lg px-5 py-3.5 text-sm leading-relaxed font-light">
                  {m.content}
                </div>
              ) : (
                /* AI response — flat card, 1px border */
                <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3">
                  {m.error ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-xs text-destructive font-medium">
                        <AlertTriangle className="size-3.5" />
                        {t("common.error")}
                      </span>
                      <Button size="sm" variant="outline" onClick={retryLast} className="gap-1.5 h-7 px-3 rounded-full text-xs">
                        <RotateCcw className="size-3" />
                        {t("common.retry")}
                      </Button>
                    </div>
                  ) : (
                    <>
                      {m.grounded && (
                        <span className="flex w-fit items-center gap-1.5 rounded-full bg-muted border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          <ShieldCheck className="size-3" />
                          <span>{t("assistant.grounded")}</span>
                        </span>
                      )}
                      <p className="whitespace-pre-wrap leading-relaxed text-sm text-foreground font-light text-pretty">
                        {m.content}
                        {m.pending && (
                          <span className="ml-1 inline-block animate-pulse text-muted-foreground">
                            {m.content ? "▍" : t("assistant.thinking")}
                          </span>
                        )}
                      </p>
                      {!m.pending && m.sources !== undefined && (
                        <div className="border-t border-border pt-3 mt-1">
                          <SourcesPanel sources={m.sources} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 pt-3 border-t border-border/80">
        <div className="flex-1 relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Where is the nearest accessible restroom to Gate 7?"
            rows={1}
            className="mt-auto h-12 w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none placeholder:text-muted-foreground transition-colors scrollbar-hide font-normal leading-normal"
            aria-label={t("assistant.placeholder")}
          />
        </div>
        <Button
          onClick={submit}
          disabled={!input.trim() || isStreaming}
          size="icon"
          className="size-12 shrink-0 bg-foreground text-background rounded-xl hover:bg-foreground/80 transition-colors font-medium cursor-pointer disabled:opacity-40 shadow-none"
        >
          <Send className="size-4" />
          <span className="sr-only">{t("assistant.send")}</span>
        </Button>
      </div>
    </div>
  )
}
