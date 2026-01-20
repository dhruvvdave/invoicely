# Invoicely - Invoice & Subscription Management Platform

A modern, production-ready SaaS application built with Next.js 15 for managing invoices, customers, and subscriptions with a professional design system.

## ✨ Features

- 📊 **Dashboard** - Comprehensive overview with KPIs, revenue charts, and recent activity
- 🧾 **Invoice Management** - Create, edit, view, and manage invoices with line items
- 👥 **Customer Management** - Organize and track customer information with full CRUD operations
- 🔄 **Subscription Tracking** - Manage recurring billing and subscriptions
- 🔐 **Authentication** - Secure authentication with NextAuth.js v5 (optional OAuth providers)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Professional Design** - Clean, modern UI with shadcn/ui components
- ♿ **Accessible** - Built with accessibility best practices

## 🛠 Tech Stack

- **Framework**: Next.js 15.1.6+ (App Router) with TypeScript
- **Styling**: Tailwind CSS 3.4+ with shadcn/ui components
- **Database**: Prisma ORM with PostgreSQL schema
- **Authentication**: NextAuth.js v5.0.0-beta.25
- **Forms**: React Hook Form 7.54+ + Zod validation
- **Charts**: Recharts 2.15+ for data visualization
- **Icons**: Lucide React 0.462+
- **Email**: Nodemailer 7.0.7 (compatible with next-auth)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- PostgreSQL database (optional for development - uses mock data)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dhruvvdave/invoicely.git
cd invoicely
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure as needed:
```env
# Database (optional for development)
DATABASE_URL="postgresql://user:password@localhost:5432/invoicely"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Email Provider (optional)
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@invoicely.com"
```

4. Set up the database (optional - app works with mock data):
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Build for Production

```bash
npm run build
npm start
```

The application builds successfully with:
- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ All imports correct
- ✅ Dependencies properly resolved
- ✅ Nodemailer 7.0.7 (compatible with NextAuth v5)

## 🗂 Project Structure

```
invoicely/
├── src/
│   ├── app/              # Next.js 15 app router pages
│   │   ├── (auth)/       # Authentication pages (login)
│   │   ├── api/auth/     # NextAuth API routes
│   │   ├── dashboard/    # Dashboard pages
│   │   │   ├── customers/    # Customer management
│   │   │   ├── invoices/     # Invoice management
│   │   │   └── subscriptions/ # Subscription management
│   │   ├── page.tsx      # Landing page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components (button, input, card, etc.)
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── customers/    # Customer components
│   │   ├── subscriptions/ # Subscription components
│   │   └── invoices/     # Invoice components
│   └── lib/              # Utility functions and data
│       ├── utils.ts           # Shared utilities
│       ├── auth.ts            # NextAuth configuration
│       ├── db.ts              # Prisma client
│       ├── mock-data.ts       # Mock data for development
│       ├── customer-data.ts   # Customer data & helpers
│       ├── invoice-data.ts    # Invoice data & helpers
│       └── subscription-data.ts # Subscription data & helpers
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── docs/                 # Documentation
├── .env.example          # Environment variables template
├── tailwind.config.ts    # Tailwind configuration
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 📜 Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production (✅ builds successfully)
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

The application uses a professional neutral color palette with:
- **Primary**: Professional dark blue-gray (hsl(222, 47%, 11%))
- **Secondary**: Light gray (hsl(210, 40%, 96%))
- **Muted**: Neutral gray tones
- **Accent**: Subtle highlights
- **Status colors**: Green (paid), Amber (pending), Red (overdue), Gray (draft)

All components follow Tailwind CSS and shadcn/ui design patterns for consistency.

## 📱 Key Features

### Dashboard
- 4 KPI cards (Revenue, Outstanding Invoices, Active Subscriptions, Customers)
- Revenue chart showing last 12 months
- Recent invoices table
- Responsive sidebar navigation

### Invoice Management
- Create, edit, and view invoices
- Line item management with calculations
- Status tracking (Draft, Sent, Paid, Overdue, Cancelled)
- PDF download placeholder
- Automatic totals calculation with tax and discounts

### Customer Management
- CRUD operations for customers
- Customer detail page with statistics
- Invoice history per customer
- Contact information and addresses

### Subscription Management
- Create and manage recurring subscriptions
- Status tracking (Active, Paused, Cancelled)
- Frequency selection (Monthly, Yearly)
- Auto-calculated billing dates

## 🔧 Important Notes

- **Mock Data**: Application uses comprehensive mock data for development
- **No Database Required**: Works without database connection for demo purposes
- **Optional Auth Providers**: Email, Google, and GitHub providers are optional
- **TypeScript Strict Mode**: Full type safety throughout
- **Next.js 15 Compatible**: Uses async params and latest best practices
- **Build Success**: Verified to build without errors

## 📚 Documentation

See the `docs/` directory for detailed documentation:
- [Authentication Setup](docs/AUTHENTICATION.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Product Vision](docs/PRODUCT_VISION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🚢 Deployment

The application is ready to deploy to:
- **Vercel**: Optimized for Next.js (recommended)
- **Railway**: PostgreSQL + Next.js
- **Any Node.js hosting**: Supports standard Node environments

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 👤 Author

Dhruv Dave - [GitHub](https://github.com/dhruvvdave)
