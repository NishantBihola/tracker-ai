"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GeneratorCTA() {
  return (
    <section id="generate" className="relative">
      <div className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200/50 dark:border-emerald-900/40
                        bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white">
          {/* glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,.12),transparent_50%)]" />
          <div className="relative p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Start with AI</h2>
            <p className="mt-3 text-white/90">
              Generate your expense tracker structure, then customize every detail in seconds.
            </p>

            <motion.div
              className="mt-7 inline-block"
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Link
                href="#features"
                className="rounded-2xl bg-white text-emerald-700 px-7 py-3 font-semibold shadow-lg hover:shadow-xl transition
                           inline-flex items-center gap-2"
              >
                Generate Now
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
