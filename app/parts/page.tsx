import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import PageShell from "@/components/PageShell";
import { getCatalogForPage } from "@/lib/catalog";
import { typeImage } from "@/lib/images";
import { typeHref } from "@/lib/links";
import { FAMILIES } from "@/lib/names";
import type { PartTypeSummary } from "@/lib/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Every part type",
  description: "Power window switches, fuel pumps, ignition coils, radiator fans, sensors, wiper parts, locks and more at Rahul Motors, Mullick Bazar, Kolkata.",
  alternates: { canonical: "/parts" },
};

export default async function PartsIndex() {
  const catalog = await getCatalogForPage();
  const groups = FAMILIES.map((f) => {
    const types = catalog.types.filter((t) => t.family === f.id && t.slug !== "car-part");
    // Busiest types with a picture lead; the rest follow as plain links, A to Z.
    const pictured = types.filter((t) => typeImage(t)).sort((a, b) => b.count - a.count);
    const plain = types.filter((t) => !typeImage(t)).sort((a, b) => a.name.localeCompare(b.name));
    return { ...f, pictured, plain };
  }).filter((g) => g.pictured.length + g.plain.length > 0);
  const other = catalog.types.find((t) => t.slug === "car-part");

  return (
    <PageShell catalog={catalog}>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { label: "Part types" }]}
        title="Every part type"
        lead="Grouped the way a mechanic would look for them. Tap one to see the parts and their photos."
      />

      <nav aria-label="Part groups" className="sticky top-[68px] z-20 border-b border-line bg-paper/90 backdrop-blur md:top-[72px]">
        <div className="no-scrollbar shell flex gap-1.5 overflow-x-auto py-3">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="press shrink-0 rounded-[10px] border border-line bg-raised px-3.5 py-2 text-[14.5px] font-semibold text-ink-2 hover:border-ink hover:text-ink">
              {g.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="shell space-y-16 py-12 md:space-y-20 md:py-16">
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-36">
            <div className="mb-6 max-w-2xl">
              <h2 className="heading text-[28px] text-ink md:text-[34px]">{g.name}</h2>
              <p className="mt-1.5 text-[16px] leading-relaxed text-ink-3">{g.blurb}</p>
            </div>

            {g.pictured.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5 [&>*]:min-w-0 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4">
                {g.pictured.map((t) => (
                  <TypeCard key={t.slug} type={t} />
                ))}
              </div>
            )}

            {g.plain.length > 0 && (
              <ul className={`grid gap-2 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-3 ${g.pictured.length ? "mt-3.5" : ""}`}>
                {g.plain.map((t) => (
                  <li key={t.slug}>
                    <Link href={typeHref(t.slug)} className="press group flex items-center gap-3 rounded-[12px] border border-line bg-raised px-4 py-3.5 hover:border-line-strong">
                      <span className="min-w-0 flex-1 truncate text-[15.5px] font-medium text-ink">{t.name}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-ink-4 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {other && (
          <p className="text-[15.5px] text-ink-3">
            Not sure which group your part is in?{" "}
            <Link href={typeHref(other.slug)} className="font-semibold text-brass-deep hover:underline">
              See other parts
            </Link>{" "}
            or{" "}
            <Link href="/products" className="font-semibold text-brass-deep hover:underline">
              search all parts
            </Link>
            .
          </p>
        )}
      </div>
    </PageShell>
  );
}

/** A part type with its picture on the same grey mat as the part photos. */
function TypeCard({ type }: { type: PartTypeSummary }) {
  const src = typeImage(type, 400)!;
  return (
    <Link href={typeHref(type.slug)} className="lift group flex flex-col overflow-hidden rounded-[16px] border border-line bg-raised">
      <span className="block aspect-[4/3] overflow-hidden bg-sunken p-1.5 sm:p-2">
        <span className="block h-full w-full overflow-hidden rounded-[10px] shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" loading="lazy" decoding="async" className="zoom h-full w-full object-cover" />
        </span>
      </span>
      <span className="flex items-center justify-between gap-2 px-3.5 py-3 sm:px-4 sm:py-3.5">
        <span className="text-[15.5px] font-semibold leading-tight text-ink">{type.name}</span>
        <ArrowRight className="h-4 w-4 shrink-0 text-ink-4 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
      </span>
    </Link>
  );
}
