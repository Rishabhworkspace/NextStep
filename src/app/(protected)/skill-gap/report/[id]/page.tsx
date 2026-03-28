"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Trophy, Target, BookOpen, RefreshCw, CalendarPlus, Sparkles, ChevronRight
} from "lucide-react"

interface ConceptScore {
  concept: string
  correct: number
  total: number
  percentage: number
}

interface Assessment {
  _id: string
  totalScore: number
  totalQuestions: number
  percentage: number
  level: string
  conceptScores: ConceptScore[]
  geminiInsight: string
  quizDate: string
}

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  Intermediate: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Advanced: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Expert: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
}

function getConceptChip(pct: number) {
  if (pct >= 80) return { label: "✅ Strong", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  if (pct >= 50) return { label: "⚡ Progressing", cls: "bg-blue-50 text-blue-700 border-blue-200" }
  if (pct >= 30) return { label: "⚠ Needs Work", cls: "bg-amber-50 text-amber-700 border-amber-200" }
  return { label: "🔴 Weak", cls: "bg-red-50 text-red-700 border-red-200" }
}

export default function QuizReportPage() {
  const { id } = useParams()
  const router = useRouter()
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/quiz/${id}`)
        if (res.ok) {
          const data = await res.json()
          setAssessment(data.assessment)
        }
      } catch (err) {
        console.error("Failed to fetch report", err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchReport()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 py-12 px-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Report Not Found</h2>
        <Link href="/skill-gap/overview">
          <Button variant="outline">← Back to Overview</Button>
        </Link>
      </div>
    )
  }

  const levelStyle = LEVEL_COLORS[assessment.level] || LEVEL_COLORS.Beginner
  const ringPct = assessment.percentage
  const circumference = 2 * Math.PI * 54

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 px-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold border border-orange-100">
          <Trophy className="w-3.5 h-3.5" /> Quiz Complete!
        </div>
        <h1
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          You scored {assessment.totalScore} / {assessment.totalQuestions}
        </h1>

        {/* Score Ring */}
        <div className="flex justify-center">
          <div className="relative w-36 h-36">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <circle
                cx="60" cy="60" r="54"
                stroke="url(#reportGrad)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(ringPct / 100) * circumference} ${circumference}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="reportGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{ringPct}%</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border} border mt-1`}>
                {assessment.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gemini AI Insight */}
      {assessment.geminiInsight && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-orange-600">
            <Sparkles className="w-4 h-4" /> AI Insight
          </div>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {assessment.geminiInsight}
          </p>
        </div>
      )}

      {/* Per-Concept Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>
            Concept Breakdown
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {assessment.conceptScores.map((cs) => {
            const chip = getConceptChip(cs.percentage)
            return (
              <div key={cs.concept} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{cs.concept}</p>
                  <div className="w-full max-w-[200px] h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${cs.percentage}%`,
                        background: cs.percentage >= 80 ? "#10B981" : cs.percentage >= 50 ? "#3B82F6" : cs.percentage >= 30 ? "#F59E0B" : "#EF4444"
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-gray-900">{cs.correct}/{cs.total}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${chip.cls}`}>
                    {chip.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 border-gray-200 text-gray-700 h-11"
          onClick={() => router.push("/skill-gap/quiz")}
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Retake Quiz
        </Button>
        <Button
          className="flex-1 h-11 text-white shadow-lg shadow-orange-500/20"
          style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}
          onClick={() => router.push("/skill-gap/overview")}
        >
          View Overview <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
