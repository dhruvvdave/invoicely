"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InvoiceFilter, InvoiceStatus } from "@/lib/invoice-data"
import { Search } from "lucide-react"

interface InvoiceFiltersProps {
  filters: InvoiceFilter
  onFiltersChange: (filters: InvoiceFilter) => void
}

export function InvoiceFilters({ filters, onFiltersChange }: InvoiceFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "")

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value as InvoiceStatus | "all",
    })
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onFiltersChange({
      ...filters,
      searchQuery: value,
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select
            value={filters.status || "all"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Invoice # or customer name..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-from">From Date</Label>
          <Input
            id="date-from"
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                dateFrom: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-to">To Date</Label>
          <Input
            id="date-to"
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                dateTo: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
