"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 to-emerald-400 text-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6"
      >
        Ready to take control of your spending?
      </motion.h2>
      <Link
        href="/dashboard"
        className="rounded-full bg-white text-emerald-600 px-8 py-3 font-semibold shadow-lg hover:bg-gray-100 transition"
      >
        Open Dashboard
      </Link>
    </section>
  );
}
