import { Trophy } from "lucide-react";

import { GuestGuard } from "@/features/auth/components/auth-guard";
import { LoginForm } from "@/features/auth/components/login-form";
import { Card } from "@/shared/components/ui/card";

export const metadata = {
  title: "ورود",
};

export default function LoginPage() {
  return (
    <GuestGuard>
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_top_right,#d9f2ff,transparent_38%),radial-gradient(circle_at_bottom_left,#d8ccff,transparent_40%),linear-gradient(135deg,#eef8ff,#eeeaff)] p-4">
        <div className="absolute -right-20 top-24 size-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute -left-20 bottom-12 size-72 rounded-full bg-violet-400/20 blur-3xl" />

        <Card className="relative grid w-full max-w-[900px] overflow-hidden p-0 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden min-h-[570px] flex-col justify-between bg-gradient-to-br from-sky-500 via-blue-600 to-violet-700 p-10 text-white lg:flex">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <Trophy className="size-7" />
                </div>
                <div>
                  <strong className="block text-2xl">paraf club</strong>
                  <span className="text-xs text-white/70">باشگاه مشتریان پاراف</span>
                </div>
              </div>
              <h1 className="text-4xl font-black leading-[1.6]">هر فعالیت، یک قدم نزدیک‌تر به جایزه بعدی</h1>
              <p className="mt-5 max-w-sm text-sm leading-8 text-white/75">
                امتیازها، سکه‌ها، سطح وفاداری، ویترین‌ها و فعالیت‌های اخیر را در یک داشبورد یکپارچه مدیریت کنید.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              {[
                ["🏆", "سطح وفاداری"],
                ["🪙", "سکه و امتیاز"],
                ["🎁", "جوایز ویژه"],
              ].map(([icon, label]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                  <span className="mb-2 block text-2xl">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </section>

          <section className="p-7 sm:p-10 lg:p-12">
            <div className="mb-8">
              <span className="mb-3 block text-sm font-black text-sky-600">PARAF CUSTOMER CLUB</span>
              <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">ورود به باشگاه مشتریان</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">برای مشاهده داشبورد، اطلاعات حساب پاراف خود را وارد کنید.</p>
            </div>
            <LoginForm />
          </section>
        </Card>
      </main>
    </GuestGuard>
  );
}
