"use client";

export function BadgePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium
      border-emerald-200/60 text-emerald-700 dark:text-emerald-300
      bg-emerald-50/70 dark:bg-emerald-900/20">
      {children}
    </span>
  );
}
