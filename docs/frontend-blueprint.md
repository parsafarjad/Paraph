# Paraf Customer Club - Frontend Blueprint

## Stack

- Next.js 16 App Router, React 19, and strict TypeScript
- Tailwind CSS 4 for tokens and responsive layout
- shadcn-style local UI primitives backed by Radix UI
- Axios for the direct Paraf API client
- TanStack Query for remote/server state
- Zustand for authentication persistence and small UI selections
- React Hook Form and Zod for forms and boundary validation
- Motion for React for entrance, progress, layout, and dialog motion
- Recharts for the activity chart
- Vitest and Testing Library for units/components
- Playwright for browser-level flows
- pnpm for deterministic installs

## Module boundaries

```text
src/
  app/                         routing, metadata, global boundaries
  features/
    auth/                      login domain
      components/
      hooks/
      schemas/
      services/
      store/
      types/
    customer-club/             dashboard domain
      components/
      hooks/
      services/
      store/
      types/
      utils/
  shared/
    components/ui/             reusable UI primitives
    lib/api/                   Axios and response contracts
    lib/query/                 TanStack Query provider
    types/
    utils/
```

Feature code may import from `shared`; `shared` must not import feature UI. Page files compose
features but do not contain API mapping logic.

## Runtime data flow

```text
UI event
  -> feature hook
  -> TanStack Query query/mutation
  -> feature service
  -> shared Axios client
  -> Paraf API
  -> response unwrap
  -> feature normalizer
  -> stable UI model
  -> cached render
```

The normalizer is intentional. Backend response envelopes and optional field names can evolve
without spreading defensive checks throughout presentational components.

## Authentication flow

```text
Login form
  -> Zod validation
  -> POST /users/login
  -> accessToken + refreshToken
  -> persisted auth store
  -> Authorization: Bearer <accessToken>
  -> protected dashboard
```

The current direct-browser architecture requires the backend to allow every frontend origin in
CORS. A production refresh-token endpoint and expiry contract are still required. If security
requirements allow a BFF later, move tokens to secure, `httpOnly`, `sameSite` cookies and keep the
feature services unchanged behind a server adapter.

## Dashboard requests

The user dashboard fetches `/users/me`, `/levels`, and `/users/vitrin/all-user` in parallel, then
requests `/customer-club/summary`. A selected vitrin replaces the final summary request with
`/customer-club/summary-user-vitrin/{id}` and also requests `/users/vitrin/{id}`.

Recent activities use an infinite query with:

- `offset`: number of skipped records
- `size`: maximum returned records
- `type`: `BOTH | COIN | SCORE | SPENTCOIN | TRANSFERCOIN`
- `userVitrinId`: included only for vitrin scope

## Motion rules

- Use transform and opacity for entrance animation to stay compositor-friendly.
- Use spring motion for progress indicators and selection changes.
- Keep hover motion between 2-4 px and 150-220 ms.
- Use 450-600 ms for section entrances with a small stagger.
- Respect `prefers-reduced-motion` everywhere.
- Do not invent Smart Animate timing when the prototype is unavailable; record inferred motion in
  the handoff and replace it with measured values after prototype review.

## Asset rules

- Logos and interface glyphs: exported SVG.
- 3D or photographic artwork: exported PNG/WebP at 2x where transparency is needed.
- API-hosted level icons: build URLs with `NEXT_PUBLIC_IMAGE_BASE_URL`.
- Keep stable assets under `public/assets` with semantic names.
- Do not depend on temporary Figma asset URLs.

## Required environment variables

```dotenv
NEXT_PUBLIC_API_BASE_URL=https://wholesaler-core-v2.paraf.app/api
NEXT_PUBLIC_IMAGE_BASE_URL=https://wholesaler-core-develop.web.parafacc.ir
```

## Delivery gates

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

Visual review must cover desktop, tablet, mobile, reduced motion, loading, empty, API error,
long Persian copy, and a user with multiple vitrins.
