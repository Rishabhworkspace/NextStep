"use client"

import { motion } from "framer-motion"
import { RefreshCcw, Target, Flame, CalendarDays } from "lucide-react"

interface PlannerSidebarProps {
  progressPercentage: number
  completedCount: number
  totalCount: number
  focusSkill: string
  weekStartDate: string
  weekEndDate: string
  onRegenerate: () => void
  generating: boolean
}

export function PlannerSidebar({
  progressPercentage,
  completedCount,
  totalCount,
  focusSkill,
  weekStartDate,
  weekEndDate,
  onRegenerate,
  generating
}: PlannerSidebarProps) {
  return (
    <div className="flex flex-col gap-6 sticky top-8">
      
      {/* 1. Global Progress Ring */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -mr-10 -mt-10" />

        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90 text-surface-alt/80 rounded-full drop-shadow-sm" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" />
            </svg>
            <svg 
              className="w-full h-full transform -rotate-90 absolute top-0 left-0 text-accent transition-all duration-1000 ease-out" 
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - progressPercentage / 100)}
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 4px 6px rgba(59,130,246,0.3))" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-heading font-extrabold text-foreground">{progressPercentage}%</span>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider mt-0.5">Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full mt-2 divide-x border-t pt-4 border-border">
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-success">{completedCount}</div>
              <div className="text-xs text-muted uppercase tracking-wider font-semibold">Done</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-foreground">{totalCount}</div>
              <div className="text-xs text-muted uppercase tracking-wider font-semibold">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Focus Context */}
      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-accent/10 to-quaternary/5 p-4 border-b border-border/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl shadow-xs border border-accent/20 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-xs font-bold text-muted uppercase tracking-wider">Current Focus</div>
            <h3 className="text-sm font-semibold text-foreground truncate max-w-[180px]">{focusSkill}</h3>
          </div>
        </div>
        
        <div className="p-4 bg-surface text-sm">
          <div className="flex items-center justify-between text-muted mb-3">
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Date Range</span>
            <span className="font-medium text-foreground">
              {new Date(weekStartDate).toLocaleDateString([], { month: "short", day: "numeric" })} - {new Date(weekEndDate).toLocaleDateString([], { month: "short", day: "numeric" })}
            </span>
          </div>

          {/* Quick Streak mockup */}
          <div className="p-3 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl mt-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <div className="font-bold text-foreground text-sm">You're doing great!</div>
            </div>
            <p className="text-xs text-muted leading-relaxed">Consistency is key. Complete at least one task per day to build your streak.</p>
          </div>
        </div>
      </div>

      {/* 3. Action Area */}
      <button 
        onClick={onRegenerate}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-border text-sm font-medium text-muted hover:border-accent/40 hover:text-accent hover:bg-surface-alt transition-colors disabled:opacity-50"
      >
        <RefreshCcw className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
        {generating ? "Rebuilding Schedule..." : "Regenerate Week"}
      </button>

    </div>
  )
}
