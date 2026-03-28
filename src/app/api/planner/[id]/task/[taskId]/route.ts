import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import { WeeklyPlan } from "@/lib/db/models/WeeklyPlan"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, taskId } = await params
    const body = await request.json()

    if (typeof body.completed !== "boolean") {
      return NextResponse.json({ error: "completed field must be a boolean" }, { status: 400 })
    }

    await dbConnect()

    const plan = await WeeklyPlan.findOne({ _id: id, userId: session.user.id })
    if (!plan) {
      return NextResponse.json({ error: "Weekly plan not found" }, { status: 404 })
    }

    let taskFound = false

    // Locate the task across all days and update it
    plan.days.forEach((day: any) => {
      day.tasks.forEach((task: any) => {
        if (task.id === taskId || task._id?.toString() === taskId) {
          task.completed = body.completed
          taskFound = true
        }
      })
    })

    if (!taskFound) {
      return NextResponse.json({ error: "Task not found in this plan" }, { status: 404 })
    }

    await plan.save()

    return NextResponse.json({ plan })
  } catch (error) {
    console.error("Failed to update task:", error)
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}
