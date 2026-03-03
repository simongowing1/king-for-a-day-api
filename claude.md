# King for a Day

An API inspired by Bruce Mclean's 1967 artwork. The dataset is comprised of 1000 artwork titles listed in numberical order.
A request to the API returns data about an individual artwork.

## Stack
- Runtime: Node.js v24 (Bun-compatible when installed)
- Framework: Hono
- Validation: Zod + @hono/zod-validator
- Data: JSON file loaded in-memory (no database — dataset is fixed)
- Deployment: Cloudflare Workers (via Wrangler)

## Commands
- `npm run dev` — start local dev server via Wrangler
- `npm run deploy` — deploy to Cloudflare Workers
- `npm run type-check` — run TypeScript type checking

## Structure
- `src/index.ts` — Hono app and all routes
- `src/data/artworks.json` — source of truth for the dataset (do not modify programmatically)
- `wrangler.toml` — Cloudflare Workers config

## Conventions
- All routes live in `src/index.ts` until the app grows large enough to split
- Error responses use `{ error: string }` shape
- Query param and route param validation is handled with Zod schemas via `zValidator`
- The dataset is read-only — no write routes

## Domain Notes
- Titles are poetic and non-literal by design
– Each artwork is structured as follows {id: string, title: string}
- Dataset is fixed / read-only