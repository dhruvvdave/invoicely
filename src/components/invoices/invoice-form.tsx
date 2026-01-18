"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineItemEditor } from "./line-item-editor"
import { InvoiceFormData, LineItem, mockCustomers, calculateInvoiceTotal } from "@/lib/invoice-data"
import { formatCurrency, generateInvoiceNumber } from "@/lib/utils"
import { Save, Send, X } from "lucide-react"

const invoiceFormSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  poNumber: z.string().optional(),
  taxRate: z.number().min(0).max(1),
  discountAmount: z.number().min(0),
  notes: z.string().optional(),
  paymentInstructions: z.string().optional(),
})

interface InvoiceFormProps {
  defaultValues?: Partial<InvoiceFormData>
  invoiceNumber?: string
  onSubmit: (data: InvoiceFormData, action: "draft" | "send") => void
  onCancel: () => void
}

export function InvoiceForm({
  defaultValues,
  invoiceNumber,
  onSubmit,
  onCancel,
}: InvoiceFormProps) {
  const [lineItems, setLineItems] = useState<LineItem[]>(
    defaultValues?.lineItems || [
      {
        id: "1",
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]
  )

  const [totals, setTotals] = useState({
    subtotal: 0,
    taxAmount: 0,
    total: 0,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      customerId: defaultValues?.customerId || "",
      issueDate: defaultValues?.issueDate || new Date().toISOString().split("T")[0],
      dueDate:
        defaultValues?.dueDate ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      poNumber: defaultValues?.poNumber || "",
      taxRate: defaultValues?.taxRate || 0.08,
      discountAmount: defaultValues?.discountAmount || 0,
      notes: defaultValues?.notes || "",
      paymentInstructions: defaultValues?.paymentInstructions || "",
    },
  })

  const taxRate = watch("taxRate")
  const discountAmount = watch("discountAmount")

  useEffect(() => {
    const calculatedTotals = calculateInvoiceTotal(lineItems, taxRate, discountAmount)
    setTotals(calculatedTotals)
  }, [lineItems, taxRate, discountAmount])

  const onFormSubmit = (action: "draft" | "send") => {
    handleSubmit((data) => {
      onSubmit(
        {
          ...data,
          lineItems,
        },
        action
      )
    })()
  }

  const displayInvoiceNumber = invoiceNumber || generateInvoiceNumber()

  return (
    <form className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Invoice Number</Label>
              <Input value={displayInvoiceNumber} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerId">
                Customer <span className="text-error">*</span>
              </Label>
              <Select
                value={watch("customerId")}
                onValueChange={(value) => setValue("customerId", value)}
              >
                <SelectTrigger id="customerId">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                      {customer.company && ` - ${customer.company}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customerId && (
                <p className="text-sm text-error">{errors.customerId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueDate">
                Issue Date <span className="text-error">*</span>
              </Label>
              <Input
                id="issueDate"
                type="date"
                {...register("issueDate")}
              />
              {errors.issueDate && (
                <p className="text-sm text-error">{errors.issueDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">
                Due Date <span className="text-error">*</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                {...register("dueDate")}
              />
              {errors.dueDate && (
                <p className="text-sm text-error">{errors.dueDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="poNumber">PO Number</Label>
              <Input
                id="poNumber"
                placeholder="e.g., PO-2024-001"
                {...register("poNumber")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <LineItemEditor items={lineItems} onChange={setLineItems} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax & Discounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                {...register("taxRate", {
                  valueAsNumber: true,
                  onChange: (e) => setValue("taxRate", parseFloat(e.target.value) / 100),
                })}
                value={watch("taxRate") * 100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountAmount">Discount Amount ($)</Label>
              <Input
                id="discountAmount"
                type="number"
                min="0"
                step="0.01"
                {...register("discountAmount", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Tax ({(watch("taxRate") * 100).toFixed(2)}%):
                </span>
                <span className="font-medium">{formatCurrency(totals.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount:</span>
                <span className="font-medium">-{formatCurrency(watch("discountAmount"))}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="text-lg font-bold">{formatCurrency(totals.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes or terms..."
              rows={3}
              {...register("notes")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentInstructions">Payment Instructions</Label>
            <Textarea
              id="paymentInstructions"
              placeholder="Include payment terms, bank details, etc..."
              rows={3}
              {...register("paymentInstructions")}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onFormSubmit("draft")}
        >
          <Save className="mr-2 h-4 w-4" />
          Save as Draft
        </Button>
        <Button type="button" onClick={() => onFormSubmit("send")}>
          <Send className="mr-2 h-4 w-4" />
          Save & Send
        </Button>
      </div>
    </form>
  )
}
