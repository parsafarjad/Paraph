import Link from "next/link";

import { Button } from "@/shared/components/ui/button";

export default function NotFound() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-slate-100 p-4 text-center"
      dir="rtl"
    >
      <div>
        <p className="text-7xl font-black text-violet-600">۴۰۴</p>
        <h1 className="mt-4 text-2xl font-black">صفحه مورد نظر پیدا نشد</h1>
        <Button asChild className="mt-6">
          <Link href="/">بازگشت به داشبورد</Link>
        </Button>
      </div>
    </main>
  );
}
