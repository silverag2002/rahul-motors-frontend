import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import PageShell from "@/components/PageShell";
import { getCatalogForPage } from "@/lib/catalog";
import { typeHref } from "@/lib/links";
import { FAMILIES } from "@/lib/names";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Every part type",
  description: "Power window switches, fuel pumps, ignition coils, radiator fans, sensors, wiper parts, locks and more at Rahul Motors, Mullick Bazar, Kolkata.",
  alternates: { canonical: "/parts" },
};

export default async function PartsIndex() {
  const catalog = await getCatalogForPage();
  return (
    <PageShell catalog={catalog}>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { label: "Part types" }]}
        title="Every part type"
        lead="Grouped the way a mechanic would look for them. Tap one to see the parts and their photos."
      />
      <div className="shell grid gap-x-10 gap-y-12 py-10 md:grid-cols-2 md:py-14">
        {FAMILIES.map((f) => {
          const types = catalog.types.filter((t) => t.family === f.id).sort((a, b) => a.name.localeCompare(b.name));
          if (!types.length) return null;
          return (
            <section key={f.id}>
              <h2 className="heading text-[24px] text-ink">{f.name}</h2>
              <p className="mt-1 text-[15px] text-ink-3">{f.blurb}</p>
              <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[16px] border border-line bg-raised">
                {types.map((t) => (
                  <li key={t.slug}>
                    <Link href={typeHref(t.slug)} className="group flex items-center gap-3 px-4 py-3.5 hover:bg-sunken">
                      <span className="flex-1 text-[16px] font-medium text-ink">{t.name}</span>
                      <ChevronRight className="h-4 w-4 text-ink-4 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
