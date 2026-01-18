# Invoicely - Invoice & Subscription Management Platform

A modern, full-stack SaaS application built with Next.js 14+ for managing invoices, customers, and subscriptions.

## Features

- 📊 **Dashboard** - Comprehensive overview with KPIs, charts, and recent activity
- 🧾 **Invoice Management** - Create, edit, view, and manage invoices
- 👥 **Customer Management** - Organize and track customer information
- 🔄 **Subscription Tracking** - Manage recurring billing and subscriptions
- 🔐 **Authentication** - Secure authentication with NextAuth.js
- 🌓 **Dark Mode** - Full dark mode support
- 📱 **Responsive Design** - Works seamlessly on all devices
- ♿ **Accessible** - WCAG AA compliant

## Tech Stack

- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: NextAuth.js v5
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

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

Edit `.env` and add your configuration:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
invoicely/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (auth)/       # Authentication pages
│   │   ├── (marketing)/  # Landing pages
│   │   └── dashboard/    # Dashboard pages
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── invoices/     # Invoice components
│   │   └── landing/      # Landing page components
│   └── lib/              # Utility functions
├── prisma/               # Database schema
├── public/               # Static assets
└── docs/                 # Documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Documentation

- [Authentication Setup](docs/AUTHENTICATION.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Product Vision](docs/PRODUCT_VISION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## License

MIT

## Author

Dhruv Dave - [GitHub](https://github.com/dhruvvdave)
