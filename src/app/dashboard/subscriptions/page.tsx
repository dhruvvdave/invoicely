"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SubscriptionTable } from "@/components/subscriptions/subscription-table"
import {
  mockSubscriptions,
  filterSubscriptions,
  SubscriptionStatus,
} from "@/lib/subscription-data"
import { Plus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function SubscriptionsPage() {
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "all">("all")

  const filteredSubscriptions = filterSubscriptions(mockSubscriptions, statusFilter)

  const stats = {
    total: mockSubscriptions.length,
    active: mockSubscriptions.filter((s) => s.status === "active").length,
    paused: mockSubscriptions.filter((s) => s.status === "paused").length,
    cancelled: mockSubscriptions.filter((s) => s.status === "cancelled").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage recurring subscriptions and billing cycles
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/subscriptions/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Subscription
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-sm text-muted-foreground">Total Subscriptions</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <p className="text-sm text-muted-foreground">Active</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-yellow-600">{stats.paused}</div>
          <p className="text-sm text-muted-foreground">Paused</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-gray-600">{stats.cancelled}</div>
          <p className="text-sm text-muted-foreground">Cancelled</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="status-filter">Status:</Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as SubscriptionStatus | "all")}
          >
            <SelectTrigger id="status-filter" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SubscriptionTable subscriptions={filteredSubscriptions} />
    </div>
  )
}
