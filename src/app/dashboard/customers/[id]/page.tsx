"use client"

import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge"
import { getCustomerWithStats } from "@/lib/customer-data"
import { mockInvoices } from "@/lib/invoice-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Edit, Trash2, Mail, Phone, Building2 } from "lucide-react"

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = use(params)
  const customer = getCustomerWithStats(id, mockInvoices)

  if (!customer) {
    notFound()
  }

  const customerInvoices = mockInvoices
    .filter((invoice) => invoice.customerId === id)
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 10)

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this customer?")) {
      console.log("Deleting customer:", customer.id)
      // TODO: Implement delete logic
      router.push("/dashboard/customers")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
          <p className="text-muted-foreground">Customer details and transaction history</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/dashboard/customers/${customer.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Customer
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <div className="text-2xl">💰</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(customer.totalSpent)}</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <div className="text-2xl">📄</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.totalInvoices}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            <div className="text-2xl">⚠️</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(customer.outstandingBalance)}
            </div>
            <p className="text-xs text-muted-foreground">Pending payment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a
                  href={`mailto:${customer.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {customer.email}
                </a>
              </div>
            </div>

            {customer.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a
                    href={`tel:${customer.phone}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {customer.phone}
                  </a>
                </div>
              </div>
            )}

            {customer.company && (
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-sm text-muted-foreground">{customer.company}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Addresses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customer.billingAddress && (
              <div>
                <p className="text-sm font-medium mb-1">Billing Address</p>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {customer.billingAddress}
                </div>
              </div>
            )}

            {customer.shippingAddress &&
              customer.shippingAddress !== customer.billingAddress && (
                <div>
                  <p className="text-sm font-medium mb-1">Shipping Address</p>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {customer.shippingAddress}
                  </div>
                </div>
              )}

            {!customer.billingAddress && !customer.shippingAddress && (
              <p className="text-sm text-muted-foreground">No addresses on file</p>
            )}
          </CardContent>
        </Card>
      </div>

      {customer.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {customer.notes}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            Latest invoices for this customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          {customerInvoices.length > 0 ? (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          className="font-medium hover:underline"
                        >
                          {invoice.invoiceNumber}
                        </Link>
                      </TableCell>
                      <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>
                        <InvoiceStatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(invoice.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No invoices found for this customer
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
