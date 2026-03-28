import { NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db/connect"
import { Internship } from "@/lib/db/models/Internship"
import { LiveInternship } from "@/lib/db/models/LiveInternship"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") || "year_round"
    const domain = searchParams.get("domain")
    const workMode = searchParams.get("mode")
    const search = searchParams.get("search")
    const year = searchParams.get("year")
    const minStipend = searchParams.get("minStipend")
    const difficulty = searchParams.get("difficulty")
    const availability = searchParams.get("availability")
    
    // Pagination
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "15")
    const skip = (page - 1) * limit

    const query: any = {}

    if (domain) query.domain = domain

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ]
    }

    if (type === "year_round") {
      // Year-round specific filters
      if (year && year !== "All") query.yearEligibility = { $in: [year] }
      if (difficulty && difficulty !== "All") query.difficulty = difficulty
      if (availability && availability !== "All") {
        if (availability === "year_round") query.availability = "year_round"
        else query.season = availability // Summer, Winter
      }
      if (workMode && workMode !== "All") {
         if (workMode === "Remote") query.location = { $regex: /remote/i }
      }
      if (minStipend && minStipend !== "0") {
         query.stipendMin = { $gte: parseInt(minStipend) }
      }

      const total = await Internship.countDocuments(query)
      const internships = await Internship.find(query)
        .sort({ stipendMin: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()

      return NextResponse.json({ internships, total, page, totalPages: Math.ceil(total / limit) })

    } else {
      // Live specific filters
      if (workMode && workMode !== "All") query.workMode = workMode
      if (minStipend && minStipend !== "0") query.stipendMin = { $gte: parseInt(minStipend) }

      const total = await LiveInternship.countDocuments(query)
      const internships = await LiveInternship.find(query)
        .sort({ fetchedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()

      // Find the most recent fetch time
      const latest = await LiveInternship.findOne().sort({ fetchedAt: -1 }).select("fetchedAt").lean() as any
      
      return NextResponse.json({ 
        internships, 
        total, 
        page, 
        totalPages: Math.ceil(total / limit),
        lastFetchedAt: latest?.fetchedAt || null
      })
    }

  } catch (error: any) {
    console.error("GET Internships Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
