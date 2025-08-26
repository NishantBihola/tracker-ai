"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    features: ["Track expenses", "Basic charts", "CSV Export"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9/mo",
    features: [
      "Everything in Starter",
      "AI Categorization",
      "Budgets & Alerts",
      "Priority Support",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
        <p className="text-gray-400 mb-12">
          Choose the plan that fits your journey.
        </p>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl border ${
                t.highlight ? "border-emerald-500" : "border-white/10"
              } bg-gray-800/60 p-8 shadow-xl`}
            >
              <h3 className="text-2xl font-semibold mb-2">{t.name}</h3>
              <p className="text-4xl font-bold mb-6">{t.price}</p>
              <ul className="space-y-2 text-gray-300 mb-6">
                {t.features.map((f) => (
                  <li key={f}>✔ {f}</li>
                ))}
              </ul>
              <button className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 py-3 font-semibold hover:opacity-90 transition">
                Choose {t.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
