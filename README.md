# King for a Day API

An API of 1000 artwork titles from Bruce McLean's 1969 artwork, *King for a Day*.

**Base URL:** `https://king-for-a-day-api.studio-sigo.workers.dev`

---

## Endpoints

### `GET /`
Returns API metadata and a list of available endpoints.

### `GET /artwork/random`
Returns a single artwork chosen at random.

```json
{ "id": "42", "title": "Pose Work for Plinths 3", "page": 7 }
```

### `GET /artwork/:id`
Returns a single artwork by its ID.

```
/artwork/42
```

### `GET /artwork?page=<number>`
Returns all artworks from a given page.

```
/artwork?page=3
```

### `GET /viewer`
A browser-based viewer that displays a random artwork title on each page load.

---

## Development

```bash
npm run dev         # start local dev server via Wrangler
npm run deploy      # deploy to Cloudflare Workers
npm test            # run Jest test suite
npm run type-check  # run TypeScript type checking
```

## Stack

- **Runtime:** Node.js v24 / Cloudflare Workers
- **Framework:** Hono
- **Validation:** Zod + @hono/zod-validator
- **Data:** JSON file loaded in-memory — dataset is fixed and read-only
- **Deployment:** Cloudflare Workers via Wrangler

## Structure

```
src/
  index.ts          # Hono app and all routes
  views/
    viewer.ts       # HTML for the /viewer page
  data/
    artworks.json   # source dataset (do not modify)
  __tests__/
    api.test.ts     # Jest route tests
jest.config.ts      # Jest configuration
tsconfig.json       # TypeScript config (Workers)
tsconfig.test.json  # TypeScript config (Jest)
wrangler.toml       # Cloudflare Workers config
```
