import { slugify } from "./names";

export const makerHref = (slug: string) => `/cars/${slug}`;
export const typeHref = (slug: string) => `/parts/${slug}`;
export const partHref = (part: { id: number; type: string; name: string }) =>
  `/part/${part.id}-${slugify(`${part.type} ${part.name}`).slice(0, 60)}`;

/** The id at the front of a part page's address ("1234-ignition-coil-i10" → 1234). */
export function idFromPartSlug(slug: string): number | null {
  const m = /^(\d+)/.exec(slug);
  return m ? Number(m[1]) : null;
}
