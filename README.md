# Convex + Better Auth + TanStack Start

A full-stack TypeScript application built with TanStack Start, Convex backend, and Better Auth for authentication.


### Environment Setup

Create a `.env.local` file with the following variables:

```bash
# App URLs
VITE_APP_URL=http://localhost:3000
VITE_SITE_URL=http://localhost:3000
SITE_URL=http://localhost:3000

# Convex
VITE_CONVEX_URL=your_convex_url
VITE_CONVEX_SITE_URL=your_convex_site_url
CONVEX_SELF_HOSTED_URL=your_convex_url
CONVEX_SELF_HOSTED_ADMIN_KEY=your_admin_key

# Social Auth (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (Resend)
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