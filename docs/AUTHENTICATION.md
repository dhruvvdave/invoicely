# Authentication Setup

This document describes the NextAuth.js v5 authentication implementation for Invoicely.

## Overview

Invoicely uses NextAuth.js v5 with the following features:
- Email-based authentication (magic links)
- Google OAuth (optional)
- GitHub OAuth (optional)
- JWT-based sessions for Edge runtime compatibility
- Prisma adapter for database persistence
- Protected routes via middleware

## Configuration

### Environment Variables

Add the following to your `.env` file:

```env
# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/invoicely"

# Email Provider (Required for magic links)
EMAIL_SERVER="smtp://user:password@smtp.example.com:587"
EMAIL_FROM="noreply@invoicely.com"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Database Setup

Run Prisma migrations to create the authentication tables:

```bash
npx prisma migrate dev
```

## Authentication Flow

### Email (Magic Link)

1. User enters email on `/login`
2. NextAuth sends a magic link to the email
3. User clicks the link to authenticate
4. User is redirected to `/dashboard`

### OAuth (Google/GitHub)

1. User clicks "Sign in with Google" or "Sign in with GitHub"
2. User is redirected to the OAuth provider
3. After authorization, user is redirected back
4. User is redirected to `/dashboard`

## Protected Routes

The middleware (`src/middleware.ts`) protects all routes under `/dashboard/*`:

- Unauthenticated users are redirected to `/login`
- Authenticated users trying to access `/login` are redirected to `/dashboard`

## Usage in Components

### Server Components

```typescript
import { requireAuth, getCurrentUser } from "@/lib/auth"

// Require authentication (throws error if not authenticated)
export default async function ProtectedPage() {
  const user = await requireAuth()
  return <div>Hello {user.email}</div>
}

// Optional authentication
export default async function OptionalPage() {
  const user = await getCurrentUser()
  return <div>{user ? `Hello ${user.email}` : "Not logged in"}</div>
}
```

### Client Components

```typescript
"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export function UserProfile() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <div>Loading...</div>
  if (!session) return <button onClick={() => signIn()}>Sign In</button>
  
  return (
    <div>
      <p>Hello {session.user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

## Files Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx          # Login page
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts      # NextAuth API handlers
│   ├── dashboard/
│   │   └── page.tsx              # Protected dashboard
│   └── layout.tsx                # Root layout with AuthProvider
├── components/
│   └── providers.tsx             # SessionProvider wrapper
├── lib/
│   └── auth.ts                   # NextAuth configuration
└── middleware.ts                 # Route protection
```

## API Reference

### `auth()`
Server-side function to get the current session.

```typescript
import { auth } from "@/lib/auth"

const session = await auth()
```

### `getCurrentUser()`
Helper function to get the current user from the session.

```typescript
import { getCurrentUser } from "@/lib/auth"

const user = await getCurrentUser()
// Returns: { id, email, name, image } | undefined
```

### `requireAuth()`
Helper function that throws an error if the user is not authenticated.

```typescript
import { requireAuth } from "@/lib/auth"

try {
  const user = await requireAuth()
} catch (error) {
  // User is not authenticated
}
```

### `signIn()` and `signOut()`
Client-side functions to sign in and out.

```typescript
import { signIn, signOut } from "next-auth/react"

// Sign in with email
await signIn("email", { email: "user@example.com" })

// Sign in with OAuth
await signIn("google")
await signIn("github")

// Sign out
await signOut({ callbackUrl: "/" })
```

## Customization

### Adding More Providers

Edit `src/lib/auth.ts` and add providers from the [NextAuth providers list](https://next-auth.js.org/providers/):

```typescript
import TwitterProvider from "next-auth/providers/twitter"

providers: [
  TwitterProvider({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  }),
  // ... other providers
]
```

### Custom Login Page

The login page is at `src/app/(auth)/login/page.tsx`. Customize the UI as needed.

### Session Configuration

The session is configured in `src/lib/auth.ts`:

```typescript
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

## Troubleshooting

### "Module not found: nodemailer"

Install nodemailer:
```bash
npm install nodemailer@^6.8.0
```

### "Prisma client not generated"

Generate the Prisma client:
```bash
npx prisma generate
```

### OAuth not working

1. Check that environment variables are set correctly
2. Verify OAuth app callback URL is set to: `http://localhost:3000/api/auth/callback/[provider]`
3. Ensure OAuth app is enabled and approved

### Email provider not working

1. Verify SMTP credentials in `EMAIL_SERVER`
2. Check that `EMAIL_FROM` is a valid email address
3. Test SMTP connection independently

## Security Best Practices

1. **Never commit secrets**: Keep `.env` out of version control
2. **Use strong secrets**: Generate `NEXTAUTH_SECRET` with: `openssl rand -base64 32`
3. **HTTPS in production**: Set `NEXTAUTH_URL` to your HTTPS domain
4. **Rotate secrets**: Change secrets periodically
5. **Limit OAuth scopes**: Only request necessary permissions

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js v5 Migration Guide](https://authjs.dev/guides/upgrade-to-v5)
