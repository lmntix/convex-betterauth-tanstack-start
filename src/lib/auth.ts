import { convexAdapter } from "@convex-dev/better-auth"
import { convex } from "@convex-dev/better-auth/plugins"
import { requireEnv, requireMutationCtx } from "@convex-dev/better-auth/utils"
import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import type { GenericCtx } from "../../convex/_generated/server"
import { betterAuthComponent } from "../../convex/auth"
import { sendEmailVerification, sendResetPassword } from "../../convex/email"

const siteUrl = requireEnv("SITE_URL")

export const createAuth = (ctx: GenericCtx) =>
  betterAuth({
    baseURL: siteUrl,
    database: convexAdapter(ctx, betterAuthComponent),
    trustedOrigins: ["http://127.0.0.1:3000"],
    account: {
      accountLinking: {
        enabled: true
      }
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await sendEmailVerification(requireMutationCtx(ctx), {
          to: user.email,
          url
        })
      }
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      sendResetPassword: async ({ user, url }) => {
        await sendResetPassword(requireMutationCtx(ctx), {
          to: user.email,
          url
        })
      }
    },

    user: {
      deleteUser: {
        enabled: true
      }
    },
    plugins: [convex(), admin()]
  })
