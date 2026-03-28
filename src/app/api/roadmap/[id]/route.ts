import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import CareerRoadmap from "@/lib/db/models/CareerRoadmap"

// PATCH: Update a skill's status within a roadmap
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: roadmapId } = await params

    await dbConnect()
    const body = await request.json()
    const { phaseId, skillId, status } = body

    if (!phaseId || !skillId || !status) {
      return NextResponse.json(
        { error: "phaseId, skillId, and status are required" },
        { status: 400 }
      )
    }

    if (!["completed", "in-progress", "locked"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: completed, in-progress, or locked" },
        { status: 400 }
      )
    }

    const roadmap = await CareerRoadmap.findOne({
      _id: roadmapId,
      userId: session.user.id,
    })

    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 })
    }

    // Find and update the specific skill
    let updated = false
    for (const phase of roadmap.phases) {
      if (phase.id === phaseId) {
        for (const skill of phase.skills) {
          if (skill.id === skillId) {
            skill.status = status
            updated = true
            break
          }
        }
      }
    }

    if (!updated) {
      return NextResponse.json({ error: "Skill not found in roadmap" }, { status: 404 })
    }

    // Auto-advance: if marking complete, set next locked skill to in-progress
    if (status === "completed") {
      let foundNext = false
      for (const phase of roadmap.phases) {
        for (const skill of phase.skills) {
          if (skill.status === "locked" && !foundNext) {
            skill.status = "in-progress"
            foundNext = true
          }
        }
      }
    }

    roadmap.markModified("phases")
    await roadmap.save()

    return NextResponse.json({ roadmap }, { status: 200 })
  } catch (error) {
    console.error("Roadmap PATCH error:", error)
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}
