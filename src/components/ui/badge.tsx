import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground border-border",
        /** Invoice status: Payment received - Green background */
        paid: "border-transparent bg-success text-success-foreground",
        /** Invoice status: Awaiting payment - Amber/Yellow background */
        pending: "border-transparent bg-warning text-warning-foreground",
        /** Invoice status: Payment overdue - Red background */
        overdue: "border-transparent bg-error text-error-foreground",
        /** Invoice status: Not yet sent - Gray background */
        draft: "border-transparent bg-muted text-muted-foreground",
        /** Invoice status: Cancelled invoice - Muted gray background */
        cancelled: "border-transparent bg-muted/60 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
