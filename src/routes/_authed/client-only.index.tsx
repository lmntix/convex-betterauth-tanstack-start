import { createFileRoute } from "@tanstack/react-router"
import { Authenticated } from "convex/react"
import { Toaster } from "sonner"
import { TodoList } from "@/components/TodoListClient"

export const Route = createFileRoute("/_authed/client-only/")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Authenticated>
      <TodoList />
      <Toaster />
    </Authenticated>
  )
}
