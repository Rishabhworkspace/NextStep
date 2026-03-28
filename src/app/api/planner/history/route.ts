import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import { WeeklyPlan } from "@/lib/db/models/WeeklyPlan"

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    // Find all plans for the user, sorted by start date descending (newest first)
    const plans = await WeeklyPlan.find({
      userId: session.user.id,
    }).sort({ weekStartDate: -1 })

    return NextResponse.json({ plans })
  } catch (error) {
    console.error("Failed to fetch weekly plan history:", error)
    return NextResponse.json({ error: "Failed to fetch plan history" }, { status: 500 })
  }
}
