# Customer & Subscription Management

This document describes the customer and subscription management features added to Invoicely.

## Overview

The customer and subscription management system allows users to:
- Maintain a database of customers with contact details and billing information
- Track customer lifetime value, outstanding balances, and invoice history
- Create and manage recurring subscriptions with automatic billing date calculations
- Filter and search customers and subscriptions efficiently

## Customer Management

### Features

#### 1. Customer List (`/dashboard/customers`)
- **Search Functionality**: Real-time search by name, email, or company
- **Stats Display**: Total invoices, total spent, and outstanding balance for each customer
- **Actions**: View, edit, and delete customers
- **Empty State**: Helpful prompt when no customers exist

#### 2. Customer Detail Page (`/dashboard/customers/[id]`)
- **Contact Information**: Name, email, phone, company
- **Addresses**: Separate billing and shipping addresses
- **Statistics Cards**:
  - Total Spent (lifetime value)
  - Total Invoices (count)
  - Outstanding Balance
- **Recent Invoices**: Latest 10 invoices for the customer
- **Notes Section**: Customer-specific notes and preferences
- **Quick Actions**: Edit or delete customer

#### 3. Customer Form (`/dashboard/customers/new` and `/dashboard/customers/[id]/edit`)
- **Required Fields**:
  - Name
  - Email (validated)
- **Optional Fields**:
  - Phone
  - Company
  - Billing Address (multiline)
  - Shipping Address (with "Same as billing" checkbox)
  - Notes
- **Validation**: Zod schema validation with helpful error messages
- **UX**: Clean, card-based layout with clear sections

### Data Model

```typescript
interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  billingAddress?: string
  shippingAddress?: string
  notes?: string
  createdAt: string
}

interface CustomerWithStats extends Customer {
  totalInvoices: number
  totalSpent: number
  outstandingBalance: number
}
```

### Mock Data

12 diverse customers are included with:
- Various industries (tech, healthcare, manufacturing, education, etc.)
- Different company sizes
- Complete contact information
- Realistic billing addresses
- Detailed notes about payment terms and preferences

## Subscription Management

### Features

#### 1. Subscription List (`/dashboard/subscriptions`)
- **Statistics Dashboard**: 
  - Total subscriptions
  - Active count (green)
  - Paused count (yellow)
  - Cancelled count (gray)
- **Status Filtering**: Filter by all, active, paused, or cancelled
- **Table Columns**:
  - Customer name (clickable to customer detail)
  - Plan name
  - Amount (currency formatted)
  - Frequency (monthly/yearly)
  - Status (color-coded badge)
  - Next billing date
  - Actions menu
- **Actions**: View details, pause/resume, cancel

#### 2. Subscription Form (`/dashboard/subscriptions/new`)
- **Customer Selection**: Dropdown with all customers
- **Plan Configuration**:
  - Plan name
  - Amount
  - Frequency (monthly or yearly radio buttons)
- **Billing Configuration**:
  - Start date
  - Billing day of month (1-28)
  - Auto-calculated next billing date preview
- **Notes**: Optional subscription-specific notes
- **Validation**: Comprehensive Zod schema validation

### Data Model

```typescript
type SubscriptionStatus = "active" | "paused" | "cancelled"
type SubscriptionFrequency = "monthly" | "yearly"

interface Subscription {
  id: string
  customerId: string
  customerName: string
  planName: string
  amount: number
  frequency: SubscriptionFrequency
  status: SubscriptionStatus
  startDate: string
  billingDay: number
  nextBillingDate: string
  notes?: string
  createdAt: string
  pausedAt?: string
  cancelledAt?: string
}
```

### Mock Data

11 subscriptions covering:
- Different price points ($449 - $15,000)
- Both monthly and yearly frequencies
- All status types (active, paused, cancelled)
- Various industries and use cases
- Realistic billing cycles

### Next Billing Date Calculation

The system automatically calculates the next billing date based on:
- Start date
- Billing day of month
- Frequency (monthly vs yearly)
- Current date

For monthly subscriptions, if the billing day has passed in the current month, it advances to the next month. For yearly subscriptions, it finds the next occurrence of the billing day based on the start date.

## Components

### Customer Components

1. **CustomerTable** (`src/components/customers/customer-table.tsx`)
   - Displays customers in a sortable table
   - Shows stats inline
   - Dropdown menu for actions
   - Empty state with CTA

2. **CustomerForm** (`src/components/customers/customer-form.tsx`)
   - Multi-section form with cards
   - React Hook Form integration
   - Zod validation
   - "Same as billing" checkbox for shipping address
   - Reusable for both create and edit

### Subscription Components

1. **SubscriptionTable** (`src/components/subscriptions/subscription-table.tsx`)
   - Displays subscriptions with status badges
   - Links to customer details
   - Context-aware actions (pause/resume based on status)
   - Empty state with CTA

2. **SubscriptionForm** (`src/components/subscriptions/subscription-form.tsx`)
   - Customer dropdown selection
   - Frequency radio buttons
   - Date picker for start date
   - Auto-calculated next billing date display
   - React Hook Form + Zod validation

3. **SubscriptionStatusBadge** (`src/components/subscriptions/subscription-status-badge.tsx`)
   - Color-coded status badges
   - Active (green), Paused (yellow), Cancelled (gray)
   - Uses design system colors

## Integration

### Navigation

Both customer and subscription management are integrated into:
- **Desktop Sidebar**: With Users and Repeat icons
- **Mobile Navigation**: Bottom navigation bar
- Already configured in `src/components/dashboard/sidebar.tsx` and `mobile-nav.tsx`

### Data Flow

Currently using mock data from:
- `src/lib/customer-data.ts`
- `src/lib/subscription-data.ts`
- `src/lib/invoice-data.ts`

The customer stats (total invoices, total spent, outstanding balance) are calculated by passing invoice data to the customer functions:

```typescript
const customers = getAllCustomersWithStats(mockInvoices)
const customer = getCustomerWithStats(customerId, mockInvoices)
```

### Future Database Integration

To integrate with a real database:

1. Replace mock data imports with database queries
2. Update the stats calculation functions to use database aggregations
3. Implement server actions for CRUD operations
4. Add optimistic UI updates
5. Implement proper pagination for large datasets

## Styling

All components follow the Invoicely design system:
- Consistent spacing and typography
- Color-coded status indicators
- Responsive layouts (mobile-first)
- Accessible form controls
- Card-based layouts for information hierarchy
- Proper loading and empty states

## Form Validation

All forms use Zod schemas for validation:
- **Required field** indicators with red asterisks
- **Email validation** for customer emails
- **Type validation** for amounts and dates
- **Clear error messages** displayed inline
- **Disabled submit** until valid

## Best Practices

1. **Type Safety**: Full TypeScript coverage with strict types
2. **Component Reusability**: Forms work for both create and edit
3. **Separation of Concerns**: Data, UI, and business logic separated
4. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
5. **Performance**: Efficient search/filter without external libraries
6. **User Experience**: Loading states, empty states, clear CTAs

## Testing Recommendations

1. Test customer CRUD operations
2. Verify stats calculations with various invoice scenarios
3. Test subscription billing date calculations edge cases
4. Validate form error handling
5. Test responsive layouts on various screen sizes
6. Verify navigation flows between customers and invoices
7. Test search and filter functionality
8. Verify accessibility with screen readers
