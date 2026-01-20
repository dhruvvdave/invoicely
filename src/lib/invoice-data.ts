export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft" | "cancelled"

export interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface Customer {
  id: string
  name: string
  email: string
  company?: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerId: string
  customer: Customer
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  lineItems: LineItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  discountAmount: number
  total: number
  notes?: string
  paymentInstructions?: string
  poNumber?: string
}

export interface InvoiceFilter {
  status?: InvoiceStatus | "all"
  searchQuery?: string
  dateFrom?: string
  dateTo?: string
}

export interface InvoiceFormData {
  customerId: string
  issueDate: string
  dueDate: string
  poNumber?: string
  lineItems: LineItem[]
  taxRate: number
  discountAmount: number
  notes?: string
  paymentInstructions?: string
}

// Mock customers
export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@acmecorp.com",
    company: "Acme Corporation",
    address: "123 Business Ave",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@techstartup.io",
    company: "Tech Startup Inc",
    address: "456 Innovation Drive",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "USA",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@globalenterprises.com",
    company: "Global Enterprises LLC",
    address: "789 Commerce Street",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    country: "USA",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@creativeagency.com",
    company: "Creative Agency Co",
    address: "321 Design Blvd",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "USA",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@consulting.biz",
    company: "Wilson Consulting",
    address: "654 Professional Way",
    city: "Boston",
    state: "MA",
    zip: "02101",
    country: "USA",
  },
]

