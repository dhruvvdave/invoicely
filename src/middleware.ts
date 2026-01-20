export { auth as middleware } from "@/lib/auth"

// Protect all routes except:
// - API routes
// - Static files (_next/static)
// - Image optimization files (_next/image)
// - Favicon and other root-level static assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
