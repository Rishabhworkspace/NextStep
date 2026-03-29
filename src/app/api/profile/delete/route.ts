import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import Profile from "@/lib/db/models/Profile"
import SkillAssessment from "@/lib/db/models/SkillAssessment"
import CareerRoadmap from "@/lib/db/models/CareerRoadmap"
import { WeeklyPlan } from "@/lib/db/models/WeeklyPlan"
import SkillBoostPlan from "@/lib/db/models/SkillBoostPlan"
import mongoose from "mongoose"

export async function DELETE() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    await dbConnect()

    // Delete all user data from every collection
    await Promise.all([
      Profile.deleteMany({ userId }),
      SkillAssessment.deleteMany({ userId }),
      CareerRoadmap.deleteMany({ userId }),
      WeeklyPlan.deleteMany({ userId }),
      SkillBoostPlan.deleteMany({ userId }),
    ])

    // Delete the user account from Better Auth collections
    const db = mongoose.connection.db
    if (db) {
      await Promise.all([
        db.collection("user").deleteOne({ _id: new mongoose.Types.ObjectId(userId) }),
        db.collection("session").deleteMany({ userId }),
        db.collection("account").deleteMany({ userId }),
      ])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete account error:", error)
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 })
  }
}
