"use client"

import { useRouter } from "next/navigation"
import { SubscriptionForm } from "@/components/subscriptions/subscription-form"

type SubscriptionFormData = {
  customerId: string
  planName: string
  amount: string
  frequency: "monthly" | "yearly"
  startDate: string
  billingDay: string
  notes?: string
}

export default function NewSubscriptionPage() {
  const router = useRouter()

  const handleSubmit = (data: SubscriptionFormData) => {
    console.log("Creating subscription:", data)
    // TODO: Implement subscription creation logic
    router.push("/dashboard/subscriptions")
  }

  const handleCancel = () => {
    router.push("/dashboard/subscriptions")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Subscription</h1>
        <p className="text-muted-foreground">
          Create a new recurring subscription for a customer
        </p>
      </div>

      <SubscriptionForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}
