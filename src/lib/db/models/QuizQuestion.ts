import mongoose from "mongoose"

const QuizQuestionSchema = new mongoose.Schema({
  careerPath: {
    type: String,
    required: true,
    index: true,
  },
  concept: {
    type: String,
    default: "Core Fundamentals",
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [
      (val: string[]) => val.length === 4,
      "{PATH} must have exactly 4 options",
    ],
  },
  correctIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
}, { timestamps: true })

export const QuizQuestion = mongoose.models.QuizQuestion || mongoose.model("QuizQuestion", QuizQuestionSchema)
