import { NextResponse } from "next/server"
import connectDb from "@/lib/db/connect"
import { QuizQuestion } from "@/lib/db/models/QuizQuestion"

export async function GET(req: Request) {
  try {
    await connectDb()

    const { searchParams } = new URL(req.url)
    const path = searchParams.get("path") || "swe"
    const limitParams = parseInt(searchParams.get("limit") || "20", 10)
    const limit = isNaN(limitParams) ? 20 : Math.min(limitParams, 50) // Cap max request amount

    // Run an aggregation pipeline to pull a random sample ($sample) from MongoDB
    const randomQuestions = await QuizQuestion.aggregate([
      { $match: { careerPath: path } },
      { $sample: { size: limit } }
    ])

    // Normalize IDs specifically for the React Frontend map functions
    const formattedQuestions = randomQuestions.map((q) => ({
      id: q._id.toString(),
      concept: q.concept,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    }))

    return NextResponse.json({
      success: true,
      careerPath: path,
      questions: formattedQuestions,
    })
  } catch (error: any) {
    console.error("Quiz Fetch Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch quiz questions." },
      { status: 500 }
    )
  }
}
