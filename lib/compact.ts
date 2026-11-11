import type { PartFamily } from "./names";
import { normalise } from "./search";
import type { Catalog, MakerSummary, Part, PartTypeSummary, Photo } from "./types";

// The parts list sent to the browser for instant search. Photo addresses all
// follow one pattern (folder + "small_" + file name), so only the folder and
// file name are sent, and each part is a short array instead of an object.

type CompactPhoto = [folder: number, file: string, sizes: string];
type CompactPart = [id: number, name: string, type: number, maker: number, partNo: string, car: string, photo: CompactPhoto | 0];

export interface CompactCatalog {
  v: 1;
  folders: string[];
  types: { name: string; slug: string; family: PartFamily; also: string[]; count: number }[];
  makers: MakerSummary[];
  parts: CompactPart[];
}

const SIZES: [keyof Photo, string, string][] = [
  ["thumb", "t", "thumbnail_"],
  ["small", "s", "small_"],
  ["medium", "m", "medium_"],
  ["large", "l", "large_"],
];

export function encodeCatalog(catalog: Catalog, alsoOf: (typeName: string) => string[]): CompactCatalog {
  const folders: string[] = [];
  const typeIndex = new Map(catalog.types.map((t, i) => [t.slug, i]));
  const makerIndex = new Map(catalog.makers.map((m, i) => [m.slug, i]));
  const photo = (p: Photo | null): CompactPhoto | 0 => {
    if (!p) return 0;
    const cut = p.full.lastIndexOf("/");
    const folder = p.full.slice(0, cut);
    let fi = folders.indexOf(folder);
    if (fi < 0) fi = folders.push(folder) - 1;
    return [fi, p.full.slice(cut + 1), SIZES.filter(([k]) => p[k]).map(([, c]) => c).join("")];
  };
  return {
    v: 1,
    folders,
    types: catalog.types.map((t) => ({ name: t.name, slug: t.slug, family: t.family, also: alsoOf(t.name), count: t.count })),
    makers: catalog.makers,
    parts: catalog.parts.map((p) => [
      p.id,
      p.name,
      typeIndex.get(p.typeSlug) ?? 0,
      p.makerSlug ? (makerIndex.get(p.makerSlug) ?? -1) : -1,
      p.partNo ?? "",
      p.car ?? "",
      photo(p.photo),
    ]),
  };
}

export function decodeCatalog(c: CompactCatalog): Catalog {
  const parts: Part[] = c.parts.map(([id, name, ti, mi, partNo, car, ph]) => {
    const type = c.types[ti];
    const maker = mi >= 0 ? c.makers[mi] : null;
    let photo: Photo | null = null;
    if (ph) {
      const [fi, file, sizes] = ph;
      const folder = c.folders[fi];
      photo = { full: `${folder}/${file}` };
      for (const [k, code, prefix] of SIZES) if (sizes.includes(code)) (photo as unknown as Record<string, string>)[k] = `${folder}/${prefix}${file}`;
    }
    return {
      id,
      name,
      type: type.name,
      typeSlug: type.slug,
      family: type.family,
      maker: maker?.name ?? null,
      makerSlug: maker?.slug ?? null,
      partNo: partNo || null,
      car: car || null,
      photo,
      words: normalise([type.name, ...type.also, name, car, maker?.name, partNo].filter(Boolean).join(" ")),
    };
  });
  const types: PartTypeSummary[] = c.types.map((t) => ({ name: t.name, slug: t.slug, family: t.family, count: t.count, photo: null, makers: [] }));
  return { parts, types, makers: c.makers };
}
