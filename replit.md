# TomorrowOS Onboarding Prototype

Interactive front-end MVP of the TomorrowOS onboarding experience — a fully clickable design-validation prototype (Guided/Replit path, Terminal/CLI path, shared device-pairing journey, Supabase and Cloudinary guides) with simulated connections only, no real backend.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- `/start` — project type + setup method selection, then the Guided (10 steps) or Terminal (13 steps) journey, merging into a shared deployment journey (download players, install, pair device, create/schedule/deploy)
- `/guides/supabase` and `/guides/cloudinary` — connection guides sourced verbatim from the uploaded FINAL docx guides (extracted to `attached_assets/extracted/*.md`)
- Prototype Review Mode toggle for reviewers to simulate failures and jump between states; Reset prototype clears localStorage progress
- Unconfirmed engineering values are shown as `{{PLACEHOLDER}}` tokens on purpose — do not invent real commands/hosts
- No secrets are ever persisted; only pathway and completion state go to localStorage

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
