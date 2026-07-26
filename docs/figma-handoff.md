# تحویل Figma برای Design-to-Code

برای پیاده‌سازی pixel-perfect، لینک frame باید شامل `node-id` باشد. لینک فایل بدون node-id برای استخراج دقیق frame و motion کافی نیست.

## لینک‌های مورد نیاز

- Desktop landing frame
- Tablet frame
- Mobile frame
- Login frame
- هر modal یا overlay
- component setهای مهم مانند Button، Tabs، Card و Header
- frameهایی که Smart Animate یا prototype interaction دارند

## Motion

پس از دریافت لینک node-specific، موارد زیر بررسی می‌شوند:

- duration و easing
- hover و pressed states
- scroll reveal
- Smart Animate transitions
- modal/overlay enter و exit
- carousel یا tab transitions
- loading skeleton و progress animations

## روش ارسال Prototype وقتی لینک Figma قابل خواندن نیست

برای هر interaction یک ویدیوی کوتاه MP4 یا GIF با سرعت 1x ارسال شود. ویدیو باید از قبل از
interaction شروع شود و پایان transition را هم نشان دهد. همراه هر فایل این موارد نوشته شود:

- نام trigger: click، hover، drag، scroll یا after-delay
- لینک node شروع و node پایان
- duration و easing در صورت موجود بودن در Inspect
- رفتار reverse یا exit
- وضعیت mobile و desktop اگر متفاوت هستند

برای Smart Animate بهتر است frame شروع و پایان به‌صورت PNG و assetهای واقعی به‌صورت SVG یا
PNG شفاف هم ضمیمه شوند. فایل‌ها را می‌توان مستقیماً در همین گفتگو attach کرد؛ نیازی به قرار
دادن رمز یا token داخل فایل‌ها نیست.

## Assets

Assetهای original از frame دانلود می‌شوند و با نام semantic در `public/assets` قرار می‌گیرند. SVG برای icon/logo و PNG/WebP برای تصاویر raster ترجیح داده می‌شود.
