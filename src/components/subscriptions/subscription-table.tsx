"use client"

import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { SubscriptionStatusBadge } from "./subscription-status-badge"
import { Subscription } from "@/lib/subscription-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { MoreHorizontal, Eye, Pause, Play, XCircle } from "lucide-react"

interface SubscriptionTableProps {
  subscriptions: Subscription[]
}

export function SubscriptionTable({ subscriptions }: SubscriptionTableProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <div className="mx-auto max-w-sm space-y-4">
          <div className="text-5xl">🔄</div>
          <h3 className="text-lg font-semibold">No subscriptions found</h3>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first subscription or adjust your filters.
          </p>
          <Button asChild>
            <Link href="/dashboard/subscriptions/new">Create Subscription</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Plan Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Next Billing</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell>
                <Link
                  href={`/dashboard/customers/${subscription.customerId}`}
                  className="font-medium hover:underline"
                >
                  {subscription.customerName}
                </Link>
              </TableCell>
              <TableCell>{subscription.planName}</TableCell>
              <TableCell>{formatCurrency(subscription.amount)}</TableCell>
              <TableCell className="capitalize">{subscription.frequency}</TableCell>
              <TableCell>
                <SubscriptionStatusBadge status={subscription.status} />
              </TableCell>
              <TableCell>{formatDate(subscription.nextBillingDate)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/subscriptions/${subscription.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {subscription.status === "active" && (
                      <DropdownMenuItem>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause Subscription
                      </DropdownMenuItem>
                    )}
                    {subscription.status === "paused" && (
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        Resume Subscription
                      </DropdownMenuItem>
                    )}
                    {subscription.status !== "cancelled" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Subscription
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
