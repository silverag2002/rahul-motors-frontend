"use client";

import { ShieldCheck, Truck, Wrench, Clock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    body: "Direct from OEM channels and audited suppliers. No grey market, no compromises.",
  },
  {
    icon: Wrench,
    title: "Workshop-grade",
    body: "Sensors, switches, ABS components — the obscure stuff mechanics actually need.",
  },
  {
    icon: Truck,
    title: "Fast dispatch",
    body: "Same-day for in-stock parts. We ship across India to workshops and individuals.",
  },
  {
    icon: Clock,
    title: "30+ years strong",
    body: "Three decades of helping cars stay on the road. Reputation earned, part by part.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--ink)" }}>
            Why Rahul Motors
          </h2>
          <p className="mt-2 text-sm md:text-base" style={{ color: "var(--ink-soft)" }}>
            A family-run automotive parts specialist serving India&apos;s mechanics, workshops and
            owners since 1995.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="p-5 rounded-xl transition-shadow hover:shadow-md"
              style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
              >
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--ink)" }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
