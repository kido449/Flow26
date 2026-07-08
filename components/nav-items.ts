import {
  Home,
  MessageSquare,
  Map,
  Users,
  LayoutGrid,
  ClipboardList,
  AlertTriangle,
  Activity,
  Radio,
  HeartPulse,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react"
import type { TranslationKey } from "@/lib/services/translation"
import type { Role } from "@/lib/types"

export interface NavItem {
  href: string
  icon: LucideIcon
  labelKey: TranslationKey
  // Whether it appears in the primary bottom bar (true) or the "More" hub only.
  primary: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", icon: Home, labelKey: "nav.home", primary: true },
  { href: "/assistant", icon: MessageSquare, labelKey: "nav.assistant", primary: true },
  { href: "/wayfinding", icon: Map, labelKey: "nav.wayfinding", primary: true },
  { href: "/crowd", icon: Users, labelKey: "nav.crowd", primary: true },
  { href: "/more", icon: LayoutGrid, labelKey: "nav.more", primary: true },
]

export function getNavItemsForRole(role: Role): NavItem[] {
  switch (role) {
    case "fan":
      return [
        { href: "/dashboard", icon: Home, labelKey: "nav.home", primary: true },
        { href: "/assistant", icon: MessageSquare, labelKey: "nav.assistant", primary: true },
        { href: "/wayfinding", icon: Map, labelKey: "nav.wayfinding", primary: true },
      ]
    case "staff":
      return [
        { href: "/dashboard#tasks", icon: ClipboardList, labelKey: "nav.staff.tasks", primary: true },
        { href: "/dashboard#report", icon: AlertTriangle, labelKey: "nav.staff.report", primary: true },
        { href: "/wayfinding", icon: Map, labelKey: "nav.staff.map", primary: true },
        { href: "/assistant", icon: MessageSquare, labelKey: "nav.staff.copilot", primary: true },
      ]
    case "command":
      return [
        { href: "/dashboard", icon: Activity, labelKey: "nav.command.dashboard", primary: true },
        { href: "/crowd", icon: Users, labelKey: "nav.command.heatmaps", primary: true },
        { href: "/dashboard#incidents", icon: ShieldAlert, labelKey: "nav.command.incidents", primary: true },
        { href: "/dashboard#broadcast", icon: Radio, labelKey: "nav.command.broadcast", primary: true },
        { href: "/more", icon: HeartPulse, labelKey: "nav.command.health", primary: true },
      ]
    default:
      return NAV_ITEMS
  }
}
