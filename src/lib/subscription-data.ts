export type SubscriptionStatus = "active" | "paused" | "cancelled"
export type SubscriptionFrequency = "monthly" | "yearly"

export interface Subscription {
  id: string
  customerId: string
  customerName: string
  planName: string
  amount: number
  frequency: SubscriptionFrequency
  status: SubscriptionStatus
  startDate: string
  billingDay: number
  nextBillingDate: string
  notes?: string
  createdAt: string
  pausedAt?: string
  cancelledAt?: string
}

export const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    customerId: "1",
    customerName: "John Smith",
    planName: "Enterprise Support",
    amount: 2500,
    frequency: "monthly",
    status: "active",
    startDate: "2024-01-01",
    billingDay: 1,
    nextBillingDate: "2024-03-01",
    notes: "Premium support package with 24/7 coverage",
    createdAt: "2023-12-15",
  },
  {
    id: "2",
    customerId: "2",
    customerName: "Sarah Johnson",
    planName: "Cloud Hosting Pro",
    amount: 899,
    frequency: "monthly",
    status: "active",
    startDate: "2024-01-15",
    billingDay: 15,
    nextBillingDate: "2024-03-15",
    notes: "500GB storage, unlimited bandwidth",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    customerId: "5",
    customerName: "David Wilson",
    planName: "Consulting Retainer",
    amount: 15000,
    frequency: "monthly",
    status: "active",
    startDate: "2023-06-01",
    billingDay: 1,
    nextBillingDate: "2024-03-01",
    notes: "40 hours per month, rollover allowed",
    createdAt: "2023-05-20",
  },
  {
    id: "4",
    customerId: "3",
    customerName: "Michael Brown",
    planName: "Business Analytics",
    amount: 5990,
    frequency: "yearly",
    status: "active",
    startDate: "2023-10-01",
    billingDay: 1,
    nextBillingDate: "2024-10-01",
    notes: "Annual subscription with 2 months free",
    createdAt: "2023-09-15",
  },
  {
    id: "5",
    customerId: "4",
    customerName: "Emily Davis",
    planName: "Design Tools Suite",
    amount: 449,
    frequency: "monthly",
    status: "paused",
    startDate: "2023-08-10",
    billingDay: 10,
    nextBillingDate: "2024-04-10",
    notes: "Paused for Q1 2024 - resume in April",
    createdAt: "2023-08-01",
    pausedAt: "2024-01-05",
  },
  {
    id: "6",
    customerId: "7",
    customerName: "Robert Taylor",
    planName: "Security & Compliance",
    amount: 12000,
    frequency: "yearly",
    status: "active",
    startDate: "2023-07-01",
    billingDay: 1,
    nextBillingDate: "2024-07-01",
    notes: "Includes SOC2 audit support and penetration testing",
    createdAt: "2023-06-10",
  },
  {
    id: "7",
    customerId: "8",
    customerName: "Amanda Lee",
    planName: "HIPAA Compliant Storage",
    amount: 1299,
    frequency: "monthly",
    status: "active",
    startDate: "2023-12-01",
    billingDay: 1,
    nextBillingDate: "2024-03-01",
    notes: "Healthcare-grade encryption and backup",
    createdAt: "2023-11-15",
  },
  {
    id: "8",
    customerId: "6",
    customerName: "Jessica Martinez",
    planName: "E-commerce Platform",
    amount: 799,
    frequency: "monthly",
    status: "cancelled",
    startDate: "2023-05-15",
    billingDay: 15,
    nextBillingDate: "2024-01-15",
    notes: "Cancelled - migrated to different platform",
    createdAt: "2023-05-01",
    cancelledAt: "2024-01-10",
  },
  {
    id: "9",
    customerId: "10",
    customerName: "Michelle Anderson",
    planName: "Learning Management System",
    amount: 6990,
    frequency: "yearly",
    status: "active",
    startDate: "2023-09-01",
    billingDay: 1,
    nextBillingDate: "2024-09-01",
    notes: "Educational institution - 500 user licenses",
    createdAt: "2023-08-15",
  },
  {
    id: "10",
    customerId: "11",
    customerName: "Daniel Thompson",
    planName: "Property Management Software",
    amount: 599,
    frequency: "monthly",
    status: "active",
    startDate: "2024-01-20",
    billingDay: 20,
    nextBillingDate: "2024-03-20",
    notes: "Manages 25 properties",
    createdAt: "2024-01-15",
  },
  {
    id: "11",
    customerId: "12",
    customerName: "Lisa White",
    planName: "Marketing Automation",
    amount: 3590,
    frequency: "yearly",
    status: "paused",
    startDate: "2023-11-01",
    billingDay: 1,
    nextBillingDate: "2024-05-01",
    notes: "Temporarily paused - budget review",
    createdAt: "2023-10-20",
    pausedAt: "2024-02-01",
  },
]

export function getSubscriptionById(id: string): Subscription | undefined {
  return mockSubscriptions.find((sub) => sub.id === id)
}

export function getSubscriptionsByCustomerId(customerId: string): Subscription[] {
  return mockSubscriptions.filter((sub) => sub.customerId === customerId)
}

export function filterSubscriptions(
  subscriptions: Subscription[],
  status?: SubscriptionStatus | "all"
): Subscription[] {
  if (!status || status === "all") {
    return subscriptions
  }
  return subscriptions.filter((sub) => sub.status === status)
}

export function calculateNextBillingDate(
  startDate: string,
  billingDay: number,
  frequency: SubscriptionFrequency
): string {
  const start = new Date(startDate)
  const today = new Date()
  
  let nextDate = new Date(today.getFullYear(), today.getMonth(), billingDay)
  
  // If billing day has passed this month, move to next month
  if (nextDate < today) {
    if (frequency === "monthly") {
      nextDate.setMonth(nextDate.getMonth() + 1)
    } else {
      // For yearly, find the next occurrence
      nextDate = new Date(start)
      nextDate.setFullYear(today.getFullYear())
      if (nextDate < today) {
        nextDate.setFullYear(nextDate.getFullYear() + 1)
      }
    }
  }
  
  return nextDate.toISOString().split("T")[0]
}
