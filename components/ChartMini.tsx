"use client";

import { motion } from "framer-motion";

type Point = { label: string; value: number };
export default function ChartMini({ data }: { data: Point[] }) {
  // guard
  const max = Math.max(1, ...data.map(d => d.value));
  const barW = 28;
  const gap = 12;
  const width = data.length * (barW + gap) + gap;
  const height = 160;
  const padB = 26;
  const padT = 10;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {data.map((d, i) => {
        const x = i * (barW + gap) + gap;
        const h = Math.round(((height - padB - padT) * d.value) / max);
        const y = height - padB - h;
        return (
          <g key={d.label} transform={`translate(${x},0)`}>
            <motion.rect
              initial={{ height: 0, y: height - padB }}
              whileInView={{ height: h, y }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              width={barW}
              rx={8}
              className="fill-emerald-500/80"
            />
            <text x={barW / 2} y={height - 8} textAnchor="middle" className="fill-current text-xs">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
