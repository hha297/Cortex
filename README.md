# Cortex

A modern, AI-powered code editor and development environment built with Next.js 16, featuring real-time collaboration, in-browser execution, and intelligent code assistance.

## Key Features

🤖 **AI code suggestions & quick edit** - Get instant AI-powered code suggestions and quick edits with context-aware assistance

🧠 **AI agent with file manipulation tools** - Intelligent AI agent powered by Inngest Agent Kit that can read, write, and manipulate files in your projects

📚 **Live docs scraping with Firecrawl** - Automatically scrape and reference documentation from URLs mentioned in your code instructions

✏️ **CodeMirror 6 editor with minimap** - Modern, feature-rich code editor with syntax highlighting, minimap, and indentation markers

▶️ **In-browser execution with WebContainers** - Run and preview your code directly in the browser using WebContainer technology

🐙 **GitHub import & export** - Seamlessly import repositories from GitHub and export your projects back to GitHub

⚡ **Background jobs with Inngest** - Reliable background job processing for long-running tasks like GitHub operations and AI processing

🗄️ **Real-time sync with Convex** - Real-time database synchronization for projects, files, and conversations

🔐 **Clerk authentication & billing** - Secure user authentication and billing management

🐛 **Sentry error tracking + LLM monitoring** - Comprehensive error tracking and monitoring for production applications

