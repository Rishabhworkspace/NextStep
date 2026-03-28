"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  CalendarDays,
  ChevronLeft,
  Loader2,
  TrendingUp,
  Target
} from "lucide-react"

interface DayPlan {
  date: string
  dayOfWeek: string
  tasks: { completed: boolean }[]
}

interface WeeklyPlan {
  _id: string
  weekStartDate: string
  weekEndDate: string
  focusSkill: string
  days: DayPlan[]
}

export default function PlannerHistoryPage() {
  const [plans, setPlans] = useState<WeeklyPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/planner/history")
        if (res.ok) {
          const data = await res.json()
          setPlans(data.plans || [])
        }
      } catch (error) {
        console.error("Failed to fetch history:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-accent animate-spin mb-4" />
        <p className="text-muted">Loading history...</p>
      </div>
    )
  }

  // Calculate global stats
  let totalWeeks = plans.length
  let globalCompletedTasks = 0
  let globalTotalTasks = 0

  plans.forEach(plan => {
    plan.days.forEach(day => {
      day.tasks.forEach(task => {
        globalTotalTasks++
        if (task.completed) globalCompletedTasks++
      })
    })
  })

  const globalCompletionRate = globalTotalTasks > 0 ? Math.round((globalCompletedTasks / globalTotalTasks) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto pb-12 px-4">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <Link 
            href="/planner/weekly"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" /> Back to This Week
          </Link>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Plan History
          </h1>
          <p className="text-muted mt-2">Track your past learning weeks and task completion rates.</p>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-sm text-muted">Avg. Completion</div>
              <div className="text-xl font-bold text-foreground">{globalCompletionRate}%</div>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-sm text-muted">Total Weeks</div>
              <div className="text-xl font-bold text-foreground">{totalWeeks}</div>
            </div>
          </div>
        </div>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-16 bg-surface border border-border rounded-2xl">
          <CalendarDays className="w-12 h-12 text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No History Yet</h3>
          <p className="text-muted max-w-sm mx-auto">
            You havent generated any weekly plans. Your history will appear here once you start using the planner.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {plans.map((plan, idx) => {
            let weekTotal = 0
            let weekCompleted = 0
            plan.days.forEach(d => {
              d.tasks.forEach(t => {
                weekTotal++
                if (t.completed) weekCompleted++
              })
            })
            const weekProgress = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0

            return (
              <motion.div 
                key={plan._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-surface border border-border rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Week of {new Date(plan.weekStartDate).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                    </h3>
                    <p className="text-sm text-muted mt-1">Focus: <span className="text-foreground font-medium">{plan.focusSkill}</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-surface-alt rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-1000 ease-out"
                        style={{ width: `${weekProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-foreground min-w-[3ch] text-right">
                      {weekProgress}%
                    </span>
                  </div>
                </div>

                {/* Day Dots Heatmap */}
                <div className="grid grid-cols-7 gap-2">
                  {plan.days.map((day, dIdx) => {
                    const totalT = day.tasks.length
                    const compT = day.tasks.filter(t => t.completed).length
                    
                    let bgClass = "bg-surface-alt/50 border-border" // No tasks
                    if (totalT > 0) {
                      if (compT === totalT) bgClass = "bg-success/20 border-success/30" // All done
                      else if (compT > 0) bgClass = "bg-warning/20 border-warning/30" // Partial
                      else bgClass = "bg-danger/10 border-danger/20" // None done
                    }

                    return (
                      <div key={dIdx} className="flex flex-col items-center gap-2">
                        <div className={`w-full aspect-square md:w-12 md:h-12 rounded-lg border transition-colors flex items-center justify-center ${bgClass}`}>
                          {totalT > 0 ? (
                            <span className="text-xs font-bold opacity-80">{compT}/{totalT}</span>
                          ) : (
                            <span className="text-xs opacity-30">—</span>
                          )}
                        </div>
                        <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                          {day.dayOfWeek.slice(0, 3)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
