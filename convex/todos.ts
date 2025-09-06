import { v } from "convex/values"
import { Id } from "./_generated/dataModel"
import { mutation, QueryCtx } from "./_generated/server"
import { authedMutation, authedQuery } from "./lib/functions"

const getUserId = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity()
  return (identity?.subject as Id<"users">) ?? null
}

getCurrentUserInternal(context)

const requireUserId = async (ctx: QueryCtx) => {
  const userId = await getUserId(ctx)
  if (!userId) {
    throw new Error("Not authenticated1")
  }
  return userId
}

// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     const userId = await getUserId(ctx)
//     if (!userId) {
//       // Don't throw on unauth for server-side compatibility - return empty array instead
//       //temp solution - https://discord.com/channels/1019350475847499849/1413256246672494763/1413257121482407937
//       throw new Error("Not authenticated2")
//       // return []
//     }
//     const getList = await ctx.db
//       .query("todos")
//       .withIndex("userId", (q) => q.eq("userId", userId))
//       .order("desc")
//       .collect()
//     return getList
//   }
// })

export const get = authedQuery({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUserId(ctx)

    return await ctx.db
      .query("todos")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect()
  }
})

export const create = authedMutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)
    const now = Date.now()
    await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
      userId,
      createdAt: now,
      updatedAt: now
    })
  }
})

export const toggle = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)

    const todo = await ctx.db.get(args.id)
    if (!todo || todo.userId !== userId) {
      throw new Error("Todo not found or unauthorized")
    }

    await ctx.db.patch(args.id, {
      completed: !todo.completed,
      updatedAt: Date.now()
    })
  }
})

export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)

    const todo = await ctx.db.get(args.id)
    if (!todo || todo.userId !== userId) {
      throw new Error("Todo not found or unauthorized")
    }

    await ctx.db.delete(args.id)
  }
})
