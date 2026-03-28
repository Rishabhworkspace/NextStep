"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import {
  User, GraduationCap, Target, Wrench, Wallet,
  Edit3, Save, X, Star, BookOpen, Award, ChevronRight
} from "lucide-react"

interface ProfileData {
  fullName: string
  college: string
  degree: string
  yearOfStudy: string
  isFirstGen: boolean
  cgpa: number
  stream: string
  confidentSubjects: string[]
  weakSubjects: string[]
  targetRole: string
  companyType: string
  timeline: string
  currentSkills: { name: string; proficiency: number }[]
  needsAssistance: boolean
  incomeBracket: string
  scholarshipPrefs: string[]
  completionPercentage: number
}

const ROLE_LABELS: Record<string, string> = {
  swe: "Software Engineer",
  ds: "Data Scientist",
  ml: "ML Engineer",
  design: "Product Designer",
  pm: "Product Manager",
  security: "Security Analyst",
  fullstack: "Full Stack Developer",
  devops: "DevOps Engineer",
  mobile: "Mobile App Developer",
  cloud: "Cloud Architect",
  blockchain: "Blockchain Developer",
  gamedev: "Game Developer",
  ba: "Business Analyst",
  marketing: "Digital Marketer",
}

const STREAMS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Data Science", "Business", "Design", "Other"]
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"]

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editData, setEditData] = useState<Partial<ProfileData>>({})

  useEffect(() => {
    async function fetchData() {
      try {
        const [profRes, dashRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/dashboard")
        ])

        if (profRes.ok) {
          const profData = await profRes.json()
          setProfile(profData.profile)
        }
        if (dashRes.ok) {
          const dashData = await dashRes.json()
          setStats(dashData.stats)
        }
      } catch (err) {
        console.error("Failed to fetch profile", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  function startEditing() {
    if (profile) {
      setEditData({
        fullName: profile.fullName,
        college: profile.college,
        degree: profile.degree,
        yearOfStudy: profile.yearOfStudy,
        cgpa: profile.cgpa,
        stream: profile.stream,
        targetRole: profile.targetRole,
        companyType: profile.companyType,
        timeline: profile.timeline,
      })
      setEditing(true)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, ...editData }),
      })
      if (res.ok) {
        const data = await res.json()
        setProfile(data.profile)
        setEditing(false)
        toast.success("Profile updated successfully!")
      } else {
        toast.error("Failed to save profile")
      }
    } catch {
      toast.error("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "academic", label: "Academic" },
    { id: "career", label: "Career" },
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4">
              <Skeleton className="w-20 h-20 rounded-full mx-auto" />
              <Skeleton className="h-6 w-40 mx-auto" />
              <Skeleton className="h-4 w-28 mx-auto" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full mt-4" />
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <User className="w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>No profile yet</h2>
        <p className="text-gray-500">Complete onboarding to create your profile.</p>
        <Link href="/auth/onboarding">
          <Button style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }} className="text-white shadow-lg shadow-orange-500/20">
            Start Onboarding <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    )
  }

  const completionPct = profile.completionPercentage || 0
  const initials = profile.fullName?.split(" ").map(n => n[0]).join("").toUpperCase() || "?"

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ─── Left Panel ────────────────────────────── */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6 lg:sticky lg:top-[80px]">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-500/20">
                {initials}
              </div>
              <div>
                {editing ? (
                  <Input
                    value={editData.fullName || ""}
                    onChange={e => setEditData(p => ({ ...p, fullName: e.target.value }))}
                    className="text-center text-lg font-bold h-10 border-orange-200 focus:border-orange-400"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>{profile.fullName}</h2>
                )}
                {editing ? (
                  <div className="space-y-2 mt-2">
                    <Input
                      placeholder="Degree"
                      value={editData.degree || ""}
                      onChange={e => setEditData(p => ({ ...p, degree: e.target.value }))}
                      className="h-9 text-sm border-gray-200"
                    />
                    <select
                      value={editData.yearOfStudy || ""}
                      onChange={e => setEditData(p => ({ ...p, yearOfStudy: e.target.value }))}
                      className="w-full h-9 text-sm rounded-md border border-gray-200 bg-gray-50 px-3"
                    >
                      {YEARS.map(y => <option key={y}>{y}</option>)}
                    </select>
                    <Input
                      placeholder="College"
                      value={editData.college || ""}
                      onChange={e => setEditData(p => ({ ...p, college: e.target.value }))}
                      className="h-9 text-sm border-gray-200"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">{profile.degree}, {profile.yearOfStudy}</p>
                    <p className="text-sm text-gray-400">{profile.college}</p>
                  </>
                )}
              </div>
              {profile.isFirstGen && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                  <Star className="w-3 h-3" /> First-Gen Student
                </span>
              )}
            </div>

            {/* Completion Ring */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="50" cy="50" r="42"
                    stroke="url(#scoreGrad)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${completionPct * 2.64} 264`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-900">
                  {completionPct}%
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-2">Profile Completion</span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-around text-center py-4 border-y border-gray-100">
              <div>
                <p className="text-lg font-bold text-gray-900">{profile.currentSkills?.length || 0}</p>
                <p className="text-xs text-gray-400">Skills</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{stats?.quizzesTaken || 0}</p>
                <p className="text-xs text-gray-400">Quizzes</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{(stats?.completedPlannerTasks || 0) + (stats?.boostStepsCompleted || 0)}</p>
                <p className="text-xs text-gray-400">Tasks Done</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {editing ? (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 text-white shadow-lg shadow-orange-500/20"
                    style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving…" : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)} className="border-gray-200">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={startEditing} className="w-full justify-start gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ─── Right Panel ───────────────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Bar */}
          <div className="border-b border-gray-100 flex gap-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ─── Tab Content ──────────────────────────── */}

          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              {/* Career Goal */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <div className="flex items-center gap-2 text-gray-900 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                  <Target className="w-5 h-5 text-orange-500" /> Career Goal
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Target Role</p>
                    {editing ? (
                      <select
                        value={editData.targetRole || ""}
                        onChange={e => setEditData(p => ({ ...p, targetRole: e.target.value }))}
                        className="w-full h-8 text-sm rounded-md border border-gray-200 bg-white px-2"
                      >
                        {Object.entries(ROLE_LABELS).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900">{ROLE_LABELS[profile.targetRole] || profile.targetRole || "—"}</p>
                    )}
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Company Type</p>
                    {editing ? (
                      <Input
                        value={editData.companyType || ""}
                        onChange={e => setEditData(p => ({ ...p, companyType: e.target.value }))}
                        className="h-8 text-sm border-gray-200"
                      />
                    ) : (
                       <p className="text-sm font-semibold text-gray-900">{profile.companyType || "—"}</p>
                    )}
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Timeline</p>
                    {editing ? (
                      <Input
                        value={editData.timeline || ""}
                        onChange={e => setEditData(p => ({ ...p, timeline: e.target.value }))}
                        className="h-8 text-sm border-gray-200"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-gray-900">{profile.timeline || "—"}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Background */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                <div className="flex items-center gap-2 text-gray-900 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                  <User className="w-5 h-5 text-orange-500" /> Background
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  {profile.isFirstGen && <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200 text-xs font-medium">First-Gen Student</span>}
                  {profile.stream && <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 text-xs font-medium">{profile.stream}</span>}
                  {profile.cgpa > 0 && <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-medium">CGPA: {profile.cgpa}/10</span>}
                  {profile.needsAssistance && <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200 text-xs font-medium">Needs Financial Aid</span>}
                </div>
              </div>

              {/* Weak Areas */}
              {profile.weakSubjects && profile.weakSubjects.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                    <BookOpen className="w-5 h-5 text-orange-500" /> Focus Areas
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.weakSubjects.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 text-xs font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "academic" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                <div className="flex items-center gap-2 text-gray-900 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                  <GraduationCap className="w-5 h-5 text-orange-500" /> Academic Profile
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">CGPA</p>
                    {editing ? (
                      <Input
                        type="number" step="0.1" min="0" max="10"
                        value={editData.cgpa || ""}
                        onChange={e => setEditData(p => ({ ...p, cgpa: parseFloat(e.target.value) || 0 }))}
                        className="h-8 text-sm border-gray-200"
                      />
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">{profile.cgpa || "—"}<span className="text-sm text-gray-400">/10</span></p>
                    )}
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Stream</p>
                    {editing ? (
                      <select
                        value={editData.stream || ""}
                        onChange={e => setEditData(p => ({ ...p, stream: e.target.value }))}
                        className="w-full h-8 text-sm rounded-md border border-gray-200 bg-white px-2"
                      >
                        {STREAMS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900">{profile.stream || "—"}</p>
                    )}
                  </div>
                </div>

                {profile.confidentSubjects && profile.confidentSubjects.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Strong Subjects</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.confidentSubjects.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.weakSubjects && profile.weakSubjects.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Weak Subjects</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.weakSubjects.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "career" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                <div className="flex items-center gap-2 text-gray-900 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                  <Target className="w-5 h-5 text-orange-500" /> Career Path
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100">
                    <p className="text-xs text-orange-500 mb-1 font-medium">TARGET ROLE</p>
                    <p className="text-lg font-bold text-gray-900">{ROLE_LABELS[profile.targetRole] || profile.targetRole || "Not set"}</p>
                    <p className="text-sm text-gray-500 mt-1">{profile.companyType} · {profile.timeline}</p>
                  </div>
                </div>

                {profile.currentSkills && profile.currentSkills.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-900 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                      <Wrench className="w-5 h-5 text-orange-500" /> Skills
                    </div>
                    <div className="space-y-3">
                      {profile.currentSkills.map(skill => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-800">{skill.name}</span>
                            <span className="text-gray-400 text-xs font-mono">{skill.proficiency}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${skill.proficiency}%`,
                                background: "linear-gradient(90deg, #F97316, #EC4899)"
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {profile.scholarshipPrefs && profile.scholarshipPrefs.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-900 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                      <Award className="w-5 h-5 text-orange-500" /> Scholarship Preferences
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.scholarshipPrefs.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg border border-orange-200 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
