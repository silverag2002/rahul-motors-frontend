"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, SlidersHorizontal, ChevronDown, Package } from "lucide-react";
import { publicApi, PublicCategory, PublicProduct } from "@/lib/publicApi";
import ProductCard from "@/components/public/ProductCard";

const PAGE_SIZE = 24;

export default function Catalogue() {
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [appending, setAppending] = useState(false);

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const firstLoadRef = useRef(true);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search.trim()), 350);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    publicApi.listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    function onSelect(e: Event) {
      const id = (e as CustomEvent<number>).detail;
      if (typeof id === "number") setCategoryId(id);
    }
    window.addEventListener("rm:select-category", onSelect as EventListener);
    return () => window.removeEventListener("rm:select-category", onSelect as EventListener);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const params: Parameters<typeof publicApi.listProducts>[0] = {
          page: 1,
          pageSize: PAGE_SIZE,
        };
        if (debounced) params.name = debounced;
        if (brand) params.brand = brand;
        if (categoryId) params.categoryId = categoryId;

        const { data, meta } = await publicApi.listProducts(params);
        if (cancelled) return;
        setProducts(data);
        setTotal(meta?.total ?? data.length);
        setPageCount(meta?.pageCount ?? 1);
        setPage(1);

        if (firstLoadRef.current) {
          firstLoadRef.current = false;
          const { data: wider } = await publicApi.listProducts({ pageSize: 100 });
          if (!cancelled) {
            const unique = Array.from(
              new Set(wider.map((p) => (p.brand || "").trim()).filter(Boolean))
            ).sort();
            setBrands(unique);
          }
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [debounced, brand, categoryId]);

  async function loadMore() {
    if (page >= pageCount || appending) return;
    setAppending(true);
    try {
      const next = page + 1;
      const params: Parameters<typeof publicApi.listProducts>[0] = {
        page: next,
        pageSize: PAGE_SIZE,
      };
      if (debounced) params.name = debounced;
      if (brand) params.brand = brand;
      if (categoryId) params.categoryId = categoryId;
      const { data } = await publicApi.listProducts(params);
      setProducts((prev) => [...prev, ...data]);
      setPage(next);
    } finally {
      setAppending(false);
    }
  }

  const activeFilters = useMemo(
    () => [
      categoryId && categories.find((c) => c.id === categoryId)
        ? { kind: "cat" as const, label: categories.find((c) => c.id === categoryId)!.name, clear: () => setCategoryId(null) }
        : null,
      brand ? { kind: "brand" as const, label: brand, clear: () => setBrand(null) } : null,
      debounced ? { kind: "search" as const, label: `"${debounced}"`, clear: () => setSearch("") } : null,
    ].filter(Boolean) as { kind: string; label: string; clear: () => void }[],
    [categoryId, brand, debounced, categories]
  );

  return (
    <section id="catalogue" className="py-12 md:py-16" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--ink)" }}>
              Shop all parts
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>
              {total.toLocaleString()} products · Filter, search and inquire in one tap
            </p>
          </div>

          <div
            className="relative flex items-center w-full md:w-96 h-11 rounded-lg px-3.5"
            style={{ background: "var(--bg-elev)", border: "1px solid var(--line-strong)" }}
          >
            <Search className="h-4 w-4 mr-2.5" style={{ color: "var(--ink-soft)" }} />
            <input
              id="catalogue-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search parts…"
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "var(--ink)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X className="h-4 w-4" style={{ color: "var(--ink-soft)" }} />
              </button>
            )}
          </div>
        </div>

        {brands.length > 0 && (
          <div id="brands" className="mb-4">
            <div className="text-xs font-semibold mb-2" style={{ color: "var(--ink-2)" }}>
              Brands
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterPill active={brand === null} onClick={() => setBrand(null)}>
                All
              </FilterPill>
              {brands.map((b) => (
                <FilterPill key={b} active={brand === b} onClick={() => setBrand(b)}>
                  {b}
                </FilterPill>
              ))}
            </div>
          </div>
        )}

        <div id="categories" className="mb-5">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-2"
            style={{ color: "var(--ink-2)" }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Categories ({categories.length})
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
          <div
            className="overflow-hidden transition-[max-height] duration-300"
            style={{ maxHeight: showFilters ? "1000px" : "84px" }}
          >
            <div className="flex flex-wrap gap-2">
              <FilterPill active={categoryId === null} onClick={() => setCategoryId(null)}>
                All categories
              </FilterPill>
              {categories.map((c) => (
                <FilterPill key={c.id} active={categoryId === c.id} onClick={() => setCategoryId(c.id)}>
                  {c.name}
                </FilterPill>
              ))}
            </div>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-medium" style={{ color: "var(--ink-soft)" }}>
              Filters:
            </span>
            {activeFilters.map((f, i) => (
              <button
                key={i}
                onClick={f.clear}
                className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 h-7 rounded-full text-xs font-medium"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  border: "1px solid color-mix(in oklab, var(--accent) 25%, transparent)",
                }}
              >
                {f.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={() => {
                setBrand(null);
                setCategoryId(null);
                setSearch("");
              }}
              className="text-xs underline-offset-4 hover:underline"
              style={{ color: "var(--ink-soft)" }}
            >
              Clear all
            </button>
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {page < pageCount && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={appending}
                  className="inline-flex items-center gap-2 px-6 h-11 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--ink)",
                    color: "var(--bg)",
                  }}
                >
                  {appending ? "Loading…" : `Load more · ${total - products.length} left`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 h-8 rounded-full text-xs font-medium transition-colors"
      style={{
        background: active ? "var(--ink)" : "var(--bg-elev)",
        color: active ? "var(--bg)" : "var(--ink-2)",
        border: `1px solid ${active ? "var(--ink)" : "var(--line-strong)"}`,
      }}
    >
      {children}
    </button>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}
        >
          <div className="aspect-square shimmer" />
          <div className="p-3 space-y-2">
            <div className="h-4 rounded shimmer" />
            <div className="h-3 w-2/3 rounded shimmer" />
            <div className="h-8 rounded shimmer mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="text-center py-16 rounded-xl"
      style={{ background: "var(--bg-elev)", border: "1px dashed var(--line-strong)" }}
    >
      <Package className="h-9 w-9 mx-auto mb-3" style={{ color: "var(--ink-faint)" }} />
      <h3 className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
        No parts match your filters
      </h3>
      <p className="mt-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>
        Try clearing filters or contact us — we may have it in stock.
      </p>
    </div>
  );
}
