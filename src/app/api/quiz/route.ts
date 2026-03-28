import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import SkillAssessment from "@/lib/db/models/SkillAssessment"
import { getSkillGapInsight } from "@/lib/gemini"

function calculateLevel(percentage: number): "Beginner" | "Intermediate" | "Advanced" | "Expert" {
  if (percentage >= 85) return "Expert"
  if (percentage >= 65) return "Advanced"
  if (percentage >= 40) return "Intermediate"
  return "Beginner"
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const body = await request.json()
    const { answers } = body

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: "No answers provided" }, { status: 400 })
    }

    const totalScore = answers.filter((a: { isCorrect: boolean }) => a.isCorrect).length
    const totalQuestions = answers.length
    const percentage = Math.round((totalScore / totalQuestions) * 100)
    const level = calculateLevel(percentage)

    // Calculate per-concept scores
    const conceptMap = new Map<string, { correct: number; total: number }>()
    for (const ans of answers) {
      const existing = conceptMap.get(ans.concept) || { correct: 0, total: 0 }
      existing.total++
      if (ans.isCorrect) existing.correct++
      conceptMap.set(ans.concept, existing)
    }

    const conceptScores = Array.from(conceptMap.entries()).map(([concept, data]) => ({
      concept,
      correct: data.correct,
      total: data.total,
      percentage: Math.round((data.correct / data.total) * 100),
    }))

    // Get Gemini insight (non-blocking fallback)
    let geminiInsight = ""
    try {
      geminiInsight = await getSkillGapInsight(conceptScores, percentage)
    } catch {
      geminiInsight = "Keep practicing! Focus on your weak areas and retake the quiz."
    }

    const assessment = await SkillAssessment.create({
      userId: session.user.id,
      totalScore,
      totalQuestions,
      percentage,
      level,
      conceptScores,
      answers,
      geminiInsight,
    })

    return NextResponse.json({ success: true, assessmentId: assessment._id }, { status: 200 })
  } catch (error) {
    console.error("Quiz submit error:", error)
    return NextResponse.json({ error: "Failed to save quiz results" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const assessments = await SkillAssessment.find({ userId: session.user.id })
      .sort({ quizDate: -1 })
      .limit(10)
      .lean()

    return NextResponse.json({ assessments }, { status: 200 })
  } catch (error) {
    console.error("Quiz fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch assessments" }, { status: 500 })
  }
}
