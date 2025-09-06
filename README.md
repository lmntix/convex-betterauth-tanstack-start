# Convex + Better Auth + TanStack Start

A full-stack TypeScript application built with TanStack Start, Convex backend, and Better Auth for authentication.

## 🚀 Tech Stack

- **Frontend**: [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- **Backend**: [Convex](https://convex.dev/) - Backend-as-a-service with real-time database
- **Authentication**: [Better Auth](https://better-auth.com/) with Convex integration
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Email**: [React Email](https://react.email/) + [Resend](https://resend.com/)
- **Type Safety**: Full end-to-end TypeScript with Zod validation

## ✨ Features

- 🔐 **Multiple Auth Methods**:
  - Email/Password with verification
  - Magic Link authentication
  - Email OTP verification
  - Two-factor authentication (2FA)
  - Social login (GitHub, Google)
- 🎨 **Modern UI**: Beautiful, responsive interface with dark/light mode
- ⚡ **Real-time**: Live updates powered by Convex
- 🛡️ **Type Safe**: End-to-end type safety with proper validation
- 📧 **Email System**: Transactional emails with React Email templates
- 🔄 **State Management**: TanStack Query + React Query integration

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A Convex account ([convex.dev](https://convex.dev))
- Email service setup (Resend recommended)

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

### Access Points

- **App**: [http://localhost:3000](http://localhost:3000)
- **Convex Dashboard**: Check your Convex project dashboard for real-time data
- **Auth Routes**: Available at `/sign-in`, `/sign-up`, `/reset-password`

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

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── SignIn.tsx      # Authentication components
│   └── ...
├── routes/             # TanStack Start routes
│   ├── __root.tsx      # Root layout with auth context
│   ├── _authed/        # Protected routes
│   └── api/auth/       # Auth API routes
├── lib/                # Utilities and configurations
│   ├── auth-client.ts  # Better Auth client setup
│   ├── auth.ts         # Better Auth configuration
│   └── utils.ts        # General utilities
└── styles/             # Global styles

convex/
├── auth.ts             # Convex auth functions
├── auth.config.ts      # Auth provider configuration
├── emails/             # Email templates
├── schema.ts           # Database schema
└── ...                 # Other Convex functions
```

## 🔐 Authentication Flow

This app implements a comprehensive auth system:

1. **Email/Password**: Traditional signup with optional email verification
2. **Magic Link**: Passwordless login via email
3. **Email OTP**: One-time password verification
4. **2FA**: Two-factor authentication for enhanced security
5. **Social Login**: GitHub and Google OAuth integration

All auth state is managed by Better Auth and synced with Convex for real-time updates.

## 📧 Email System

Email templates are built with React Email and sent via Resend:

- Email verification
- Password reset
- Magic link authentication
- OTP verification
- Welcome emails

Templates are located in `convex/emails/` and use React components for consistent styling.

## 🚀 Deployment

1. **Convex**: Deploy your Convex functions with `npx convex deploy`
2. **Frontend**: Deploy to Vercel, Netlify, or your preferred platform
3. **Environment**: Ensure all environment variables are set in production

## 🤝 Contributing

This project uses:

- **Biome** for linting and formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

## 📄 License

MIT License - see LICENSE file for details.
