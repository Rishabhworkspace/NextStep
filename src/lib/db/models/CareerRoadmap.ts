import mongoose, { Schema, Document } from "mongoose"

export interface IRoadmapResource {
  title: string
  url: string
  type: "video" | "course" | "article"
  source: string
}

export interface IRoadmapSkill {
  id: string
  name: string
  description: string
  status: "completed" | "in-progress" | "locked"
  resources: IRoadmapResource[]
  estimatedHours: number
}

export interface IRoadmapPhase {
  id: string
  title: string
  description: string
  skills: IRoadmapSkill[]
}

export interface ICareerRoadmap extends Document {
  userId: string
  careerPath: string
  title: string
  estimatedMonths: number
  phases: IRoadmapPhase[]
  generatedAt: Date
}

const RoadmapResourceSchema = new Schema<IRoadmapResource>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["video", "course", "article"], default: "article" },
    source: { type: String, default: "" },
  },
  { _id: false }
)

const RoadmapSkillSchema = new Schema<IRoadmapSkill>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["completed", "in-progress", "locked"],
      default: "locked",
    },
    resources: [RoadmapResourceSchema],
    estimatedHours: { type: Number, default: 10 },
  },
  { _id: false }
)

const RoadmapPhaseSchema = new Schema<IRoadmapPhase>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    skills: [RoadmapSkillSchema],
  },
  { _id: false }
)

const CareerRoadmapSchema = new Schema<ICareerRoadmap>(
  {
    userId: { type: String, required: true, index: true },
    careerPath: { type: String, required: true },
    title: { type: String, required: true },
    estimatedMonths: { type: Number, default: 6 },
    phases: [RoadmapPhaseSchema],
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

// Compound index: one roadmap per user per career path
CareerRoadmapSchema.index({ userId: 1, careerPath: 1 }, { unique: true })

export default mongoose.models.CareerRoadmap ||
  mongoose.model<ICareerRoadmap>("CareerRoadmap", CareerRoadmapSchema)