// Mock invoices
export const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-202401-0001",
    customerId: "1",
    customer: mockCustomers[0],
    issueDate: "2024-01-15",
    dueDate: "2024-02-14",
    status: "paid",
    lineItems: [
      {
        id: "1",
        description: "Web Development Services",
        quantity: 40,
        rate: 150,
        amount: 6000,
      },
      {
        id: "2",
        description: "UI/UX Design",
        quantity: 20,
        rate: 120,
        amount: 2400,
      },
    ],
    subtotal: 8400,
    taxRate: 0.08,
    taxAmount: 672,
    discountAmount: 0,
    total: 9072,
    notes: "Thank you for your business!",
    paymentInstructions: "Payment due within 30 days. Wire transfer to account #12345.",
    poNumber: "PO-2024-001",
  },
  {
    id: "2",
    invoiceNumber: "INV-202401-0002",
    customerId: "2",
    customer: mockCustomers[1],
    issueDate: "2024-01-20",
    dueDate: "2024-02-19",
    status: "pending",
    lineItems: [
      {
        id: "1",
        description: "Mobile App Development",
        quantity: 80,
        rate: 160,
        amount: 12800,
      },
    ],
    subtotal: 12800,
    taxRate: 0.08,
    taxAmount: 1024,
    discountAmount: 500,
    total: 13324,
    notes: "50% deposit paid upfront",
    paymentInstructions: "Bank transfer or credit card accepted.",
  },
  {
    id: "3",
    invoiceNumber: "INV-202401-0003",
    customerId: "3",
    customer: mockCustomers[2],
    issueDate: "2023-12-15",
    dueDate: "2024-01-14",
    status: "overdue",
    lineItems: [
      {
        id: "1",
        description: "Consulting Services",
        quantity: 30,
        rate: 200,
        amount: 6000,
      },
      {
        id: "2",
        description: "Project Management",
        quantity: 15,
        rate: 180,
        amount: 2700,
      },
    ],
    subtotal: 8700,
    taxRate: 0.08,
    taxAmount: 696,
    discountAmount: 0,
    total: 9396,
    notes: "Payment overdue. Please remit immediately.",
    paymentInstructions: "Wire transfer preferred.",
    poNumber: "PO-2023-150",
  },
  {
    id: "4",
    invoiceNumber: "INV-202401-0004",
    customerId: "4",
    customer: mockCustomers[3],
    issueDate: "2024-01-25",
    dueDate: "2024-02-24",
    status: "draft",
    lineItems: [
      {
        id: "1",
        description: "Brand Identity Design",
        quantity: 1,
        rate: 5000,
        amount: 5000,
      },
      {
        id: "2",
        description: "Marketing Materials",
        quantity: 10,
        rate: 250,
        amount: 2500,
      },
    ],
    subtotal: 7500,
    taxRate: 0.08,
    taxAmount: 600,
    discountAmount: 200,
    total: 7900,
    notes: "Draft - awaiting client approval",
  },
  {
    id: "5",
    invoiceNumber: "INV-202401-0005",
    customerId: "5",
    customer: mockCustomers[4],
    issueDate: "2024-01-10",
    dueDate: "2024-02-09",
    status: "paid",
    lineItems: [
      {
        id: "1",
        description: "Strategic Consulting",
        quantity: 25,
        rate: 220,
        amount: 5500,
      },
    ],
    subtotal: 5500,
    taxRate: 0.08,
    taxAmount: 440,
    discountAmount: 0,
    total: 5940,
    paymentInstructions: "Paid via bank transfer on Jan 25, 2024",
    poNumber: "PO-WC-2024-01",
  },
  {
    id: "6",
    invoiceNumber: "INV-202401-0006",
    customerId: "1",
    customer: mockCustomers[0],
    issueDate: "2024-01-28",
    dueDate: "2024-02-27",
    status: "pending",
    lineItems: [
      {
        id: "1",
        description: "API Integration",
        quantity: 35,
        rate: 140,
        amount: 4900,
      },
      {
        id: "2",
        description: "Testing & QA",
        quantity: 15,
        rate: 100,
        amount: 1500,
      },
    ],
    subtotal: 6400,
    taxRate: 0.08,
    taxAmount: 512,
    discountAmount: 100,
    total: 6812,
    notes: "Phase 2 development work",
    paymentInstructions: "Net 30 terms",
  },
  {
    id: "7",
    invoiceNumber: "INV-202312-0098",
    customerId: "2",
    customer: mockCustomers[1],
    issueDate: "2023-12-01",
    dueDate: "2023-12-31",
    status: "overdue",
    lineItems: [
      {
        id: "1",
        description: "Cloud Infrastructure Setup",
        quantity: 20,
        rate: 175,
        amount: 3500,
      },
    ],
    subtotal: 3500,
    taxRate: 0.08,
    taxAmount: 280,
    discountAmount: 0,
    total: 3780,
    notes: "URGENT: Payment required",
    paymentInstructions: "Please contact billing@company.com",
  },
  {
    id: "8",
    invoiceNumber: "INV-202401-0007",
    customerId: "3",
    customer: mockCustomers[2],
    issueDate: "2024-01-22",
    dueDate: "2024-02-21",
    status: "pending",
    lineItems: [
      {
        id: "1",
        description: "Business Analysis",
        quantity: 40,
        rate: 190,
        amount: 7600,
      },
      {
        id: "2",
        description: "Documentation",
        quantity: 10,
        rate: 120,
        amount: 1200,
      },
    ],
    subtotal: 8800,
    taxRate: 0.08,
    taxAmount: 704,
    discountAmount: 300,
    total: 9204,
    poNumber: "PO-2024-025",
  },
  {
    id: "9",
    invoiceNumber: "INV-202401-0008",
    customerId: "4",
    customer: mockCustomers[3],
    issueDate: "2024-01-18",
    dueDate: "2024-02-17",
    status: "paid",
    lineItems: [
      {
        id: "1",
        description: "Social Media Graphics",
        quantity: 20,
        rate: 80,
        amount: 1600,
      },
      {
        id: "2",
        description: "Video Editing",
        quantity: 5,
        rate: 300,
        amount: 1500,
      },
    ],
    subtotal: 3100,
    taxRate: 0.08,
    taxAmount: 248,
    discountAmount: 0,
    total: 3348,
    notes: "Paid in full - thank you!",
  },
  {
    id: "10",
    invoiceNumber: "INV-202401-0009",
    customerId: "5",
    customer: mockCustomers[4],
    issueDate: "2024-01-30",
    dueDate: "2024-03-01",
    status: "draft",
    lineItems: [
      {
        id: "1",
        description: "Q1 Consulting Retainer",
        quantity: 1,
        rate: 15000,
        amount: 15000,
      },
    ],
    subtotal: 15000,
    taxRate: 0.08,
    taxAmount: 1200,
    discountAmount: 1000,
    total: 15200,
    notes: "Draft for Q1 2024",
    poNumber: "PO-WC-Q1-2024",
  },
  {
    id: "11",
    invoiceNumber: "INV-202312-0095",
    customerId: "1",
    customer: mockCustomers[0],
    issueDate: "2023-11-15",
    dueDate: "2023-12-15",
    status: "cancelled",
    lineItems: [
      {
        id: "1",
        description: "Cancelled Project Work",
        quantity: 10,
        rate: 150,
        amount: 1500,
      },
    ],
    subtotal: 1500,
    taxRate: 0.08,
    taxAmount: 120,
    discountAmount: 0,
    total: 1620,
    notes: "Project cancelled by client request",
  },
  {
    id: "12",
    invoiceNumber: "INV-202401-0010",
    customerId: "2",
    customer: mockCustomers[1],
    issueDate: "2024-01-26",
    dueDate: "2024-02-25",
    status: "pending",
    lineItems: [
      {
        id: "1",
        description: "Frontend Development",
        quantity: 50,
        rate: 145,
        amount: 7250,
      },
      {
        id: "2",
        description: "Backend Development",
        quantity: 60,
        rate: 155,
        amount: 9300,
      },
    ],
    subtotal: 16550,
    taxRate: 0.08,
    taxAmount: 1324,
    discountAmount: 500,
    total: 17374,
    notes: "Sprint 3 development work",
    paymentInstructions: "Invoice due by end of month",
  },
  {
    id: "13",
    invoiceNumber: "INV-202401-0011",
    customerId: "3",
    customer: mockCustomers[2],
    issueDate: "2024-01-12",
    dueDate: "2024-02-11",
    status: "paid",
    lineItems: [
      {
        id: "1",
        description: "SEO Optimization",
        quantity: 30,
        rate: 130,
        amount: 3900,
      },
    ],
    subtotal: 3900,
    taxRate: 0.08,
    taxAmount: 312,
    discountAmount: 0,
    total: 4212,
    notes: "Paid via credit card",
    poNumber: "PO-2024-008",
  },
  {
    id: "14",
    invoiceNumber: "INV-202312-0099",
    customerId: "4",
    customer: mockCustomers[3],
    issueDate: "2023-12-20",
    dueDate: "2024-01-19",
    status: "overdue",
    lineItems: [
      {
        id: "1",
        description: "Logo Design Revisions",
        quantity: 8,
        rate: 125,
        amount: 1000,
      },
      {
        id: "2",
        description: "Print Materials",
        quantity: 5,
        rate: 200,
        amount: 1000,
      },
    ],
    subtotal: 2000,
    taxRate: 0.08,
    taxAmount: 160,
    discountAmount: 0,
    total: 2160,
    notes: "Follow-up required",
  },
  {
    id: "15",
    invoiceNumber: "INV-202401-0012",
    customerId: "5",
    customer: mockCustomers[4],
    issueDate: "2024-01-29",
    dueDate: "2024-02-28",
    status: "pending",
    lineItems: [
      {
        id: "1",
        description: "Training Sessions",
        quantity: 10,
        rate: 250,
        amount: 2500,
      },
      {
        id: "2",
        description: "Training Materials",
        quantity: 1,
        rate: 500,
        amount: 500,
      },
    ],
    subtotal: 3000,
    taxRate: 0.08,
    taxAmount: 240,
    discountAmount: 100,
    total: 3140,
    notes: "Q1 training program",
  },
]

