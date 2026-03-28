"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, CheckCircle2, Briefcase, Code, Database, Palette, LineChart, Shield, Brain, Rocket } from "lucide-react"

// ─── Constants ───────────────────────────────────────────────

const STREAMS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Data Science", "Business", "Design", "Other"]

const SUBJECT_TAGS = [
  "Data Structures", "Algorithms", "Python", "JavaScript", "Web Dev",
  "Databases", "Machine Learning", "System Design", "Networking",
  "Operating Systems", "Math", "Statistics", "Cloud Computing", "DevOps"
]

const CAREER_CARDS = [
  { icon: Code, label: "Software Engineer", value: "swe" },
  { icon: Database, label: "Data Scientist", value: "ds" },
  { icon: Brain, label: "ML Engineer", value: "ml" },
  { icon: Palette, label: "Product Designer", value: "design" },
  { icon: LineChart, label: "Product Manager", value: "pm" },
  { icon: Shield, label: "Security Analyst", value: "security" },
  { icon: Rocket, label: "Startup Founder", value: "founder" },
  { icon: Briefcase, label: "Consultant", value: "consultant" },
]

const COMPANY_TYPES = ["FAANG / Big Tech", "Startup", "MNC", "Government", "Freelancing"]

const TIMELINES = ["6 months", "1 year", "2 years", "3+ years"]

const SKILL_TAGS = [
  "Python", "JavaScript", "TypeScript", "Java", "C++", "React", "Node.js",
  "SQL", "MongoDB", "Docker", "Git", "AWS", "TensorFlow", "Figma",
  "Excel", "Communication", "Problem Solving", "DSA"
]

const INCOME_BRACKETS = ["Below ₹2L/yr", "₹2L – ₹5L/yr", "₹5L – ₹10L/yr", "₹10L+/yr"]

const SCHOLARSHIP_TYPES = ["Merit-based", "Need-based", "Government Schemes"]

// ─── Component ───────────────────────────────────────────────

