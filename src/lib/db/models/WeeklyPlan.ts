import mongoose, { Schema, Document } from "mongoose"

export interface IWeeklyTask {
  id: string
  title: string
  estimatedMinutes: number
  completed: boolean
  relatedSkillId?: string
  resourceLink?: string
}

export interface IDailyPlan {
  date: Date
  dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  tasks: IWeeklyTask[]
}

export interface IWeeklyPlan extends Document {
  userId: string
  weekStartDate: Date // Monday of the week
  weekEndDate: Date   // Sunday of the week
  focusSkill: string
  days: IDailyPlan[]
  createdAt: Date
}

const WeeklyTaskSchema = new Schema<IWeeklyTask>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  estimatedMinutes: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  relatedSkillId: { type: String },
  resourceLink: { type: String },
})

const DailyPlanSchema = new Schema<IDailyPlan>({
  date: { type: Date, required: true },
  dayOfWeek: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  tasks: [WeeklyTaskSchema],
})

const WeeklyPlanSchema = new Schema<IWeeklyPlan>({
  userId: { type: String, required: true, index: true },
  weekStartDate: { type: Date, required: true },
  weekEndDate: { type: Date, required: true },
  focusSkill: { type: String, required: true },
  days: [DailyPlanSchema],
  createdAt: { type: Date, default: Date.now },
})

// Create a compound index so we can easily query a user's plan for a specific week
WeeklyPlanSchema.index({ userId: 1, weekStartDate: 1 }, { unique: true })

export const WeeklyPlan = mongoose.models.WeeklyPlan || mongoose.model<IWeeklyPlan>("WeeklyPlan", WeeklyPlanSchema)
