import { getAvailableProviders } from "@/lib/auth"
import LoginPageClient from "./login-client"

export default async function LoginPage() {
  const providers = await getAvailableProviders()
  
  return <LoginPageClient providers={providers} />
}
