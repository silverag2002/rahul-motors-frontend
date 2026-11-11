"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { useCatalog } from "@/lib/useCatalog";
import { searchParts, tokens } from "@/lib/search";
import { makerHref, partHref, typeHref } from "@/lib/links";
import { normalise } from "@/lib/search";
import { photoSrc } from "@/lib/types";

/**
 * The big search field. Suggestions appear as you type (part types, car
 * makers and the closest parts); Enter opens the full list for that search.
 */
export default function SearchBox({ size = "lg", autoFocus = false, placeholder }: { size?: "lg" | "md"; autoFocus?: boolean; placeholder?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  // Start loading the list as soon as someone shows interest in searching.
  const [wanted, setWanted] = useState(false);
  const { catalog } = useCatalog(wanted);
  const listId = useId();
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!catalog || !tokens(q).length) return null;
    const nq = ` ${normalise(q)}`;
    const types = catalog.types.filter((t) => ` ${normalise(t.name)}`.includes(nq)).slice(0, 2);
    const makers = catalog.makers.filter((m) => ` ${normalise(m.name)}`.includes(nq)).slice(0, 2);
    const parts = searchParts(catalog.parts, q);
    return { types, makers, parts: parts.slice(0, 6), total: parts.length };
  }, [catalog, q]);

  const shortcuts = useMemo(
    () =>
      results
        ? [
            ...results.types.map((t) => ({ kind: "Part type", label: t.name, href: typeHref(t.slug) })),
            ...results.makers.map((m) => ({ kind: "Car maker", label: m.name, href: makerHref(m.slug) })),
          ]
        : [],
    [results],
  );
  const items = useMemo(() => [...shortcuts.map((s) => ({ href: s.href })), ...(results?.parts ?? []).map((p) => ({ href: partHref(p) }))], [shortcuts, results]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (active >= 0 && items[active]) return router.push(items[active].href);
    const query = q.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  function onKey(e: React.KeyboardEvent) {
    if (!items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? items.length - 1 : a - 1));
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  }

  const open = focused && q.trim().length > 0;
  const big = size === "lg";

  return (
    <div ref={boxRef} className="relative w-full">
      <form onSubmit={submit} role="search">
        <label
          className={`field flex items-center gap-2.5 rounded-[14px] ${big ? "h-[58px] pl-4.5 pr-2" : "h-12 pl-3.5 pr-1.5"}`}
        >
          <Search className={`shrink-0 text-ink-3 ${big ? "h-5 w-5" : "h-[18px] w-[18px]"}`} />
          <input
            type="search"
            value={q}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(-1);
            }}
            onFocus={() => {
              setFocused(true);
              setWanted(true);
            }}
            onPointerEnter={() => setWanted(true)}
            onKeyDown={onKey}
            placeholder={placeholder ?? "Car or part, e.g. i10 switch"}
            aria-label="Search parts"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
            autoComplete="off"
            enterKeyHint="search"
            className={`min-w-0 flex-1 bg-transparent text-ink outline-none ${big ? "text-[17px]" : "text-[16px]"}`}
          />
          {q && (
            <button type="button" onClick={() => { setQ(""); setActive(-1); }} aria-label="Clear" className="grid h-8 w-8 place-items-center rounded-full text-ink-3 hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className={`press inline-flex shrink-0 items-center gap-1.5 rounded-[10px] bg-brass font-semibold text-on-brass hover:brightness-105 ${big ? "h-[44px] px-5 text-[15px]" : "h-9 px-3.5 text-[14px]"}`}
          >
            Search
          </button>
        </label>
      </form>

      {open && (
        <div
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-[70vh] overflow-y-auto rounded-[14px] border border-line bg-raised p-1.5 text-left shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)]"
        >
          {!results ? (
            <p className="px-3 py-3 text-[14px] text-ink-3">{catalog ? "Type a car or part name." : "Loading the parts list…"}</p>
          ) : results.total === 0 && !results.types.length && !results.makers.length ? (
            <p className="px-3 py-3 text-[14px] text-ink-3">
              Nothing matches “{q.trim()}”. Try the car model alone, or ask us on WhatsApp.
            </p>
          ) : (
            <>
              {shortcuts.map((s, i) => {
                return (
                  <Link
                    key={s.href}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={active === i}
                    href={s.href}
                    className={`flex items-center justify-between rounded-[10px] px-3 py-2.5 text-[15px] ${active === i ? "bg-sunken" : "hover:bg-sunken"}`}
                  >
                    <span className="font-semibold text-ink">{s.label}</span>
                    <span className="text-[12.5px] text-ink-3">{s.kind}</span>
                  </Link>
                );
              })}
              {results.parts.map((p, j) => {
                const i = shortcuts.length + j;
                return (
                  <Link
                    key={p.id}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={active === i}
                    href={partHref(p)}
                    className={`flex items-center gap-3 rounded-[10px] px-2 py-2 ${active === i ? "bg-sunken" : "hover:bg-sunken"}`}
                  >
                    <span className="h-11 w-11 shrink-0 overflow-hidden rounded-[8px] bg-sunken">
                      {p.photo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photoSrc(p.photo, 100)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] font-semibold text-ink">{p.name}</span>
                      <span className="block truncate text-[13px] text-ink-3">{[p.type, p.maker].filter(Boolean).join(" · ")}</span>
                    </span>
                  </Link>
                );
              })}
              {results.total > results.parts.length && (
                <Link
                  href={`/products?q=${encodeURIComponent(q.trim())}`}
                  className="mt-1 flex items-center justify-between rounded-[10px] border-t border-line px-3 py-3 text-[14px] font-semibold text-brass-deep hover:bg-sunken"
                >
                  See all results <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
