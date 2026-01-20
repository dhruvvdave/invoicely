"use client"

import Link from "next/link"
import { useState } from "react"
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
import { InvoiceStatusBadge } from "./invoice-status-badge"
import { Invoice } from "@/lib/invoice-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { MoreHorizontal, ArrowUpDown, Download, Send, Edit, Eye, Trash2 } from "lucide-react"

interface SortableHeaderProps {
  column: string
  children: React.ReactNode
  onClick: (column: string) => void
}

function SortableHeader({ column, children, onClick }: SortableHeaderProps) {
  return (
    <TableHead>
      <button
        onClick={() => onClick(column)}
        className="flex items-center gap-1 hover:text-foreground"
      >
        {children}
        <ArrowUpDown className="h-4 w-4" />
      </button>
    </TableHead>
  )
}

interface InvoiceTableProps {
  invoices: Invoice[]
  onSort?: (column: string) => void
}

export function InvoiceTable({ invoices, onSort }: InvoiceTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
    onSort?.(column)
  }

  if (invoices.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <div className="mx-auto max-w-sm space-y-4">
          <div className="text-5xl">📄</div>
          <h3 className="text-lg font-semibold">No invoices found</h3>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first invoice or adjust your filters.
          </p>
          <Button asChild>
            <Link href="/dashboard/invoices/new">Create Invoice</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader column="invoiceNumber" onClick={handleSort}>Invoice #</SortableHeader>
            <SortableHeader column="customer" onClick={handleSort}>Customer</SortableHeader>
            <SortableHeader column="issueDate" onClick={handleSort}>Issue Date</SortableHeader>
            <SortableHeader column="dueDate" onClick={handleSort}>Due Date</SortableHeader>
            <SortableHeader column="amount" onClick={handleSort}>Amount</SortableHeader>
            <SortableHeader column="status" onClick={handleSort}>Status</SortableHeader>
            <TableHead className="w-[50px]">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/dashboard/invoices/${invoice.id}`}
                  className="text-primary hover:underline"
                >
                  {invoice.invoiceNumber}
                </Link>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{invoice.customer.name}</div>
                  {invoice.customer.company && (
                    <div className="text-sm text-muted-foreground">
                      {invoice.customer.company}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{formatDate(invoice.issueDate)}</TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell className="font-semibold">
                {formatCurrency(invoice.total)}
              </TableCell>
              <TableCell>
                <InvoiceStatusBadge status={invoice.status} />
              </TableCell>
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
                      <Link href={`/dashboard/invoices/${invoice.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-error">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
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
