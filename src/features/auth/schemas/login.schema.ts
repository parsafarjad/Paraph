import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, "شماره موبایل را وارد کنید.")
    .regex(/^(?:\+?98|0)?9\d{9}$/, "شماره موبایل معتبر نیست."),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export function normalizeIranianPhone(phone: string) {
  const normalized = phone.replace(/[\s-]/g, "").replace(/^\+/, "");
  if (normalized.startsWith("09")) return `98${normalized.slice(1)}`;
  if (normalized.startsWith("98")) return normalized;
  if (normalized.startsWith("9")) return `98${normalized}`;
  return normalized;
}
