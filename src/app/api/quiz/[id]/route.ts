import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import SkillAssessment from "@/lib/db/models/SkillAssessment"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await dbConnect()
    const assessment = await SkillAssessment.findOne({
      _id: id,
      userId: session.user.id,
    }).lean()

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    return NextResponse.json({ assessment }, { status: 200 })
  } catch (error) {
    console.error("Assessment fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch assessment" }, { status: 500 })
  }
}
