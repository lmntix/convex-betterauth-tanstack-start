import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    CONVEX_SELF_HOSTED_URL: z.string().url(),
    CONVEX_SELF_HOSTED_ADMIN_KEY: z.string(),
    SITE_URL: z.string().url()
  },

  client: {
    VITE_APP_URL: z.string().url(),
    VITE_CONVEX_URL: z.string().url(),
    VITE_CONVEX_SITE_URL: z.string().url(),
    VITE_SITE_URL: z.string().url()
  },

  clientPrefix: "VITE_",

  runtimeEnv: import.meta.env,

  emptyStringAsUndefined: true,
  onValidationError(issues) {
    console.error("❌ Invalid environment variables:", issues)
    throw new Error("Invalid environment variables")
  },
  onInvalidAccess(variable) {
    throw new Error(`❌ Attempted to access a server-side environment variable on the client: ${variable}`)
  }
})

export type EnvSchema = typeof env
