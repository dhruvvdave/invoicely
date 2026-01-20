"use client"

import { notFound, useRouter } from "next/navigation"
import { use } from "react"
import { CustomerForm, CustomerFormData } from "@/components/customers/customer-form"
import { getCustomerById } from "@/lib/customer-data"

export default function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = use(params)
  const customer = getCustomerById(id)

  if (!customer) {
    notFound()
  }

  const handleSubmit = (data: CustomerFormData) => {
    console.log("Updating customer:", id, data)
    // TODO: Implement customer update logic
    router.push(`/dashboard/customers/${id}`)
  }

  const handleCancel = () => {
    router.push(`/dashboard/customers/${id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Customer</h1>
        <p className="text-muted-foreground">
          Update customer information for {customer.name}
        </p>
      </div>

      <CustomerForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={customer}
      />
    </div>
  )
}
