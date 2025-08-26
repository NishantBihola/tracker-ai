"use client";

import { useState } from "react";

const faqs = [
  { q: "Is it free to start?", a: "Yes, the Starter plan is free forever." },
  { q: "Can I cancel anytime?", a: "Absolutely, no contracts or lock-ins." },
  { q: "Is my data safe?", a: "Yes. Clerk auth and Neon Postgres secure your data." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gray-950 text-white">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-4">FAQs</h2>
        <p className="text-gray-400 mb-12">Got questions? We’ve got answers.</p>

        <div className="space-y-4 text-left">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-gray-900/60 shadow"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 flex justify-between items-center"
              >
                <span className="font-medium">{f.q}</span>
                <span>{open === i ? "-" : "+"}</span>
              </button>
              {open === i && <div className="px-6 pb-4 text-gray-400">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
