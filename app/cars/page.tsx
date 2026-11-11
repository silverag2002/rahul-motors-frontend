import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MakerGrid from "@/components/MakerGrid";
import PageHead from "@/components/PageHead";
import PageShell from "@/components/PageShell";
import { getCatalogForPage } from "@/lib/catalog";
import { makerHref } from "@/lib/links";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Parts by car maker",
  description: "Car parts for Hyundai, Maruti Suzuki, Mahindra, Honda, Tata, Ford, Toyota, Skoda, Renault and more at Rahul Motors, Mullick Bazar, Kolkata.",
  alternates: { canonical: "/cars" },
};

export default async function CarsIndex() {
  const catalog = await getCatalogForPage();
  const cars = catalog.makers.filter((m) => !m.bike && m.slug !== "universal");
  const withLogo = cars.filter((m) => m.logo);
  const others = [...cars.filter((m) => !m.logo), ...catalog.makers.filter((m) => m.bike || m.slug === "universal")];
  return (
    <PageShell catalog={catalog}>
      <PageHead crumbs={[{ href: "/", label: "Home" }, { label: "Car makers" }]} title="Parts by car maker" lead="Pick the maker of your car. Each page lists the parts we keep for it." />
      <div className="shell py-10 md:py-14">
        <MakerGrid makers={withLogo} />
        {others.length > 0 && (
          <>
            <h2 className="heading mt-14 text-[24px] text-ink">Bikes and other makers</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((m) => (
                <li key={m.slug}>
                  <Link href={makerHref(m.slug)} className="group flex items-center rounded-[12px] border border-line bg-raised px-4 py-3.5 hover:border-line-strong">
                    <span className="flex-1 text-[16px] font-medium text-ink">{m.name}</span>
                    <ChevronRight className="h-4 w-4 text-ink-4 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </PageShell>
  );
}
