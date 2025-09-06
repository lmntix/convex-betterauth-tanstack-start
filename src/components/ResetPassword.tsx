import { redirect, useSearch } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const searchParams = useSearch({ strict: false })
  const token: string | undefined = (searchParams as any).token

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    await authClient.resetPassword(
      {
        token,
        newPassword: password
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
          redirect({ to: "/" })
        },
        onError: (ctx) => {
          setLoading(false)
          toast.error(ctx.error.message)
        }
      }
    )
  }

  if (!token) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg md:text-xl">Invalid Link</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              This password reset link is invalid or has expired. Please request a new one.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex w-full justify-center border-t py-4">
              <p className="text-center text-neutral-500 text-xs">
                Powered by{" "}
                <a href="https://better-auth.com" className="underline" target="_blank" rel="noopener">
                  <span className="dark:text-orange-200/90">better-auth.</span>
                </a>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
          <CardDescription className="text-xs md:text-sm">Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Reset Password"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-center border-t py-4">
            <p className="text-center text-neutral-500 text-xs">
              Powered by{" "}
              <a href="https://better-auth.com" className="underline" target="_blank" rel="noopener">
                <span className="dark:text-orange-200/90">better-auth.</span>
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
