"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Map, 
  Target, 
  Zap,
  CalendarDays, 
  Briefcase, 
  Award,
  Gift,
  Settings
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Skill Gap", href: "/skill-gap/overview", icon: Target },
  { name: "Skill Boost", href: "/skill-gap/boost", icon: Zap },
  { name: "Career Roadmap", href: "/career/explore", icon: Map },
  { name: "Weekly Planner", href: "/planner/weekly", icon: CalendarDays },
  { name: "Internships", href: "/opportunities/internships", icon: Briefcase },
  { name: "Student Benefits", href: "/benefits", icon: Gift },
  { name: "Scholarships", href: "/scholarships/matches", icon: Award },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w60 w-[240px] fixed inset-y-0 z-40 bg-surface border-r border-border">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-1 font-heading font-extrabold text-xl tracking-tight text-slate-800">
          <div className="w-10 h-10 mix-blend-multiply relative overflow-hidden -ml-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="NextStep Logo" className="w-full h-full object-contain scale-[1.3]" />
          </div>
          NextStep
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) || 
                           (item.href === "/dashboard" && pathname === "/dashboard")
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-accent-light text-accent" 
                  : "text-text-muted hover:bg-surface-alt hover:text-text"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-text-subtle")} />
              {item.name}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <Link 
          href="/profile/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-surface-alt hover:text-text transition-colors"
        >
          <Settings className="w-5 h-5 text-text-subtle" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
