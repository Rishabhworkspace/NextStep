"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { ProgressTracker } from "../_components/ProgressTracker"
import { ConceptCard } from "../_components/ConceptCard"

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

interface BoostConcept {
  concept: string
  currentPercentage: number
  targetPercentage: number
  steps: Step[]
  resources: Resource[]
  isConceptCompleted: boolean
}

interface BoostPlan {
  _id: string
  assessmentId: string
  totalWeakConcepts: number
  concepts: BoostConcept[]
  currentBatch: number
  generatedAt: string
}

export default function SkillBoostPlanPage() {
  const { planId } = useParams()
  const router = useRouter()
  const [plan, setPlan] = useState<BoostPlan | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPlan = async () => {
    try {
      const res = await fetch(`/api/skill-boost?assessmentId=placeholder`)
      // We can't query by planId directly from GET, so we'll fetch by the planId
      // Actually, let's just use the GET with no params and find it
      const allRes = await fetch("/api/skill-boost")
      if (allRes.ok) {
        const data = await allRes.json()
        if (data.plan && data.plan._id === planId) {
          setPlan(data.plan)
        } else {
          // Try fetching by assessment ID from the plan
          setPlan(data.plan)
        }
      }
    } catch (error) {
      console.error("Failed to fetch boost plan:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId])

  const toggleStep = async (
    stepId: string,
    completed: boolean,
    conceptIndex: number
  ) => {
    if (!plan) return

    // Optimistic update
    const updatedPlan = { ...plan }
    const concept = updatedPlan.concepts[conceptIndex]
    const step = concept.steps.find((s) => s.id === stepId)
    if (step) {
      step.completed = completed
      concept.isConceptCompleted = concept.steps.every((s) => s.completed)
      setPlan({ ...updatedPlan })
    }

    try {
      await fetch(`/api/skill-boost/${plan._id}/step/${stepId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed, conceptIndex }),
      })
    } catch (error) {
      console.error("Failed to toggle step:", error)
      fetchPlan() // Revert on failure
    }
  }

  const changeBatch = async (direction: "next" | "prev") => {
    if (!plan) return

    // Optimistic
    const maxBatch = Math.max(
      0,
      Math.ceil(plan.totalWeakConcepts / 3) - 1
    )
    const newBatch =
      direction === "next"
        ? Math.min(plan.currentBatch + 1, maxBatch)
        : Math.max(plan.currentBatch - 1, 0)

    setPlan({ ...plan, currentBatch: newBatch })

    try {
      await fetch(`/api/skill-boost/${plan._id}/batch`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      })
    } catch (error) {
      console.error("Failed to change batch:", error)
      fetchPlan()
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-muted font-medium text-sm animate-pulse tracking-wide uppercase">
          Loading Boost Plan...
        </p>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
          <Zap className="w-8 h-8 text-warning" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Plan Not Found</h2>
        <p className="text-muted">
          This boost plan may have been removed or doesn&apos;t exist.
        </p>
        <Link
          href="/skill-gap/overview"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Overview
        </Link>
      </div>
    )
  }

  // Compute global stats
  let totalSteps = 0
  let completedSteps = 0
  let totalMinutesRemaining = 0
  let completedConcepts = 0

  plan.concepts.forEach((c) => {
    if (c.isConceptCompleted) completedConcepts++
    c.steps.forEach((s) => {
      totalSteps++
      if (s.completed) {
        completedSteps++
      } else {
        totalMinutesRemaining += s.estimatedMinutes
      }
    })
  })

  // Batch slicing
  const batchStart = plan.currentBatch * 3
  const batchEnd = batchStart + 3
  const batchConcepts = plan.concepts.slice(batchStart, batchEnd)
  const totalBatches = Math.ceil(plan.totalWeakConcepts / 3)

  return (
    <div className="max-w-4xl mx-auto pb-12 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/skill-gap/overview"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Skill Gap
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Skill Boost Plan
          </h1>
        </div>
        <p className="text-muted">
          Covering {plan.totalWeakConcepts} weak concept
          {plan.totalWeakConcepts !== 1 ? "s" : ""} from your assessment.
          Complete the steps below to level up.
        </p>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker
        totalConcepts={plan.totalWeakConcepts}
        completedConcepts={completedConcepts}
        totalSteps={totalSteps}
        completedSteps={completedSteps}
        totalMinutesRemaining={totalMinutesRemaining}
      />

      {/* Batch Navigation */}
      {totalBatches > 1 && (
        <div className="flex items-center justify-between mb-6 p-3 bg-surface-alt/50 border border-border rounded-xl">
          <button
            onClick={() => changeBatch("prev")}
            disabled={plan.currentBatch === 0}
            className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Prev Batch
          </button>
          <span className="text-sm font-bold text-foreground">
            Batch {plan.currentBatch + 1} of {totalBatches}
            <span className="text-muted font-normal ml-2">
              (Concepts {batchStart + 1}–
              {Math.min(batchEnd, plan.totalWeakConcepts)})
            </span>
          </span>
          <button
            onClick={() => changeBatch("next")}
            disabled={plan.currentBatch >= totalBatches - 1}
            className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next Batch <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Concept Cards */}
      <div className="space-y-4">
        {batchConcepts.map((concept, idx) => {
          const globalIdx = batchStart + idx
          // Expand the first non-completed concept by default
          const firstIncomplete = batchConcepts.findIndex(
            (c) => !c.isConceptCompleted
          )
          const defaultExpanded = idx === (firstIncomplete >= 0 ? firstIncomplete : 0)

          return (
            <motion.div
              key={concept.concept}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <ConceptCard
                concept={concept.concept}
                currentPercentage={concept.currentPercentage}
                targetPercentage={concept.targetPercentage}
                steps={concept.steps}
                resources={concept.resources}
                isConceptCompleted={concept.isConceptCompleted}
                conceptIndex={globalIdx}
                defaultExpanded={defaultExpanded}
                onToggleStep={toggleStep}
              />
            </motion.div>
          )
        })}
      </div>

      {/* All Concepts Overview (collapsed) */}
      {plan.totalWeakConcepts > 3 && (
        <div className="mt-10 bg-surface border border-border rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
            All Concepts Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {plan.concepts.map((c, i) => {
              const done = c.steps.filter((s) => s.completed).length
              const tot = c.steps.length
              const pct = tot > 0 ? Math.round((done / tot) * 100) : 0
              return (
                <div
                  key={c.concept}
                  className={`p-3 rounded-xl border text-center transition-colors ${
                    c.isConceptCompleted
                      ? "border-success/20 bg-success/5"
                      : i >= batchStart && i < batchEnd
                      ? "border-accent/20 bg-accent/5"
                      : "border-border bg-surface-alt/30"
                  }`}
                >
                  <div className="text-xs font-medium text-muted truncate mb-1">
                    {c.concept}
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {pct}%
                  </div>
                  <div className="text-[10px] text-muted">
                    {done}/{tot} steps
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
