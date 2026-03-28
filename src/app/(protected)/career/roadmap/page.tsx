"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  CheckCircle2, Circle, Lock, ChevronRight, ExternalLink,
  RefreshCw, Loader2, Sparkles, Clock, Target, BookOpen,
  Play, FileText, Video, GraduationCap, ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { CAREER_PATH_MAP, type CareerPathKey } from "@/constants/careerData"

interface Resource {
  title: string
  url: string
  type: "video" | "course" | "article"
  source: string
}

interface Skill {
  id: string
  name: string
  description: string
  status: "completed" | "in-progress" | "locked"
  resources: Resource[]
  estimatedHours: number
}

interface Phase {
  id: string
  title: string
  description: string
  skills: Skill[]
}

interface Roadmap {
  _id: string
  careerPath: string
  title: string
  estimatedMonths: number
  phases: Phase[]
  generatedAt: string
}

const STATUS_STYLES = {
  completed: {
    ring: "border-emerald-400 bg-emerald-50",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    label: "Completed",
    labelColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  "in-progress": {
    ring: "border-blue-400 bg-blue-50 animate-pulse",
    icon: Play,
    iconColor: "text-blue-500",
    label: "In Progress",
    labelColor: "text-blue-600 bg-blue-50 border-blue-200",
  },
  locked: {
    ring: "border-gray-200 bg-gray-50",
    icon: Lock,
    iconColor: "text-gray-400",
    label: "Locked",
    labelColor: "text-gray-500 bg-gray-50 border-gray-200",
  },
}

const RESOURCE_ICONS = {
  video: Video,
  course: GraduationCap,
  article: FileText,
}

export default function CareerRoadmapPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-6 w-60" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
      </div>
    }>
      <CareerRoadmapContent />
    </Suspense>
  )
}

