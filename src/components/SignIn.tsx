import { Link, useNavigate } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)

  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password
      },
      {
        onRequest: () => {
          setOtpLoading(true)
        },
        onSuccess: async () => {
          setOtpLoading(false)

          await navigate({ to: "/client-only" })
        },
        onError: (ctx) => {
          setOtpLoading(false)
          toast.error(ctx.error.message)
        }
      }
    )

    console.log({ data, error })
  }

  const handleResetPassword = async () => {
    setForgotLoading(true)
    try {
      await authClient.forgetPassword({
        email,
        redirectTo: `${import.meta.env.VITE_SITE_URL}/reset-password`
      })
      toast.success("Check your email for the reset password link!")
    } catch {
      toast.error("Failed to send reset password link. Please try again.")
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <Container>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              void handleSignIn()
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  type="button"
                  onClick={handleResetPassword}
                  className="cursor-pointer"
                  disabled={forgotLoading || !email}
                >
                  {forgotLoading ? <Loader2 size={14} className="mr-1 animate-spin" /> : null}
                  Forgot your password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="password"
                autoComplete="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={otpLoading}>
                Sign in with Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-neutral-600 text-sm dark:text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/sign-up"
          className="text-orange-400 underline hover:text-orange-500 dark:text-orange-300 dark:hover:text-orange-200"
        >
          Sign up
        </Link>
      </p>
    </Container>
  )
}
