import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentInvoicesTable } from "@/components/dashboard/recent-invoices-table"

export default async function DashboardPage() {
  const user = await requireAuth()

  const greeting = user.name || user.email?.split("@")[0] || "there"

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {greeting}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <StatsCards />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Recent Invoices */}
      <RecentInvoicesTable />
    </div>
  )
}
