"use client"

import React, { useState } from "react"
import { AlertTriangle, Radio, Users, AlertCircle, ShieldCheck, Sparkles, MapPin, CheckCircle2, RotateCcw, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function StaffIncidentForm() {
  const [incidentCategory, setIncidentCategory] = useState<string>("Crowd Bottleneck")
  const [incidentZone, setIncidentZone] = useState<string>("Gate 3 South Plaza")
  const [incidentPriority, setIncidentPriority] = useState<string>("High • Immediate Response")
  const [incidentDesc, setIncidentDesc] = useState<string>("")
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  function handleReportSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!incidentDesc.trim() && incidentCategory !== "Crowd Bottleneck") return

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      toast.success("Incident dispatched to Command Center!", {
        description: `Category: ${incidentCategory} • Zone: ${incidentZone} • Priority: ${incidentPriority.split(" ")[0]}`,
      })
      setTimeout(() => {
        setSubmitted(false)
        setIncidentDesc("")
      }, 4000)
    }, 800)
  }

  return (
    <section id="report" className="flex flex-col gap-4 scroll-mt-24 pb-4">
      <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-foreground px-1">
        <AlertTriangle className="size-4 text-primary" />
        <span>rapid incident reporting form • instant command relay</span>
      </div>

      <form onSubmit={handleReportSubmit} className="bg-card/90 backdrop-blur border border-border rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-none relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xl font-serif font-bold tracking-tight text-foreground">Dispatch Incident to Command Center</h3>
            <p className="text-xs text-muted-foreground font-sans">Reported telemetry alerts will immediately trigger automated unit dispatch and zone crowd notifications.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] border border-primary/30 shrink-0 w-fit">
            <Radio className="size-3.5 animate-pulse" /> live relay active
          </span>
        </div>

        {/* Category Selection Grid */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/90">1. Select Incident Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {["Crowd Bottleneck", "Medical Emergency", "Security / Access", "Facilities Issue", "Accessibility Help"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setIncidentCategory(cat)}
                className={cn(
                  "p-3 rounded-2xl border text-xs font-mono uppercase tracking-[0.1em] transition-all flex flex-col items-center justify-center gap-2 text-center cursor-pointer",
                  incidentCategory === cat
                    ? "bg-primary text-primary-foreground font-bold border-primary shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-secondary/60 border-border text-foreground/80 hover:bg-secondary hover:text-foreground"
                )}
              >
                {cat === "Crowd Bottleneck" && <Users className="size-4" />}
                {cat === "Medical Emergency" && <AlertCircle className="size-4" />}
                {cat === "Security / Access" && <ShieldCheck className="size-4" />}
                {cat === "Facilities Issue" && <Sparkles className="size-4" />}
                {cat === "Accessibility Help" && <MapPin className="size-4" />}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Zone and Priority Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zone Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/90">2. Zone / Affected Area</label>
            <select
              value={incidentZone}
              onChange={(e) => setIncidentZone(e.target.value)}
              className="w-full h-11 bg-secondary rounded-2xl border border-border text-foreground px-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="Gate 3 South Plaza">Gate 3 South Plaza</option>
              <option value="Gate 1 North Entrance">Gate 1 North Entrance</option>
              <option value="Concourse B West Amenities">Concourse B West Amenities</option>
              <option value="Section 112 Express Kiosks">Section 112 Express Kiosks</option>
              <option value="VIP South Executive Tunnel">VIP South Executive Tunnel</option>
              <option value="Gate 4 West Express Lane">Gate 4 West Express Lane</option>
            </select>
          </div>

          {/* Priority Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/90">3. Priority / Severity Level</label>
            <div className="grid grid-cols-3 gap-2">
              {["Normal • Routine", "High • Immediate", "Critical • Emergency"].map((pri) => (
                <button
                  key={pri}
                  type="button"
                  onClick={() => setIncidentPriority(pri)}
                  className={cn(
                    "px-2.5 py-2.5 rounded-2xl border text-[11px] font-mono uppercase tracking-[0.1em] transition-all flex items-center justify-center text-center cursor-pointer",
                    incidentPriority === pri
                      ? pri.startsWith("Critical")
                        ? "bg-red-600 text-white font-bold border-red-500 shadow-md shadow-red-500/25 animate-pulse"
                        : "bg-primary text-primary-foreground font-bold border-primary shadow-md shadow-primary/20"
                      : "bg-secondary/60 border-border text-foreground/80 hover:bg-secondary"
                  )}
                >
                  <span>{pri.split(" • ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description Textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/90">4. Incident Details & Required Support</label>
          <Textarea
            value={incidentDesc}
            onChange={(e) => setIncidentDesc(e.target.value)}
            placeholder="Provide specific crowd counts, required medical or security personnel, or obstacle details..."
            rows={3}
            className="bg-secondary/60 border border-border rounded-2xl p-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none shadow-none"
          />
        </div>

        {/* Submit Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          {submitted ? (
            <div className="flex items-center gap-2 text-emerald-400 font-mono uppercase tracking-[0.2em] text-xs bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 rounded-full animate-fade-in">
              <CheckCircle2 className="size-4" />
              <span>incident dispatched & unit assigned!</span>
            </div>
          ) : (
            <Button
              type="submit"
              disabled={submitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono uppercase tracking-[0.2em] text-xs px-8 py-6 rounded-full gap-2 shadow-lg shadow-primary/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RotateCcw className="size-4 animate-spin" />
                  <span>transmitting telemetry...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>dispatch incident report</span>
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </section>
  )
}
