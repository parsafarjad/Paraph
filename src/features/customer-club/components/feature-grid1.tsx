import { Card } from "@/shared/components/ui/card";

const features = [
  {
    title: "جوایز ویژه",
    description: "با فعالیت در باشگاه مشتریان، امتیاز جمع کنید و جوایز اختصاصی دریافت کنید.",
    icon: "🎁",
  },
  {
    title: "پشتیبانی حرفه‌ای",
    description: "پاسخ‌گویی سریع‌تر و دسترسی به مسیر پشتیبانی ویژه اعضای باشگاه.",
    icon: "🎧",
  },
  {
    title: "ارسال رایگان",
    description: "مزایای حمل‌ونقل و پیشنهادهای ویژه برای سفارش‌های واجد شرایط.",
    icon: "🚀",
  },
  {
    title: "گزارش فروش",
    description: "مشاهده روند فعالیت‌ها، امتیازها و دستاوردهای دوره‌ای در یک نگاه.",
    icon: "📈",
  },
  {
    title: "رویدادهای ویژه",
    description: "دسترسی به رویدادها، کمپین‌ها و ماموریت‌های محدود باشگاه مشتریان.",
    icon: "🗓️",
  },
  {
    title: "شبکه همکاران",
    description: "ارتباط گسترده‌تر با اعضای اکوسیستم پاراف و فرصت‌های همکاری جدید.",
    icon: "👥",
  },
] as const;

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-[970px]">
      <h2 className="mb-5 text-right text-xl font-black text-slate-900">
        ویژگی‌های <span className="text-violet-700">پاراف کلاب</span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, description, icon }) => (
          <Card
            key={title}
            className="group min-h-[174px] rounded-2xl p-5 text-center transition duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(87,74,180,.16)]"
          >
            <span
              aria-hidden="true"
              className="mx-auto mb-3 block w-fit text-[46px] leading-none drop-shadow-[0_8px_10px_rgba(42,42,70,.16)] transition duration-300 group-hover:-rotate-3 group-hover:scale-110"
            >
              {icon}
            </span>
            <h3 className="mb-1.5 text-sm font-black text-slate-900">{title}</h3>
            <p className="text-[11px] leading-6 text-slate-500">{description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
