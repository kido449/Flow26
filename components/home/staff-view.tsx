"use client"

import React, { useState } from "react"
import {
  ShieldCheck,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Send,
  AlertCircle,
  Users,
  Sparkles,
  Radio,
  Flame,
  Check,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { CongestionBadge } from "@/components/congestion-badge"
import { useApp } from "@/lib/state/app-context"
import { STADIUM_NAME } from "@/lib/rag/knowledge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface TaskItem {
  id: string
  code: string
  title: string
  description: string
  zone: string
  priority: "urgent" | "high" | "normal"
  completed: boolean
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "t1",
    code: "VOL-01",
    title: "Gate 3 Overflow Concierge Assistance",
    description: "Guide arriving supporters to Express Entry Overflow Lane B to alleviate 14-min thermal bottleneck.",
    zone: "Gate 3 South Plaza",
    priority: "urgent",
    completed: false,
  },
  {
    id: "t2",
    code: "VOL-02",
    title: "Sensory Corridor Accessibility Verification",
    description: "Verify quiet zone acoustic barriers and low-lighting path in Concourse B West are clear of obstructions.",
    zone: "Concourse B West",
    priority: "high",
    completed: false,
  },
  {
    id: "t3",
    code: "VOL-03",
    title: "VIP Transit Shuttle Arrival Guidance",
    description: "Assist incoming international shuttle delegates with digital ticketing and language localization.",
    zone: "South Executive Tunnel",
    priority: "high",
    completed: false,
  },
  {
    id: "t4",
    code: "VOL-04",
    title: "Amenity Zone 4A Crowd Spacing",
    description: "Monitor queue formation at concession stands and direct excess foot traffic to Section 114 express kiosks.",
    zone: "Section 112 Amenities",
    priority: "normal",
    completed: true,
  },
]

export function StaffView() {
  const { t, role } = useApp()
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS)
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

  // Form states
  const [incidentCategory, setIncidentCategory] = useState<string>("Crowd Bottleneck")
  const [incidentZone, setIncidentZone] = useState<string>("Gate 3 South Plaza")
  const [incidentPriority, setIncidentPriority] = useState<string>("High • Immediate Response")
  const [incidentDesc, setIncidentDesc] = useState<string>("")
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const completedCount = tasks.filter((t) => t.completed).length
  const progressPct = Math.round((completedCount / tasks.length) * 100)

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVal = !item.completed
          toast.success(`Task ${item.code} ${nextVal ? "marked complete" : "reopened"}`, {
            description: nextVal
              ? "Telemetry synced with Command Center dashboard."
              : "Task returned to active deployment queue.",
          })
          return { ...item, completed: nextVal }
        }
        return item
      })
    )
  }

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
    <div className="flex flex-col gap-10 animate-fade-up pt-2">
      {/* Staff Hero Header */}
      <section className="bg-card/90 backdrop-blur border border-border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-none relative overflow-hidden">
        <div className="absolute -bottom-[40%] -left-[10%] size-[50vw] rounded-full bg-gradient-to-tr from-primary/20 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="flex flex-col gap-3 z-10 max-w-2xl">
          <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span>{STADIUM_NAME} • staff & volunteer ops</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-foreground leading-tight">
            volunteer & staff <span className="italic font-normal text-primary">copilot</span>
          </h1>
          
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            {t("role.staff.desc")} View live task assignments from Command Center, manage queue velocity, and submit rapid incident dispatches.
          </p>

          <div className="flex items-center gap-2.5 pt-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-foreground px-3 py-1 text-xs font-mono uppercase tracking-[0.15em] border border-border">
              <ShieldCheck className="size-3.5 text-primary" /> unit: VOL-114
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-foreground px-3 py-1 text-xs font-mono uppercase tracking-[0.15em] border border-border">
              <MapPin className="size-3.5 text-primary" /> zone: gate 3 & concourse b
            </span>
          </div>
        </div>

        {/* Task Progress Summary Box */}
        <div className="w-full md:w-64 bg-secondary/60 border border-border rounded-2xl p-5 flex flex-col gap-3 shrink-0 z-10">
          <div className="flex items-center justify-between font-mono uppercase tracking-[0.2em] text-xs text-foreground/80">
            <span>shift progress</span>
            <span className="text-primary font-bold">{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-2 bg-background" />
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mt-1">
            <span>{completedCount} of {tasks.length} tasks done</span>
            <span className="text-primary font-semibold">{tasks.length - completedCount} active</span>
          </div>
        </div>
      </section>

      {/* Section 1: Active Tasks List */}
      <section id="tasks" className="flex flex-col gap-5 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
          <div className="flex items-center gap-2.5 font-mono uppercase tracking-[0.25em] text-xs text-foreground">
            <ClipboardList className="size-4 text-primary" />
            <span>assigned operational tasks ({tasks.length})</span>
          </div>

          <div className="flex items-center gap-1.5 bg-secondary/80 p-1 rounded-full border border-border w-fit">
            {(["all", "pending", "completed"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.15em] transition-all cursor-pointer",
                  filter === f ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f} ({f === "all" ? tasks.length : f === "pending" ? tasks.length - completedCount : completedCount})
              </button>
            ))}
          </div>
        </div>

        {/* Task List Grid */}
        <div className="grid grid-cols-1 gap-3.5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={cn(
                "group relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none",
                task.completed
                  ? "bg-secondary/30 border-border/50 opacity-60 hover:opacity-80"
                  : "bg-card/90 backdrop-blur border-border hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
              )}
            >
              {/* Checkbox Icon Button */}
              <div
                className={cn(
                  "size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300",
                  task.completed
                    ? "bg-primary border-primary text-primary-foreground scale-105"
                    : "border-border bg-secondary group-hover:border-primary/70"
                )}
              >
                {task.completed ? <Check className="size-3.5 stroke-[3]" /> : <div className="size-2 rounded-full bg-transparent group-hover:bg-primary/40 transition-colors" />}
              </div>

              {/* Task Details */}
              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-primary">{task.code}</span>
                    <h3 className={cn("text-base font-serif font-bold tracking-tight text-foreground truncate", task.completed && "line-through text-muted-foreground")}>
                      {task.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/80 border border-border">
                      <MapPin className="size-3 text-primary" /> {task.zone}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.15em] font-bold",
                        task.priority === "urgent"
                          ? "bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse"
                          : task.priority === "high"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "bg-secondary text-muted-foreground border border-border"
                      )}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>

                <p className={cn("text-sm text-foreground/80 font-sans leading-relaxed", task.completed && "text-muted-foreground")}>
                  {task.description}
                </p>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="p-8 text-center bg-card/50 border border-border rounded-2xl flex flex-col items-center gap-2 font-mono uppercase text-xs text-muted-foreground tracking-[0.2em]">
              <CheckCircle2 className="size-8 text-primary/60 animate-bounce" />
              <span>no tasks in this filter view</span>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Quick Incident Reporting Form */}
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
    </div>
  )
}