function CareerRoadmapContent() {
  const searchParams = useSearchParams()
  const goalPath = searchParams.get("goal") as CareerPathKey | null

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<{ phase: Phase; skill: Skill } | null>(null)
  const [updatingSkill, setUpdatingSkill] = useState<string | null>(null)
  const [userPath, setUserPath] = useState<string>("")

  // Fetch existing roadmap or user profile path
  const fetchRoadmap = useCallback(async () => {
    try {
      setLoading(true)
      // First get the user profile to know their career path
      const profileRes = await fetch("/api/profile")
      if (profileRes.ok) {
        const profileData = await profileRes.json()
        setUserPath(profileData.profile?.targetRole || "")
      }

      const path = goalPath || ""
      const url = path ? `/api/roadmap?goal=${path}` : "/api/roadmap"
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setRoadmap(data.roadmap)
      }
    } catch (err) {
      console.error("Failed to fetch roadmap:", err)
    } finally {
      setLoading(false)
    }
  }, [goalPath])

  useEffect(() => {
    fetchRoadmap()
  }, [fetchRoadmap])

  // Generate new roadmap
  const handleGenerate = async () => {
    const path = goalPath || userPath
    if (!path) return

    setGenerating(true)
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ careerPath: path }),
      })
      if (res.ok) {
        const data = await res.json()
        setRoadmap(data.roadmap)
      }
    } catch (err) {
      console.error("Failed to generate roadmap:", err)
    } finally {
      setGenerating(false)
    }
  }

  // Update skill status
  const handleStatusUpdate = async (phaseId: string, skillId: string, newStatus: string) => {
    if (!roadmap) return
    setUpdatingSkill(skillId)

    try {
      const res = await fetch(`/api/roadmap/${roadmap._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phaseId, skillId, status: newStatus }),
      })
      if (res.ok) {
        const data = await res.json()
        setRoadmap(data.roadmap)
        // Update selected skill if it was the one modified
        if (selectedSkill?.skill.id === skillId) {
          const updatedPhase = data.roadmap.phases.find((p: Phase) => p.id === phaseId)
          const updatedSkill = updatedPhase?.skills.find((s: Skill) => s.id === skillId)
          if (updatedPhase && updatedSkill) {
            setSelectedSkill({ phase: updatedPhase, skill: updatedSkill })
          }
        }
      }
    } catch (err) {
      console.error("Failed to update skill:", err)
    } finally {
      setUpdatingSkill(null)
    }
  }

  // Calculate stats
  const stats = roadmap
    ? {
        totalSkills: roadmap.phases.reduce((sum, p) => sum + p.skills.length, 0),
        completedSkills: roadmap.phases.reduce(
          (sum, p) => sum + p.skills.filter(s => s.status === "completed").length,
          0
        ),
        totalHours: roadmap.phases.reduce(
          (sum, p) => sum + p.skills.reduce((h, s) => h + s.estimatedHours, 0),
          0
        ),
      }
    : null

  const activePath = goalPath || userPath || ""
  const careerData = CAREER_PATH_MAP[activePath as CareerPathKey]
  const Icon = careerData?.icon

  // ─── Loading State ─────────
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-6 w-60" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-3">
              <Skeleton className="h-20 flex-1 rounded-xl" />
              <Skeleton className="h-20 flex-1 rounded-xl" />
              <Skeleton className="h-20 flex-1 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ─── Empty State ────────
  if (!roadmap) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2
          className="text-3xl font-extrabold text-gray-900"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {careerData ? `Ready to become a ${careerData.title}?` : "Generate Your Career Roadmap"}
        </h2>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Our AI will analyze your profile, skills, and assessment results to create a personalized step-by-step learning path.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/career/explore">
            <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" /> Explore Paths
            </Button>
          </Link>
          <Button
            onClick={handleGenerate}
            disabled={generating || !activePath}
            className="h-12 px-8 rounded-xl text-white font-bold shadow-lg shadow-orange-500/20"
            style={{ background: "linear-gradient(135deg, #F97316, #EC4899)" }}
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> AI is building your path...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" /> Generate My Roadmap
              </>
            )}
          </Button>
        </div>
        {!activePath && (
          <p className="text-sm text-amber-600 font-medium">
            Complete onboarding first to set your career goal, or <Link href="/career/explore" className="underline">explore paths</Link>.
          </p>
        )}
      </div>
    )
  }

  // ─── Roadmap View ────────
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: (careerData?.color || "#F97316") + "15" }}
            >
              <Icon className="w-6 h-6" style={{ color: careerData?.color || "#F97316" }} />
            </div>
          )}
          <div>
            <h1
              className="text-2xl md:text-3xl font-extrabold text-gray-900"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {roadmap.title}
            </h1>
            <p className="text-sm text-gray-400">
              Generated {new Date(roadmap.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/career/explore">
            <Button variant="outline" className="rounded-xl border-gray-200">
              <ArrowLeft className="w-4 h-4 mr-1" /> Explore
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleGenerate}
            disabled={generating}
            className="rounded-xl border-gray-200"
          >
            {generating ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
            Regenerate
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Progress</span>
            </div>
            <p className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>
              {stats.completedSkills}
              <span className="text-lg text-gray-400 font-semibold">/{stats.totalSkills}</span>
            </p>
            <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700"
                style={{ width: `${stats.totalSkills > 0 ? (stats.completedSkills / stats.totalSkills) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Est. Timeline</span>
            </div>
            <p className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>
              {roadmap.estimatedMonths}
              <span className="text-lg text-gray-400 font-semibold"> months</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">{stats.totalHours} hours total</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Qualifies For</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {(careerData?.qualifyingRoles || []).slice(0, 3).map(role => (
                <span key={role} className="px-2 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium border border-orange-200">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Timeline ──────────────────────── */}
      <div className="space-y-8">
        {roadmap.phases.map((phase, phaseIdx) => {
          const phaseDone = phase.skills.every(s => s.status === "completed")
          const phaseActive = phase.skills.some(s => s.status === "in-progress")

          return (
            <div key={phase.id} className="relative">
              {/* Phase Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    phaseDone
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : phaseActive
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {phaseDone ? <CheckCircle2 className="w-4 h-4" /> : phaseIdx + 1}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {phase.title}
                  </h3>
                  <p className="text-sm text-gray-400">{phase.description}</p>
                </div>
              </div>

              {/* Skill Nodes */}
              <div className="ml-4 pl-8 border-l-2 border-gray-100 space-y-3">
                {phase.skills.map(skill => {
                  const styles = STATUS_STYLES[skill.status]
                  const StatusIcon = styles.icon
                  const isSelected = selectedSkill?.skill.id === skill.id

                  return (
                    <div key={skill.id}>
                      <button
                        onClick={() =>
                          setSelectedSkill(
                            isSelected ? null : { phase, skill }
                          )
                        }
                        className={`w-full text-left bg-white rounded-xl border p-4 transition-all hover:shadow-md ${
                          isSelected
                            ? "border-orange-300 shadow-md ring-1 ring-orange-200"
                            : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Status Icon */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${styles.ring}`}>
                            <StatusIcon className={`w-4 h-4 ${styles.iconColor}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 truncate">{skill.name}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles.labelColor}`}>
                                {styles.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{skill.description}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-gray-400 font-mono">{skill.estimatedHours}h</span>
                            <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                          </div>
                        </div>
                      </button>

                      {/* ─── Expanded Detail Panel ──── */}
                      {isSelected && (
                        <div className="mt-2 ml-11 bg-gray-50 rounded-xl border border-gray-100 p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          <p className="text-sm text-gray-600">{skill.description}</p>

                          {/* Resources */}
                          {skill.resources.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Learning Resources</h5>
                              {skill.resources.map((r, i) => {
                                const RIcon = RESOURCE_ICONS[r.type] || FileText
                                return (
                                  <a
                                    key={i}
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                                      <RIcon className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-800 truncate group-hover:text-orange-600 transition-colors">{r.title}</p>
                                      <p className="text-xs text-gray-400">{r.source} · {r.type}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-orange-400 shrink-0" />
                                  </a>
                                )
                              })}
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            {skill.status === "in-progress" && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(phase.id, skill.id, "completed")}
                                disabled={updatingSkill === skill.id}
                                className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold"
                              >
                                {updatingSkill === skill.id ? (
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                )}
                                Mark Complete
                              </Button>
                            )}
                            {skill.status === "completed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(phase.id, skill.id, "in-progress")}
                                disabled={updatingSkill === skill.id}
                                className="rounded-lg border-gray-200 text-xs font-bold"
                              >
                                {updatingSkill === skill.id ? (
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                ) : (
                                  <Circle className="w-3 h-3 mr-1" />
                                )}
                                Undo Complete
                              </Button>
                            )}
                            {skill.status === "locked" && (
                              <span className="text-xs text-gray-400 italic flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Complete previous skills to unlock
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
