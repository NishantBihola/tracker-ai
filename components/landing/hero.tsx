"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl font-extrabold mb-6"
      >
        Track Expenses Smarter with{" "}
        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          AI
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl text-lg text-gray-300 mb-10"
      >
        Gain clarity, stay on budget, and get insights into your spending —
        effortlessly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <Link
          href="/dashboard"
          className="rounded-full bg-emerald-500 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-emerald-600 transition"
        >
          Get Started
        </Link>
        <Link
          href="#pricing"
          className="rounded-full border border-white/20 px-6 py-3 text-lg font-semibold text-white hover:bg-white/10 transition"
        >
          See Pricing
        </Link>
      </motion.div>
    </section>
  );
}
