import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import MakerGrid from "@/components/MakerGrid";
import PageShell from "@/components/PageShell";
import { PartGrid } from "@/components/PartCard";
import PartTypeTiles, { MoreTypes } from "@/components/PartTypeTiles";
import SectionHead from "@/components/SectionHead";
import Faq from "@/components/Faq";
import Symptoms from "@/components/Symptoms";
import TheShop from "@/components/TheShop";
import VisitShop from "@/components/VisitShop";
import { getCatalogForPage } from "@/lib/catalog";
import { moreTypes, previewParts, quickLinks, tileTypes } from "@/lib/home";

export const revalidate = 300;

export default async function Home() {
  const catalog = await getCatalogForPage();
  const tiles = tileTypes(catalog);
  const makers = catalog.makers.filter((m) => !m.bike && m.logo).slice(0, 12);
  const preview = previewParts(catalog);

  return (
    <PageShell catalog={catalog}>
      <Hero quick={quickLinks(catalog)} />
      <Symptoms types={catalog.types} />

      {tiles.length > 0 && (
        <section className="pt-16 md:pt-24">
          <div className="shell">
            <SectionHead
              title="Shop by part"
              lead="Start with what is broken. Every part type has its own page with photos."
              link={{ href: "/parts", label: "Every part type" }}
            />
            <PartTypeTiles types={tiles} />
            <MoreTypes types={moreTypes(catalog)} />
          </div>
        </section>
      )}

      {makers.length > 0 && (
        <section className="pt-16 md:pt-24">
          <div className="shell">
            <SectionHead title="Shop by car" lead="Pick your car’s maker to see what we keep for it." link={{ href: "/cars", label: "Every car maker" }} />
            <MakerGrid makers={makers} />
          </div>
        </section>
      )}

      {preview.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="shell">
            <SectionHead title="On the shelves now" lead="A few parts from the shop. Tap one for photos and to ask about it." link={{ href: "/products", label: "See all parts" }} />
            <PartGrid parts={preview} />
            <div className="mt-8 flex justify-center">
              <Link href="/products" className="press inline-flex h-12 items-center gap-2 rounded-[12px] border border-line-strong bg-raised px-6 text-[15px] font-semibold text-ink hover:border-ink">
                Search all parts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <HowToOrder />
      <TheShop />
      <Faq />
      <VisitShop />
    </PageShell>
  );
}
