import type { PartFamily } from "./names";

/** One photo in the sizes the shop's server keeps. */
export interface Photo {
  thumb?: string;
  small?: string;
  medium?: string;
  large?: string;
  full: string;
  w?: number;
  h?: number;
}

/** A part as the website uses it: cleaned up, no prices, no stock. */
export interface Part {
  id: number;
  /** As typed at the shop, usually the car model and variant ("I-10", "CITY ZX"). */
  name: string;
  /** Readable part type ("Ignition coil"). */
  type: string;
  typeSlug: string;
  family: PartFamily;
  maker: string | null;
  makerSlug: string | null;
  partNo: string | null;
  car: string | null;
  photo: Photo | null;
  /** Lower-case words this part can be found by. */
  words: string;
}

export interface PartTypeSummary {
  name: string;
  slug: string;
  family: PartFamily;
  count: number;
  /** A real photo from one of the parts, for tiles. */
  photo: Photo | null;
  /** The shop's own photo for this category, uploaded in the admin panel. */
  image?: Photo | null;
  makers: string[];
}

export interface MakerSummary {
  name: string;
  slug: string;
  logo?: string;
  bike?: boolean;
  count: number;
}

export interface Catalog {
  parts: Part[];
  types: PartTypeSummary[];
  makers: MakerSummary[];
}

export const EMPTY_CATALOG: Catalog = { parts: [], types: [], makers: [] };

/** The best size of a photo for a given display width in CSS pixels. */
export function photoSrc(photo: Photo, width: number): string {
  if (width <= 160) return photo.thumb || photo.small || photo.medium || photo.full;
  if (width <= 400) return photo.small || photo.medium || photo.large || photo.full;
  if (width <= 600) return photo.medium || photo.large || photo.full;
  return photo.large || photo.full;
}

export function photoSrcSet(photo: Photo): string | undefined {
  const set = [
    photo.thumb && `${photo.thumb} 245w`,
    photo.small && `${photo.small} 500w`,
    photo.medium && `${photo.medium} 750w`,
    photo.large && `${photo.large} 1000w`,
  ].filter(Boolean);
  return set.length ? set.join(", ") : undefined;
}

/** "Ignition coil for I-10" — the way a person would say it. */
export function partTitle(part: Pick<Part, "type" | "name">): string {
  return `${part.type} · ${part.name}`;
}
