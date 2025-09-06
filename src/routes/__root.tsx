import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react"
import { ConvexQueryClient } from "@convex-dev/react-query"
import { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, HeadContent, Outlet, Scripts, useRouteContext } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { createServerFn } from "@tanstack/react-start"
import { getCookie, getWebRequest } from "@tanstack/react-start/server"
import { ConvexReactClient } from "convex/react"
import * as React from "react"
import { Toaster } from "sonner"
import { authClient } from "@/lib/auth-client"
import { fetchSession, getCookieName } from "@/lib/auth-server-utils"
import appCss from "@/styles/app.css?url"

// Server side session request
const fetchAuth = createServerFn({ method: "GET" }).handler(async () => {
  const sessionCookieName = await getCookieName()
  const token = getCookie(sessionCookieName)
  const request = getWebRequest()
  const { session } = await fetchSession(request)
  return {
    userId: session?.user.id,
    token
  }
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  convexClient: ConvexReactClient
  convexQueryClient: ConvexQueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  beforeLoad: async (ctx) => {
    const auth = await fetchAuth()
    const { userId, token } = auth

    // During SSR only (the only time serverHttpClient exists),
    // set the auth token to make HTTP queries with.
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
    }

    return {
      userId,
      token
    }
  },
  component: RootComponent
})

function RootComponent() {
  const context = useRouteContext({ from: Route.id })
  return (
    <ConvexBetterAuthProvider client={context.convexClient} authClient={authClient}>
      <RootDocument>
        <Outlet />
      </RootDocument>
      <Toaster />
    </ConvexBetterAuthProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-neutral-950 text-neutral-50">
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
