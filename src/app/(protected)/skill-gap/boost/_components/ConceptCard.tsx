"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Play,
  BookOpen,
  GraduationCap,
} from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
  estimatedMinutes: number
  completed: boolean
}

interface Resource {
  title: string
  url: string
  type: "video" | "course" | "article"
  source: string
}

interface ConceptCardProps {
  concept: string
  currentPercentage: number
  targetPercentage: number
  steps: Step[]
  resources: Resource[]
  isConceptCompleted: boolean
  conceptIndex: number
  defaultExpanded?: boolean
  onToggleStep: (stepId: string, completed: boolean, conceptIndex: number) => void
}

function getResourceIcon(type: string) {
  switch (type) {
    case "video":
      return <Play className="w-3.5 h-3.5" />
    case "course":
      return <GraduationCap className="w-3.5 h-3.5" />
    default:
      return <BookOpen className="w-3.5 h-3.5" />
  }
}

export function ConceptCard({
  concept,
  currentPercentage,
  steps,
  resources,
  isConceptCompleted,
  conceptIndex,
  defaultExpanded = false,
  onToggleStep,
}: ConceptCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const completedSteps = steps.filter((s) => s.completed).length
  const totalSteps = steps.length
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isConceptCompleted
          ? "border-success/30 bg-success/[0.02]"
          : "border-border bg-surface"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-surface-alt/30 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
              isConceptCompleted
                ? "bg-success/10"
                : currentPercentage < 30
                ? "bg-danger/10"
                : "bg-warning/10"
            }`}
          >
            {isConceptCompleted ? "✅" : currentPercentage < 30 ? "🔴" : "⚠️"}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-foreground truncate">
              {concept}
            </h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs font-medium text-muted">
                Quiz: {currentPercentage}% → Target: 80%
              </span>
              <div className="flex-1 h-1.5 bg-surface-alt rounded-full overflow-hidden max-w-[120px]">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isConceptCompleted ? "bg-success" : "bg-accent"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-muted">
                {completedSteps}/{totalSteps}
              </span>
            </div>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted shrink-0" />
        )}
      </button>

      {/* Expandable Body */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/50">
              {/* Steps */}
              <div className="space-y-2 mb-5">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() =>
                      onToggleStep(step.id, !step.completed, conceptIndex)
                    }
                    className={`group flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      step.completed
                        ? "bg-success/5 border-success/15"
                        : "bg-surface-alt/30 border-border hover:border-accent/30 hover:bg-surface"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-success fill-success/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted group-hover:text-accent/50 transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium transition-all ${
                          step.completed
                            ? "text-muted line-through"
                            : "text-foreground"
                        }`}
                      >
                        {step.title}
                      </div>
                      {step.description && (
                        <p className="text-xs text-muted mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium mt-2 px-2 py-0.5 rounded-md ${
                          step.completed
                            ? "bg-surface-alt/50 text-muted/60"
                            : "bg-surface-alt text-muted"
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {step.estimatedMinutes}m
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resources */}
              {resources.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Learning Resources
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-foreground hover:border-accent/30 hover:text-accent transition-colors"
                      >
                        {getResourceIcon(res.type)}
                        {res.source}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Mastered Badge */}
              {isConceptCompleted && (
                <div className="mt-4 p-3 rounded-xl bg-success/10 border border-success/20 text-center">
                  <span className="text-sm font-bold text-success">
                    🎉 Concept Mastered!
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
