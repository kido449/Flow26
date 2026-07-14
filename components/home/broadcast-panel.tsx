"use client"

import React, { useState } from "react"
import { Radio, Flame, Send, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

/**
 * BroadcastPanel — Emergency mass broadcast control panel. Allows command
 * staff to transmit high-priority push notifications to fans and staff.
 */
export function BroadcastPanel() {
  const [broadcastMsg, setBroadcastMsg] = useState("")
  const [broadcasting, setBroadcasting] = useState(false)

  function handleBroadcast(e: React.FormEvent) {
    e.preventDefault()
    if (!broadcastMsg.trim()) return
    setBroadcasting(true)
    setTimeout(() => {
      setBroadcasting(false)
      toast.success("Mass Broadcast Transmitted!", {
        description: `Delivered to 84,200 Fan devices & 420 Staff terminals: "${broadcastMsg}"`,
      })
      setBroadcastMsg("")
    }, 1000)
  }

  return (
    <section id="broadcast" className="bg-card/90 backdrop-blur border border-border rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-none relative scroll-mt-24 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary animate-pulse shrink-0">
            <Radio className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xl font-serif font-bold tracking-tight text-foreground">Emergency Mass Broadcast Control</h3>
            <p className="text-xs text-muted-foreground font-sans">Instantly transmit high-priority push notifications to all 84,200 Fan devices and 420 Staff terminals.</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 text-red-400 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] border border-red-500/30 shrink-0 w-fit">
          <Flame className="size-3.5 animate-pulse" /> override channel ready
        </span>
      </div>

      <form onSubmit={handleBroadcast} className="flex flex-col sm:flex-row items-stretch gap-3">
        <input
          type="text"
          value={broadcastMsg}
          onChange={(e) => setBroadcastMsg(e.target.value)}
          placeholder="Type stadium-wide broadcast announcement (e.g. 'Post-match express shuttles departing Gate 2 North Plaza')..."
          className="flex-1 bg-secondary rounded-full border border-border px-6 py-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <Button
          type="submit"
          disabled={!broadcastMsg.trim() || broadcasting}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono uppercase tracking-[0.2em] text-xs px-8 py-4 rounded-full gap-2 shadow-lg shadow-primary/25 transition-all cursor-pointer disabled:opacity-50 shrink-0 h-auto"
        >
          {broadcasting ? (
            <>
              <RotateCcw className="size-4 animate-spin" />
              <span>broadcasting...</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>transmit broadcast</span>
            </>
          )}
        </Button>
      </form>
    </section>
  )
}
