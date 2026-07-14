"use client"

import React, { useState } from "react"
import { ShieldCheck, MapPin } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useApp } from "@/lib/state/app-context"
import { STADIUM_NAME } from "@/lib/rag/knowledge"
import { toast } from "sonner"
import { StaffTaskList, INITIAL_TASKS, type TaskItem } from "@/components/home/staff-task-list"
import { StaffIncidentForm } from "@/components/home/staff-incident-form"

export function StaffView() {
  const { t } = useApp()
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS)

  const completedCount = tasks.filter((t) => t.completed).length
  const progressPct = Math.round((completedCount / tasks.length) * 100)

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
      <StaffTaskList tasks={tasks} onToggleTask={toggleTask} />

      {/* Section 2: Quick Incident Reporting Form */}
      <StaffIncidentForm />
    </div>
  )
}
