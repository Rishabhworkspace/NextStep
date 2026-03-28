import mongoose, { Schema, Document } from "mongoose"

export interface IBoostStep {
  id: string
  title: string
  description: string
  estimatedMinutes: number
  completed: boolean
  completedAt?: Date
}

export interface IBoostResource {
  title: string
  url: string
  type: "video" | "course" | "article"
  source: string
}

export interface IBoostConcept {
  concept: string
  currentPercentage: number
  targetPercentage: number
  steps: IBoostStep[]
  resources: IBoostResource[]
  isConceptCompleted: boolean
}

export interface ISkillBoostPlan extends Document {
  userId: string
  assessmentId: string
  careerPath: string
  totalWeakConcepts: number
  concepts: IBoostConcept[]
  currentBatch: number
  generatedAt: Date
}

const SkillBoostPlanSchema = new Schema<ISkillBoostPlan>(
  {
    userId: { type: String, required: true, index: true },
    assessmentId: { type: String, required: true },
    careerPath: { type: String, default: "swe" },
    totalWeakConcepts: { type: Number, required: true },
    concepts: [
      {
        concept: { type: String, required: true },
        currentPercentage: { type: Number, required: true },
        targetPercentage: { type: Number, default: 80 },
        steps: [
          {
            id: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, default: "" },
            estimatedMinutes: { type: Number, required: true },
            completed: { type: Boolean, default: false },
            completedAt: { type: Date },
          },
        ],
        resources: [
          {
            title: { type: String, required: true },
            url: { type: String, required: true },
            type: {
              type: String,
              enum: ["video", "course", "article"],
              default: "article",
            },
            source: { type: String, default: "Web" },
          },
        ],
        isConceptCompleted: { type: Boolean, default: false },
      },
    ],
    currentBatch: { type: Number, default: 0 },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

// Compound unique index: one boost plan per assessment per user
SkillBoostPlanSchema.index({ userId: 1, assessmentId: 1 }, { unique: true })

export default mongoose.models.SkillBoostPlan ||
  mongoose.model<ISkillBoostPlan>("SkillBoostPlan", SkillBoostPlanSchema)
