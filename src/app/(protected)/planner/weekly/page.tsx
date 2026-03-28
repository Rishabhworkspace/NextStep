"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { EmptyPlanState } from "./_components/EmptyPlanState"
import { PlannerSidebar } from "./_components/PlannerSidebar"
import { DayColumn } from "./_components/DayColumn"

interface Task {
  id: string
  title: string
  estimatedMinutes: number
  completed: boolean
  relatedSkillId?: string
  resourceLink?: string
}

interface DayPlan {
  date: string
  dayOfWeek: string
  tasks: Task[]
}

interface WeeklyPlan {
  _id: string
  weekStartDate: string
  weekEndDate: string
  focusSkill: string
  days: DayPlan[]
}

export default function WeeklyPlannerPage() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  const fetchPlan = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/planner")
      if (res.ok) {
        const data = await res.json()
        setPlan(data.plan || null)
      }
    } catch (error) {
      console.error("Failed to fetch plan:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlan()
  }, [])

  const generatePlan = async () => {
    try {
      setGenerating(true)
      const res = await fetch("/api/planner", { method: "POST" })
      if (res.ok) {
        const data = await res.json()
        setPlan(data.plan)
      } else {
        const err = await res.json()
        alert(err.error || "Failed to generate plan")
      }
    } catch (error) {
      console.error("Failed to generate plan", error)
    } finally {
      setGenerating(false)
    }
  }

  const toggleTask = async (taskId: string, currentState: boolean) => {
    if (!plan) return

    // Optimistic update
    const newPlan = { ...plan }
    let taskToggled = false

    newPlan.days.forEach(day => {
      day.tasks.forEach(task => {
        if (task.id === taskId || (task as any)._id === taskId) {
          task.completed = !currentState
          taskToggled = true
        }
      })
    })

    if (taskToggled) {
      setPlan(newPlan)
      try {
        await fetch(`/api/planner/${plan._id}/task/${taskId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !currentState })
        })
      } catch (error) {
        console.error("Failed to sync task toggle", error)
        // Revert on fail
        fetchPlan()
      }
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-muted font-medium text-sm animate-pulse tracking-wide uppercase">Initializing Command Center...</p>
      </div>
    )
  }

  if (!plan) {
    return <EmptyPlanState onGenerate={generatePlan} generating={generating} />
  }

  // Calculate stats
  let totalTasks = 0
  let completedTasks = 0
  plan.days.forEach(day => {
    day.tasks.forEach(task => {
      totalTasks++
      if (task.completed) completedTasks++
    })
  })

  // Avoid division by zero
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="max-w-[1400px] mx-auto pb-12 w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area - Calendar */}
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-black text-foreground tracking-tight mb-2">
              Weekly Directive
            </h1>
            <p className="text-muted text-lg">Execute your plan, one day at a time.</p>
          </div>

          {/* Horizontal Scroll Area for Days */}
          <div className="relative">
            {/* Fade Edges for horizontal scroll indication */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div 
              className="flex gap-4 overflow-x-auto pb-8 pt-4 px-4 -mx-4 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: "none" }}
            >
              {plan.days.map((day, idx) => (
                <DayColumn 
                  key={idx}
                  date={day.date}
                  dayOfWeek={day.dayOfWeek}
                  tasks={day.tasks}
                  onToggleTask={toggleTask}
                  focusSkillName={plan.focusSkill}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Stats & Context */}
        <div className="w-full lg:w-[320px] shrink-0 border-t lg:border-t-0 pt-8 lg:pt-0 border-border">
          <PlannerSidebar 
            progressPercentage={progressPercentage}
            completedCount={completedTasks}
            totalCount={totalTasks}
            focusSkill={plan.focusSkill}
            weekStartDate={plan.weekStartDate}
            weekEndDate={plan.weekEndDate}
            onRegenerate={generatePlan}
            generating={generating}
          />
        </div>
        
      </div>
    </div>
  )
}
