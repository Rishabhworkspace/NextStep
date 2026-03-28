import { NextResponse } from "next/server"
import { getQuizQuestions, CareerPath } from "@/constants/questionBank"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const path = searchParams.get("path") || "swe"
    const limitParams = parseInt(searchParams.get("limit") || "10", 10)
    const limit = isNaN(limitParams) ? 10 : Math.min(limitParams, 50)

    // Fetch questions from local topic-based question bank
    const questions = getQuizQuestions(path as CareerPath, limit)

    return NextResponse.json({
      success: true,
      careerPath: path,
      questions: questions,
    })
  } catch (error: any) {
    console.error("Quiz Fetch Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch quiz questions." },
      { status: 500 }
    )
  }
}
