# Psykoverse - OGame Community Alliance Website

## Overview

Psykoverse is a community website for an OGame gaming alliance. It serves as a landing page and hub for players to learn about the alliance, access support resources, and join the community via Discord. The site features a space-themed dark UI inspired by OGame's aesthetic, with visit tracking for admin analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS v4 with custom OGame-inspired dark theme
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for page transitions and effects
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a pages-based structure with reusable UI components. The design uses a custom color palette with deep blues, cyan accents, and orange highlights to match OGame's visual style.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Session Management**: Token-based admin authentication using HMAC signatures
- **Development**: Vite dev server with HMR, production serves static files

The server handles visit tracking, admin authentication, and serves the built React application. Routes are registered in `server/routes.ts` with a simple storage abstraction pattern.

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between frontend/backend)
- **Tables**: 
  - `users` - Admin user accounts
  - `visits` - Page visit tracking with user agent, IP, referrer
- **Migrations**: Managed via `drizzle-kit push`

### Key Design Decisions

1. **Shared Schema**: Database types are defined in `/shared/` directory, enabling type-safe data access across the full stack.

2. **Simple Admin Panel**: Password-based authentication with in-memory session tokens. No complex auth framework - just HMAC-signed tokens stored in localStorage.

3. **Visit Analytics**: Built-in page view tracking without external analytics services. Captures page, user agent, IP, referrer, and timestamp.

4. **Monorepo Structure**: Single repository with `client/`, `server/`, and `shared/` directories. Build process bundles both frontend and backend for deployment.

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle ORM for type-safe queries and schema management

### Frontend Libraries
- React Query for data fetching
- Radix UI primitives (via shadcn/ui) for accessible components
- Lucide React for icons
- Framer Motion for animations

### Hosting & Infrastructure
- Hosted on Replit with custom Vite plugins for deployment URL handling
- OpenGraph meta images served from `/public/opengraph.png`

### External Services
- Discord (linked for community support - no API integration)
- YouTube (embedded/linked content - no API integration)

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `ADMIN_PASSWORD` - Optional override for admin panel access