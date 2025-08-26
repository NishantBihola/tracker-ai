"use client";
export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/60 dark:border-white/10
      bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl
      shadow-[0_1px_0_#ffffff80_inset,0_8px_30px_-6px_rgba(0,0,0,.25)]
      transition hover:shadow-[0_1px_0_#ffffff80_inset,0_12px_36px_-8px_rgba(0,0,0,.35)] animate-fade-in">
      {children}
    </div>
  );
}
