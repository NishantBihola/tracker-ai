"use client";

import { motion } from "framer-motion";
import { Brain, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.45, ease: "easeOut" },
  }),
};

export default function FeatureGrid() {
  const features = [
    { icon: Brain, title: "AI Insights", desc: "Detect unusual trends and get suggestions to optimize spend." },
    { icon: BarChart3, title: "Beautiful Analytics", desc: "Monthly burn, category breakdowns, top vendors, and more." },
    { icon: ShieldCheck, title: "Secure by Default", desc: "Strong boundaries and sensible data practices from day one." },
    { icon: Sparkles, title: "Fully Customizable", desc: "Tailor categories, rules, and views to your workflow." },
  ];

  return (
    <section id="features" className="container mx-auto max-w-6xl px-4 pb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {features.map((f, i) => (
        <motion.div key={f.title} variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} custom={i}>
          <GlassCard>
            <div className="p-6">
              <f.icon className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{f.desc}</p>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </section>
  );
}
