"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/schemas/login.schema";
import { useLogin } from "@/features/auth/hooks/use-login";
import { Button } from "@/shared/components/ui/button";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "" },
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      noValidate
    >
      <div className="rounded-2xl bg-sky-50 p-4 text-sm leading-7 text-sky-900">
        <div className="mb-1 flex items-center gap-2 font-bold">
          <Sparkles className="size-4" />
          ارتباط با سرویس پاراف
        </div>
        درخواست ورود مستقیماً و با Axios به سرویس رسمی پاراف ارسال می‌شود.
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">
          شماره موبایل
        </span>
        <div className="relative">
          <Phone className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate-400" />
          <input
            {...register("phone")}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white pr-12 pl-4 text-left transition outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            dir="ltr"
            inputMode="tel"
            autoComplete="username"
            placeholder="989xxxxxxxxx"
            aria-invalid={Boolean(errors.phone)}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-rose-600">{errors.phone.message}</p>
        )}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">رمز عبور</span>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate-400" />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white pr-12 pl-12 text-left transition outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            dir="ltr"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.password)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-rose-600">{errors.password.message}</p>
        )}
      </label>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "در حال ورود..." : "ورود به باشگاه مشتریان"}
      </Button>
    </form>
  );
}
