"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  href?: string
  className?: string
  iconClassName?: string
  variant?: "dark" | "white" | "pulse"
  glowColor?: string
  borderGlowColor?: string
  showArrow?: boolean
}

export function GlowButton({
  children,
  href,
  className,
  iconClassName,
  variant = "dark",
  glowColor,
  borderGlowColor,
  showArrow = true,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}: GlowButtonProps) {
  const containerRef = useRef<HTMLElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      containerRef.current.style.setProperty("--cursor-x", `${x}px`)
      containerRef.current.style.setProperty("--cursor-y", `${y}px`)
    }
    if (onMouseMove) onMouseMove(e as any)
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLElement>) {
    setIsHovered(true)
    if (onMouseEnter) onMouseEnter(e as any)
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLElement>) {
    setIsHovered(false)
    if (onMouseLeave) onMouseLeave(e as any)
  }

  // Using FIFA Trophy Gold RGB ("217, 165, 32")
  const defaultGlow =
    glowColor ??
    (variant === "pulse"
      ? "rgba(217, 165, 32, 0.45)"
      : variant === "white"
      ? "rgba(217, 165, 32, 0.25)"
      : "rgba(217, 165, 32, 0.35)")

  const defaultBorderGlow =
    borderGlowColor ??
    (variant === "pulse"
      ? "rgba(217, 165, 32, 0.9)"
      : variant === "white"
      ? "rgba(217, 165, 32, 0.8)"
      : "rgba(217, 165, 32, 0.8)")

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-xs font-mono uppercase tracking-[0.25em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-none cursor-pointer select-none",
    variant === "dark" && "bg-card text-card-foreground border border-border hover:border-primary/60 hover:bg-card/90 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15",
    variant === "white" && "bg-primary text-primary-foreground border border-primary hover:bg-primary/90 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 font-semibold",
    variant === "pulse" && "bg-card text-card-foreground border border-primary/40 hover:border-primary/80 hover:bg-card/90 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25",
    className
  )

  const content = (
    <>
      <span
        className="pointer-events-none absolute -inset-px rounded-full transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(130px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), ${defaultGlow}, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      <span
        className="pointer-events-none absolute -inset-[1px] rounded-full transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(80px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), ${defaultBorderGlow}, transparent 100%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      <span className="relative z-10 flex items-center justify-center gap-2.5">
        <span>{children}</span>
        {showArrow && (
          <ArrowRight
            className={cn(
              "size-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 shrink-0",
              variant === "white" ? "text-primary-foreground/80 group-hover:text-primary-foreground" : "text-primary group-hover:text-foreground",
              iconClassName
            )}
          />
        )}
      </span>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        ref={containerRef as any}
        className={baseClasses}
        onMouseMove={handleMouseMove as any}
        onMouseEnter={handleMouseEnter as any}
        onMouseLeave={handleMouseLeave as any}
        onClick={onClick as any}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={containerRef as any}
      type="button"
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  )
}
