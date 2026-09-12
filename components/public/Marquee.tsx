"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { publicApi, PublicCategory } from "@/lib/publicApi";

export default function Marquee() {
  const [categories, setCategories] = useState<PublicCategory[]>([]);

  useEffect(() => {
    publicApi.listCategories().then((items) => setCategories(items.slice(0, 12))).catch(() => setCategories([]));
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-14 md:py-24" id="featured-categories">
      <div className="shell">
        <div className="grid md:grid-cols-12 gap-6 md:items-end mb-8 md:mb-12">
          <h2 className="md:col-span-8 font-editorial text-6xl md:text-8xl leading-[.78] tracking-[-.025em]" style={{ color: "var(--ink)" }}>Parts,<br />sorted.</h2>
          <div className="md:col-span-4 md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[.16em]" style={{ color: "var(--accent)" }}>Live category directory</p>
            <p className="mt-2 text-sm" style={{ color: "var(--ink-soft)" }}>Jump straight to the shelf you need.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l" style={{ borderColor: "var(--ink)" }}>
          {categories.map((category) => (
            <a
              key={category.id}
              href="#catalogue"
              onClick={() => window.dispatchEvent(new CustomEvent("rm:select-category", { detail: category.id }))}
              className="group grid grid-cols-[58px_1fr_auto] min-h-20 items-center border-r border-b transition-colors hover:bg-[var(--accent)]"
              style={{ borderColor: "var(--ink)" }}
            >
              <span className="self-stretch grid place-items-center border-r text-[9px] font-bold tabular-nums" style={{ color: "var(--ink-faint)", borderColor: "var(--ink)" }}>C-{String(category.id).padStart(3, "0")}</span>
              <span className="px-4 text-xs md:text-sm font-bold uppercase tracking-[.045em] line-clamp-2" style={{ color: "var(--ink)" }}>{category.name}</span>
              <ArrowUpRight className="mr-4 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "var(--ink)" }} />
            </a>
          ))}
        </div>

        <a href="#categories" className="mt-5 ml-auto flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] border-b border-[var(--ink)] pb-1 hover:text-[var(--accent)]">View full directory <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}
