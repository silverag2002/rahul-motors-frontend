import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import PageShell from "@/components/PageShell";
import PartsBrowser from "@/components/PartsBrowser";
import { getCatalogForPage } from "@/lib/catalog";
import { filterParts, type Filters } from "@/lib/search";

export const metadata: Metadata = {
  title: "All parts",
  description: "Search every part at Rahul Motors by car model, part type, car maker or part number. Ask about any part on WhatsApp.",
  alternates: { canonical: "/products" },
};

type Search = Promise<{ q?: string; type?: string; maker?: string; photo?: string }>;

export default async function ProductsPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const catalog = await getCatalogForPage();
  const filters: Filters = { q: sp.q?.slice(0, 80), type: sp.type, maker: sp.maker, photo: sp.photo === "1" };
  const all = filterParts(catalog.parts, filters);
  const makers = catalog.makers.slice().sort((a, b) => a.name.localeCompare(b.name));
  const types = catalog.types.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <PageShell catalog={catalog}>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { label: "All parts" }]}
        title="All parts"
        lead="Search by car model, part or the number printed on the old part. Prices are on request, so tap WhatsApp on any part to ask."
      />
      <section className="shell py-8 md:py-10">
        <PartsBrowser initial={{ parts: all.slice(0, 24), total: all.length }} types={types} makers={makers} filters={filters} />
      </section>
    </PageShell>
  );
}
