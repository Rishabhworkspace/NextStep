import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "outline" | "info"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-surface-alt text-text",
    success: "border-transparent bg-success-bg text-success",
    warning: "border-transparent bg-warning-bg text-warning",
    danger:  "border-transparent bg-danger-bg text-danger",
    info:    "border-transparent bg-info-bg text-info",
    outline: "text-text border-border"
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
