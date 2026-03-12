# HPC Ultra Commerce Platform

Production-oriented monorepo for a high-performance e-commerce platform built with:

- `Next.js` storefront and admin shell
- `Express + TypeScript` API
- `PostgreSQL + Prisma` schema package
- `Redis` and `Elasticsearch` integration points
- `Stripe` and `Razorpay` payment service adapters

## Workspace

```text
apps/
  api/        # Express API
  web/        # Next.js storefront
packages/
  db/         # Prisma schema
  types/      # shared types
  validation/ # zod schemas
docs/
```

## Quick Start

1. Copy environment files.
2. Install dependencies with `pnpm install`.
3. Start the API with `pnpm --filter @hpc-ultra/api dev`.
4. Start the web app with `pnpm --filter @hpc-ultra/web dev`.

The API supports a demo mode with seeded in-memory data when `DATABASE_URL` is not configured.
