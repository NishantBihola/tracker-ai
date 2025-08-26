"use client";

import { motion } from "framer-motion";
import { Brain, BarChart3, Upload, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Categorization",
    desc: "Automatically tag expenses by vendor and keywords.",
  },
  {
    icon: BarChart3,
    title: "Visual Insights",
    desc: "Beautiful charts to track trends and categories.",
  },
  {
    icon: Upload,
    title: "CSV Import / Export",
    desc: "Upload bank statements or export clean reports anytime.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    desc: "Clerk auth + Neon Postgres keep your data safe.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-950 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
        <p className="text-gray-400 mb-12">
          Built for clarity, speed, and peace of mind.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gray-900/60 p-6 shadow-lg hover:scale-105 transition"
            >
              <f.icon className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
