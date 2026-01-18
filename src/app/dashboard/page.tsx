import { requireAuth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function DashboardPage() {
  const user = await requireAuth()

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Dashboard</CardTitle>
          <CardDescription>You are successfully authenticated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email:</p>
            <p className="font-medium">{user.email}</p>
          </div>
          {user.name && (
            <div>
              <p className="text-sm text-muted-foreground">Name:</p>
              <p className="font-medium">{user.name}</p>
            </div>
          )}
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
