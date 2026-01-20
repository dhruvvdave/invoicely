import { Badge } from "@/components/ui/badge"
import { InvoiceStatus } from "@/lib/invoice-data"

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const statusLabels: Record<InvoiceStatus, string> = {
    paid: "Paid",
    pending: "Pending",
    overdue: "Overdue",
    draft: "Draft",
    cancelled: "Cancelled",
  }

  return (
    <Badge variant={status}>
      {statusLabels[status]}
    </Badge>
  )
}
