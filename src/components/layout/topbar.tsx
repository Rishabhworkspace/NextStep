"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Bell, Search, User, LogOut, Settings, ChevronDown, UserCircle, Menu, X } from "lucide-react"
import { useSession, signOut } from "@/lib/auth-client"

export function Topbar() {
  const { data: session } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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

        {/* Command Palette Trigger */}
        <button className="hidden md:flex items-center text-sm text-text-muted bg-surface-alt border border-border px-3 py-1.5 rounded-lg w-64 justify-between hover:border-accent/50 transition-colors">
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 text-text-subtle" />
            Search...
          </span>
          <kbd className="hidden sm:inline-block rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-medium text-text-subtle">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-text-muted hover:text-text transition-colors rounded-full hover:bg-surface-alt">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent border-2 border-surface"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
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
