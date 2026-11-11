import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import PageShell from "@/components/PageShell";
import PartsBrowser from "@/components/PartsBrowser";
import { getCatalogForPage, getCatalogOrEmpty } from "@/lib/catalog";
import { filterParts } from "@/lib/search";
import { askForType } from "@/lib/shop";

export const revalidate = 300;

type Params = Promise<{ maker: string }>;

export async function generateStaticParams() {
  const catalog = await getCatalogOrEmpty();
  return catalog.makers.map((m) => ({ maker: m.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { maker: slug } = await params;
  const catalog = await getCatalogOrEmpty();
  const maker = catalog.makers.find((m) => m.slug === slug);
  if (!maker) return { title: "Car maker not found" };
  const types = catalog.types.filter((t) => t.makers.includes(slug)).slice(0, 5).map((t) => t.name.toLowerCase());
  const description = `${maker.name} parts at Rahul Motors, Mullick Bazar, Kolkata: ${types.join(", ")} and more. Photos and WhatsApp to ask the price. Sent across India.`;
  return { title: `${maker.name} parts in Kolkata`, description, alternates: { canonical: `/cars/${slug}` }, openGraph: { title: `${maker.name} parts · Rahul Motors`, description } };
}

export default async function MakerPage({ params }: { params: Params }) {
  const { maker: slug } = await params;
  const catalog = await getCatalogForPage();
  const maker = catalog.makers.find((m) => m.slug === slug);
  if (!maker) notFound();
  const types = catalog.types.filter((t) => t.makers.includes(slug));
  const parts = filterParts(catalog.parts, { maker: slug });

  return (
    <PageShell catalog={catalog} whatsapp={askForType("part", maker.name)}>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { href: "/cars", label: "Car makers" }, { label: maker.name }]}
        title={`${maker.name} parts`}
        lead={`${types.slice(0, 4).map((t) => t.name).join(", ")}${types.length > 4 ? " and more" : ""}. Tell us the model and year and we will confirm the fit.`}
      >
        {maker.logo && (
          <div className="hidden h-28 w-28 shrink-0 place-items-center rounded-[18px] border border-line bg-paper md:grid">
            <Image src={`/makers/${maker.logo}`} alt={`${maker.name} badge`} width={72} height={72} className="h-[72px] w-[72px] object-contain" />
          </div>
        )}
      </PageHead>
      <section className="shell py-8 md:py-10">
        {types.length > 1 && (
          <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
            {types.slice(0, 14).map((t) => (
              <Link
                key={t.slug}
                href={`/products?maker=${slug}&type=${t.slug}`}
                className="press shrink-0 rounded-[10px] border border-line bg-raised px-3 py-2 text-[14.5px] font-medium text-ink-2 hover:border-ink hover:text-ink"
              >
                {t.name}
              </Link>
            ))}
          </div>
        )}
        <PartsBrowser
          initial={{ parts: parts.slice(0, 24), total: parts.length }}
          types={types.slice().sort((a, b) => a.name.localeCompare(b.name))}
          makers={catalog.makers}
          filters={{}}
          lock={{ maker: slug }}
        />
      </section>
    </PageShell>
  );
}
