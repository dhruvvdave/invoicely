"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LineItem } from "@/lib/invoice-data"
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

interface LineItemEditorProps {
  items: LineItem[]
  onChange: (items: LineItem[]) => void
}

export function LineItemEditor({ items, onChange }: LineItemEditorProps) {
  const [lineItems, setLineItems] = useState<LineItem[]>(items)

  useEffect(() => {
    setLineItems(items)
  }, [items])

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    const newItems = [...lineItems, newItem]
    setLineItems(newItems)
    onChange(newItems)
  }

  const removeLineItem = (id: string) => {
    const newItems = lineItems.filter((item) => item.id !== id)
    setLineItems(newItems)
    onChange(newItems)
  }

  const updateLineItem = (
    id: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    const newItems = lineItems.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        
        // Recalculate amount if quantity or rate changes
        if (field === "quantity" || field === "rate") {
          updated.amount = updated.quantity * updated.rate
        }
        
        return updated
      }
      return item
    })
    setLineItems(newItems)
    onChange(newItems)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Line Items</Label>
        <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {lineItems.map((item, index) => (
          <div
            key={item.id}
            className="grid gap-4 rounded-lg border border-border bg-muted/50 p-4"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Item {index + 1}
              </span>
              {lineItems.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLineItem(item.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-error" />
                  <span className="sr-only">Remove item</span>
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${item.id}`}>Description</Label>
              <Textarea
                id={`description-${item.id}`}
                placeholder="e.g., Web Development Services"
                value={item.description}
                onChange={(e) =>
                  updateLineItem(item.id, "description", e.target.value)
                }
                rows={2}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                <Input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(item.id, "quantity", parseFloat(e.target.value) || 0)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`rate-${item.id}`}>Rate</Label>
                <Input
                  id={`rate-${item.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) =>
                    updateLineItem(item.id, "rate", parseFloat(e.target.value) || 0)
                  }
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`amount-${item.id}`}>Amount</Label>
                <Input
                  id={`amount-${item.id}`}
                  type="number"
                  value={item.amount.toFixed(2)}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {lineItems.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No line items yet. Click &quot;Add Item&quot; to get started.
          </p>
        </div>
      )}
    </div>
  )
}
