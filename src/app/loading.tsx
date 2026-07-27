export default function Loading() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-[#e9e8ff]"
      dir="rtl"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        <p className="text-sm font-semibold text-slate-600">
          در حال آماده‌سازی باشگاه مشتریان...
        </p>
      </div>
    </main>
  );
}
