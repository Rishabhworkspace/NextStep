import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import SkillBoostPlan from "@/lib/db/models/SkillBoostPlan"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ planId: string; stepId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { planId, stepId } = await params
    const body = await req.json()
    const { completed, conceptIndex } = body

    await dbConnect()

    const plan = await SkillBoostPlan.findById(planId)
    if (!plan || plan.userId !== session.user.id) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 })
    }

    // Find and toggle the step
    const concept = plan.concepts[conceptIndex]
    if (!concept) {
      return NextResponse.json(
        { error: "Concept not found" },
        { status: 404 }
      )
    }

    const step = concept.steps.find(
      (s: { id: string }) => s.id === stepId
    )
    if (!step) {
      return NextResponse.json({ error: "Step not found" }, { status: 404 })
    }

    step.completed = completed
    step.completedAt = completed ? new Date() : undefined

    // Check if all steps in this concept are done
    concept.isConceptCompleted = concept.steps.every(
      (s: { completed: boolean }) => s.completed
    )

    await plan.save()

    return NextResponse.json({ plan })
  } catch (error) {
    console.error("PATCH step error:", error)
    return NextResponse.json(
      { error: "Failed to update step" },
      { status: 500 }
    )
  }
}
