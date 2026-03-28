"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Trophy, Clock, CheckCircle2, ArrowUpRight, ArrowRight,
  BookOpen, Map, Flame, Target, Zap, CalendarDays,
  TrendingUp, AlertTriangle, Sparkles, ChevronRight, Award
} from "lucide-react"

const ROLE_LABELS: Record<string, string> = {
  swe: "Software Engineer", ds: "Data Scientist", ml: "ML Engineer",
  design: "Product Designer", pm: "Product Manager", security: "Security Analyst",
  fullstack: "Full Stack Developer", devops: "DevOps Engineer",
  mobile: "Mobile App Developer", cloud: "Cloud Architect",
  blockchain: "Blockchain Developer", gamedev: "Game Developer",
  ba: "Business Analyst", marketing: "Digital Marketer",
}

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard")
        if (res.ok) setData(await res.json())
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        <Skeleton className="w-full h-[200px] rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[350px] rounded-2xl" />
          <Skeleton className="h-[350px] rounded-2xl" />
        </div>
      </div>
    )
  }

  const user = data?.user || {}
  const stats = data?.stats || {}
  const skills = data?.skills || []
  const quizHistory = data?.quizHistory || []
  const weakConcepts = data?.weakConcepts || []
  const strongConcepts = data?.strongConcepts || []
  const upcomingTasks = data?.upcomingTasks || []
  const recentQuizzes = data?.recentQuizzes || []
  const recentRoadmaps = data?.recentRoadmaps || []

  const firstName = user.name?.split(" ")[0] || "Student"
  const totalTasksDone = (stats.completedPlannerTasks || 0) + (stats.boostStepsCompleted || 0)
  const totalAllTasks = (stats.totalPlannerTasks || 0) + (stats.boostStepsTotal || 0)
  const taskCompletionPct = totalAllTasks > 0 ? Math.round((totalTasksDone / totalAllTasks) * 100) : 0
  const timeHours = (((stats.completedPlannerTasks || 0) * 45) + ((stats.boostStepsCompleted || 0) * 30)) / 60

  // Get greeting based on hour
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">

      {/* ═══════════════════════ HERO BANNER ═══════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0A0F1C] text-white p-8 md:p-10 isolate border border-white/5">
        <div className="absolute top-[-30%] right-[-5%] w-[50%] h-[200%] bg-orange-500/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-50%] left-[-5%] w-[40%] h-[200%] bg-pink-500/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">{greeting},</p>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight mb-2 leading-tight">
              {firstName}{" "}
              <span className="inline-block animate-bounce" style={{ animationDuration: "2s" }}>👋</span>
            </h1>
            {user.targetRoleLabel && (
              <p className="text-gray-400 text-sm">
                Studying towards <span className="text-orange-400 font-semibold">{user.targetRoleLabel}</span>
                {user.timeline && <span> · {user.timeline}</span>}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-center">
            {stats.streak > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-bold">
                <Flame className="w-4 h-4" />
                {stats.streak} day streak
              </div>
            )}
            <Link href="/planner/weekly" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0A0F1C] font-bold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-white/10">
              Continue Learning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════ STAT CARDS (4-col) ═══════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Success Score */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 group hover:shadow-lg hover:shadow-orange-500/5 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trophy className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Score</span>
          </div>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-heading font-extrabold text-gray-900">{stats.successScore || 0}</span>
            <span className="text-sm text-gray-400 font-semibold mb-1">/100</span>
          </div>
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${stats.successScore || 0}%`, background: "linear-gradient(90deg, #F97316, #EC4899)" }} />
          </div>
        </div>

        {/* Quiz Score */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 group hover:shadow-lg hover:shadow-emerald-500/5 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quiz Avg</span>
          </div>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-heading font-extrabold text-gray-900">{stats.averageQuizScore ?? "--"}</span>
            <span className="text-sm text-gray-400 font-semibold mb-1">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">{stats.quizzesTaken} quiz{stats.quizzesTaken !== 1 ? "zes" : ""} taken</p>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 group hover:shadow-lg hover:shadow-blue-500/5 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tasks</span>
          </div>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-heading font-extrabold text-gray-900">{totalTasksDone}</span>
            <span className="text-sm text-gray-400 font-semibold mb-1">/{totalAllTasks}</span>
          </div>
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${taskCompletionPct}%` }} />
          </div>
        </div>

        {/* Time */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 group hover:shadow-lg hover:shadow-pink-500/5 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4 text-pink-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Time</span>
          </div>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-heading font-extrabold text-gray-900">{timeHours.toFixed(1)}</span>
            <span className="text-sm text-gray-400 font-semibold mb-1">hrs</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Estimated learning time</p>
        </div>
      </div>

      {/* ═══════════════════════ MAIN GRID ═══════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── LEFT COLUMN (2/3) ─── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quiz Performance Chart */}
          {quizHistory.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-heading font-extrabold text-gray-900">Quiz Performance</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Score trend across assessments</p>
                </div>
                <Link href="/skill-gap/overview" className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
                  View All <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Sparkline */}
              <div className="flex items-end gap-2 h-32 mb-4">
                {quizHistory.map((q: any, i: number) => {
                  const barH = Math.max(12, q.score)
                  const isLatest = i === quizHistory.length - 1
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1.5 group h-full max-w-[40px]">
                      <span className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${q.score >= 70 ? 'text-emerald-600' : q.score >= 40 ? 'text-amber-600' : 'text-red-500'}`}>
                        {q.score}%
                      </span>
                      <div
                        className={`w-full rounded-t-lg transition-all cursor-pointer group-hover:brightness-110 ${
                          isLatest
                            ? "shadow-lg shadow-orange-500/20"
                            : ""
                        }`}
                        style={{
                          height: `${barH}%`,
                          background: isLatest
                            ? "linear-gradient(180deg, #F97316, #EC4899)"
                            : q.score >= 70
                              ? "#D1FAE5"
                              : q.score >= 40
                                ? "#FEF3C7"
                                : "#FEE2E2"
                        }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-100" />≥70%</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-100" />40-69%</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-red-100" />&lt;40%</div>
              </div>
            </div>
          )}

          {/* Skill Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Weak Concepts */}
            {weakConcepts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Needs Improvement</h3>
                    <p className="text-[10px] text-gray-400">From your latest quiz</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {weakConcepts.map((c: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 truncate pr-2">{c.concept}</span>
                        <span className={`font-bold text-xs ${c.percentage < 30 ? 'text-red-500' : 'text-amber-500'}`}>{c.correct}/{c.total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.percentage < 30 ? 'bg-red-400' : 'bg-amber-400'}`} style={{ width: `${c.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/skill-gap/quiz" className="flex items-center gap-1 text-xs font-bold text-orange-500 mt-4 hover:text-orange-600">
                  Retake Quiz <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Strong Concepts */}
            {strongConcepts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Your Strengths</h3>
                    <p className="text-[10px] text-gray-400">Keep it up!</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {strongConcepts.map((c: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 truncate pr-2">{c.concept}</span>
                        <span className="font-bold text-xs text-emerald-600">{c.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${c.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fallback: No quiz taken yet */}
            {weakConcepts.length === 0 && strongConcepts.length === 0 && (
              <div className="md:col-span-2 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border border-orange-100 p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Target className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Take Your First Quiz</h3>
                <p className="text-sm text-gray-500 mb-4 max-w-sm mx-auto">Assess your skills to get personalized insights and track your progress over time.</p>
                <Link href="/skill-gap/quiz" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all" style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}>
                  Start Quiz <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Skills Proficiency */}
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Your Skills</h3>
                    <p className="text-[10px] text-gray-400">{skills.length} skills tracked</p>
                  </div>
                </div>
                <Link href="/profile/me" className="text-xs font-bold text-orange-500 flex items-center gap-1">
                  Edit <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {skills.slice(0, 8).map((s: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{s.name}</span>
                      <span className="font-bold text-gray-400">{s.proficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${s.proficiency}%`,
                          background: s.proficiency >= 70 ? "#10B981" : s.proficiency >= 40 ? "#F59E0B" : "#EF4444"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── RIGHT COLUMN (1/3) ─── */}
        <div className="space-y-6">

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Take Quiz", href: "/skill-gap/quiz", icon: Target, color: "bg-orange-50 text-orange-600" },
                { label: "Career Map", href: "/career/explore", icon: Map, color: "bg-blue-50 text-blue-600" },
                { label: "Planner", href: "/planner/weekly", icon: CalendarDays, color: "bg-emerald-50 text-emerald-600" },
                { label: "Scholarships", href: "/scholarships/matches", icon: Award, color: "bg-pink-50 text-pink-600" },
              ].map(action => (
                <Link key={action.href} href={action.href} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group">
                  <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Upcoming Tasks</h3>
              <Link href="/planner/weekly" className="text-[10px] font-bold text-orange-500 flex items-center gap-0.5">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {upcomingTasks.length === 0 ? (
              <div className="text-center py-6">
                <CalendarDays className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">No pending tasks</p>
                <Link href="/planner/weekly" className="text-xs font-bold text-orange-500 mt-1 inline-block">Generate Plan →</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {upcomingTasks.map((t: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{t.title}</p>
                      <p className="text-[10px] text-gray-400">{t.dayOfWeek} · {t.estimatedMinutes}min</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Career Roadmaps */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Career Roadmaps</h3>
              <Link href="/career/explore" className="text-[10px] font-bold text-orange-500 flex items-center gap-0.5">
                Explore <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {recentRoadmaps.length === 0 ? (
              <div className="text-center py-6">
                <Map className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">No roadmaps generated yet</p>
                <Link href="/career/explore" className="text-xs font-bold text-orange-500 mt-1 inline-block">Explore Careers →</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentRoadmaps.map((r: any, idx: number) => (
                  <Link key={idx} href={`/career/roadmap`} className="block p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${idx === 0 ? 'bg-[#0A0F1C]' : 'bg-gradient-to-br from-pink-500 to-orange-500'}`}>
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">{r.title}</p>
                        <p className="text-[10px] text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Quiz Results */}
          {recentQuizzes.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Recent Quizzes</h3>
                <Link href="/skill-gap/overview" className="text-[10px] font-bold text-orange-500 flex items-center gap-0.5">
                  All Results <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {recentQuizzes.map((q: any, i: number) => (
                  <Link key={i} href={`/skill-gap/report/${q.id}`} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                      q.score >= 70 ? 'bg-emerald-50 text-emerald-700' :
                      q.score >= 40 ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {q.score}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 capitalize">{ROLE_LABELS[q.careerPath] || q.careerPath}</p>
                      <p className="text-[10px] text-gray-400">{q.level} · {q.totalScore}/{q.totalQuestions} correct</p>
                    </div>
                    <TrendingUp className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Module Usage */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Module Usage</h3>
            <div className="space-y-3">
              {[
                { name: "Quizzes", val: stats.quizzesTaken || 0, icon: Target, gradient: "from-orange-500 to-orange-400" },
                { name: "Planner", val: stats.completedPlannerTasks || 0, icon: CalendarDays, gradient: "from-blue-500 to-blue-400" },
                { name: "Boosts", val: stats.boostStepsCompleted || 0, icon: Zap, gradient: "from-pink-500 to-pink-400" },
                { name: "Roadmaps", val: stats.roadmapsGenerated || 0, icon: Map, gradient: "from-emerald-500 to-emerald-400" },
              ].map((m, i) => {
                const max = Math.max(stats.quizzesTaken || 1, stats.completedPlannerTasks || 1, stats.boostStepsCompleted || 1, stats.roadmapsGenerated || 1) * 1.5
                return (
                  <div key={i} className="flex items-center gap-3">
                    <m.icon className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600 w-16">{m.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${m.gradient}`} style={{ width: `${Math.max(4, (m.val / max) * 100)}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-6 text-right">{m.val}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
