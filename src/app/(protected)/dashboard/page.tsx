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
        <Skeleton className="w-full h-[200px] rounded-3xl opacity-50" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-3xl opacity-50" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[350px] rounded-3xl opacity-50" />
          <Skeleton className="h-[350px] rounded-3xl opacity-50" />
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

      {/* ═══════════════════════ HERO BANNER (Command Center) ═══════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-[#090F1A] text-white p-8 md:p-12 isolate border border-slate-800 shadow-2xl">
        {/* Animated Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
        {/* Glow Effects */}
        <div className="absolute top-[-40%] right-[-10%] w-[60%] h-[250%] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-[-50%] left-[-10%] w-[50%] h-[200%] bg-pink-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start md:flex-row md:justify-between gap-6 md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gray-400 text-sm font-semibold tracking-wide uppercase">{greeting},</span>
              {stats.streak > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.3)] shimmer-effect relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {stats.streak} day streak
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-heading font-black tracking-tight mb-2 leading-tight">
              {firstName}{" "}
              <span className="inline-block animate-bounce drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ animationDuration: "2s" }}>👋</span>
            </h1>
            {user.targetRoleLabel && (
              <p className="text-gray-400 text-base md:text-lg max-w-xl">
                Preparing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 font-bold drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">{user.targetRoleLabel}</span>
                {user.timeline && <span> · {user.timeline}</span>}
              </p>
            )}
          </div>

          <Link 
            href="/planner/weekly" 
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#090F1A] font-black text-sm hover:scale-[1.03] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group mt-4 md:mt-0"
          >
            Continue Learning <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ═══════════════════════ STAT CARDS (Neumorphic Upgrades) ═══════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Success Score */}
        <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7 group hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity duration-500 -rotate-12 translate-x-4">
            <Trophy className="w-24 h-24 text-orange-500" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <Trophy className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 block">Success Score</span>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-4xl font-heading font-black text-slate-900 group-hover:text-orange-600 transition-colors">{stats.successScore || 0}</span>
              <span className="text-sm text-slate-400 font-bold">/100</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                style={{ width: `${stats.successScore || 0}%`, background: "linear-gradient(90deg, #F97316, #EC4899)" }} 
              />
            </div>
          </div>
        </div>

        {/* Quiz Score */}
        <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7 group hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rotate-12 translate-x-4">
            <Target className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 block">Quiz Average</span>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-4xl font-heading font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{stats.averageQuizScore ?? "--"}</span>
              <span className="text-sm text-slate-400 font-bold">%</span>
            </div>
            <p className="text-xs font-bold text-slate-400">
              {stats.quizzesTaken} Quiz{stats.quizzesTaken !== 1 ? "zes" : ""} Taken
            </p>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7 group hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity duration-500 -rotate-6 translate-x-4">
            <CheckCircle2 className="w-24 h-24 text-blue-500" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 block">Tasks Done</span>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-4xl font-heading font-black text-slate-900 group-hover:text-blue-600 transition-colors">{totalTasksDone}</span>
              <span className="text-sm text-slate-400 font-bold">/{totalAllTasks}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                style={{ width: `${taskCompletionPct}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7 group hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rotate-6 translate-x-4">
             <Clock className="w-24 h-24 text-pink-500" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <Clock className="w-5 h-5 text-pink-600" />
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 block">Time Spent</span>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-4xl font-heading font-black text-slate-900 group-hover:text-pink-600 transition-colors">{timeHours.toFixed(1)}</span>
              <span className="text-sm text-slate-400 font-bold">hrs</span>
            </div>
            <p className="text-xs font-bold text-slate-400">Total Learning Time</p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════ MAIN GRID ═══════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── LEFT COLUMN (2/3) ─── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quiz Performance Chart */}
          {quizHistory.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-7 lg:p-9 relative overflow-hidden group hover:border-slate-200 transition-all duration-300">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-heading font-black text-slate-900">Performance Trend</h3>
                  <p className="text-xs font-bold tracking-wide text-slate-400 mt-1 uppercase">Assessments over time</p>
                </div>
                <Link href="/skill-gap/overview" className="flex items-center gap-1.5 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold hover:bg-orange-100 hover:scale-105 transition-all">
                  Analyze <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sparkline */}
              <div className="flex items-end gap-2 h-40 mb-4 px-2">
                {quizHistory.map((q: any, i: number) => {
                  const barH = Math.max(15, q.score)
                  const isLatest = i === quizHistory.length - 1
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group/bar h-full max-w-[48px]">
                      <span className={`text-[11px] font-black opacity-0 group-hover/bar:opacity-100 transition-all duration-300 translate-y-2 group-hover/bar:translate-y-0 ${q.score >= 70 ? 'text-emerald-600' : q.score >= 40 ? 'text-amber-600' : 'text-red-500'}`}>
                        {q.score}%
                      </span>
                      <div
                        className={`w-full rounded-t-xl transition-all duration-500 cursor-pointer group-hover/bar:brightness-110 ${
                          isLatest
                            ? "shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                            : "hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                        }`}
                        style={{
                          height: `${barH}%`,
                          background: isLatest
                            ? "linear-gradient(180deg, #F97316, #EC4899)"
                            : q.score >= 70
                              ? "linear-gradient(180deg, #34D399, #10B981)" 
                              : q.score >= 40
                                ? "linear-gradient(180deg, #FCD34D, #F59E0B)"
                                : "linear-gradient(180deg, #F87171, #EF4444)"
                        }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gradient-to-b from-emerald-400 to-emerald-500 shadow-sm shadow-emerald-500/20" />MASTERED (≥70)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gradient-to-b from-amber-300 to-amber-500 shadow-sm shadow-amber-500/20" />INTERMEDIATE (40-69)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gradient-to-b from-red-400 to-red-500 shadow-sm shadow-red-500/20" />BEGINNER (&lt;40)</div>
              </div>
            </div>
          )}

          {/* Skill Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weak Concepts */}
            {weakConcepts.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-7 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-red-50 flex items-center justify-center border border-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Needs Improvement</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Critical Focus Areas</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {weakConcepts.slice(0, 4).map((c: any, i: number) => (
                    <div key={i} className="group/item">
                      <div className="flex justify-between text-sm mb-1.5 list-none">
                        <span className="font-bold text-slate-700 truncate pr-2 group-hover/item:text-amber-600 transition-colors">{c.concept}</span>
                        <span className={`font-black text-xs ${c.percentage < 30 ? 'text-red-500' : 'text-amber-500'}`}>{c.correct}/{c.total}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full rounded-full transition-all duration-700 ${c.percentage < 30 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} style={{ width: `${c.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/skill-gap/quiz" className="flex items-center justify-center gap-2 w-full mt-6 py-2.5 rounded-xl bg-slate-50 text-slate-500 text-xs font-bold hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100">
                  Targeted Retake <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Strong Concepts */}
            {strongConcepts.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-7 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center border border-emerald-100">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Your Strengths</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Mastered Topics</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {strongConcepts.slice(0, 4).map((c: any, i: number) => (
                    <div key={i} className="group/item">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-bold text-slate-700 truncate pr-2 group-hover/item:text-emerald-600 transition-colors">{c.concept}</span>
                        <span className="font-black text-xs text-emerald-600 drop-shadow-sm">{c.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-700" style={{ width: `${c.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fallback: No quiz taken yet */}
            {weakConcepts.length === 0 && strongConcepts.length === 0 && (
              <div className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl border border-orange-100/50 shadow-inner p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-orange-500/10 hover:scale-110 transition-transform cursor-pointer">
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-heading font-black text-slate-900 mb-2">Initialize Your Profile</h3>
                <p className="text-base text-slate-500 mb-6 max-w-sm mx-auto font-medium">Take the adaptive diagnostic quiz to unlock personalized heatmaps, analytics, and roadmaps.</p>
                <Link href="/skill-gap/quiz" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white text-sm font-black shadow-xl shadow-orange-500/20 hover:scale-[1.03] transition-all" style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}>
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Skills Proficiency */}
          {skills.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-7 group hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center border border-indigo-100">
                    <Zap className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Skills Matrix</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{skills.length} tracked assets</p>
                  </div>
                </div>
                <Link href="/profile/me" className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-200">
                  Manage <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                {skills.slice(0, 8).map((s: any, i: number) => (
                  <div key={i} className="group/metric">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-700 group-hover/metric:text-indigo-600 transition-colors uppercase tracking-wide">{s.name}</span>
                      <span className="font-black text-slate-400">{s.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full transition-all duration-700 shadow-sm"
                        style={{
                          width: `${s.proficiency}%`,
                          background: s.proficiency >= 70 ? "linear-gradient(90deg, #34D399, #10B981)" : s.proficiency >= 40 ? "linear-gradient(90deg, #FBBF24, #F59E0B)" : "linear-gradient(90deg, #F87171, #EF4444)"
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

          {/* BENTO GRID: Quick Actions */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7">
            <h3 className="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-4">Launchpad</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Primary Action (Full Width) */}
              <Link href="/skill-gap/quiz" className="col-span-2 group relative overflow-hidden rounded-2xl bg-[#090F1A] p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer border border-slate-800">
                 <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 <div className="relative z-10 w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                    <Target className="w-6 h-6 text-white" />
                 </div>
                 <div className="relative z-10">
                    <h4 className="text-white font-black text-lg">Diagnostics</h4>
                    <span className="text-xs font-semibold text-orange-400 flex items-center gap-1">Take quiz <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                 </div>
              </Link>

              {/* Secondary Bento block 1 */}
              <Link href="/career/explore" className="group rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                  <Map className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Roadmaps</h4>
                <p className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Explore</p>
              </Link>
              
              {/* Secondary Bento block 2 */}
              <Link href="/planner/weekly" className="group rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
                  <CalendarDays className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Planner</h4>
                <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Weekly</p>
              </Link>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[11px] font-black tracking-widest text-slate-400 uppercase">Upcoming Tasks</h3>
              <Link href="/planner/weekly" className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-100 transition-colors">
                 <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {upcomingTasks.length === 0 ? (
              <div className="text-center py-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                <CalendarDays className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-xs font-bold text-slate-400">Zero pending tasks</p>
              </div>
            ) : (
              <div className="space-y-2">
                {upcomingTasks.map((t: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shadow-[0_0_5px_rgba(249,115,22,0.5)] shrink-0 group-hover:scale-125 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">{t.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">{t.dayOfWeek} · {t.estimatedMinutes}m</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Career Roadmaps */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[11px] font-black tracking-widest text-slate-400 uppercase">Career Roadmaps</h3>
              <Link href="/career/explore" className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentRoadmaps.length === 0 ? (
              <div className="text-center py-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                <Map className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-400">No roadmaps generated</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentRoadmaps.map((r: any, idx: number) => (
                  <Link key={idx} href={`/career/roadmap`} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${idx === 0 ? 'bg-[#090F1A] shadow-[0_0_10px_rgba(0,0,0,0.2)]' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100'}`}>
                      <BookOpen className={`w-4 h-4 ${idx === 0 ? 'text-white' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{r.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{new Date(r.createdAt).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Quizzes */}
          {recentQuizzes.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[11px] font-black tracking-widest text-slate-400 uppercase">Recent Quizzes</h3>
                <Link href="/skill-gap/overview" className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentQuizzes.map((q: any, i: number) => (
                  <Link key={i} href={`/skill-gap/report/${q.id}`} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                      q.score >= 70 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      q.score >= 40 ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {q.score}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 capitalize truncate group-hover:text-emerald-600 transition-colors">{ROLE_LABELS[q.careerPath] || q.careerPath}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{q.level} · {q.totalScore}/{q.totalQuestions}</p>
                    </div>
                    <TrendingUp className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Module Usage */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 md:p-7">
            <h3 className="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-5">Module Engagement</h3>
            <div className="space-y-4">
              {[
                { name: "Quizzes", val: stats.quizzesTaken || 0, icon: Target, gradient: "from-orange-400 to-pink-500", glow: "shadow-[0_0_8px_rgba(249,115,22,0.4)]" },
                { name: "Planner", val: stats.completedPlannerTasks || 0, icon: CalendarDays, gradient: "from-blue-400 to-indigo-500", glow: "shadow-[0_0_8px_rgba(59,130,246,0.4)]" },
                { name: "Boosts", val: stats.boostStepsCompleted || 0, icon: Zap, gradient: "from-fuchsia-400 to-purple-500" , glow: "shadow-[0_0_8px_rgba(217,70,239,0.4)]"},
                { name: "Roadmaps", val: stats.roadmapsGenerated || 0, icon: Map, gradient: "from-emerald-400 to-teal-500", glow: "shadow-[0_0_8px_rgba(16,185,129,0.4)]" },
              ].map((m, i) => {
                const max = Math.max(stats.quizzesTaken || 1, stats.completedPlannerTasks || 1, stats.boostStepsCompleted || 1, stats.roadmapsGenerated || 1) * 1.5
                return (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                       <m.icon className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">{m.name}</span>
                         <span className="text-[10px] font-black text-slate-900">{m.val}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${m.gradient} ${m.glow}`} style={{ width: `${Math.max(4, (m.val / max) * 100)}%` }} />
                      </div>
                    </div>
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
