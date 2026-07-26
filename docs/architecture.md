# معماری پروژه

## تصمیم اصلی: Direct Client API

Backend پروژه خارجی است و Frontend مستقیماً با Axios به آن متصل می‌شود. در این نسخه هیچ پوشه `src/app/api`، Route Handler یا BFF داخلی وجود ندارد.

## Data Flow

```text
UI Component
  -> Feature Hook
    -> Feature API Service
      -> Axios instance
        -> External Paraf API
      <- Response unwrap + normalize
    <- TanStack Query cache
  <- Presentational Components
```

## مرز Stateها

- **Server state:** TanStack Query؛ profile، levels، summary، vitrins و activities.
- **Client/UI state:** Zustand؛ انتخاب profile/vitrin و activity filter.
- **Auth state:** Zustand Persist؛ access token، refresh token و hydration status.
- **Form state:** React Hook Form.
- **Validation:** Zod.

## API Layer

- `src/shared/lib/api/client.ts`: Axios instance، base URL، Authorization interceptor و 401 handling.
- `src/shared/lib/api/response.ts`: unwrap کردن `result/data/payload` و استخراج پیام خطای Backend.
- `features/*/services/*.api.ts`: endpointهای مخصوص هر feature.
- `features/customer-club/utils/normalize.ts`: تبدیل responseهای Backend به مدل ثابت UI.

## Authentication Flow

```text
LoginForm
  -> useLogin
    -> auth.api.ts
      -> POST /users/login
    <- accessToken + refreshToken
  -> Zustand Persist
  -> redirect /
```

در reload، `AuthGuard` منتظر hydration شدن Zustand می‌ماند و سپس مسیر را کنترل می‌کند. Axios token را هنگام هر request از store می‌خواند؛ بنابراین token stale داخل instance نگهداری نمی‌شود.

## Error Handling

- Axios interceptor پیام `error.message`، `snackbar.message` یا `message` را استخراج می‌کند.
- در status `401`، auth state پاک می‌شود.
- `AuthGuard` کاربر بدون token را به `/login` منتقل می‌کند.
- `app/error.tsx` خطاهای render را پوشش می‌دهد.
- Query componentها loading، empty، retry و pagination state دارند.

## CORS

چون request از Browser مستقیماً به دامنه Backend ارسال می‌شود، Backend باید Originهای مجاز Frontend را در CORS تنظیم کند. موفق بودن request در Bruno یا Postman به‌تنهایی CORS مرورگر را تأیید نمی‌کند.
