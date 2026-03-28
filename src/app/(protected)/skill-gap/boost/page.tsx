"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Zap, Loader2, ChevronRight } from "lucide-react"

export default function SkillBoostLandingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkForPlan() {
      try {
        const res = await fetch("/api/skill-boost")
        if (res.ok) {
          const data = await res.json()
          if (data.plan?._id) {
            // Has an existing plan — redirect
            router.replace(`/skill-gap/boost/${data.plan._id}`)
            return
          }
        }
      } catch (err) {
        console.error("Failed to check for boost plan:", err)
      }
      setLoading(false)
    }
    checkForPlan()
  }, [router])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
        <p className="text-muted text-sm">Checking for existing plans...</p>
      </div>
    )
  }

  // No plan exists - show CTA
  return (
    <div className="max-w-lg mx-auto text-center py-20 space-y-6 px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full flex items-center justify-center mx-auto">
        <Zap className="w-10 h-10 text-orange-500" />
      </div>
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Skill Boost Engine
      </h1>
      <p className="text-muted max-w-sm mx-auto">
        Take a Skill Gap quiz first, then generate a personalized Boost Plan to strengthen your weak areas with AI-curated steps and real learning resources.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/skill-gap/quiz"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm shadow-lg shadow-orange-500/20"
          style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}
        >
          Take Skill Gap Quiz <ChevronRight className="w-4 h-4" />
        </Link>
        <Link
          href="/skill-gap/overview"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-surface-alt transition-colors"
        >
          View Past Results
        </Link>
      </div>
    </div>
  )
}
