"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, CalendarCheck, FileText, CheckCircle2, User } from "lucide-react"

const BASE_NAV_ITEMS = [
  { icon: Compass, label: "Explore", href: "/dashboard" },
  { icon: CalendarCheck, label: "Planner", href: "/planner/weekly" },
  { icon: CheckCircle2, label: "Skill Gap", href: "/skill-gap/overview" },
  { icon: FileText, label: "Opportunities", href: "/opportunities/internships" },
  { icon: User, label: "Profile", href: "/profile/me" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t bg-background/80 px-4 pb-safe backdrop-blur-lg md:hidden">
      {BASE_NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href) && (item.href !== "/dashboard" || pathname === "/dashboard")
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? "fill-primary/20" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
