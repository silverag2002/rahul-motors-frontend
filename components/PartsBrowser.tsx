"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { PartGrid } from "./PartCard";
import WhatsAppIcon from "./WhatsAppIcon";
import { FAMILIES } from "@/lib/names";
import { filterParts, type Filters } from "@/lib/search";
import { whatsappLink } from "@/lib/shop";
import { useCatalog } from "@/lib/useCatalog";
import type { MakerSummary, Part, PartTypeSummary } from "@/lib/types";

const STEP = 24;

interface Props {
  /** What the server already worked out for this address, shown until the full list arrives. */
  initial: { parts: Part[]; total: number };
  types: PartTypeSummary[];
  makers: MakerSummary[];
  filters: Filters;
  /** Fixed filters on landing pages (a part type or a maker page), not shown as controls. */
  lock?: { type?: string; maker?: string };
}

export default function PartsBrowser({ initial, types, makers, filters, lock }: Props) {
  const router = useRouter();
  const path = usePathname();
  const [q, setQ] = useState(filters.q ?? "");
  const [type, setType] = useState(lock?.type ?? filters.type ?? "");
  const [maker, setMaker] = useState(lock?.maker ?? filters.maker ?? "");
  const [photo, setPhoto] = useState(!!filters.photo);
  const filterKey = `${q}|${type}|${maker}|${photo}`;
  const [more, setMore] = useState({ key: filterKey, n: STEP });
  const shown = more.key === filterKey ? more.n : STEP;
  const { catalog, error, retry } = useCatalog();

  // Keep the address in step with the filters (search text after a short pause).
  useEffect(() => {
    const t = setTimeout(() => {
      const p = new URLSearchParams();
      if (q.trim()) p.set("q", q.trim());
      if (type && !lock?.type) p.set("type", type);
      if (maker && !lock?.maker) p.set("maker", maker);
      if (photo) p.set("photo", "1");
      const next = p.toString() ? `${path}?${p}` : path;
      if (next !== `${window.location.pathname}${window.location.search}`) router.replace(next, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [q, type, maker, photo, path, router, lock?.type, lock?.maker]);

  const results = useMemo(() => {
    if (!catalog) return null;
    return filterParts(catalog.parts, { q, type: type || undefined, maker: maker || undefined, photo });
  }, [catalog, q, type, maker, photo]);

  const list = results ?? initial.parts;
  const total = results ? results.length : initial.total;
  const visible = list.slice(0, shown);

  // Makers that actually have parts of the chosen type, and the other way round.
  const makerOptions = useMemo(() => {
    if (!catalog || !type) return makers;
    const slugs = new Set(catalog.parts.filter((p) => p.typeSlug === type).map((p) => p.makerSlug));
    return makers.filter((m) => slugs.has(m.slug) || m.slug === maker);
  }, [catalog, type, makers, maker]);
  const typeOptions = useMemo(() => {
    if (!catalog || !maker) return types;
    const slugs = new Set(catalog.parts.filter((p) => p.makerSlug === maker).map((p) => p.typeSlug));
    return types.filter((t) => slugs.has(t.slug) || t.slug === type);
  }, [catalog, maker, types, type]);

  const hasFilters = !!(q || (type && !lock?.type) || (maker && !lock?.maker) || photo);
  const askText = `Hello Rahul Motors, I could not find this on the website:\n\n${[q && `Search: ${q}`, type && `Part: ${types.find((t) => t.slug === type)?.name}`, maker && `Car maker: ${makers.find((m) => m.slug === maker)?.name}`].filter(Boolean).join("\n")}\n\nCar and model:`;

  return (
    <div>
      <div className="grid gap-2.5 md:grid-cols-[1fr_auto_auto] md:items-center">
        <label className="field flex h-12 items-center gap-2.5 rounded-[12px] pl-3.5 pr-1.5">
          <Search className="h-[18px] w-[18px] shrink-0 text-ink-3" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Car model, part or part number"
            aria-label="Search parts"
            enterKeyHint="search"
            className="min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="grid h-9 w-9 place-items-center rounded-full text-ink-3 hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
        <div className={`grid gap-2.5 ${lock?.type || lock?.maker ? "grid-cols-1" : "grid-cols-2"} md:contents`}>
          {!lock?.type && (
            <Select label="Part type" value={type} onChange={setType}>
              <option value="">All part types</option>
              {FAMILIES.map((f) => {
                const inFamily = typeOptions.filter((t) => t.family === f.id);
                if (!inFamily.length) return null;
                return (
                  <optgroup key={f.id} label={f.name}>
                    {inFamily.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </Select>
          )}
          {!lock?.maker && (
            <Select label="Car maker" value={maker} onChange={setMaker}>
              <option value="">All car makers</option>
              {makerOptions.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name}
                </option>
              ))}
            </Select>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <label className="inline-flex cursor-pointer select-none items-center gap-2 text-[15px] text-ink-2">
          <input type="checkbox" checked={photo} onChange={(e) => setPhoto(e.target.checked)} className="h-[18px] w-[18px] accent-[var(--color-brass)]" />
          Only parts with a photo
        </label>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              if (!lock?.type) setType("");
              if (!lock?.maker) setMaker("");
              setPhoto(false);
            }}
            className="text-[15px] font-semibold text-brass-deep hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {error && !results && (
        <p className="mt-4 rounded-[12px] border border-line bg-raised px-4 py-3 text-[15px] text-ink-2">
          Search is not working right now, so only the first parts are shown.{" "}
          <button type="button" onClick={retry} className="font-semibold text-brass-deep underline">
            Try again
          </button>
        </p>
      )}

      <div className="mt-6">
        {total === 0 ? (
          <div className="rounded-[18px] border border-dashed border-line-strong bg-raised px-6 py-14 text-center">
            <p className="heading text-[24px] text-ink">Not on the website? Ask anyway.</p>
            <p className="mx-auto mt-2 max-w-md text-[16px] text-ink-3">
              The shop may have it even if it is not listed here. Send us the car and the part on WhatsApp and we will check.
            </p>
            <a
              href={whatsappLink(askText)}
              target="_blank"
              rel="noopener"
              className="press mt-6 inline-flex h-12 items-center gap-2 rounded-[12px] bg-whatsapp px-5 text-[15px] font-semibold text-whatsapp-ink"
            >
              <WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp
            </a>
          </div>
        ) : (
          <>
            <PartGrid key={filterKey} parts={visible} hideType={!!lock?.type || !!type} eager={4} />
            {shown < total && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setMore({ key: filterKey, n: shown + STEP })}
                  disabled={!catalog}
                  className="press inline-flex h-12 items-center gap-2 rounded-[12px] border border-line-strong bg-raised px-6 text-[15px] font-semibold text-ink hover:border-ink disabled:opacity-60"
                >
                  {catalog ? "Show more parts" : "Loading…"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="field relative flex h-12 min-w-0 items-center rounded-[12px] md:w-56">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-full w-full min-w-0 appearance-none truncate rounded-[12px] bg-transparent pr-9 pl-3.5 text-[15.5px] outline-none ${value ? "font-semibold text-ink" : "text-ink-2"}`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-ink-3" />
    </label>
  );
}
