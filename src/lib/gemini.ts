import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function getSkillGapInsight(
  conceptScores: { concept: string; correct: number; total: number; percentage: number }[],
  totalPercentage: number
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const weakAreas = conceptScores
      .filter(c => c.percentage < 60)
      .map(c => `${c.concept} (${c.percentage}%)`)
      .join(", ")

    const strongAreas = conceptScores
      .filter(c => c.percentage >= 60)
      .map(c => `${c.concept} (${c.percentage}%)`)
      .join(", ")

    const prompt = `You are an AI tutor for a student learning tech skills. Based on their quiz results:

Overall Score: ${totalPercentage}%
Strong Areas: ${strongAreas || "None"}
Weak Areas: ${weakAreas || "None"}

Provide a 3-4 sentence personalized insight:
1. Acknowledge their strengths briefly.
2. Identify the most critical weak area to focus on.
3. Suggest one specific actionable step to improve.
Keep it encouraging, concise, and practical. Do not use markdown formatting.`

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Gemini API error:", error)
    return "Keep practicing! Focus on your weak areas and retake the assessment to track your improvement."
  }
}
