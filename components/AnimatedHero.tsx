"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Upload, Download } from "lucide-react";
import { BadgePill } from "@/components/ui/BadgePill";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // entrance stagger
      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });

      // subtle float on the blob
      gsap.to(".hero-blob", {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: "sine.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-blob absolute left-1/2 top-[-10%] h-[520px] w-[720px] -translate-x-1/2 rounded-full
                        bg-gradient-to-br from-emerald-300/30 via-teal-300/20 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 pt-20 pb-24 text-center">
        {/* top pills / generator badge */}
        <div className="mb-6 flex justify-center gap-2 flex-wrap hero-reveal">
          <BadgePill>🤖 AI Expense Tracker Generator</BadgePill>
          <BadgePill>✨ Dynamic AI builders</BadgePill>
          <BadgePill>✅ Download &amp; edit on-the-go</BadgePill>
          <BadgePill>🚀 Generate, publish, &amp; share</BadgePill>
        </div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
        >
          Generate{" "}
          <span className="bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
            AI Expense Tracker
          </span>
        </motion.h1>

        {/* subheadline */}
        <p className="hero-reveal mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          Start with AI. Monitor spending, auto-categorize, and surface insights — all in one sleek dashboard.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex justify-center gap-4 hero-reveal">
          <Link
            href="#generate"
            className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-medium shadow hover:bg-emerald-700 transition will-change-transform
                       inline-flex items-center gap-2"
          >
            <span>Generate Now</span>
            <span className="inline-block h-2 w-2 rounded-full bg-white/80 animate-pulse" />
          </Link>
          <Link
            href="#features"
            className="rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium
                       hover:bg-gray-50 dark:hover:bg-slate-900 transition"
          >
            Learn More
          </Link>
        </div>

        {/* mini feature row */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 hero-reveal">
          <span className="inline-flex items-center gap-2"><Upload className="h-4 w-4" /> Import CSV</span>
          <span>•</span>
          <span className="inline-flex items-center gap-2"><Download className="h-4 w-4" /> Export PDF/CSV</span>
        </div>
      </div>
    </section>
  );
}
