import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge"
import { InvoiceActions } from "@/components/invoices/invoice-actions"
import { getInvoiceById } from "@/lib/invoice-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

interface InvoiceDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  const { id } = await params
  const invoice = getInvoiceById(id)

  if (!invoice) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/invoices">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to invoices</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {invoice.invoiceNumber}
            </h1>
            <p className="text-muted-foreground">Invoice details and actions</p>
          </div>
        </div>

        <InvoiceActions invoiceId={invoice.id} status={invoice.status} />
      </div>

      <Card className="p-8">
        <div className="space-y-8">
          {/* Invoice Header */}
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                    aria-label="Invoice document icon"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">Your Company Name</h2>
                <p className="text-sm text-muted-foreground">
                  123 Business Street
                  <br />
                  City, State 12345
                  <br />
                  contact@company.com
                  <br />
                  (555) 123-4567
                </p>
              </div>
            </div>

            <div className="space-y-2 text-right">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Invoice Number
                </p>
                <p className="text-lg font-bold">{invoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <div className="mt-1 flex justify-end">
                  <InvoiceStatusBadge status={invoice.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Bill To:</h3>
              <div className="text-sm">
                <p className="font-medium">{invoice.customer.name}</p>
                {invoice.customer.company && (
                  <p className="text-muted-foreground">{invoice.customer.company}</p>
                )}
                <p className="text-muted-foreground">{invoice.customer.address}</p>
                <p className="text-muted-foreground">
                  {invoice.customer.city}, {invoice.customer.state}{" "}
                  {invoice.customer.zip}
                </p>
                <p className="text-muted-foreground">{invoice.customer.country}</p>
                <p className="mt-1 text-muted-foreground">
                  {invoice.customer.email}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Issue Date:</span>
                <span>{formatDate(invoice.issueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Due Date:</span>
                <span>{formatDate(invoice.dueDate)}</span>
              </div>
              {invoice.poNumber && (
                <div className="flex justify-between">
                  <span className="font-medium">PO Number:</span>
                  <span>{invoice.poNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.description}</div>
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.rate)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-right">
                    Subtotal
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.subtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right">
                    Tax ({(invoice.taxRate * 100).toFixed(2)}%)
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(invoice.taxAmount)}
                  </TableCell>
                </TableRow>
                {invoice.discountAmount > 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-right">
                      Discount
                    </TableCell>
                    <TableCell className="text-right">
                      -{formatCurrency(invoice.discountAmount)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right text-lg font-bold">
                    {formatCurrency(invoice.total)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* Notes and Payment Instructions */}
          {(invoice.notes || invoice.paymentInstructions) && (
            <div className="space-y-4">
              {invoice.notes && (
                <div>
                  <h3 className="mb-2 font-semibold">Notes:</h3>
                  <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                </div>
              )}
              {invoice.paymentInstructions && (
                <div>
                  <h3 className="mb-2 font-semibold">Payment Instructions:</h3>
                  <p className="text-sm text-muted-foreground">
                    {invoice.paymentInstructions}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
