"use client"

import { TaskCard } from "./TaskCard"

interface Task {
  id: string
  title: string
  estimatedMinutes: number
  completed: boolean
  relatedSkillId?: string
  resourceLink?: string
}

interface DayColumnProps {
  date: string
  dayOfWeek: string
  tasks: Task[]
  onToggleTask: (taskId: string, currentState: boolean) => void
  focusSkillName?: string
}

export function DayColumn({ date, dayOfWeek, tasks, onToggleTask, focusSkillName }: DayColumnProps) {
  const dayDate = new Date(date)
  // Basic logical check for 'today' (can use a proper library in production)
  const isToday = dayDate.toISOString().split("T")[0] === new Date().toISOString().split("T")[0]
  const isWeekend = dayOfWeek === "Saturday" || dayOfWeek === "Sunday"
  
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) : 0

  return (
    <div 
      className={`flex flex-col w-[280px] min-w-[280px] sm:w-[320px] sm:min-w-[320px] shrink-0 rounded-2xl border transition-all duration-300 snap-center
        ${isToday 
          ? "border-accent/30 bg-accent/[0.02] shadow-[0_0_40px_-15px_rgba(59,130,246,0.15)] z-10 scale-[1.02]" 
          : isWeekend
          ? "border-border bg-surface-alt/30"
          : "border-border bg-surface/50 hover:bg-surface"
        }
      `}
    >
      {/* Header */}
      <div className={`relative p-5 border-b border-border/50 group rounded-t-2xl transition-colors ${
        isToday ? "bg-accent/5 backdrop-blur-sm" : ""
      }`}>
        
        {/* Today Glow Top border */}
        {isToday && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-quaternary rounded-t-2xl opacity-80" />
        )}

        <div className="flex justify-between items-start">
          <div>
            <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
              isToday ? "text-accent" : "text-muted"
            }`}>
              {dayOfWeek}
            </div>
            <div className="text-3xl font-heading font-black tracking-tight text-foreground">
              {dayDate.getDate()}
            </div>
          </div>
          
          {isToday && (
            <div className="bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase px-2 py-1 rounded-md">
              Today
            </div>
          )}
        </div>

        {/* Mini progress bar inside the day header */}
        {totalTasks > 0 && (
          <div className="mt-4 flex items-center gap-2">
             <div className="flex-1 h-1.5 bg-surface-alt/80 rounded-full overflow-hidden border border-border/20">
               <div 
                 className={`h-full transition-all duration-1000 ease-out ${
                   progress === 1 ? 'bg-success' : 'bg-accent'
                 }`} 
                 style={{ width: `${progress * 100}%` }}
               />
             </div>
             <div className="text-[10px] font-bold text-muted/80 min-w-8 text-right">
               {completedTasks}/{totalTasks}
             </div>
          </div>
        )}
      </div>

      {/* Task List Container */}
      <div className={`p-3 flex-1 flex flex-col gap-3 min-h-[300px] max-h-[60vh] overflow-y-auto planner-scroll ${
        isToday ? "bg-accent/[0.01]" : ""
      }`}>
        {tasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
            <div className="w-12 h-12 rounded-full border border-dashed border-border flex items-center justify-center mb-3">
              <span className="text-xl opacity-50">🌱</span>
            </div>
            <div className="text-sm font-semibold text-muted">Rest Day</div>
            <div className="text-xs text-muted/60 mt-1 max-w-[200px]">
              Take a break, let your brain wire up those new skills.
            </div>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggle={onToggleTask} 
              skillName={focusSkillName} // Since the API doesn't return full nested skill objects, we use the week's focus skill
            />
          ))
        )}
      </div>
    </div>
  )
}
