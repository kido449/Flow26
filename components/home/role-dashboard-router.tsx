"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useApp } from "@/lib/state/app-context"
import { FanView } from "@/components/home/fan-view"
import { StaffView } from "@/components/home/staff-view"
import { CommandCenterView } from "@/components/home/command-center-view"

export function RoleDashboardRouter() {
  const { role } = useApp()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {role === "fan" && <FanView />}
        {role === "staff" && <StaffView />}
        {role === "command" && <CommandCenterView />}
      </motion.div>
    </AnimatePresence>
  )
}
