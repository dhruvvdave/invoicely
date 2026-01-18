"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import {
  Download,
  Edit,
  MoreVertical,
  Printer,
  Send,
  Trash2,
  CheckCircle2,
} from "lucide-react"

interface InvoiceActionsProps {
  invoiceId: string
  status: string
}

export function InvoiceActions({ invoiceId, status }: InvoiceActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => window.print()}>
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/invoices/${invoiceId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Invoice
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Send className="mr-2 h-4 w-4" />
            Send Invoice
          </DropdownMenuItem>
          {status !== "paid" && (
            <DropdownMenuItem>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark as Paid
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-error">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Invoice
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
