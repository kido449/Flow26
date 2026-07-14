"use client"

import React, { useState } from "react"
import { ClipboardList, Check, MapPin, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export interface TaskItem {
  id: string
  code: string
  title: string
  description: string
  zone: string
  priority: "urgent" | "high" | "normal"
  completed: boolean
}

export const INITIAL_TASKS: TaskItem[] = [
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

interface StaffTaskListProps {
  tasks: TaskItem[]
  onToggleTask: (id: string) => void
}

export function StaffTaskList({ tasks, onToggleTask }: StaffTaskListProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
  const completedCount = tasks.filter((t) => t.completed).length

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
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
            onClick={() => onToggleTask(task.id)}
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
  )
}
