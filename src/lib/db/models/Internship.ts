import mongoose from "mongoose"

export interface IInternship {
  _id: string
  company: string
  role: string
  domain: string
  location: string
  availability: "year_round" | "seasonal"
  season?: "Summer" | "Winter" | "Multiple" | null
  applicationWindow?: string | null
  degreeType: string[] // e.g., ["B.Tech", "M.Tech", "BSc"]
  yearEligibility: string[] // e.g., ["3rd year", "4th year", "PG"]
  skillsRequired: string[]
  selectionProcess: string[]
  stipendMin: number | null
  stipendMax: number | null
  stipendNote: string | null
  difficulty: "Low" | "Medium" | "Medium-High" | "High" | "Very High"
  applyUrl: string
  createdAt: Date
}

const InternshipSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    domain: { type: String, required: true, index: true },
    location: { type: String, required: true },
    availability: {
      type: String,
      enum: ["year_round", "seasonal"],
      required: true,
      index: true,
    },
    season: { type: String, default: null }, // Summer, Winter, etc.
    applicationWindow: { type: String, default: null },
    degreeType: [{ type: String }],
    yearEligibility: [{ type: String, index: true }], // Useful for filtering
    skillsRequired: [{ type: String }],
    selectionProcess: [{ type: String }],
    stipendMin: { type: Number, default: null, index: true },
    stipendMax: { type: Number, default: null },
    stipendNote: { type: String, default: null },
    difficulty: {
      type: String,
      enum: ["Low", "Medium", "Medium-High", "High", "Very High"],
      default: "Medium",
    },
    applyUrl: { type: String, required: true },
  },
  { timestamps: true }
)

export const Internship =
  mongoose.models.Internship ||
  mongoose.model<IInternship>("Internship", InternshipSchema)
