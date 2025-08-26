"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BackgroundFX() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-20">
      {/* soft gradient orbs */}
      <motion.div style={{ y }} className="absolute left-[-15%] top-[-10%] h-[50vh] w-[50vh] rounded-full bg-emerald-500/20 blur-3xl" />
      <motion.div style={{ y }} className="absolute right-[-10%] top-[10%] h-[45vh] w-[45vh] rounded-full bg-teal-400/20 blur-3xl" />
      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid-dark/5 dark:bg-grid/6" />
      {/* noise */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.07] dark:opacity-[0.08] mix-blend-multiply" />
    </div>
  );
}
