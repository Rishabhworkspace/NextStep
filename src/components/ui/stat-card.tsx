import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
}

export function StatCard({ title, value, description, icon, trend, className, ...props }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-background/50 backdrop-blur-md border-white/10 dark:border-white/5", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-syne tracking-tight">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
            {trend && (
              <span className={cn(
                "font-medium",
                trend.isPositive ? "text-emerald-500" : "text-destructive"
              )}>
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
            )}
            <span className="opacity-80">{trend?.label || description}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
