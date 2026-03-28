import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import connectDb from "@/lib/db/connect"
import Profile from "@/lib/db/models/Profile"
import SkillAssessment from "@/lib/db/models/SkillAssessment"
import { WeeklyPlan } from "@/lib/db/models/WeeklyPlan"
import CareerRoadmap from "@/lib/db/models/CareerRoadmap"
import SkillBoostPlan from "@/lib/db/models/SkillBoostPlan"

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDb()
    const userId = session.user.id

    // Fetch all stats in parallel
    const [
      profile,
      quizzes,
      weeklyPlans,
      roadmaps,
      boostPlans,
    ] = await Promise.all([
      Profile.findOne({ userId }).lean(),
      SkillAssessment.find({ userId }).sort({ createdAt: -1 }).limit(5).lean(),
      WeeklyPlan.find({ userId }).sort({ createdAt: -1 }).limit(5).lean(),
      CareerRoadmap.find({ userId }).sort({ createdAt: -1 }).limit(3).lean(),
      SkillBoostPlan.find({ userId }).sort({ createdAt: -1 }).limit(5).lean(),
    ])

    // Compute quiz stats
    const quizCount = quizzes?.length || 0
    const latestQuiz = quizzes?.[0] as any
    const latestScore = latestQuiz?.score ?? null
    const avgScore = quizCount > 0
      ? Math.round((quizzes as any[]).reduce((acc, q: any) => acc + (q.score || 0), 0) / quizCount)
      : null

    // Compute planner stats
    const allTasks = (weeklyPlans as any[])?.flatMap((p: any) => p.tasks || []) || []
    const totalTasks = allTasks.length
    const completedTasks = allTasks.filter((t: any) => t.completed).length

    // Compute boost plan stats
    const totalBoostSteps = (boostPlans as any[])?.reduce((acc, p: any) => {
      return acc + (p.steps?.length || 0)
    }, 0) || 0
    const completedBoostSteps = (boostPlans as any[])?.reduce((acc, p: any) => {
      return acc + (p.steps?.filter((s: any) => s.completed)?.length || 0)
    }, 0) || 0

    // Build response
    return NextResponse.json({
      user: {
        name: (profile as any)?.fullName || session.user.name || "Student",
        targetRole: (profile as any)?.targetRole || null,
        college: (profile as any)?.college || null,
        completionPercentage: (profile as any)?.completionPercentage || 0,
      },
      stats: {
        quizzesTaken: quizCount,
        latestQuizScore: latestScore,
        averageQuizScore: avgScore,
        totalPlannerTasks: totalTasks,
        completedPlannerTasks: completedTasks,
        roadmapsGenerated: roadmaps?.length || 0,
        boostPlansCreated: boostPlans?.length || 0,
        boostStepsTotal: totalBoostSteps,
        boostStepsCompleted: completedBoostSteps,
      },
      recentQuizzes: (quizzes as any[])?.map((q: any) => ({
        id: q._id?.toString(),
        score: q.score,
        careerPath: q.careerPath,
        createdAt: q.createdAt,
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
