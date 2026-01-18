"use client"

import { useRouter } from "next/navigation"
import { InvoiceForm } from "@/components/invoices/invoice-form"
import { InvoiceFormData } from "@/lib/invoice-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewInvoicePage() {
  const router = useRouter()

  const handleSubmit = (data: InvoiceFormData, action: "draft" | "send") => {
    console.log("Creating invoice:", data, "Action:", action)
    
    // In a real app, this would make an API call to save the invoice
    // For now, we'll just redirect back to the invoices page
    router.push("/dashboard/invoices")
  }

  const handleCancel = () => {
    router.push("/dashboard/invoices")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/invoices">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to invoices</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Invoice</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new invoice
          </p>
        </div>
      </div>

      <InvoiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}
