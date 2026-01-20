"use client"

import { useRouter } from "next/navigation"
import { CustomerForm, CustomerFormData } from "@/components/customers/customer-form"

export default function NewCustomerPage() {
  const router = useRouter()

  const handleSubmit = (data: CustomerFormData) => {
    console.log("Creating customer:", data)
    // TODO: Implement customer creation logic
    router.push("/dashboard/customers")
  }

  const handleCancel = () => {
    router.push("/dashboard/customers")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Customer</h1>
        <p className="text-muted-foreground">
          Create a new customer record for your business
        </p>
      </div>

      <CustomerForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}
