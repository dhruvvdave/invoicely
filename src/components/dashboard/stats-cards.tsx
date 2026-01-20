import { DollarSign, FileText, Repeat, Users } from "lucide-react"
import { KPICard } from "./kpi-card"
import { dashboardStats } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Revenue"
        value={formatCurrency(dashboardStats.totalRevenue)}
        change={dashboardStats.totalRevenueChange}
        icon={DollarSign}
      />
      <KPICard
        title="Outstanding Invoices"
        value={formatCurrency(dashboardStats.outstandingAmount)}
        change={dashboardStats.outstandingChange}
        icon={FileText}
        description={`${dashboardStats.outstandingCount} unpaid invoices`}
      />
      <KPICard
        title="Active Subscriptions"
        value={dashboardStats.activeSubscriptions.toString()}
        change={dashboardStats.subscriptionsChange}
        icon={Repeat}
      />
      <KPICard
        title="Total Customers"
        value={dashboardStats.totalCustomers.toString()}
        change={dashboardStats.customersChange}
        icon={Users}
      />
    </div>
  )
}
