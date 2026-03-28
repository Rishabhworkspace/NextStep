"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Target, TrendingUp, Play, ChevronRight } from "lucide-react"
import { CONCEPTS } from "@/constants/questionBank"

// Lazy-load Recharts to avoid SSR issues
const RadarChart = dynamic(() => import("recharts").then(m => m.RadarChart), { ssr: false })
const PolarGrid = dynamic(() => import("recharts").then(m => m.PolarGrid), { ssr: false })
const PolarAngleAxis = dynamic(() => import("recharts").then(m => m.PolarAngleAxis), { ssr: false })
const PolarRadiusAxis = dynamic(() => import("recharts").then(m => m.PolarRadiusAxis), { ssr: false })
const Radar = dynamic(() => import("recharts").then(m => m.Radar), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false })
const LineChart = dynamic(() => import("recharts").then(m => m.LineChart), { ssr: false })
const Line = dynamic(() => import("recharts").then(m => m.Line), { ssr: false })
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then(m => m.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false })
const Area = dynamic(() => import("recharts").then(m => m.Area), { ssr: false })
const AreaChart = dynamic(() => import("recharts").then(m => m.AreaChart), { ssr: false })

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
  quizDate: string
}

function getStatusChip(pct: number) {
  if (pct >= 80) return { label: "✅ Mastered", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" }
  if (pct >= 50) return { label: "⚡ Progress", cls: "bg-blue-50 text-blue-700 border-blue-200" }
  if (pct >= 30) return { label: "⚠ Needs Work", cls: "bg-amber-50 text-amber-700 border-amber-200" }
  return { label: "🔴 Start Here", cls: "bg-red-50 text-red-700 border-red-200" }
}

export default function SkillOverviewPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAssessments() {
      try {
        const res = await fetch("/api/quiz")
        if (res.ok) {
          const data = await res.json()
          setAssessments(data.assessments || [])
        }
      } catch (err) {
        console.error("Failed to fetch assessments", err)
      } finally {
        setLoading(false)
      }
    }
    fetchAssessments()
  }, [])

  const latestAssessment = assessments[0]

  // Build radar data from latest assessment or empty defaults
  const radarData = CONCEPTS.map(concept => {
    const score = latestAssessment?.conceptScores?.find(cs => cs.concept === concept)
    return {
      concept: concept.length > 12 ? concept.substring(0, 10) + "…" : concept,
      fullName: concept,
      score: score?.percentage || 0,
      fullMark: 100,
    }
  })

  // Build timeline data from assessments (reversed for chronological order)
  const timelineData = [...assessments].reverse().map((a, idx) => ({
    name: `Quiz ${idx + 1}`,
    score: a.percentage,
    date: new Date(a.quizDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  }))

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-[400px] w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>
            Your Skill Landscape
          </h1>
          {latestAssessment && (
            <p className="text-sm text-gray-400 mt-1">
              Last assessed: {new Date(latestAssessment.quizDate).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          )}
        </div>
        <Link href="/skill-gap/quiz">
          <Button
            className="text-white shadow-lg shadow-orange-500/20"
            style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}
          >
            <Play className="w-4 h-4 mr-2" />
            {latestAssessment ? "Retake Assessment" : "Take Assessment"}
          </Button>
        </Link>
      </div>

      {!latestAssessment ? (
        /* ─── Empty State ──────────────────────── */
        <div className="text-center py-20 space-y-4">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
            <Target className="w-10 h-10 text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>
            No assessments yet
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            Take your first skill assessment to see your strengths, weaknesses, and get personalised AI insights.
          </p>
          <Link href="/skill-gap/quiz">
            <Button
              size="lg"
              className="text-white shadow-lg shadow-orange-500/20 mt-4"
              style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}
            >
              Start Assessment <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* ─── Radar Chart ───────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis
                    dataKey="concept"
                    tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 500 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "#9CA3AF" }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#F97316"
                    fill="url(#radarGrad)"
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ─── Concept Score Cards ────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {latestAssessment.conceptScores.map(cs => {
              const chip = getStatusChip(cs.percentage)
              return (
                <div
                  key={cs.concept}
                  className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 hover:shadow-md transition-shadow"
                >
                  <p className="text-sm font-medium text-gray-600 truncate">{cs.concept}</p>
                  <p className="text-3xl font-bold text-gray-900 font-mono">{cs.percentage}%</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${chip.cls}`}>
                    {chip.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* ─── Improvement Timeline ──────────── */}
          {timelineData.length > 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gray-900 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                <TrendingUp className="w-5 h-5 text-orange-500" /> Improvement Timeline
              </div>
              <p className="text-sm text-gray-400">Your score progression over assessments</p>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        fontSize: "13px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#F97316"
                      fill="url(#areaGrad)"
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ─── Quick Actions ─────────────────── */}
          <div className="flex gap-3 pb-8">
            <Link href="/skill-gap/quiz" className="flex-1">
              <Button variant="outline" className="w-full border-gray-200 text-gray-700 h-11">
                <Play className="w-4 h-4 mr-2" /> Take New Quiz
              </Button>
            </Link>
            {latestAssessment && (
              <Link href={`/skill-gap/report/${latestAssessment._id}`} className="flex-1">
                <Button
                  className="w-full h-11 text-white shadow-lg shadow-orange-500/20"
                  style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}
                >
                  View Latest Report <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}
