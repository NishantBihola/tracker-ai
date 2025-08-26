"use client";

import { motion } from "framer-motion";
import { BadgePill } from "@/components/ui/BadgePill";

const steps = [
  { title: "Create a new project", desc: "Kick off a blank workspace in seconds." },
  { title: "Describe what you want", desc: "Tell the AI your structure, categories, and rules." },
  { title: "Customize & refine", desc: "Edit fields, rename sections, tweak layouts to match your flow." },
  { title: "Export & share", desc: "Download CSV/PDF or share a live view with teammates." },
];

export default function HowItWorks() {
  return (
    <section id="learn-more" className="container mx-auto max-w-6xl px-4 pb-24">
      <div className="mb-8 flex items-center justify-center gap-2">
        <BadgePill>How it works</BadgePill>
      </div>

      <div className="mx-auto grid max-w-3xl gap-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.05 * i, duration: 0.45, ease: "easeOut" }}
            className="rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur
                       p-5 shadow-sm"
          >
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Step {i + 1}</div>
            <div className="mt-1 text-lg font-semibold">{s.title}</div>
            <div className="mt-1 text-gray-600 dark:text-gray-300">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
