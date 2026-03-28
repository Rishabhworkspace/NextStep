"use client"

import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { CheckCircle2, Circle, Clock, ExternalLink } from "lucide-react"

interface TaskCardProps {
  task: {
    id: string
    title: string
    estimatedMinutes: number
    completed: boolean
    relatedSkillId?: string
    resourceLink?: string
  }
  onToggle: (taskId: string, currentState: boolean) => void
  skillName?: string
}

export function TaskCard({ task, onToggle, skillName }: TaskCardProps) {
  const handleToggle = () => {
    // If we're marking it complete right now, trigger confetti!
    if (!task.completed) {
      // Small pinpoint confetti burst
      const rect = document.getElementById(`task-${task.id}`)?.getBoundingClientRect()
      if (rect) {
        const x = (rect.left + rect.width / 2) / window.innerWidth
        const y = (rect.top + rect.height / 2) / window.innerHeight
        
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { x, y },
          colors: ['#10B981', '#34D399', '#3B82F6'],
          disableForReducedMotion: true,
          zIndex: 100
        })
      }
    }
    
    // Fall back to id if _id is undefined (which might happen locally vs mongo object)
    onToggle((task as any)._id || task.id, task.completed)
  }

  return (
    <motion.div 
      id={`task-${task.id}`}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        task.completed 
          ? "bg-success/5 border-success/20 shadow-none" 
          : "bg-surface border-border shadow-xs hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5"
      }`}
      onClick={handleToggle}
    >
      {/* Glow effect on hover (uncompleted state) */}
      {!task.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      )}

      {/* Completion Flash Layer */}
      <AnimatePresence>
        {task.completed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 ring-2 ring-success/40 bg-success/10 rounded-xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col gap-3">
        {/* Top Row: Checkbox + Title */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0 transition-colors">
            {task.completed ? (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                // @ts-ignore
                type="spring" 
                // @ts-ignore
                stiffness={400} 
                // @ts-ignore
                damping={20}
              >
                <CheckCircle2 className="w-5 h-5 text-success fill-success/20" />
              </motion.div>
            ) : (
              <Circle className="w-5 h-5 text-muted-border group-hover:text-accent/50 transition-colors" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className={`text-sm font-medium leading-snug break-words transition-all duration-300 ${
              task.completed ? "text-muted line-through" : "text-foreground"
            }`}>
              {task.title}
            </h4>
          </div>
        </div>

        {/* Bottom Row: Metadata Pills */}
        <div className="flex items-center flex-wrap gap-2 pl-8">
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
            task.completed ? "bg-surface-alt/50 text-muted/70" : "bg-surface-alt text-muted"
          }`}>
            <Clock className="w-3 h-3" />
            {task.estimatedMinutes}m
          </span>
          
          {skillName && (
             <span className={`inline-flex px-2 py-0.5 text-[11px] font-medium rounded-md transition-colors ${
               task.completed ? "bg-accent/5 text-accent/50" : "bg-accent/10 text-accent"
             }`}>
               {skillName}
             </span>
          )}
          
          {task.resourceLink && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(task.resourceLink, "_blank");
              }}
              className={`inline-flex items-center gap-1 text-[11px] transition-colors font-medium px-2 py-0.5 rounded-md ${
                task.completed ? "bg-surface border border-border text-muted/70" : "bg-surface border border-accent/20 text-accent hover:bg-accent/5"
              }`}
            >
              <ExternalLink className="w-3 h-3" />
              Source
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
