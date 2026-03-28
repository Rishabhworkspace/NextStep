import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import dbConnect from "@/lib/db/connect"
import { WeeklyPlan } from "@/lib/db/models/WeeklyPlan"

import CareerRoadmap from "@/lib/db/models/CareerRoadmap"
import { generateWeeklyPlan } from "@/lib/gemini"

function getWeekBoundaries() {
  const now = new Date()
  const day = now.getDay()
  const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diffToMonday))
  monday.setHours(0, 0, 0, 0)

  const sunday = new Date(monday.getTime())
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)

  return { monday, sunday }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { monday, sunday } = getWeekBoundaries()

    // Find a plan for the current week
    const plan = await WeeklyPlan.findOne({
      userId: session.user.id,
      weekStartDate: { $gte: monday, $lte: sunday },
    })

    return NextResponse.json({ plan })
  } catch (error) {
    console.error("Failed to fetch weekly plan:", error)
    return NextResponse.json({ error: "Failed to fetch weekly plan" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { monday, sunday } = getWeekBoundaries()

    // 1. Check if a plan already exists for this week
    const existingPlan = await WeeklyPlan.findOne({
      userId: session.user.id,
      weekStartDate: { $gte: monday, $lte: sunday },
    })

    if (existingPlan) {
      // You can implement regeneration by deleting the old one, but for now we block it if it exists.
      // Wait, we DO want a regenerate button. If existingPlan, delete it.
      await WeeklyPlan.deleteOne({ _id: existingPlan._id })
    }

    // 2. Fetch the user's latest career roadmap
    const roadmap = await CareerRoadmap.findOne({
      userId: session.user.id,
    }).sort({ generatedAt: -1 })

    if (!roadmap) {
      return NextResponse.json({ error: "No roadmap found. Please generate your roadmap first." }, { status: 400 })
    }

    // 3. Extract active (in-progress) skills
    // We'll also grab some locked ones if there are no in-progress ones to start the user off
    const activeSkills: { id: string; name: string, resources: any[] }[] = []
    
    roadmap.phases.forEach((phase: any) => {
      phase.skills.forEach((skill: any) => {
        if (skill.status === "in-progress") {
          activeSkills.push(skill)
        }
      })
    })

    // If no in-progress skills, try to find the first locked skill
    if (activeSkills.length === 0) {
      let foundFirstLocked = false
      roadmap.phases.forEach((phase: any) => {
        phase.skills.forEach((skill: any) => {
          if (!foundFirstLocked && skill.status === "locked") {
            skill.status = "in-progress" // Mark as in-progress automatically
            activeSkills.push(skill)
            foundFirstLocked = true
          }
        })
      })
      // Save the roadmap if we automatically set a skill to in-progress
      if (foundFirstLocked) {
        await roadmap.save()
      }
    }

    if (activeSkills.length === 0) {
      return NextResponse.json({ error: "No skills to learn! You have completed your roadmap." }, { status: 400 })
    }

    // 4. Generate the weekly plan using Gemini
    const hoursPerWeek = 10 // Can be customized per user, hardcoded to 10 for now
    
    // Quick helper to map Groq output to valid JS Date days
    const daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    const generatedPlan = await generateWeeklyPlan({
      activeSkills: activeSkills.map(s => ({ id: s.id, name: s.name })),
      hoursPerWeek,
    })

    if (!generatedPlan) {
      return NextResponse.json({ error: "Failed to generate AI plan" }, { status: 500 })
    }

    // 5. Structure the specific day records mapping to actual dates and injecting resource links
    const days = generatedPlan.days.map((dayPlan) => {
      const dayIndexStr = daysOfWeekArray.indexOf(dayPlan.dayOfWeek)
      
      const specificDate = new Date(monday.getTime())
      // Monday = 1, Tuesday = 2, ... Sunday = 7. Date uses Sunday=0, Monday=1
      // So if monday gets Day 1, we offset by the difference. 
      // Example: monday = Sept 5. specificDate.getDate() + (dayIndexStr - 1)
      const offset = dayIndexStr === 0 ? 6 : dayIndexStr - 1
      specificDate.setDate(monday.getDate() + offset)

      // Inject resources for tasks that relate to a known skill
      const mappedTasks = dayPlan.tasks.map(task => {
        let resourceLink = undefined
        if (task.relatedSkillId) {
          const matchingSkill = activeSkills.find(s => s.id === task.relatedSkillId)
          if (matchingSkill && matchingSkill.resources && matchingSkill.resources.length > 0) {
            resourceLink = matchingSkill.resources[0].url
          }
        }
        return {
          id: task.id,
          title: task.title,
          estimatedMinutes: task.estimatedMinutes,
          completed: false,
          relatedSkillId: task.relatedSkillId,
          resourceLink
        }
      })

      return {
        date: specificDate,
        dayOfWeek: dayPlan.dayOfWeek,
        tasks: mappedTasks,
      }
    })

    // 6. Save new plan to MongoDB
    const newPlan = await WeeklyPlan.create({
      userId: session.user.id,
      weekStartDate: monday,
      weekEndDate: sunday,
      focusSkill: activeSkills[0].name,
      days,
    })

    return NextResponse.json({ plan: newPlan }, { status: 201 })
  } catch (error) {
    console.error("Failed to generate weekly plan:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
