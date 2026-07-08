"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BentoCardProps {
  color?: string
  title?: string
  description?: string
  label?: string
  textAutoHide?: boolean
  href?: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface BentoProps {
  cards?: BentoCardProps[]
  textAutoHide?: boolean
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  disableAnimations?: boolean
  spotlightRadius?: number
  particleCount?: number
  enableTilt?: boolean
  glowColor?: string
  clickEffect?: boolean
  enableMagnetism?: boolean
  className?: string
}

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
// Using FIFA Trophy Gold RGB ("217, 165, 32")
const DEFAULT_GLOW_COLOR = "217, 165, 32"
const MOBILE_BREAKPOINT = 768

const defaultCardData: BentoCardProps[] = [
  {
    title: "Live Crowd Telemetry",
    description: "Real-time thermal density tracking and dynamic queue time estimation across all stadium zones.",
    label: "Telemetry",
    href: "/crowd",
  },
  {
    title: "AI Grounded Copilot",
    description: "Multilingual, role-aware assistant answering matchday operations queries instantly.",
    label: "Intelligence",
    href: "/assistant",
  },
  {
    title: "Dynamic Wayfinding",
    description: "Interactive stadium routing with accessible sensory-friendly corridors and express overflow lanes.",
    label: "Navigation",
    href: "/wayfinding",
  },
  {
    title: "Role-Based Command",
    description: "Customized data layouts tailored specifically for fan, staff, and command center personnel.",
    label: "Security",
    href: "/more",
  },
  {
    title: "Global Multilingual",
    description: "Seamless real-time translation across English, Spanish, French, and Portuguese.",
    label: "Connectivity",
    href: "/more",
  },
  {
    title: "Predictive Analytics",
    description: "Advanced AI models forecasting post-match egress bottlenecks and transit schedule adjustments.",
    label: "Forecasting",
    href: "/more",
  },
]

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement("div")
  el.className = "particle pointer-events-none absolute rounded-full"
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

