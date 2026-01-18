import { Badge } from "@/components/ui/badge"
import { SubscriptionStatus } from "@/lib/subscription-data"

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus
}

export function SubscriptionStatusBadge({ status }: SubscriptionStatusBadgeProps) {
  const statusConfig: Record<SubscriptionStatus, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-success text-success-foreground" },
    paused: { label: "Paused", className: "bg-warning text-warning-foreground" },
    cancelled: { label: "Cancelled", className: "bg-muted text-muted-foreground" },
  }

  const config = statusConfig[status]

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  )
}