export default function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  // ─── Form State ──────────────────────────────────────────
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: "",
    college: "",
    degree: "",
    yearOfStudy: "1st Year",
    isFirstGen: false,
    // Step 2: Academic
    cgpa: "",
    stream: "Computer Science",
    confidentSubjects: [] as string[],
    weakSubjects: [] as string[],
    // Step 3: Career
    targetRole: "",
    companyType: "",
    timeline: "",
    // Step 4: Skills
    currentSkills: [] as { name: string; proficiency: number }[],
    // Step 5: Financial
    needsAssistance: false,
    incomeBracket: "",
    scholarshipPrefs: [] as string[],
  })

  // ─── Helpers ─────────────────────────────────────────────
  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleChip = (field: "confidentSubjects" | "weakSubjects" | "scholarshipPrefs", tag: string) => {
    setFormData(prev => {
      const arr = prev[field] as string[]
      return {
        ...prev,
        [field]: arr.includes(tag) ? arr.filter(t => t !== tag) : [...arr, tag]
      }
    })
  }

  const toggleSkill = (skillName: string) => {
    setFormData(prev => {
      const existing = prev.currentSkills.find(s => s.name === skillName)
      if (existing) {
        return { ...prev, currentSkills: prev.currentSkills.filter(s => s.name !== skillName) }
      }
      return { ...prev, currentSkills: [...prev.currentSkills, { name: skillName, proficiency: 50 }] }
    })
  }

  const updateSkillProficiency = (skillName: string, proficiency: number) => {
    setFormData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.map(s =>
        s.name === skillName ? { ...s, proficiency } : s
      )
    }))
  }

  // ─── Submit ──────────────────────────────────────────────
  const handleSubmit = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cgpa: parseFloat(formData.cgpa) || 0,
        }),
      })
      if (!res.ok) throw new Error("Failed to save profile")
      setShowCompletion(true)
      setTimeout(() => router.push("/dashboard"), 2500)
    } catch (err) {
      console.error("Save error:", err)
      setSaving(false)
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  // ─── Completion Screen ───────────────────────────────────
  if (showCompletion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        <div className="text-center animate-fade-in space-y-6">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
            <div className="relative z-10 w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>Profile Created!</h1>
          <p className="text-gray-500 text-lg">Your NextStep roadmap is being built…</p>
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="block w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="block w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "100ms" }} />
            <span className="block w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "200ms" }} />
          </div>
        </div>
      </div>
    )
  }

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Progress Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/images/logo.png" alt="NextStep" width={28} height={28} className="rounded-lg" />
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>NextStep</span>
        </div>
        <div className="flex items-center gap-4 w-1/3 max-w-xs">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #F97316, #EC4899)"
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-400 shrink-0">{step}/{totalSteps}</span>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        {/* BG decoration */}
        <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-orange-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30vh] h-[30vh] bg-rose-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="w-full max-w-xl relative z-10">

          {/* ─── STEP 1: Personal Background ──────────── */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  Let&apos;s start with the basics
                </h1>
                <p className="text-gray-500">Tell us a bit about yourself and what you&apos;re studying.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input placeholder="e.g. Arjun Sharma" className="h-12 bg-gray-50 border-gray-200" value={formData.fullName} onChange={e => updateField("fullName", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">College or University</label>
                  <Input placeholder="e.g. IIT Madras" className="h-12 bg-gray-50 border-gray-200" value={formData.college} onChange={e => updateField("college", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Degree</label>
                    <Input placeholder="e.g. B.Tech CSE" className="h-12 bg-gray-50 border-gray-200" value={formData.degree} onChange={e => updateField("degree", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Year of Study</label>
                    <select
                      className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50"
                      value={formData.yearOfStudy}
                      onChange={e => updateField("yearOfStudy", e.target.value)}
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Graduated</option>
                    </select>
                  </div>
                </div>
                <div className="pt-2">
                  <label
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.isFirstGen ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => updateField("isFirstGen", !formData.isFirstGen)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      formData.isFirstGen ? "bg-orange-500 border-orange-500" : "border-gray-300"
                    }`}>
                      {formData.isFirstGen && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">I am a first-generation college student</p>
                      <p className="text-xs text-gray-500 mt-0.5">Neither of my parents completed a 4-year degree.</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Academic Profile ──────────────── */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  How are you doing academically?
                </h1>
                <p className="text-gray-500">This helps us tailor learning resources for you.</p>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Current CGPA</label>
                    <div className="relative">
                      <Input type="number" step="0.1" min="0" max="10" placeholder="8.5" className="h-12 pr-14 bg-gray-50 border-gray-200" value={formData.cgpa} onChange={e => updateField("cgpa", e.target.value)} />
                      <span className="absolute right-4 top-3.5 text-gray-400 text-sm border-l border-gray-200 pl-3">/ 10</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Specialization</label>
                    <select
                      className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50"
                      value={formData.stream}
                      onChange={e => updateField("stream", e.target.value)}
                    >
                      {STREAMS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-gray-700">Subjects you feel <span className="text-emerald-600">confident</span> in:</label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECT_TAGS.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleChip("confidentSubjects", tag)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                          formData.confidentSubjects.includes(tag)
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-300 shadow-sm"
                            : "bg-gray-50 text-gray-500 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-gray-700">Subjects you feel <span className="text-amber-600">weak</span> in:</label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECT_TAGS.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleChip("weakSubjects", tag)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                          formData.weakSubjects.includes(tag)
                            ? "bg-amber-100 text-amber-700 border border-amber-300 shadow-sm"
                            : "bg-gray-50 text-gray-500 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Career Goals ─────────────────── */}
          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  What&apos;s your dream destination?
                </h1>
                <p className="text-gray-500">Pick a career that excites you. You can change this later.</p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {CAREER_CARDS.map(({ icon: Icon, label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateField("targetRole", value)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        formData.targetRole === value
                          ? "border-orange-400 bg-orange-50 shadow-sm shadow-orange-100"
                          : "border-gray-100 hover:border-gray-200 bg-white"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.targetRole === value ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-sm font-medium ${formData.targetRole === value ? "text-gray-900" : "text-gray-600"}`}>{label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Preferred company type</label>
                  <div className="flex flex-wrap gap-2">
                    {COMPANY_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateField("companyType", type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.companyType === type
                            ? "bg-gray-900 text-white shadow-sm"
                            : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">How soon do you want to achieve this?</label>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINES.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => updateField("timeline", t)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.timeline === t
                            ? "bg-gray-900 text-white shadow-sm"
                            : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 4: Current Skills ───────────────── */}
          {step === 4 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  What do you already know?
                </h1>
                <p className="text-gray-500">Tap skills you have, then rate your proficiency.</p>
              </div>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {SKILL_TAGS.map(skill => {
                    const selected = formData.currentSkills.some(s => s.name === skill)
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                          selected
                            ? "bg-orange-100 text-orange-700 border border-orange-300 shadow-sm"
                            : "bg-gray-50 text-gray-500 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {selected ? "✓ " : ""}{skill}
                      </button>
                    )
                  })}
                </div>

                {formData.currentSkills.length > 0 && (
                  <div className="space-y-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-sm font-medium text-gray-700">Rate your proficiency:</p>
                    {formData.currentSkills.map(skill => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                          <span className="text-xs text-gray-400 font-mono">{skill.proficiency}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={skill.proficiency}
                          onChange={e => updateSkillProficiency(skill.name, parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-orange-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400">
                          <span>Beginner</span>
                          <span>Intermediate</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 5: Financial Context ────────────── */}
          {step === 5 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  One last thing…
                </h1>
                <p className="text-gray-500">This helps us match you with relevant scholarships. All fields are optional.</p>
              </div>
              <div className="space-y-6">
                <label
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.needsAssistance ? "border-orange-400 bg-orange-50" : "border-gray-100 hover:border-gray-200"
                  }`}
                  onClick={() => updateField("needsAssistance", !formData.needsAssistance)}
                >
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                    formData.needsAssistance ? "bg-orange-500 border-orange-500" : "border-gray-300"
                  }`}>
                    {formData.needsAssistance && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">I need financial assistance</p>
                    <p className="text-xs text-gray-500 mt-0.5">This helps us surface need-based scholarships for you.</p>
                  </div>
                </label>

                {formData.needsAssistance && (
                  <div className="space-y-3 animate-fade-in">
                    <label className="text-sm font-medium text-gray-700">Family income bracket <span className="text-gray-400">(optional)</span></label>
                    <div className="flex flex-wrap gap-2">
                      {INCOME_BRACKETS.map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => updateField("incomeBracket", b)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            formData.incomeBracket === b
                              ? "bg-gray-900 text-white shadow-sm"
                              : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Scholarship type preference</label>
                  <div className="flex flex-wrap gap-2">
                    {SCHOLARSHIP_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleChip("scholarshipPrefs", type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.scholarshipPrefs.includes(type)
                            ? "bg-orange-100 text-orange-700 border border-orange-300 shadow-sm"
                            : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── Navigation ───────────────────────────── */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className={`text-gray-500 ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={saving}
              className="px-8 text-white shadow-lg shadow-orange-500/20"
              size="lg"
              style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving…
                </span>
              ) : step === totalSteps ? (
                "Complete Profile"
              ) : (
                <>Continue <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>

        </div>
      </main>
    </div>
  )
}
