import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import SkillBoostPlan from "@/lib/db/models/SkillBoostPlan"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { planId } = await params
    const body = await req.json()
    const { direction } = body as { direction: "next" | "prev" }

    await dbConnect()

    const plan = await SkillBoostPlan.findById(planId)
    if (!plan || plan.userId !== session.user.id) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 })
    }

    const maxBatch = Math.max(0, Math.ceil(plan.totalWeakConcepts / 3) - 1)

    if (direction === "next") {
      plan.currentBatch = Math.min(plan.currentBatch + 1, maxBatch)
    } else if (direction === "prev") {
      plan.currentBatch = Math.max(plan.currentBatch - 1, 0)
    }

    await plan.save()

    return NextResponse.json({ currentBatch: plan.currentBatch })
  } catch (error) {
    console.error("PATCH batch error:", error)
    return NextResponse.json(
      { error: "Failed to update batch" },
      { status: 500 }
    )
  }
}
