"use client";

import useEmblaCarousel from "embla-carousel-react";

const brands = ["Visa", "Mastercard", "Stripe", "Plaid", "QuickBooks", "Xero", "Wise", "Revolut"];

export default function LogosCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });

  return (
    <div className="border-y bg-background/60 backdrop-blur">
      <div className="mx-auto max-w-6xl overflow-hidden px-4 py-3">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {[...brands, ...brands].map((b, i) => (
              <div key={i} className="embla__slide shrink-0 px-6 py-2 text-sm text-muted-foreground opacity-70">
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .embla__container { will-change: transform; }
        .embla__slide { flex: 0 0 auto; }
      `}</style>
    </div>
  );
}
