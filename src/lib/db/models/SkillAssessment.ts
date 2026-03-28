import mongoose, { Schema, Document } from "mongoose"

export interface ISkillAssessment extends Document {
  userId: string
  quizDate: Date
  totalScore: number
  totalQuestions: number
  percentage: number
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  conceptScores: {
    concept: string
    correct: number
    total: number
    percentage: number
  }[]
  answers: {
    questionId: string
    concept: string
    selectedIndex: number
    correctIndex: number
    isCorrect: boolean
  }[]
  geminiInsight?: string
}

const SkillAssessmentSchema = new Schema<ISkillAssessment>(
  {
    userId: { type: String, required: true, index: true },
    quizDate: { type: Date, default: Date.now },
    totalScore: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
    },
    conceptScores: [
      {
        concept: { type: String, required: true },
        correct: { type: Number, required: true },
        total: { type: Number, required: true },
        percentage: { type: Number, required: true },
      },
    ],
    answers: [
      {
        questionId: { type: String, required: true },
        concept: { type: String, required: true },
        selectedIndex: { type: Number, required: true },
        correctIndex: { type: Number, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
    geminiInsight: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.SkillAssessment ||
  mongoose.model<ISkillAssessment>("SkillAssessment", SkillAssessmentSchema)
