"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { InvoiceFilters } from "@/components/invoices/invoice-filters"
import { InvoiceTable } from "@/components/invoices/invoice-table"
import {
  mockInvoices,
  InvoiceFilter,
  filterInvoices,
  sortInvoices,
} from "@/lib/invoice-data"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 10

export default function InvoicesPage() {
  const [filters, setFilters] = useState<InvoiceFilter>({ status: "all" })
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string>("issueDate")

  const filteredInvoices = filterInvoices(mockInvoices, filters)
  const sortedInvoices = sortInvoices(
    filteredInvoices,
    sortColumn as "invoiceNumber" | "customer" | "issueDate" | "dueDate" | "amount" | "status",
    "desc"
  )

  const totalPages = Math.ceil(sortedInvoices.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentInvoices = sortedInvoices.slice(startIndex, endIndex)

  const handleSort = (column: string) => {
    setSortColumn(column)
  }

  const handleFiltersChange = (newFilters: InvoiceFilter) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track all your invoices
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <InvoiceFilters filters={filters} onFiltersChange={handleFiltersChange} />
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedInvoices.length)} of{" "}
            {sortedInvoices.length} invoices
          </p>
        </div>

        <InvoiceTable invoices={currentInvoices} onSort={handleSort} />

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
