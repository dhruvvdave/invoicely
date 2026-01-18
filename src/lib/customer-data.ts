import type { Invoice } from "./invoice-data"

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  billingAddress?: string
  shippingAddress?: string
  notes?: string
  createdAt: string
}

export interface CustomerWithStats extends Customer {
  totalInvoices: number
  totalSpent: number
  outstandingBalance: number
}

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@acmecorp.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    billingAddress: "123 Business Ave\nNew York, NY 10001\nUSA",
    shippingAddress: "123 Business Ave\nNew York, NY 10001\nUSA",
    notes: "Preferred customer - Net 30 terms",
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@techstartup.io",
    phone: "+1 (555) 234-5678",
    company: "Tech Startup Inc",
    billingAddress: "456 Innovation Drive\nSan Francisco, CA 94102\nUSA",
    shippingAddress: "456 Innovation Drive\nSan Francisco, CA 94102\nUSA",
    notes: "Fast growing startup - payment by wire transfer",
    createdAt: "2023-08-22",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@globalenterprises.com",
    phone: "+1 (555) 345-6789",
    company: "Global Enterprises LLC",
    billingAddress: "789 Commerce Street\nChicago, IL 60601\nUSA",
    shippingAddress: "789 Commerce Street\nChicago, IL 60601\nUSA",
    notes: "Large enterprise client - requires PO numbers",
    createdAt: "2023-03-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@creativeagency.com",
    phone: "+1 (555) 456-7890",
    company: "Creative Agency Co",
    billingAddress: "321 Design Blvd\nAustin, TX 78701\nUSA",
    shippingAddress: "321 Design Blvd\nAustin, TX 78701\nUSA",
    notes: "Agency client - prefers itemized invoices",
    createdAt: "2023-09-05",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@consulting.biz",
    phone: "+1 (555) 567-8901",
    company: "Wilson Consulting",
    billingAddress: "654 Professional Way\nBoston, MA 02101\nUSA",
    shippingAddress: "654 Professional Way\nBoston, MA 02101\nUSA",
    notes: "Consulting retainer - monthly billing",
    createdAt: "2023-01-20",
  },
  {
    id: "6",
    name: "Jessica Martinez",
    email: "jessica@retailplus.com",
    phone: "+1 (555) 678-9012",
    company: "Retail Plus Inc",
    billingAddress: "987 Commerce Pkwy\nSeattle, WA 98101\nUSA",
    shippingAddress: "1001 Warehouse Rd\nSeattle, WA 98102\nUSA",
    notes: "Separate shipping address for deliveries",
    createdAt: "2023-04-18",
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert@fintech.com",
    phone: "+1 (555) 789-0123",
    company: "FinTech Solutions",
    billingAddress: "246 Wall Street\nNew York, NY 10005\nUSA",
    shippingAddress: "246 Wall Street\nNew York, NY 10005\nUSA",
    notes: "Financial services client - strict compliance requirements",
    createdAt: "2023-07-12",
  },
  {
    id: "8",
    name: "Amanda Lee",
    email: "amanda@healthcareplus.com",
    phone: "+1 (555) 890-1234",
    company: "HealthCare Plus",
    billingAddress: "135 Medical Center Dr\nLos Angeles, CA 90001\nUSA",
    shippingAddress: "135 Medical Center Dr\nLos Angeles, CA 90001\nUSA",
    notes: "Healthcare provider - HIPAA compliant invoicing required",
    createdAt: "2023-02-28",
  },
  {
    id: "9",
    name: "Christopher Garcia",
    email: "chris@manufacturing.com",
    phone: "+1 (555) 901-2345",
    company: "Manufacturing Corp",
    billingAddress: "579 Industrial Blvd\nDetroit, MI 48201\nUSA",
    shippingAddress: "579 Industrial Blvd\nDetroit, MI 48201\nUSA",
    notes: "Manufacturing client - quarterly payment schedule",
    createdAt: "2023-05-08",
  },
  {
    id: "10",
    name: "Michelle Anderson",
    email: "michelle@edutech.com",
    phone: "+1 (555) 012-3456",
    company: "EduTech Learning",
    billingAddress: "802 University Ave\nPhiladelphia, PA 19104\nUSA",
    shippingAddress: "802 University Ave\nPhiladelphia, PA 19104\nUSA",
    notes: "Education sector - government funding",
    createdAt: "2023-10-15",
  },
  {
    id: "11",
    name: "Daniel Thompson",
    email: "daniel@realestategroup.com",
    phone: "+1 (555) 123-7890",
    company: "Real Estate Group",
    billingAddress: "468 Property Lane\nMiami, FL 33101\nUSA",
    shippingAddress: "468 Property Lane\nMiami, FL 33101\nUSA",
    notes: "Real estate client - multiple property locations",
    createdAt: "2023-11-20",
  },
  {
    id: "12",
    name: "Lisa White",
    email: "lisa@marketingpro.com",
    phone: "+1 (555) 234-8901",
    company: "Marketing Pro Agency",
    billingAddress: "753 Brand Street\nDenver, CO 80201\nUSA",
    shippingAddress: "753 Brand Street\nDenver, CO 80201\nUSA",
    notes: "Marketing agency - project-based billing",
    createdAt: "2023-06-30",
  },
]

// Calculate stats from invoice data
export function getCustomerWithStats(customerId: string, invoices?: Invoice[]): CustomerWithStats | undefined {
  const customer = mockCustomers.find((c) => c.id === customerId)
  if (!customer) return undefined

  if (!invoices) {
    // If invoices not provided, return with zero stats
    return {
      ...customer,
      totalInvoices: 0,
      totalSpent: 0,
      outstandingBalance: 0,
    }
  }

  const customerInvoices = invoices.filter((inv) => inv.customerId === customerId)

  const totalInvoices = customerInvoices.length
  const totalSpent = customerInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0)
  const outstandingBalance = customerInvoices
    .filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0)

  return {
    ...customer,
    totalInvoices,
    totalSpent,
    outstandingBalance,
  }
}

export function getAllCustomersWithStats(invoices?: Invoice[]): CustomerWithStats[] {
  return mockCustomers.map((customer) => {
    const stats = getCustomerWithStats(customer.id, invoices)
    return stats || {
      ...customer,
      totalInvoices: 0,
      totalSpent: 0,
      outstandingBalance: 0,
    }
  })
}

export function getCustomerById(id: string): Customer | undefined {
  return mockCustomers.find((customer) => customer.id === id)
}

export function searchCustomers(query: string): Customer[] {
  const lowercaseQuery = query.toLowerCase()
  return mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(lowercaseQuery) ||
      customer.email.toLowerCase().includes(lowercaseQuery) ||
      customer.company?.toLowerCase().includes(lowercaseQuery)
  )
}
