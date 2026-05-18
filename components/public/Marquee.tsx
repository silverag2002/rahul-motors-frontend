"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Zap } from "lucide-react";
import { publicApi, PublicCategory } from "@/lib/publicApi";

export default function Marquee() {
  const [cats, setCats] = useState<PublicCategory[]>([]);

  useEffect(() => {
    publicApi.listCategories().then((c) => setCats(c.slice(0, 12))).catch(() => setCats([]));
  }, []);

  if (cats.length === 0) return null;

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" style={{ color: "var(--accent)" }} />
            <h2 className="text-base md:text-lg font-semibold" style={{ color: "var(--ink)" }}>
              Shop by category
            </h2>
          </div>
          <a
            href="#categories"
            className="inline-flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4"
            style={{ color: "var(--accent)" }}
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
          {cats.map((c) => (
            <a
              key={c.id}
              href={`#catalogue`}
              onClick={() => {
                const ev = new CustomEvent("rm:select-category", { detail: c.id });
                window.dispatchEvent(ev);
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-colors hover:bg-[var(--bg-muted)] text-center"
              style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}
            >
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div
                className="text-xs font-medium line-clamp-2 leading-tight"
                style={{ color: "var(--ink-2)" }}
              >
                {c.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