const ParticleCard: React.FC<{
  children: React.ReactNode
  className?: string
  disableAnimations?: boolean
  style?: React.CSSProperties
  particleCount?: number
  glowColor?: string
  enableTilt?: boolean
  clickEffect?: boolean
  enableMagnetism?: boolean
  href?: string
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  href,
}) => {
  const cardRef = useRef<any>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<number[]>([])
  const isHoveredRef = useRef(false)
  const activeAnimationsRef = useRef<Animation[]>([])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    activeAnimationsRef.current.forEach((anim) => anim.cancel())
    activeAnimationsRef.current = []

    particlesRef.current.forEach((particle) => {
      if (!particle.parentNode) return
      try {
        const animOut = particle.animate(
          [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(0)", opacity: 0 },
          ],
          { duration: 300, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
        )
        animOut.onfinish = () => {
          if (particle.parentNode) particle.parentNode.removeChild(particle)
        }
      } catch (e) {
        if (particle.parentNode) particle.parentNode.removeChild(particle)
      }
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()

    for (let i = 0; i < particleCount; i++) {
      const timeoutId = window.setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return
        const x = Math.random() * width
        const y = Math.random() * height
        const particle = createParticleElement(x, y, glowColor)
        cardRef.current.appendChild(particle)
        particlesRef.current.push(particle)

        try {
          const animIn = particle.animate(
            [
              { transform: "scale(0)", opacity: 0 },
              { transform: "scale(1)", opacity: 1 },
            ],
            { duration: 300, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
          )

          animIn.onfinish = () => {
            if (!isHoveredRef.current || !particle.parentNode) return
            const destX = (Math.random() - 0.5) * 80
            const destY = (Math.random() - 0.5) * 80
            const destRot = Math.random() * 360
            const duration = 2000 + Math.random() * 2000

            const loopAnim = particle.animate(
              [
                { transform: "translate3d(0px, 0px, 0px) rotate(0deg)" },
                { transform: `translate3d(${destX}px, ${destY}px, 0px) rotate(${destRot}deg)` },
                { transform: "translate3d(0px, 0px, 0px) rotate(0deg)" },
              ],
              { duration, iterations: Infinity, easing: "ease-in-out" }
            )
            activeAnimationsRef.current.push(loopAnim)
          }
        } catch (e) {
          // fallback if web animations API not available
        }
      }, i * 90)
      timeoutsRef.current.push(timeoutId)
    }
  }, [particleCount, glowColor])

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return
    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0)"
      element.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (enableTilt || enableMagnetism) {
        const rotateX = enableTilt ? ((y - centerY) / centerY) * -6 : 0
        const rotateY = enableTilt ? ((x - centerX) / centerX) * 6 : 0
        const magnetX = enableMagnetism ? (x - centerX) * 0.04 : 0
        const magnetY = enableMagnetism ? (y - centerY) * 0.04 : 0

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${magnetX}px, ${magnetY}px, 0)`
        element.style.transition = "transform 0.1s ease-out"
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const ripple = document.createElement("div")
      ripple.style.cssText = `
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(${glowColor}, 0.6);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
        transform: translate(-50%, -50%);
      `
      element.appendChild(ripple)
      try {
        const rippleAnim = ripple.animate(
          [
            { transform: "translate(-50%, -50%) scale(0)", opacity: 1 },
            { transform: "translate(-50%, -50%) scale(40)", opacity: 0 },
          ],
          { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
        )
        rippleAnim.onfinish = () => {
          if (ripple.parentNode) ripple.remove()
        }
      } catch (err) {
        if (ripple.parentNode) ripple.remove()
      }
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("click", handleClick)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("click", handleClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor])

  const cardProps = {
    ref: cardRef,
    className: cn("bento-card relative overflow-hidden transition-all duration-300", className),
    style: { ...style, position: "relative" as const, overflow: "hidden" },
  }

  if (href) {
    return (
      <Link href={href} {...cardProps}>
        {children}
      </Link>
    )
  }

  return <div {...cardProps}>{children}</div>
}

export const MagicBento: React.FC<BentoProps> = ({
  cards = defaultCardData,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  className,
}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const shouldDisableAnimations = disableAnimations || isMobile

  useEffect(() => {
    if (!enableSpotlight || shouldDisableAnimations) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return
      const cardElements = gridRef.current.querySelectorAll(".bento-card")

      cardElements.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        ;(card as HTMLElement).style.setProperty("--mouse-x", `${x}px`)
        ;(card as HTMLElement).style.setProperty("--mouse-y", `${y}px`)
        ;(card as HTMLElement).style.setProperty("--spotlight-radius", `${spotlightRadius}px`)
        ;(card as HTMLElement).style.setProperty("--glow-color", `rgba(${glowColor}, 0.18)`)
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [enableSpotlight, shouldDisableAnimations, spotlightRadius, glowColor])

  const isThreeCards = cards.length === 3

  return (
    <div className={cn("w-full py-4", className)}>
      <style>
        {`
          .bento-grid {
            display: grid;
            gap: 1.25rem;
            width: 100%;
            grid-template-columns: repeat(1, 1fr);
          }
          
          @media (min-width: 640px) {
            .bento-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .bento-grid {
              grid-template-columns: repeat(3, 1fr);
              grid-auto-rows: minmax(200px, auto);
            }
            ${
              isThreeCards
                ? `
              .card-0 { grid-column: span 1; grid-row: span 1; }
              .card-1 { grid-column: span 1; grid-row: span 1; }
              .card-2 { grid-column: span 1; grid-row: span 1; }
            `
                : `
              .card-0 { grid-column: span 2; grid-row: span 1; }
              .card-1 { grid-column: span 1; grid-row: span 1; }
              .card-2 { grid-column: span 1; grid-row: span 1; }
              .card-3 { grid-column: span 2; grid-row: span 1; }
              .card-4 { grid-column: span 2; grid-row: span 1; }
              .card-5 { grid-column: span 1; grid-row: span 1; }
            `
            }
          }

          .bento-card {
            background: var(--card);
            color: var(--card-foreground);
            border: 1px solid var(--border);
            border-radius: 24px;
            position: relative;
            overflow: hidden;
            transition: border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .bento-card:hover {
            border-color: rgba(${glowColor}, 0.6);
            box-shadow: 0 20px 40px -15px rgba(${glowColor}, 0.2);
          }

          .spotlight-overlay {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: radial-gradient(
              var(--spotlight-radius) circle at var(--mouse-x) var(--mouse-y),
              var(--glow-color),
              transparent 80%
            );
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .bento-card:hover .spotlight-overlay {
            opacity: 1;
          }

          .border-glow {
            position: absolute;
            inset: 0;
            pointer-events: none;
            border-radius: inherit;
            padding: 1px;
            background: radial-gradient(
              var(--spotlight-radius) circle at var(--mouse-x) var(--mouse-y),
              rgba(${glowColor}, 0.9),
              transparent 45%
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .bento-card:hover .border-glow {
            opacity: 1;
          }
        `}
      </style>

      <div ref={gridRef} className="bento-grid">
        {cards.map((card, index) => {
          const Icon = card.icon
          const Content = (
            <div className="bento-card h-full w-full p-7 flex flex-col justify-between group cursor-pointer select-none">
              <div className="spotlight-overlay" />
              {enableBorderGlow && <div className="border-glow" />}

              <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  {Icon && (
                    <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 shadow-sm">
                      <Icon className="size-5" />
                    </span>
                  )}
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-semibold group-hover:text-foreground transition-colors duration-300">
                    {card.label}
                  </span>
                </div>
                {card.href && (
                  <ArrowRight className="size-4 text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-hover:text-primary shrink-0 mt-0.5" />
                )}
              </div>

              <div className="relative z-10 my-auto">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "text-sm text-muted-foreground leading-relaxed font-sans",
                    textAutoHide && "line-clamp-3"
                  )}
                >
                  {card.description}
                </p>
              </div>

              <div className="relative z-10 pt-4 mt-4 border-t border-border flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">
                <span>fifa copilot module</span>
                <span className="flex items-center gap-1 text-primary">
                  <Sparkles className="size-3" />
                  active
                </span>
              </div>
            </div>
          )

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                className={`bento-card card-${index}`}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                enableMagnetism={enableMagnetism}
                clickEffect={clickEffect}
                disableAnimations={shouldDisableAnimations}
                href={card.href}
              >
                {Content}
              </ParticleCard>
            )
          }

          return (
            <div key={index} className={`bento-card card-${index}`}>
              {card.href ? (
                <Link href={card.href} className="block h-full w-full">
                  {Content}
                </Link>
              ) : (
                Content
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MagicBento
