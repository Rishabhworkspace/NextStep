import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline"
  size?: "sm" | "md" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"
    
    const variants = {
      primary: "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-accent",
      secondary: "bg-surface-alt text-text hover:bg-border",
      ghost: "hover:bg-accent-light hover:text-accent text-text-body",
      danger: "bg-danger text-white hover:bg-red-600 shadow-sm",
      outline: "border border-border bg-surface hover:bg-surface-alt text-text"
    }
    
    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 text-base rounded-xl",
      icon: "h-10 w-10"
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
