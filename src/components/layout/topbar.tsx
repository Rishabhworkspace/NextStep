"use client"

import { Bell, Search, User } from "lucide-react"

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex items-center flex-1">
        {/* Mobile menu trigger would go here */}
        
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

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-muted hover:text-text transition-colors rounded-full hover:bg-surface-alt">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent border-2 border-surface"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center text-white cursor-pointer shadow-sm shadow-accent">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  )
}