🌐 **Next.js 16 + TypeScript** - Built with the latest Next.js features and full TypeScript support

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=FFF&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=FFF&style=flat-square)
![Convex](https://img.shields.io/badge/Convex-FFE66D?logo=convex&logoColor=000&style=flat-square)
![Clerk](https://img.shields.io/badge/Clerk-000000?logo=clerk&logoColor=FFF&style=flat-square)
![Inngest](https://img.shields.io/badge/Inngest-000000?logo=inngest&logoColor=FFF&style=flat-square)
![CodeMirror](https://img.shields.io/badge/CodeMirror-3075B8?logo=codemirror&logoColor=FFF&style=flat-square)
![WebContainers](https://img.shields.io/badge/WebContainers-000000?logo=stackblitz&logoColor=FFF&style=flat-square)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=FFF&style=flat-square)
![Anthropic](https://img.shields.io/badge/Anthropic-000000?logo=anthropic&logoColor=FFF&style=flat-square)
![Google AI](https://img.shields.io/badge/Google_AI-4285F4?logo=google&logoColor=FFF&style=flat-square)
![Firecrawl](https://img.shields.io/badge/Firecrawl-FF6B6B?logo=firecrawl&logoColor=FFF&style=flat-square)
![Sentry](https://img.shields.io/badge/Sentry-362D59?logo=sentry&logoColor=FFF&style=flat-square)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?logo=radix-ui&logoColor=FFF&style=flat-square)
![Zustand](https://img.shields.io/badge/Zustand-443942?logo=zustand&logoColor=FFF&style=flat-square)

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun
- Convex account and deployment
- Clerk account
- (Optional) API keys for AI providers (OpenAI, Anthropic, Google)
- (Optional) Firecrawl API key
- (Optional) Sentry account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hha297/Cortex
cd cortex
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Set up Convex:

```bash
npx convex dev
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
# Get your keys from https://clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-app.clerk.accounts.dev

# Convex Database
# Get your deployment URL from https://convex.dev
CONVEX_DEPLOYMENT=dev:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Internal Key for Convex Operations
# Set a secure random string for internal API calls
CORTEX_CONVEX_INTERNAL_KEY=your-secure-random-string

# AI Providers (at least one required)
# OpenAI - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-...

# Anthropic - Get from https://console.anthropic.com
ANTHROPIC_API_KEY=sk-ant-api03-...

# Google - Get from https://makersuite.google.com/app/apikey
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...

# Firecrawl (Optional - for documentation scraping)
# Get from https://firecrawl.dev
FIRECRAWL_API_KEY=fc-...

# Sentry (Optional - for error tracking)
# Get from https://sentry.io
SENTRY_AUTH_TOKEN=sntrys_...

# Inngest (Optional - for background jobs)
# Configure in your Inngest dashboard
INNGEST_EVENT_KEY=your-event-key
INNGEST_SIGNING_KEY=your-signing-key
```

### Environment Variables Explained

- **Clerk**: Required for user authentication. Sign up at [clerk.com](https://clerk.com) to get your keys.
- **Convex**: Required for database operations. Create a project at [convex.dev](https://convex.dev).
- **CORTEX_CONVEX_INTERNAL_KEY**: A secure random string used for internal Convex API calls. Generate a strong random string.
- **AI Providers**: At least one AI provider is required. You can use OpenAI, Anthropic, or Google's Gemini API.
- **Firecrawl**: Optional. Used for scraping documentation from URLs mentioned in code instructions.
- **Sentry**: Optional. Used for error tracking and monitoring in production.
- **Inngest**: Optional. Used for background job processing. Configure in your Inngest dashboard.

## Project Structure

```
cortex/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/                # API routes
│   │   │   ├── github/         # GitHub import/export endpoints
│   │   │   ├── inngest/        # Inngest webhook handler
│   │   │   ├── messages/       # Message API endpoints
│   │   │   ├── projects/       # Project management endpoints
│   │   │   └── quick-edit/     # Quick edit API
│   │   └── ...
│   ├── features/               # Feature-based organization
│   │   ├── conversations/      # Chat/conversation features
│   │   ├── editor/             # Code editor components
│   │   ├── preview/            # WebContainer preview
│   │   └── projects/           # Project management
│   ├── components/             # Shared UI components
│   ├── lib/                    # Utility functions
│   └── hooks/                  # Shared React hooks
├── convex/                     # Convex backend
│   ├── schema.ts               # Database schema
│   ├── projects.ts             # Project mutations/queries
│   ├── files.ts                # File operations
│   └── conversations.ts        # Conversation logic
├── inngest/                    # Inngest functions
│   └── functions/              # Background job functions
└── public/                     # Static assets
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Convex Development

Run Convex in development mode:

```bash
npx convex dev
```

This will:

- Watch for schema changes
- Generate TypeScript types
- Provide a dashboard at the Convex URL

### Code Style

This project uses:

- **ESLint** for linting (Next.js config)
- **Prettier** for code formatting
- **TypeScript** for type safety

## Features in Detail

### AI Code Suggestions

The quick edit feature allows you to select code and provide natural language instructions. The AI will:

- Understand the context of your selected code
- Scrape documentation from URLs you mention
- Generate edited code that maintains indentation and style
- Support multiple AI providers (OpenAI, Anthropic, Google)

### AI Agent

The AI agent can:

- Read files in your project
- Write and modify files
- Execute commands
- Understand project structure
- Work with multiple files simultaneously

### WebContainer Preview

Run Node.js applications directly in the browser:

- Install npm packages
- Run dev servers
- Execute scripts
- View terminal output
- Preview your application

### GitHub Integration

- **Import**: Clone repositories from GitHub into Cortex projects
- **Export**: Push your Cortex projects to GitHub repositories
- Background processing for large operations
- Support for public and private repositories

### Real-time Collaboration

Convex provides real-time synchronization:

- Instant updates across all clients
- Optimistic UI updates
- Conflict resolution
- Offline support

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy

### Other Platforms

This is a standard Next.js application and can be deployed to:

- Vercel
- Netlify
- Railway
- AWS Amplify
- Any Node.js hosting platform

### Production Checklist

- [ ] Set all required environment variables
- [ ] Configure Convex production deployment
- [ ] Set up Sentry for error tracking
- [ ] Configure Inngest for background jobs
- [ ] Set up Clerk production keys
- [ ] Enable production optimizations in Next.js config

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.
