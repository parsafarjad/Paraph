# Paraf Customer Club

پیاده‌سازی داشبورد باشگاه مشتریان پاراف بر اساس UI مرجع، مستند فنی و APIهای ارائه‌شده. پروژه با **Next.js App Router، React، TypeScript، Tailwind CSS v4، Radix UI، TanStack Query، Zustand، React Hook Form، Zod و Axios** ساخته شده است.

این نسخه **هیچ Route Handler یا Backend داخلی در `src/app/api` ندارد**. تمام درخواست‌ها از Client و با Axios مستقیماً به Backend خارجی پاراف ارسال می‌شوند.

## راه‌اندازی

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

سپس آدرس `http://localhost:3000` را باز کنید.

## متغیرهای محیطی

```env
NEXT_PUBLIC_API_BASE_URL=https://wholesaler-core-v2.paraf.app/api
NEXT_PUBLIC_IMAGE_BASE_URL=https://wholesaler-core-develop.web.parafacc.ir
```

چون درخواست‌های API در Browser اجرا می‌شوند، متغیر Base URL باید با `NEXT_PUBLIC_` شروع شود.

## معماری

پروژه Feature-based است:

```text
src/
├── app/                         # App Router pages/layouts؛ بدون app/api
├── features/
│   ├── auth/                    # Login، schema، hooks، Zustand store و API service
│   └── customer-club/           # Dashboard، API services، adapters، UI و state
├── shared/
│   ├── components/              # Wrapperهای UI مشترک
│   ├── lib/
│   │   ├── api/                 # Axios instance، interceptor و response helpers
│   │   └── query/               # TanStack Query provider
│   ├── types/
│   └── utils/
└── tests/
```

## جریان فنی

```text
React Component
  -> Feature Hook
    -> Feature API Service
      -> Shared Axios Instance
        -> External Paraf API
      <- API envelope/result
    <- TanStack Query cache
  <- UI
```

1. فرم ورود با React Hook Form و Zod اعتبارسنجی می‌شود.
2. `auth.api.ts` درخواست را مستقیماً به `POST /users/login` می‌فرستد.
3. پاسخ `{ success, result }` unwrap می‌شود.
4. `accessToken` و `refreshToken` در Zustand Persist نگهداری می‌شوند.
5. Axios interceptor در تمام درخواست‌های بعدی هدر `Authorization: Bearer ...` را اضافه می‌کند.
6. TanStack Query مدیریت cache، loading، retry و pagination را انجام می‌دهد.
7. Zustand انتخاب پروفایل/ویترین، فیلتر فعالیت و auth state را نگهداری می‌کند.
8. Adapterهای feature پاسخ‌های مختلف Backend را به مدل UI ثابت normalize می‌کنند.
9. در پاسخ `401`، auth state پاک می‌شود و `AuthGuard` کاربر را به Login منتقل می‌کند.

## APIهای استفاده‌شده

- `POST /users/login`
- `GET /users/me`
- `GET /users/vitrin/all-user`
- `GET /users/vitrin/{userVitrinId}`
- `GET /levels`
- `GET /customer-club/summary`
- `GET /customer-club/summary-user-vitrin/{userVitrinId}`
- `GET /recent-activities`

## نکات مهم API

- Backend باید Originهای Frontend را در CORS مجاز کند؛ برای مثال `http://localhost:3000` و دامنه Production.
- Endpoint مربوط به Refresh Token در مستند ارائه نشده است. Refresh Token ذخیره می‌شود، اما refresh خودکار عمداً پیاده‌سازی نشده است.
- فیلد تاریخ فعالیت‌ها در مشخصات API ذکر نشده است. UI در صورت وجود `createdAt`، `date` یا `created_at` آن را نمایش می‌دهد.
- نام دقیق wrapper همه پاسخ‌ها مشخص نیست. Helper پاسخ‌های مستقیم و wrapperهای `result`، `data` و `payload` را پشتیبانی می‌کند.
- نمودار از فعالیت‌های اخیر ساخته می‌شود، چون endpoint جداگانه‌ای برای سری زمانی نمودار ارائه نشده است.

## نکته امنیتی Token

در معماری Client-only امکان ساخت Cookie از نوع `HttpOnly` توسط JavaScript وجود ندارد. بنابراین این نسخه مطابق معماری مستقیم Axios، tokenها را با Zustand Persist در `localStorage` نگهداری می‌کند. برای امنیت بالاتر در پروژه Production، Backend باید authentication مبتنی بر Cookie امن را پشتیبانی کند یا یک BFF جداگانه استفاده شود.

## کیفیت و تست

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

Vitest برای تست‌های واحد و یکپارچه و Playwright برای End-to-End آماده شده است.

## Figma و Prototype

برای تطبیق دقیق‌تر animation، spacing، typography و interaction، لینک **Node-specific** بفرستید؛ لینک باید شامل `node-id` باشد:

```text
https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=123-456
```

Frameهای Desktop، Tablet، Mobile، modalها و component variantهای متحرک را جداگانه ارسال کنید.

## Design Assets

تصویر مرجع و PDF در پوشه `docs/` نگهداری شده‌اند. Assetهای موقت فعلی:

- `public/assets/hero-trophy.jpg`
- `public/assets/oxygen-banner.jpg`
- `public/assets/profile-placeholder.jpg`

پس از دریافت Figma، این موارد با assetهای اصلی SVG/PNG جایگزین شوند.

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://wholesaler-core-v2.paraf.app/api \
  --build-arg NEXT_PUBLIC_IMAGE_BASE_URL=https://wholesaler-core-develop.web.parafacc.ir \
  -t paraf-customer-club .

docker run --rm -p 3000:3000 paraf-customer-club
```

متغیرهای `NEXT_PUBLIC_*` هنگام build داخل bundle مرورگر قرار می‌گیرند. Next.js با خروجی `standalone` ساخته می‌شود.
