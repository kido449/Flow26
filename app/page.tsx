"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Lock, Mail, Sparkles, Users, ClipboardList, ShieldAlert } from "lucide-react"
import { toast } from "sonner"
import { useApp } from "@/lib/state/app-context"
import { LightRays } from "@/components/ui/light-rays"
import { LocaleSwitcher } from "@/components/locale-switcher"

/* ─── Framer Motion variants ────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

/* ─── Gold glow style used on hover ────────────────────────── */
const GOLD = "hsl(43 74% 49%)"
const cardHoverStyle = {
  borderColor: "hsl(43 74% 49% / 0.5)",
  boxShadow: `0 0 0 1px hsl(43 74% 49% / 0.15), 0 20px 60px rgba(0,0,0,0.5)`,
  y: -8,
}

/* ─── Shared input class ────────────────────────────────────── */
const inputCls =
  "w-full bg-black/60 border border-white/5 rounded-md pl-9 pr-4 py-2.5 text-white placeholder:text-white/40 text-xs font-light " +
  "focus:outline-none focus:border-[hsl(43_74%_49%)] focus:ring-1 focus:ring-[hsl(43_74%_49%/0.4)] transition-all duration-300"

export default function Page() {
  const router = useRouter()
  const { setRole, t } = useApp()

  const [staffPassword, setStaffPassword] = useState("")
  const [isStaffLoading, setIsStaffLoading] = useState(false)
  const [commandEmail, setCommandEmail] = useState("")
  const [commandPassword, setCommandPassword] = useState("")
  const [isCommandLoading, setIsCommandLoading] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // [Tier 1: High Impact - Problem Statement Alignment] Fan navigation & multilingual experience access.
  const handleFanAccess = React.useCallback(() => {
    toast.success("Welcome to FIFA World Cup 2026 Fan Copilot: Navigation & Multilingual Assistance Active.")
    setRole("fan")
    router.push("/fan")
  }, [setRole, router])

  // [Tier 2: Medium Impact - Security & Efficiency] Input validation + stable callback for venue staff / volunteers.
  const handleStaffLogin = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!staffPassword.trim() || staffPassword.length < 4) {
      toast.error("Please enter a valid venue staff / volunteer access code (min 4 characters).")
      return
    }
    setIsStaffLoading(true)
    toast.loading("Verifying Venue Staff & Volunteer Credentials...", { id: "staff-toast" })
    setTimeout(() => {
      toast.success("Venue Staff Operations Active: Crowd Management & Real-Time Decision Support Enabled.", { id: "staff-toast" })
      setRole("staff")
      router.push("/staff")
    }, 1000)
  }, [staffPassword, setRole, router])

  // [Tier 2: Medium Impact - Security & Efficiency] Input validation + stable callback for tournament organizers / command center.
  const handleCommandLogin = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!commandEmail.includes("@") || !commandPassword.trim()) {
      toast.error("Please enter valid tournament organizer credentials.")
      return
    }
    setIsCommandLoading(true)
    toast.loading("Authenticating Operational Intelligence & Telemetry...", { id: "auth-toast" })
    setTimeout(() => {
      toast.success("Access Granted: FIFA World Cup 2026 Tournament Organizers Command Active.", { id: "auth-toast" })
      setRole("command")
      router.push("/command")
    }, 1200)
  }, [commandEmail, commandPassword, setRole, router])

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center px-4 py-12">

      {/* ── z-0: Base video layer — always visible, no JS gating ── */}
      <video
        src="/Football_boots_splashing_wet_grass_202607072109.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
      />

      {/* ── z-10: Smart radial vignette — dark center/edges, lets video shine at mid-radius ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* ── z-10: Volumetric Stadium LightRays Floodlights ── */}
      <LightRays
        raysOrigin="bottom-center"
        raysColor="#ffffff"
        raysSpeed={0.8}
        lightSpread={1.2}
        rayLength={1.6}
        followMouse={true}
        mouseInfluence={0.15}
        noiseAmount={0.02}
        distortion={0.04}
        className="opacity-45 z-10 pointer-events-none"
      />

      {/* ── z-20: All UI content ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">

      {/* ── Branding badge & Locale Switcher ── */}
      <div className="w-full flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-white opacity-60 animate-pulse-ring" />
            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
          </span>
          <span className="mono-label text-white/70">{t("gateway.badge")}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <LocaleSwitcher />
        </motion.div>
      </div>

      {/* ── Page header ── */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center mb-10 max-w-2xl"
      >
        <p className="mono-label text-white/50 mb-3 justify-center">{t("gateway.label")}</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
          {t("gateway.title")}
        </h1>
        <p className="text-sm text-white/60 mt-3 leading-relaxed font-light max-w-md mx-auto">
          {t("gateway.subtitle")}
        </p>
      </motion.div>

      {/* ── Three portal cards — staggered entrance ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4"
      >

        {/* ── Fan Portal ── */}
        <motion.div
          variants={cardVariants}
          whileHover={cardHoverStyle}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          className="group relative flex flex-col justify-between p-7 bg-neutral-900/75 backdrop-blur-xl border border-white/10 rounded-xl cursor-default"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
        >
          <div>
            <div className="size-11 rounded-md bg-white/8 border border-white/10 flex items-center justify-center text-white mb-5 transition-all duration-300 group-hover:bg-white/15">
              <Users className="size-5" />
            </div>
            <p className="mono-label text-white/50 mb-1">{t("gateway.fan.label")}</p>
            <h2 className="text-xl font-semibold text-white mb-2.5">{t("gateway.fan.title")}</h2>
            <p className="text-xs text-white/65 leading-relaxed font-light">
              {t("gateway.fan.desc")}
            </p>
          </div>
          <div className="mt-8 pt-5 border-t border-white/8">
            <motion.button
              onClick={handleFanAccess}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs font-medium uppercase tracking-widest font-mono hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
            >
              <span>{t("gateway.fan.cta")}</span>
              <ArrowRight className="size-3.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Staff Portal ── */}
        <motion.div
          variants={cardVariants}
          whileHover={cardHoverStyle}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="group relative flex flex-col justify-between p-7 bg-neutral-900/75 backdrop-blur-xl border border-white/10 rounded-xl cursor-default"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
        >
          <div>
            <div className="size-11 rounded-md bg-white/8 border border-white/10 flex items-center justify-center text-white mb-5 transition-all duration-300 group-hover:bg-white/15">
              <ClipboardList className="size-5" />
            </div>
            <p className="mono-label text-white/50 mb-1">{t("gateway.staff.label")}</p>
            <h2 className="text-xl font-semibold text-white mb-2.5">{t("gateway.staff.title")}</h2>
            <p className="text-xs text-white/65 leading-relaxed font-light">
              {t("gateway.staff.desc")}
            </p>
          </div>
          <form onSubmit={handleStaffLogin} className="mt-8 pt-5 border-t border-white/8 flex flex-col gap-3">
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-white/35" />
              <input
                type="password"
                required
                placeholder="Staff Access Code"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
                className={inputCls}
              />
            </div>
            <motion.button
              type="submit"
              disabled={isStaffLoading}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs font-medium uppercase tracking-widest font-mono hover:bg-white hover:text-black hover:border-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {isStaffLoading
                ? <><Sparkles className="size-3.5 animate-spin" /><span>Verifying...</span></>
                : <><span>{t("gateway.staff.cta")}</span><ArrowRight className="size-3.5" /></>}
            </motion.button>
          </form>
        </motion.div>

        {/* ── Command Center ── */}
        <motion.div
          variants={cardVariants}
          whileHover={{
            ...cardHoverStyle,
            boxShadow: `0 0 0 1px hsl(43 74% 49% / 0.25), 0 24px 64px rgba(0,0,0,0.6), 0 0 40px hsl(43 74% 49% / 0.08)`,
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.30 }}
          className="group relative flex flex-col justify-between p-7 bg-neutral-900/75 backdrop-blur-xl border border-white/15 rounded-xl cursor-default ring-1 ring-white/5"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
        >
          {/* Subtle gold corner glow */}
          <div
            className="absolute -top-12 -right-12 size-40 rounded-full pointer-events-none opacity-20 blur-2xl"
            style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)` }}
          />

          <div className="relative z-10">
            <div className="size-11 rounded-md bg-white/8 border border-white/15 flex items-center justify-center text-white mb-5 transition-all duration-300 group-hover:bg-white/15">
              <ShieldAlert className="size-5" />
            </div>
            <p className="mono-label text-white/50 mb-1">{t("gateway.command.label")}</p>
            <h2 className="text-xl font-semibold text-white mb-2.5">{t("gateway.command.title")}</h2>
            <p className="text-xs text-white/65 leading-relaxed font-light">
              {t("gateway.command.desc")}
            </p>
          </div>
          <form onSubmit={handleCommandLogin} className="relative z-10 mt-6 pt-5 border-t border-white/8 flex flex-col gap-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-white/35" />
              <input
                type="email"
                required
                placeholder="operator@fifa2026.org"
                value={commandEmail}
                onChange={(e) => setCommandEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-white/35" />
              <input
                type="password"
                required
                placeholder="••••••••••••••••"
                value={commandPassword}
                onChange={(e) => setCommandPassword(e.target.value)}
                className={inputCls}
              />
            </div>
            <motion.button
              type="submit"
              disabled={isCommandLoading}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-xs font-medium uppercase tracking-widest font-mono transition-all duration-300 disabled:opacity-50 cursor-pointer"
              style={{
                borderColor: "hsl(43 74% 49% / 0.5)",
                color: "white",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(43 74% 49%)"
                e.currentTarget.style.borderColor = "hsl(43 74% 49%)"
                e.currentTarget.style.color = "black"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.borderColor = "hsl(43 74% 49% / 0.5)"
                e.currentTarget.style.color = "white"
              }}
            >
              {isCommandLoading
                ? <><Sparkles className="size-3.5 animate-spin" /><span>Authenticating...</span></>
                : <><span>Secure Telemetry Access</span><ArrowRight className="size-3.5" /></>}
            </motion.button>
          </form>
        </motion.div>

      </motion.div>

      {/* ── Footer ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-10 mono-label text-white/25"
      >
        Stadium Copilot • Pulse Neural Engine v2.6
      </motion.p>

      </div>{/* end z-20 wrapper */}
    </main>
  )
}
