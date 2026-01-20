export interface DashboardStats {
  totalRevenue: number
  totalRevenueChange: number
  outstandingAmount: number
  outstandingCount: number
  outstandingChange: number
  activeSubscriptions: number
  subscriptionsChange: number
  totalCustomers: number
  customersChange: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  amount: number
  status: "paid" | "pending" | "overdue" | "draft"
  dueDate: string
  createdAt: string
}

export interface RevenueData {
  month: string
  revenue: number
}

export const dashboardStats: DashboardStats = {
  totalRevenue: 124580.50,
  totalRevenueChange: 12.5,
  outstandingAmount: 18450.00,
  outstandingCount: 7,
  outstandingChange: -8.2,
  activeSubscriptions: 24,
  subscriptionsChange: 4.3,
  totalCustomers: 156,
  customersChange: 15.8,
}

export const recentInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-202401-0234",
    customerName: "Acme Corporation",
    amount: 5250.00,
    status: "paid",
    dueDate: "2024-01-15",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    invoiceNumber: "INV-202401-0235",
    customerName: "TechStart Inc",
    amount: 3890.00,
    status: "pending",
    dueDate: "2024-02-10",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    invoiceNumber: "INV-202401-0236",
    customerName: "Global Solutions Ltd",
    amount: 7200.00,
    status: "overdue",
    dueDate: "2024-01-25",
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    invoiceNumber: "INV-202401-0237",
    customerName: "Innovation Labs",
    amount: 2150.00,
    status: "paid",
    dueDate: "2024-02-05",
    createdAt: "2024-01-22",
  },
  {
    id: "5",
    invoiceNumber: "INV-202401-0238",
    customerName: "Digital Ventures",
    amount: 4500.00,
    status: "pending",
    dueDate: "2024-02-15",
    createdAt: "2024-01-28",
  },
]

export const revenueChartData: RevenueData[] = [
  { month: "Jan", revenue: 8500 },
  { month: "Feb", revenue: 9200 },
  { month: "Mar", revenue: 10100 },
  { month: "Apr", revenue: 9800 },
  { month: "May", revenue: 11200 },
  { month: "Jun", revenue: 10500 },
  { month: "Jul", revenue: 12100 },
  { month: "Aug", revenue: 11800 },
  { month: "Sep", revenue: 13200 },
  { month: "Oct", revenue: 12500 },
  { month: "Nov", revenue: 14200 },
  { month: "Dec", revenue: 13800 },
]
