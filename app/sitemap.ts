import type { MetadataRoute } from "next";
import { getCatalogOrEmpty } from "@/lib/catalog";
import { makerHref, partHref, typeHref } from "@/lib/links";
import { SHOP } from "@/lib/shop";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalogOrEmpty();
  const u = (path: string) => `${SHOP.siteUrl}${path}`;
  return [
    { url: u("/"), changeFrequency: "daily", priority: 1 },
    { url: u("/products"), changeFrequency: "daily", priority: 0.9 },
    { url: u("/parts"), changeFrequency: "weekly", priority: 0.8 },
    { url: u("/cars"), changeFrequency: "weekly", priority: 0.8 },
    { url: u("/fit-guide"), changeFrequency: "monthly", priority: 0.6 },
    ...catalog.types.map((t) => ({ url: u(typeHref(t.slug)), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...catalog.makers.map((m) => ({ url: u(makerHref(m.slug)), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...catalog.parts.map((p) => ({ url: u(partHref(p)), changeFrequency: "weekly" as const, priority: p.photo ? 0.6 : 0.4 })),
  ];
}