// Helper functions
export function calculateInvoiceTotal(
  lineItems: LineItem[],
  taxRate: number,
  discountAmount: number
): {
  subtotal: number
  taxAmount: number
  total: number
} {
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = subtotal * taxRate
  const total = subtotal + taxAmount - discountAmount

  return {
    subtotal,
    taxAmount,
    total,
  }
}

export function filterInvoices(
  invoices: Invoice[],
  filter: InvoiceFilter
): Invoice[] {
  return invoices.filter((invoice) => {
    // Filter by status
    if (filter.status && filter.status !== "all" && invoice.status !== filter.status) {
      return false
    }

    // Filter by search query (invoice number or customer name)
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase()
      const matchesInvoiceNumber = invoice.invoiceNumber.toLowerCase().includes(query)
      const matchesCustomerName = invoice.customer.name.toLowerCase().includes(query)
      const matchesCompany = invoice.customer.company?.toLowerCase().includes(query)
      
      if (!matchesInvoiceNumber && !matchesCustomerName && !matchesCompany) {
        return false
      }
    }

    // Filter by date range
    if (filter.dateFrom && invoice.issueDate < filter.dateFrom) {
      return false
    }
    if (filter.dateTo && invoice.issueDate > filter.dateTo) {
      return false
    }

    return true
  })
}

export function sortInvoices(
  invoices: Invoice[],
  sortBy: "invoiceNumber" | "customer" | "issueDate" | "dueDate" | "amount" | "status",
  direction: "asc" | "desc" = "desc"
): Invoice[] {
  const sorted = [...invoices].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "invoiceNumber":
        comparison = a.invoiceNumber.localeCompare(b.invoiceNumber)
        break
      case "customer":
        comparison = a.customer.name.localeCompare(b.customer.name)
        break
      case "issueDate":
        comparison = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime()
        break
      case "dueDate":
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        break
      case "amount":
        comparison = a.total - b.total
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
    }

    return direction === "asc" ? comparison : -comparison
  })

  return sorted
}

export function getInvoiceById(id: string): Invoice | undefined {
  return mockInvoices.find((invoice) => invoice.id === id)
}

export function getCustomerById(id: string): Customer | undefined {
  return mockCustomers.find((customer) => customer.id === id)
}
