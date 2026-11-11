import "server-only";
import { cache } from "react";
import { API_BASE_URL } from "./constants";
import { cleanName, isRealName, makerOf, partTypeOf } from "./names";
import { normalise } from "./search";
import type { Catalog, MakerSummary, Part, PartTypeSummary, Photo } from "./types";
import { EMPTY_CATALOG } from "./types";

// The whole public parts list, read from the shop's server in pages and kept
// for five minutes. Every page of the site is built from this one list, so
// menus, counts and part pages always agree.

export const CATALOG_REVALIDATE = 300;
const PAGE_SIZE = 200;

interface RawImage {
  url: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string } | undefined>;
}

export interface RawProduct {
  id: number;
  name: string;
  brand?: string | null;
  car_name?: string | null;
  part_no?: string | null;
  description?: string | null;
  images?: RawImage[] | null;
  categories?: { id: number; name: string }[] | null;
}

export function toPhoto(img?: RawImage | null): Photo | null {
  if (!img?.url) return null;
  const f = img.formats ?? {};
  return {
    thumb: f.thumbnail?.url,
    small: f.small?.url,
    medium: f.medium?.url,
    large: f.large?.url,
    full: img.url,
    w: img.width,
    h: img.height,
  };
}

const meaningful = (value?: string | null) => (isRealName(value) ? cleanName(value) : null);

export function toPart(p: RawProduct): Part | null {
  const name = cleanName(p.name);
  if (!isRealName(name)) return null;
  const rawType = p.categories?.find((c) => isRealName(c.name))?.name ?? "Car part";
  const type = partTypeOf(rawType);
  const maker = makerOf(p.brand);
  const partNo = meaningful(p.part_no);
  const car = meaningful(p.car_name);
  const words = normalise([type.name, ...type.also, name, car, maker?.name, p.brand, partNo].filter(Boolean).join(" "));
  return {
    id: p.id,
    name,
    type: type.name,
    typeSlug: type.slug,
    family: type.family,
    maker: maker?.name ?? null,
    makerSlug: maker?.slug ?? null,
    partNo,
    car,
    photo: toPhoto(p.images?.[0]),
    words,
  };
}

async function fetchPage(page: number): Promise<{ data: RawProduct[]; pageCount: number }> {
  const res = await fetch(`${API_BASE_URL}/public/products?page=${page}&pageSize=${PAGE_SIZE}`, {
    next: { revalidate: CATALOG_REVALIDATE, tags: ["catalog"] },
  });
  if (!res.ok) throw new Error(`Parts list page ${page}: ${res.status}`);
  const body = await res.json();
  return { data: body?.data ?? [], pageCount: body?.meta?.pageCount ?? 1 };
}

function summarise(parts: Part[]): Catalog {
  const types = new Map<string, PartTypeSummary>();
  const makers = new Map<string, MakerSummary>();
  for (const part of parts) {
    const t = types.get(part.typeSlug) ?? { name: part.type, slug: part.typeSlug, family: part.family, count: 0, photo: null, makers: [] };
    t.count += 1;
    if (!t.photo && part.photo) t.photo = part.photo;
    if (part.makerSlug && !t.makers.includes(part.makerSlug)) t.makers.push(part.makerSlug);
    types.set(part.typeSlug, t);
    if (part.maker && part.makerSlug) {
      const m = makers.get(part.makerSlug);
      if (m) m.count += 1;
      else {
        const info = makerOf(part.maker);
        makers.set(part.makerSlug, { name: part.maker, slug: part.makerSlug, logo: info?.logo, bike: info?.bike, count: 1 });
      }
    }
  }
  return {
    parts,
    types: [...types.values()].sort((a, b) => b.count - a.count),
    makers: [...makers.values()].sort((a, b) => b.count - a.count),
  };
}

/**
 * The full catalogue. Throws when the shop's server can't be reached, so a
 * cached page is kept instead of being replaced with an empty one.
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  const first = await fetchPage(1);
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, first.pageCount - 1) }, (_, i) => fetchPage(i + 2)),
  );
  const raw = [first, ...rest].flatMap((p) => p.data);
  const parts = raw.map(toPart).filter((p): p is Part => p !== null);
  return summarise(parts);
});

/** For the build and the sitemap: an empty list instead of an error. */
export async function getCatalogOrEmpty(): Promise<Catalog> {
  try {
    return await getCatalog();
  } catch {
    return EMPTY_CATALOG;
  }
}

/** One part with all its photos, straight from the server. */
export async function fetchPartPhotos(id: number): Promise<Photo[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/products/${id}`, { next: { revalidate: CATALOG_REVALIDATE } });
    if (!res.ok) return [];
    const body = await res.json();
    return ((body?.data?.images ?? []) as RawImage[]).map(toPhoto).filter((p): p is Photo => p !== null);
  } catch {
    return [];
  }
}

/** Fields the browser needs for search and the parts grid. */
export { makerHref, typeHref, partHref } from "./links";

/**
 * For pages: during the build an unreachable server gives empty pages (so a
 * deploy never fails because of it); at run time it throws, so the last good
 * cached page stays up instead of being replaced by an empty one.
 */
export async function getCatalogForPage(): Promise<Catalog> {
  if (process.env.NEXT_PHASE === "phase-production-build") return getCatalogOrEmpty();
  return getCatalog();
}
