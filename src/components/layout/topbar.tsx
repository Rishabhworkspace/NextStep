"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Bell, User, LogOut, Settings, ChevronDown, UserCircle,
  Target, Map, CalendarDays, Zap, GraduationCap, ShieldCheck, Sparkles, X
} from "lucide-react"
import { useSession, signOut } from "@/lib/auth-client"

// ─── Mock Notifications ──────────────────────────────────────────────────────

interface Notification {
  id: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  body: string
  time: string
  read: boolean
  href?: string
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    icon: Target,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Quiz Score Improved!",
    body: "You scored 78% on your latest Software Engineering assessment — up 15% from last attempt.",
    time: "2 min ago",
    read: false,
    href: "/skill-gap/overview",
  },
  {
    id: "2",
    icon: CalendarDays,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Weekly Plan Ready",
    body: "Your plan for this week has 12 tasks across 5 days. Start with React Hooks today!",
    time: "1 hr ago",
    read: false,
    href: "/planner/weekly",
  },
  {
    id: "3",
    icon: GraduationCap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Scholarship Deadline",
    body: "DAAD Scholarship applications close in 5 days. Don't miss out!",
    time: "3 hr ago",
    read: false,
    href: "/benefits",
  },
  {
    id: "4",
    icon: Zap,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    title: "Skill Boost Complete",
    body: "You finished all steps for 'Database Normalization'. Great progress!",
    time: "Yesterday",
    read: true,
    href: "/skill-gap/overview",
  },
  {
    id: "5",
    icon: Map,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    title: "Roadmap Milestone",
    body: "Phase 1 'Foundation' is 80% complete. You're almost into Core Skills!",
    time: "Yesterday",
    read: true,
    href: "/career/roadmap",
  },
  {
    id: "6",
    icon: ShieldCheck,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    title: "Internship Verified",
    body: "The Google STEP Internship posting you checked scored 94% trust — it's legit!",
    time: "2 days ago",
    read: true,
    href: "/opportunities/checker",
  },
  {
    id: "7",
    icon: Sparkles,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    title: "3-Day Streak! 🔥",
    body: "You've been learning for 3 days straight. Keep the momentum going!",
    time: "2 days ago",
    read: true,
  },
]

// ─── Topbar Component ────────────────────────────────────────────────────────

export function Topbar() {
  const { data: session } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const [loggingOut, setLoggingOut] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const unreadCount = notifications.filter((n) => !n.read).length

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const userName = session?.user?.name || "Student"
  const userEmail = session?.user?.email || ""
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await signOut()
      router.push("/auth/login")
    } catch (err) {
      console.error("Logout failed:", err)
      setLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 md:px-6 bg-surface/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile logo */}
        <Link href="/dashboard" className="flex items-center gap-1.5 md:hidden">
          <div className="w-8 h-8 relative overflow-hidden">
            <Image src="/images/logo.png" alt="NextStep" fill className="object-contain scale-[1.3] mix-blend-multiply" />
          </div>
          <span className="font-heading font-extrabold text-lg tracking-tight text-slate-800">NextStep</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* ─── Notifications ─── */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false) }}
            className="relative p-2 text-text-muted hover:text-text transition-colors rounded-full hover:bg-surface-alt"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] font-bold border-2 border-surface px-1">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-[380px] max-h-[480px] bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-black/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <p className="text-[11px] text-gray-400 mt-0.5">{unreadCount} unread</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-semibold text-orange-600 hover:text-orange-700 px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setNotifOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="overflow-y-auto max-h-[380px] divide-y divide-gray-50">
                {notifications.map((n) => {
                  const Icon = n.icon
                  return (
                    <div
                      key={n.id}
                      onClick={() => {
                        markOneRead(n.id)
                        if (n.href) {
                          router.push(n.href)
                          setNotifOpen(false)
                        }
                      }}
                      className={`flex gap-3 px-5 py-4 transition-colors cursor-pointer group ${
                        n.read
                          ? "bg-white hover:bg-gray-50"
                          : "bg-orange-50/40 hover:bg-orange-50/70"
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-xl ${n.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${n.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm leading-tight ${n.read ? "font-medium text-gray-700" : "font-bold text-gray-900"}`}>
                            {n.title}
                          </p>
                          {!n.read && (
                            <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                          {n.body}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{n.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-5 py-3">
                <Link
                  href="/profile/settings"
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-semibold text-gray-500 hover:text-orange-600 transition-colors"
                >
                  Notification Settings →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ─── Profile Dropdown ─── */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false) }}
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-surface-alt transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {initials || <User className="w-4 h-4" />}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-tight">{userName}</p>
              <p className="text-[11px] text-gray-400 leading-tight truncate max-w-[140px]">{userEmail}</p>
            </div>
            <ChevronDown className={`hidden md:block w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-gray-100 shadow-xl shadow-black/10 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link
                  href="/profile/me"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserCircle className="w-4 h-4 text-gray-400" />
                  My Profile
                </Link>
                <Link
                  href="/profile/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Settings
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {loggingOut ? "Logging out..." : "Log Out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

