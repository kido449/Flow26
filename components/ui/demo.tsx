"use client"

import * as React from "react"
import { Trophy, Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from "lucide-react"
import { Typewriter } from "@/components/ui/typewriter-text"

const DemoVariant1 = () => {
  return (
    <div className="w-full min-h-screen bg-primary-dark text-white font-sans selection:bg-indigo-500/30 overflow-hidden rounded-3xl border border-white-10 shadow-2xl relative">
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-40 z-0" />

      {/* Sticky Navigation with 500ms transition */}
      <header className="sticky top-0 z-50 glass-strong px-6 py-4 flex items-center justify-between sticky-nav-transition border-b border-white-10">
        <div className="flex items-center gap-3 cursor-pointer group">
          {/* Logo with 180-degree rotation on hover */}
          <div className="size-10 rounded-2xl bg-brand-indigo flex items-center justify-center text-white shadow-lg hover-rotate-180">
            <Trophy className="size-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Atlas <span className="text-indigo-400 font-normal">Atmosphere</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-white transition-colors duration-300">Overview</a>
          <a href="#features" className="hover:text-white transition-colors duration-300">Architecture</a>
          <a href="#testimonials" className="hover:text-white transition-colors duration-300">Testimonials</a>
        </nav>
        <button className="px-4 py-2 rounded-xl bg-brand-indigo hover:bg-indigo-600 text-white font-display text-xs tracking-tight uppercase transition-all duration-300 shadow-md">
          Explore Spec
        </button>
      </header>

      {/* Hero Section (#0f172a background with outer glow) */}
      <section id="hero" className="relative z-10 px-6 py-24 md:py-32 max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft text-indigo-300 text-xs font-mono uppercase tracking-[0.2em] border-white-10">
          <Sparkles className="size-3.5 text-indigo-400 animate-pulse" />
          <span>Modern Atmospheric Visual Language</span>
        </div>

        {/* Serif Headline (Lora) */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white max-w-4xl">
          Crafting digital experiences with deep, atmospheric <span className="italic font-normal text-indigo-400">precision.</span>
        </h1>

        {/* Sans UI/Body (Inter) with Typewriter */}
        <div className="text-lg sm:text-xl text-slate-300 max-w-2xl font-sans leading-relaxed min-h-[3rem] flex items-center justify-center">
          <Typewriter
            text={[
              "Pairing dark #0f172a hero sections with clean surfaces.",
              "Typographic excellence with Lora and Inter.",
              "Subtle micro-animations and 180° logo rotations.",
              "Soft and strong glassmorphism with outer glows."
            ]}
            speed={40}
            deleteSpeed={25}
            delay={2500}
            loop={true}
            className="font-sans text-indigo-200 font-medium"
          />
        </div>

        {/* Outer Glow Card Demo */}
        <div className="mt-8 p-1 rounded-2xl outer-glow w-full max-w-md">
          <div className="glass-strong p-6 rounded-xl flex items-center justify-between gap-4 border-white-10">
            <div className="flex items-center gap-3 text-left">
              <div className="size-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Zap className="size-5" />
              </div>
              <div>
                <div className="font-display font-semibold text-sm text-white">Glassmorphism Token</div>
                <div className="text-xs text-slate-400">Strong blur(16px) with radial glow</div>
              </div>
            </div>
            <ArrowRight className="size-5 text-slate-400" />
          </div>
        </div>
      </section>

      {/* Detailed Features Section (Clean, Off-white Surface #f8f9fa) */}
      <section id="features" className="relative z-10 bg-surface-white text-slate-900 px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="font-display uppercase tracking-[0.2em] text-xs font-bold text-indigo-600">
              Clean Surface #f8f9fa
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-slate-900">
              High-contrast surfaces for architectural clarity.
            </h2>
            <p className="font-sans text-slate-600 leading-relaxed text-base">
              When transitioning from atmospheric dark heroes to complex data specifications, off-white surfaces provide optimal readability while maintaining visual sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Serif Headlines</h3>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Powered by Lora (400-700 weight) with tight tracking and 1.1 leading for editorial gravity and elegance.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Glassmorphism</h3>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Layered translucent surfaces with 12px to 16px backdrop blurs, subtle white borders, and soft shadows.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Micro-Animations</h3>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Intentional motion including typing cursors, 180° logo rotations on hover, and 500ms sticky nav transitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Return to #0f172a Dark Background) */}
      <section id="testimonials" className="relative z-10 px-6 py-20 md:py-28 max-w-5xl mx-auto flex flex-col items-center text-center gap-10">
        <div className="flex flex-col gap-3 max-w-xl items-center">
          <span className="font-display uppercase tracking-[0.2em] text-xs font-bold text-indigo-400">
            Atmosphere Return
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-white">
            "The perfect synergy of editorial warmth and futuristic control."
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="glass-soft p-8 rounded-3xl text-left flex flex-col justify-between gap-6 border-white-10">
            <p className="font-sans text-slate-300 leading-relaxed text-sm italic">
              "The transition from the deep #0f172a hero down into the clean #f8f9fa specifications creates a dramatic cadence that keeps users completely engaged."
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-indigo-500/30 flex items-center justify-center font-display font-bold text-indigo-300 text-sm">
                AL
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white">Elena Rostova</div>
                <div className="font-sans text-xs text-slate-400">Principal Design Architect</div>
              </div>
            </div>
          </div>

          <div className="glass-soft p-8 rounded-3xl text-left flex flex-col justify-between gap-6 border-white-10">
            <p className="font-sans text-slate-300 leading-relaxed text-sm italic">
              "The Lora serif typography paired with Inter UI elements gives our Tournament Copilot an unmatched level of prestige and readability."
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-indigo-500/30 flex items-center justify-center font-display font-bold text-indigo-300 text-sm">
                MK
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white">Marcus Vance</div>
                <div className="font-sans text-xs text-slate-400">Lead Frontend Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export { DemoVariant1 }
