# Direct API migration

This project version removes the internal Next.js API/BFF layer and calls the external Paraf Backend directly from the browser.

## Removed

- `src/app/api/`
- `src/shared/lib/api/server.ts`
- `src/shared/lib/api/route-utils.ts`
- `src/shared/lib/auth-cookies.ts`
- Internal `/api/auth/*` and `/api/customer-club/*` calls

## Added or changed

- `NEXT_PUBLIC_API_BASE_URL`
- Shared Axios instance with Bearer-token interceptor
- Paraf response-envelope and error helpers
- Zustand-persisted authentication state
- Client-side protected/guest route guards
- Direct feature API services for login, dashboard, vitrin and recent activities
- Updated documentation, Docker build arguments and tests
