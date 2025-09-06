# Convex + Better Auth + TanStack Start

A full-stack TypeScript application built with TanStack Start, Convex backend, and Better Auth for authentication.

### Environment Setup

Create a `.env.local` file with the following variables:

```bash
# App URLs
VITE_APP_URL=http://localhost:3000
VITE_SITE_URL=http://localhost:3000
SITE_URL=http://localhost:3000


VITE_CONVEX_URL=http://127.0.0.1:3210
VITE_CONVEX_SITE_URL=http://127.0.0.1:3211

BETTER_AUTH_SECRET=ewfwegwegwgfwegeg

CONVEX_SELF_HOSTED_URL=http://127.0.0.1:3210
CONVEX_SELF_HOSTED_ADMIN_KEY=convex-self-hosted|01ab534f4dab843921ac43aab3e3cfb72ab406638cf473098e74359f35797f2df6394f51b0


RESEND_API_KEY=your_resend_api_key
```

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development servers (both web and Convex)
pnpm dev

# Or start individually:
pnpm dev:web    # Start TanStack Start dev server (localhost:3000)
pnpm dev:db     # Start Convex dev environment
```

## 🛠️ Development Commands

```bash
# Development
pnpm dev              # Start both web and Convex dev servers
pnpm dev:web          # Start TanStack Start dev server only
pnpm dev:db           # Start Convex dev environment only

# Build & Deploy
pnpm build            # Build for production
pnpm start            # Start production server
pnpm typecheck        # TypeScript type checking

# Code Quality
pnpm lint             # Run Biome linter and type checking
pnpm format           # Format code with Biome

# UI Components
pnpm shadcn           # Add shadcn/ui components
```

## ⚠️ Important Notes

### Server-Side Auth with TanStack Start

Server-side auth is still a work in progress with TanStack Start, but it is a focus area. **Important**: You'll want to not throw on unauth from queries that run server-side.

In a Convex function, developers often check for auth and throw if the user isn't authenticated. This is normally fine, but auth with TanStack Start can be initially unauthenticated, even with an authenticated user. If you throw, everything errors out.

**Solution**: Return some sort of empty value instead from your Convex function in case the first authenticated call doesn't work.

**Reference**: [Convex Discord Discussion](https://discord.com/channels/1019350475847499849/1413256246672494763/1413257121482407937)
