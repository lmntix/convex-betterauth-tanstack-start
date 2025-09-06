import { customAction, customCtx, customMutation, customQuery } from "convex-helpers/server/customFunctions"

import { action, mutation, query } from "../_generated/server"
import { getCurrentUserInternal } from "./helpers"

export const getCurrentUser = query({
  args: {},
  handler: async (context) => getCurrentUserInternal(context)
})

export const authedQuery = customQuery(query, {
  args: {},
  input: async (context, arguments_) => {
    const user = await getCurrentUserInternal(context)

    return {
      args: arguments_,
      ctx: {
        ...context,
        user: user ?? {}
      }
    }
  }
})

export const authedMutation = customMutation(mutation, {
  args: {},
  input: async (context, arguments_) => {
    const user = await getCurrentUserInternal(context)

    return {
      args: arguments_,
      ctx: {
        ...context,
        user: user ?? {}
      }
    }
  }
})

export const authedAction = customAction(
  action,
  customCtx(async (context) => {
    const user = await getCurrentUserInternal(context)

    return {
      ...context,
      user: user ?? {}
    }
  })
)
