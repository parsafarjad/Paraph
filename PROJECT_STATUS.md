# Project status

- `src/app/api` and the previous Next.js BFF layer were removed.
- All API requests now use the shared Axios client and call the external Paraf Backend directly.
- Login response `{ success, result }` is handled correctly.
- Access and refresh tokens are persisted in Zustand and attached through an Axios interceptor.
- Client-side route guards handle protected and guest-only pages after store hydration.
- Dashboard aggregation and response normalization were moved to the customer-club feature service.
- Documentation and environment variables were updated for the direct-client architecture.
- Typecheck, zero-warning lint, Vitest, production build, and Playwright desktop/mobile tests pass.
- The dashboard was visually verified at 1280px and 390px against `docs/ui-reference.jpg`.
- Motion for React, the Vazirmatn variable font, reduced-motion handling, animated progress, and scroll-reveal transitions are configured.
- Backend CORS must permit the development and production Frontend origins.
- Exact Figma prototype timing is pending an exported MP4/GIF or accessible frame/prototype data; the Figma service is unavailable from the current execution region.
