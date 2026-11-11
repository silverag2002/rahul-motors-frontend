import { TYPE_PHOTOS } from "./images";
import { makerHref, typeHref } from "./links";
import type { Catalog, Part, PartTypeSummary } from "./types";

/** Photo tiles: only the part types that have a photo made in the same style, so the row looks like one set. */
export function tileTypes(catalog: Catalog): PartTypeSummary[] {
  return catalog.types.filter((t) => TYPE_PHOTOS[t.slug]);
}

/** The next busiest part types, shown as plain links under the tiles. */
export function moreTypes(catalog: Catalog, count = 12): PartTypeSummary[] {
  return catalog.types.filter((t) => !TYPE_PHOTOS[t.slug]).slice(0, count);
}

/** One photographed part from each of the busiest types, so the preview shows range. */
export function previewParts(catalog: Catalog, count = 8): Part[] {
  const picked: Part[] = [];
  for (const t of catalog.types) {
    if (picked.length >= count) break;
    const withPhoto = catalog.parts.filter((p) => p.typeSlug === t.slug && p.photo);
    if (withPhoto.length) picked.push(withPhoto[Math.floor(withPhoto.length / 3)]);
  }
  return picked;
}

export function quickLinks(catalog: Catalog) {
  const types = catalog.types.slice(0, 2).map((t) => ({ label: t.name, href: typeHref(t.slug) }));
  const makers = catalog.makers.filter((m) => !m.bike).slice(0, 2).map((m) => ({ label: m.name, href: makerHref(m.slug) }));
  return [...types, ...makers];
}
