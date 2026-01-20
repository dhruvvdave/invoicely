# UI Components

This directory contains the core UI components for the Invoicely SaaS application. All components follow shadcn/ui patterns and are built with TypeScript, accessibility in mind, and full customization support.

## Available Components

### Button (`button.tsx`)
Versatile button component with multiple variants and sizes.

**Variants:**
- `primary` - Main action button (default)
- `secondary` - Secondary actions
- `outline` - Outlined style
- `ghost` - Transparent background
- `link` - Link-styled button
- `destructive` - Dangerous actions

**Sizes:** `sm`, `default`, `lg`, `icon`

```tsx
import { Button } from "@/components/ui/button"

<Button variant="primary" size="default">Submit Invoice</Button>
<Button variant="outline">Cancel</Button>
```

### Card (`card.tsx`)
Container component for grouping related content.

**Subcomponents:** `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Invoice #INV-2024-0001</CardTitle>
    <CardDescription>Due in 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
</Card>
```

### Badge (`badge.tsx`)
Status indicator component with invoice-specific variants.

**Variants:**
- `paid` - Payment received (green)
- `pending` - Awaiting payment (amber)
- `overdue` - Payment overdue (red)
- `draft` - Not yet sent (gray)
- `cancelled` - Cancelled invoice (muted gray)

```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="paid">Paid</Badge>
<Badge variant="pending">Pending</Badge>
<Badge variant="overdue">Overdue</Badge>
```

### Input (`input.tsx`)
Form input component with focus states and validation support.

```tsx
import { Input } from "@/components/ui/input"

<Input type="email" placeholder="client@example.com" />
```

### Label (`label.tsx`)
Form label component with proper accessibility.

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

### Textarea (`textarea.tsx`)
Multi-line text input for longer content.

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Invoice notes..." rows={4} />
```

### Table (`table.tsx`)
Complete table system for data display.

**Subcomponents:** `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice #</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>Acme Corp</TableCell>
      <TableCell>$1,500.00</TableCell>
      <TableCell><Badge variant="paid">Paid</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### DropdownMenu (`dropdown-menu.tsx`)
Complete dropdown menu system for actions and options.

**Subcomponents:** `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSub`

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
    <DropdownMenuItem>Send Email</DropdownMenuItem>
    <DropdownMenuItem>Download PDF</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dialog (`dialog.tsx`)
Modal dialog component for overlays and forms.

**Subcomponents:** `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button>Create Invoice</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>New Invoice</DialogTitle>
      <DialogDescription>Create a new invoice for your client.</DialogDescription>
    </DialogHeader>
    {/* Form content */}
  </DialogContent>
</Dialog>
```

### Select (`select.tsx`)
Dropdown select component for form options.

**Subcomponents:** `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`, `SelectLabel`, `SelectSeparator`, `SelectGroup`

```tsx
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="draft">Draft</SelectItem>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="paid">Paid</SelectItem>
  </SelectContent>
</Select>
```

## Styling

All components use the color scheme defined in `src/app/globals.css`:

- **Primary**: Professional blue/gray
- **Secondary**: Light accent
- **Success**: Green (for paid status)
- **Warning**: Amber (for pending status)
- **Error**: Red (for overdue status)
- **Muted**: Gray tones

## Customization

All components accept a `className` prop for additional styling. The `cn()` utility from `@/lib/utils` is used internally to merge class names properly.

```tsx
<Button className="w-full mt-4">Full Width Button</Button>
```

## Accessibility

All components are built with accessibility in mind:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Dependencies

These components use the following libraries:
- **class-variance-authority** - For variant management
- **clsx** & **tailwind-merge** - For className handling
- **@radix-ui** - For complex interactive components (Dialog, DropdownMenu, Select)
- **lucide-react** - For icons
