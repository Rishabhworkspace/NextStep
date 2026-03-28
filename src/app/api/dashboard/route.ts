import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import connectDb from "@/lib/db/connect"
import Profile from "@/lib/db/models/Profile"
import SkillAssessment from "@/lib/db/models/SkillAssessment"
import { WeeklyPlan } from "@/lib/db/models/WeeklyPlan"
import CareerRoadmap from "@/lib/db/models/CareerRoadmap"
import SkillBoostPlan from "@/lib/db/models/SkillBoostPlan"

const ROLE_LABELS: Record<string, string> = {
  swe: "Software Engineer", ds: "Data Scientist", ml: "ML Engineer",
  design: "Product Designer", pm: "Product Manager", security: "Security Analyst",
  fullstack: "Full Stack Developer", devops: "DevOps Engineer",
  mobile: "Mobile App Developer", cloud: "Cloud Architect",
  blockchain: "Blockchain Developer", gamedev: "Game Developer",
  ba: "Business Analyst", marketing: "Digital Marketer",
}

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDb()
    const userId = session.user.id

    const [
      profile,
      quizzes,
      weeklyPlans,
      roadmaps,
      boostPlans,
    ] = await Promise.all([
      Profile.findOne({ userId }).lean(),
      SkillAssessment.find({ userId }).sort({ createdAt: -1 }).limit(10).lean(),
      WeeklyPlan.find({ userId }).sort({ createdAt: -1 }).limit(5).lean(),
      CareerRoadmap.find({ userId }).sort({ createdAt: -1 }).limit(3).lean(),
      SkillBoostPlan.find({ userId }).sort({ createdAt: -1 }).limit(5).lean(),
    ])

    const prof = profile as any

    // Quiz stats
    const quizCount = quizzes?.length || 0
    const latestQuiz = (quizzes as any[])?.[0]
    const latestScore = latestQuiz?.percentage ?? null
    const avgScore = quizCount > 0
      ? Math.round((quizzes as any[]).reduce((acc, q: any) => acc + (q.percentage || 0), 0) / quizCount)
      : null

    // Planner stats
    const allDays = (weeklyPlans as any[])?.flatMap((p: any) => p.days || []) || []
    const allTasks = allDays.flatMap((d: any) => d.tasks || [])
    const totalTasks = allTasks.length
    const completedTasks = allTasks.filter((t: any) => t.completed).length

    // Upcoming tasks (incomplete, from latest plan)
    const latestPlan = (weeklyPlans as any[])?.[0]
    const upcomingTasks = latestPlan
      ? (latestPlan.days || [])
          .flatMap((d: any) => (d.tasks || []).map((t: any) => ({
            ...t,
            dayOfWeek: d.dayOfWeek,
          })))
          .filter((t: any) => !t.completed)
          .slice(0, 5)
      : []

    // Boost plan stats
    const totalBoostSteps = (boostPlans as any[])?.reduce((acc, p: any) =>
      acc + (p.steps?.length || 0), 0) || 0
    const completedBoostSteps = (boostPlans as any[])?.reduce((acc, p: any) =>
      acc + (p.steps?.filter((s: any) => s.completed)?.length || 0), 0) || 0

    // Skill proficiencies from profile  
    const skills = (prof?.currentSkills || []).map((s: any) => ({
      name: s.name,
      proficiency: s.proficiency,
    }))

    // Quiz score history (for sparkline chart)
    const quizHistory = (quizzes as any[])?.map((q: any) => ({
      score: q.percentage,
      date: q.createdAt,
      path: q.careerPath,
      level: q.level,
    })).reverse() || []

    // Weak concepts from latest quiz
    const weakConcepts = latestQuiz?.conceptScores
      ?.filter((c: any) => c.percentage < 60)
      ?.sort((a: any, b: any) => a.percentage - b.percentage)
      ?.slice(0, 4)
      ?.map((c: any) => ({
        concept: c.concept,
        percentage: c.percentage,
        correct: c.correct,
        total: c.total,
      })) || []

    // Strong concepts
    const strongConcepts = latestQuiz?.conceptScores
      ?.filter((c: any) => c.percentage >= 70)
      ?.sort((a: any, b: any) => b.percentage - a.percentage)
      ?.slice(0, 4)
      ?.map((c: any) => ({
        concept: c.concept,
        percentage: c.percentage,
      })) || []

    // Streak: consecutive days with at least 1 completed task
    let streak = 0
    if (latestPlan) {
      const days = [...(latestPlan.days || [])].reverse()
      for (const d of days) {
        if ((d.tasks || []).some((t: any) => t.completed)) {
          streak++
        } else break
      }
    }

    // Success score formula
    const quizWeight = latestScore ? latestScore * 0.3 : 0
    const taskWeight = totalTasks > 0 ? (completedTasks / totalTasks) * 100 * 0.25 : 0
    const boostWeight = totalBoostSteps > 0 ? (completedBoostSteps / totalBoostSteps) * 100 * 0.2 : 0
    const profileWeight = (prof?.completionPercentage || 0) * 0.15
    const roadmapWeight = Math.min((roadmaps?.length || 0) * 33, 100) * 0.1
    const successScore = Math.round(quizWeight + taskWeight + boostWeight + profileWeight + roadmapWeight)

    return NextResponse.json({
      user: {
        name: prof?.fullName || session.user.name || "Student",
        targetRole: prof?.targetRole || null,
        targetRoleLabel: ROLE_LABELS[prof?.targetRole] || prof?.targetRole || null,
        college: prof?.college || null,
        stream: prof?.stream || null,
        timeline: prof?.timeline || null,
        completionPercentage: prof?.completionPercentage || 0,
      },
      stats: {
        successScore,
        quizzesTaken: quizCount,
        latestQuizScore: latestScore,
        latestQuizLevel: latestQuiz?.level || null,
        averageQuizScore: avgScore,
        totalPlannerTasks: totalTasks,
        completedPlannerTasks: completedTasks,
        roadmapsGenerated: roadmaps?.length || 0,
        boostPlansCreated: boostPlans?.length || 0,
        boostStepsTotal: totalBoostSteps,
        boostStepsCompleted: completedBoostSteps,
        streak,
        skillCount: skills.length,
      },
      skills,
      quizHistory,
      weakConcepts,
      strongConcepts,
      upcomingTasks,
      recentQuizzes: (quizzes as any[])?.slice(0, 3).map((q: any) => ({
        id: q._id?.toString(),
        score: q.percentage,
        level: q.level,
        careerPath: q.careerPath,
        createdAt: q.createdAt,
        totalQuestions: q.totalQuestions,
        totalScore: q.totalScore,
      })) || [],
      recentRoadmaps: (roadmaps as any[])?.map((r: any) => ({
        id: r._id?.toString(),
        title: r.title || r.careerPath,
        careerPath: r.careerPath,
        createdAt: r.createdAt,
      })) || [],
    })
  } catch (error: any) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
