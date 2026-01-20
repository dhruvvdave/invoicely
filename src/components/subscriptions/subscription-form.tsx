"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Card, CardContent } from "@/components/ui/card"
import { mockCustomers } from "@/lib/customer-data"
import { SubscriptionFrequency } from "@/lib/subscription-data"

const subscriptionSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  planName: z.string().min(1, "Plan name is required"),
  amount: z.string().min(1, "Amount is required"),
  frequency: z.enum(["monthly", "yearly"] as const),
  startDate: z.string().min(1, "Start date is required"),
  billingDay: z.string().min(1, "Billing day is required"),
  notes: z.string().optional(),
})

type SubscriptionFormData = z.infer<typeof subscriptionSchema>

interface SubscriptionFormProps {
  onSubmit: (data: SubscriptionFormData) => void
  onCancel: () => void
  initialData?: Partial<SubscriptionFormData>
}

export function SubscriptionForm({
  onSubmit,
  onCancel,
  initialData,
}: SubscriptionFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      frequency: "monthly",
      startDate: new Date().toISOString().split("T")[0],
      billingDay: "1",
      ...initialData,
    },
  })

  const frequency = watch("frequency")
  const startDate = watch("startDate")
  const billingDay = watch("billingDay")

  // Calculate next billing date
  const getNextBillingDate = () => {
    if (!startDate || !billingDay) return ""
    
    const start = new Date(startDate)
    const today = new Date()
    const day = parseInt(billingDay)
    
    let nextDate = new Date(today.getFullYear(), today.getMonth(), day)
    
    if (nextDate < today) {
      if (frequency === "monthly") {
        nextDate.setMonth(nextDate.getMonth() + 1)
      } else {
        nextDate = new Date(start)
        nextDate.setFullYear(today.getFullYear())
        if (nextDate < today) {
          nextDate.setFullYear(nextDate.getFullYear() + 1)
        }
      }
    }
    
    return nextDate.toLocaleDateString()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerId">
              Customer <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("customerId", value)}
              defaultValue={initialData?.customerId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {mockCustomers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} {customer.company && `(${customer.company})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.customerId && (
              <p className="text-sm text-destructive">{errors.customerId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="planName">
              Plan Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="planName"
              {...register("planName")}
              placeholder="e.g., Enterprise Support"
            />
            {errors.planName && (
              <p className="text-sm text-destructive">{errors.planName.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">
                Amount <span className="text-destructive">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount")}
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="text-sm text-destructive">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">
                Frequency <span className="text-destructive">*</span>
              </Label>
              <Select
                onValueChange={(value) => setValue("frequency", value as SubscriptionFrequency)}
                defaultValue={initialData?.frequency || "monthly"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">
                Start Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingDay">
                Billing Day of Month <span className="text-destructive">*</span>
              </Label>
              <Input
                id="billingDay"
                type="number"
                min="1"
                max="28"
                {...register("billingDay")}
              />
              {errors.billingDay && (
                <p className="text-sm text-destructive">{errors.billingDay.message}</p>
              )}
            </div>
          </div>

          {startDate && billingDay && (
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm">
                <span className="font-medium">Next billing date:</span>{" "}
                {getNextBillingDate()}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Add any additional notes or details..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit">Save Subscription</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
