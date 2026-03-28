"use client"

interface ProgressTrackerProps {
  totalConcepts: number
  completedConcepts: number
  totalSteps: number
  completedSteps: number
  totalMinutesRemaining: number
}

export function ProgressTracker({
  totalConcepts,
  completedConcepts,
  totalSteps,
  completedSteps,
  totalMinutesRemaining,
}: ProgressTrackerProps) {
  const stepsPercent =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0
  const conceptPercent =
    totalConcepts > 0
      ? Math.round((completedConcepts / totalConcepts) * 100)
      : 0

  const hoursRemaining = Math.round((totalMinutesRemaining / 60) * 10) / 10 // 1 decimal

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Concepts Completed */}
      <div className="bg-surface border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="relative w-14 h-14 shrink-0">
          <svg
            className="w-full h-full -rotate-90 text-surface-alt"
            viewBox="0 0 60 60"
          >
            <circle
              cx="30"
              cy="30"
              r="24"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
            />
          </svg>
          <svg
            className="w-full h-full -rotate-90 absolute top-0 left-0 text-accent transition-all duration-1000 ease-out"
            viewBox="0 0 60 60"
          >
            <circle
              cx="30"
              cy="30"
              r="24"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={
                2 * Math.PI * 24 * (1 - conceptPercent / 100)
              }
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
            {completedConcepts}/{totalConcepts}
          </div>
        </div>
        <div>
          <div className="text-sm font-bold text-foreground">
            Concepts Mastered
          </div>
          <div className="text-xs text-muted mt-0.5">
            {totalConcepts - completedConcepts} remaining
          </div>
        </div>
      </div>

      {/* Steps Done */}
      <div className="bg-surface border border-border rounded-2xl p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-bold text-foreground">Steps Done</div>
          <div className="text-xs font-bold text-accent">{stepsPercent}%</div>
        </div>
        <div className="w-full h-2.5 bg-surface-alt rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${stepsPercent}%` }}
          />
        </div>
        <div className="text-xs text-muted mt-2">
          {completedSteps} of {totalSteps} steps completed
        </div>
      </div>

      {/* Time Remaining */}
      <div className="bg-surface border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 shrink-0 bg-warning/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">⏱️</span>
        </div>
        <div>
          <div className="text-sm font-bold text-foreground">
            ~{hoursRemaining}hrs left
          </div>
          <div className="text-xs text-muted mt-0.5">
            Estimated remaining study time
          </div>
        </div>
      </div>
    </div>
  )
}
