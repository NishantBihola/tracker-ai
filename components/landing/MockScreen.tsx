"use client";

export default function MockScreen() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="absolute inset-0 -z-10 rounded-[22px] bg-[conic-gradient(var(--tw-gradient-stops))] from-emerald-500 via-cyan-500 to-teal-500 opacity-40 blur-xl" />
      <div className="rounded-[20px] border border-white/30 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-4 shadow-[0_12px_60px_-20px_rgba(16,185,129,.35)]">
        {/* fake window chrome */}
        <div className="mb-3 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <div className="ml-3 text-xs text-muted-foreground">ExpenseTracker – Dashboard</div>
        </div>
        {/* mock content rows */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
            <div className="mb-2 h-4 w-24 rounded bg-emerald-500/20" />
            <div className="space-y-2">
              <div className="h-3 w-5/6 rounded bg-emerald-500/10" />
              <div className="h-3 w-2/3 rounded bg-emerald-500/10" />
              <div className="h-3 w-4/6 rounded bg-emerald-500/10" />
            </div>
          </div>
          <div className="rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
            <div className="mb-2 h-4 w-28 rounded bg-emerald-500/20" />
            <div className="h-28 rounded-xl bg-gradient-to-b from-emerald-500/15 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
