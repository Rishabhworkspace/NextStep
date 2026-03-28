"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CalendarCheck, Target, Briefcase, User } from "lucide-react"

const BASE_NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Target, label: "Skills", href: "/skill-gap/overview" },
  { icon: CalendarCheck, label: "Planner", href: "/planner/weekly" },
  { icon: Briefcase, label: "Internships", href: "/opportunities/internships" },
  { icon: User, label: "Profile", href: "/profile/me" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t bg-white/80 backdrop-blur-lg px-2 pb-safe md:hidden shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.06)]">
      {BASE_NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href) && (item.href !== "/dashboard" || pathname === "/dashboard")
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors ${
              isActive ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
            <span className={`text-[10px] font-medium tracking-wide ${isActive ? "font-semibold" : ""}`}>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
