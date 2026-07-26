<<<<<<< HEAD
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
=======
# paraph



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://hamgit.ir/parsa.farjad81/paraph.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://hamgit.ir/parsa.farjad81/paraph/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
>>>>>>> fdc1e331ff9ec1e457679d645ee48f0a50e2c047
