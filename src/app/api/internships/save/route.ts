import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import connectDb from "@/lib/db/connect"
import mongoose from "mongoose"

const SavedInternshipSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  internshipId: { type: String, required: true },
  type: { type: String, enum: ["year_round", "live"], required: true },
  savedAt: { type: Date, default: Date.now },
})
SavedInternshipSchema.index({ userId: 1, internshipId: 1 }, { unique: true })

const SavedInternship = mongoose.models.SavedInternship || mongoose.model("SavedInternship", SavedInternshipSchema)

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDb()
    const { internshipId, type } = await req.json()
    if (!internshipId || !type) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

    await SavedInternship.findOneAndUpdate(
      { userId: session.user.id, internshipId },
      { userId: session.user.id, internshipId, type },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true, saved: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
    try {
      const session = await auth.api.getSession({ headers: req.headers })
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  
      await connectDb()
      const { internshipId } = await req.json()
  
      await SavedInternship.findOneAndDelete({ userId: session.user.id, internshipId })
  
      return NextResponse.json({ success: true, saved: false })
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }
