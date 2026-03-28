import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import SkillBoostPlan from "@/lib/db/models/SkillBoostPlan"
import SkillAssessment from "@/lib/db/models/SkillAssessment"
import { generateSkillBoostPlan } from "@/lib/gemini"
import { scrapeResourcesForSkills } from "@/lib/firecrawl"

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const assessmentId = searchParams.get("assessmentId")

    await dbConnect()

    if (assessmentId) {
      // Fetch plan for a specific assessment
      const plan = await SkillBoostPlan.findOne({
        userId: session.user.id,
        assessmentId,
      })
      return NextResponse.json({ plan })
    }

    // Fetch the latest plan for this user
    const plan = await SkillBoostPlan.findOne({
      userId: session.user.id,
    }).sort({ generatedAt: -1 })

    return NextResponse.json({ plan })
  } catch (error) {
    console.error("GET /api/skill-boost error:", error)
    return NextResponse.json(
      { error: "Failed to fetch boost plan" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { assessmentId } = body

    if (!assessmentId) {
      return NextResponse.json(
        { error: "assessmentId is required" },
        { status: 400 }
      )
    }

    await dbConnect()

    // Check if plan already exists
    const existing = await SkillBoostPlan.findOne({
      userId: session.user.id,
      assessmentId,
    })
    if (existing) {
      return NextResponse.json({ plan: existing })
    }

    // Load the assessment
    const assessment = await SkillAssessment.findById(assessmentId)
    if (!assessment || assessment.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      )
    }

    // Filter weak concepts (< 50%)
    const weakConcepts = assessment.conceptScores
      .filter((c: { percentage: number }) => c.percentage < 50)
      .map((c: { concept: string; percentage: number }) => ({
        concept: c.concept,
        currentPercentage: c.percentage,
      }))

    if (weakConcepts.length === 0) {
      return NextResponse.json(
        { error: "No concepts below 50% — nothing to boost!" },
        { status: 400 }
      )
    }

    // 1. AI: Generate step-by-step plan for all weak concepts
    const aiPlan = await generateSkillBoostPlan({
      weakConcepts,
      careerPath: assessment.careerPath || "Software Engineering",
    })

    // 2. Firecrawl: Scrape resources for each weak concept
    const conceptNames = weakConcepts.map(
      (c: { concept: string }) => c.concept
    )
    const resourceMap = await scrapeResourcesForSkills(
      conceptNames,
      assessment.careerPath || "software engineering"
    )

    // 3. Merge AI steps + Firecrawl resources into plan structure
    const concepts = weakConcepts.map(
      (wc: { concept: string; currentPercentage: number }, idx: number) => {
        const aiConcept = aiPlan.find(
          (a) => a.concept.toLowerCase() === wc.concept.toLowerCase()
        ) || aiPlan[idx]

        const steps = (aiConcept?.steps || []).map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          estimatedMinutes: s.estimatedMinutes,
          completed: false,
        }))

        const resources = resourceMap[wc.concept] || []

        return {
          concept: wc.concept,
          currentPercentage: wc.currentPercentage,
          targetPercentage: 80,
          steps,
          resources,
          isConceptCompleted: false,
        }
      }
    )

    // 4. Save to DB
    const plan = await SkillBoostPlan.create({
      userId: session.user.id,
      assessmentId,
      careerPath: assessment.careerPath || "swe",
      totalWeakConcepts: concepts.length,
      concepts,
      currentBatch: 0,
      generatedAt: new Date(),
    })

    return NextResponse.json({ plan })
  } catch (error) {
    console.error("POST /api/skill-boost error:", error)
    return NextResponse.json(
      { error: "Failed to generate boost plan" },
      { status: 500 }
    )
  }
}
