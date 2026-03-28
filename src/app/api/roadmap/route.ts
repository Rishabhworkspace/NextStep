import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import CareerRoadmap from "@/lib/db/models/CareerRoadmap"
import Profile from "@/lib/db/models/Profile"
import SkillAssessment from "@/lib/db/models/SkillAssessment"
import { generateCareerRoadmap } from "@/lib/gemini"
import { scrapeResourcesForSkill } from "@/lib/firecrawl"
import { CAREER_PATH_MAP } from "@/constants/careerData"

// GET: Fetch existing roadmap for user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    // Check for optional goal query param
    const { searchParams } = new URL(request.url)
    const goalPath = searchParams.get("goal")

    const query: Record<string, string> = { userId: session.user.id }
    if (goalPath) query.careerPath = goalPath

    const roadmap = await CareerRoadmap.findOne(query).sort({ generatedAt: -1 })

    if (!roadmap) {
      return NextResponse.json({ roadmap: null }, { status: 200 })
    }

    return NextResponse.json({ roadmap }, { status: 200 })
  } catch (error) {
    console.error("Roadmap GET error:", error)
    return NextResponse.json({ error: "Failed to fetch roadmap" }, { status: 500 })
  }
}

// POST: Generate new roadmap using Gemini + Firecrawl
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const body = await request.json()
    const careerPath = body.careerPath

    if (!careerPath) {
      return NextResponse.json({ error: "careerPath is required" }, { status: 400 })
    }

    // 1. Fetch user profile
    const profile = await Profile.findOne({ userId: session.user.id })
    if (!profile) {
      return NextResponse.json({ error: "Profile not found. Complete onboarding first." }, { status: 404 })
    }

    // 2. Fetch latest assessment for this path (optional)
    const assessment = await SkillAssessment.findOne({
      userId: session.user.id,
      careerPath,
    }).sort({ quizDate: -1 })

    const careerData = CAREER_PATH_MAP[careerPath as keyof typeof CAREER_PATH_MAP]
    const roleTitle = careerData?.title || careerPath

    // 3. Generate roadmap structure with Gemini
    const geminiResult = await generateCareerRoadmap({
      targetRole: roleTitle,
      currentSkills: profile.currentSkills || [],
      conceptScores: assessment?.conceptScores?.map((c: { concept: string; percentage: number }) => ({
        concept: c.concept,
        percentage: c.percentage,
      })),
      timeline: profile.timeline || "6 months",
    })

    // 4. Scrape resources for each skill using Firecrawl
    const phases = await Promise.all(
      geminiResult.phases.map(async (phase) => {
        const skillsWithResources = await Promise.all(
          phase.skills.map(async (skill) => {
            const resources = await scrapeResourcesForSkill(skill.name, roleTitle)
            return {
              ...skill,
              status: (skill as typeof skill & { status?: string }).status || "locked",
              resources,
            }
          })
        )

        return {
          ...phase,
          skills: skillsWithResources,
        }
      })
    )

    // Mark the first non-completed skill as "in-progress"
    let foundFirst = false
    for (const phase of phases) {
      for (const skill of phase.skills) {
        if (skill.status !== "completed" && !foundFirst) {
          skill.status = "in-progress"
          foundFirst = true
        }
      }
    }

    // 5. Upsert to MongoDB
    const roadmap = await CareerRoadmap.findOneAndUpdate(
      { userId: session.user.id, careerPath },
      {
        userId: session.user.id,
        careerPath,
        title: geminiResult.title,
        estimatedMonths: geminiResult.estimatedMonths,
        phases,
        generatedAt: new Date(),
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ roadmap }, { status: 201 })
  } catch (error) {
    console.error("Roadmap POST error:", error)
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 })
  }
}
