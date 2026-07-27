import { Inbox } from "lucide-react";

export function EmptyState({
  message = "اطلاعاتی برای نمایش وجود ندارد.",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center text-slate-500">
      <Inbox className="size-9 text-slate-300" aria-hidden="true" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
