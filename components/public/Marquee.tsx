"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { publicApi, PublicCategory } from "@/lib/publicApi";

export default function Marquee() {
  const [categories, setCategories] = useState<PublicCategory[]>([]);

  useEffect(() => {
    publicApi.listCategories().then((items) => setCategories(items.slice(0, 12))).catch(() => setCategories([]));
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-12 md:py-20" id="featured-categories">
      <div className="shell">
        <div className="flex items-end justify-between gap-5 mb-7 md:mb-10">
          <h2 className="font-editorial text-4xl md:text-6xl leading-none tracking-[-.03em]" style={{ color: "var(--ink)" }}>Find it by category.</h2>
          <a href="#categories" className="hidden sm:inline-flex items-center gap-2 pb-1 text-xs font-bold uppercase tracking-[.12em] hover:text-[var(--accent)] transition-colors" style={{ color: "var(--ink-soft)" }}>View all <ArrowRight className="h-4 w-4" /></a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l" style={{ borderColor: "var(--line)" }}>
          {categories.map((category) => (
            <a
              key={category.id}
              href="#catalogue"
              onClick={() => window.dispatchEvent(new CustomEvent("rm:select-category", { detail: category.id }))}
              className="group min-h-24 md:min-h-28 p-4 md:p-5 flex flex-col justify-between border-r border-b transition-colors hover:bg-[var(--bg-elev)]"
              style={{ borderColor: "var(--line)" }}
            >
              <span className="text-[10px] uppercase tracking-[.16em]" style={{ color: "var(--ink-faint)" }}>Shop parts</span>
              <span className="flex items-end justify-between gap-3 text-sm md:text-base font-semibold" style={{ color: "var(--ink)" }}>
                <span className="line-clamp-2">{category.name}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent)] transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
