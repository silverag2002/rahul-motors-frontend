import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import PageShell from "@/components/PageShell";
import PartsBrowser from "@/components/PartsBrowser";
import { getCatalogForPage, getCatalogOrEmpty } from "@/lib/catalog";
import { TYPE_PHOTOS } from "@/lib/images";
import { FAMILIES } from "@/lib/names";
import { filterParts } from "@/lib/search";
import { askForType, whatsappLink } from "@/lib/shop";
import { photoSrc } from "@/lib/types";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const catalog = await getCatalogOrEmpty();
  return catalog.types.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getCatalogOrEmpty();
  const type = catalog.types.find((t) => t.slug === slug);
  if (!type) return { title: "Part type not found" };
  const makers = catalog.makers.filter((m) => type.makers.includes(m.slug)).slice(0, 5).map((m) => m.name);
  const description = `${type.name} for ${makers.length ? makers.join(", ") : "Indian cars"} and more, at Rahul Motors, Mullick Bazar, Kolkata. Photos, part numbers and WhatsApp to ask the price. Sent across India.`;
  const image = TYPE_PHOTOS[slug] ?? (type.photo ? photoSrc(type.photo, 800) : "/og.jpg");
  return {
    title: `${type.name} in Kolkata`,
    description,
    alternates: { canonical: `/parts/${slug}` },
    openGraph: { title: `${type.name} · Rahul Motors`, description, images: [image] },
  };
}

export default async function PartTypePage({ params }: { params: Params }) {
  const { slug } = await params;
  const catalog = await getCatalogForPage();
  const type = catalog.types.find((t) => t.slug === slug);
  if (!type) notFound();
  const parts = filterParts(catalog.parts, { type: slug });
  const makers = catalog.makers.filter((m) => type.makers.includes(m.slug));
  const family = FAMILIES.find((f) => f.id === type.family);
  const made = TYPE_PHOTOS[slug];
  const real = type.photo ? photoSrc(type.photo, 600) : null;

  return (
    <PageShell catalog={catalog} whatsapp={askForType(type.name)}>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { href: "/parts", label: family?.name ?? "Part types" }, { label: type.name }]}
        title={type.name}
        lead={
          <>
            {makers.length > 0 ? (
              <>For {makers.slice(0, 6).map((m) => m.name).join(", ")}{makers.length > 6 ? " and more" : ""}. </>
            ) : null}
            Tell us your car and model on WhatsApp and we will confirm the right one before you buy.
          </>
        }
      >
        {(made || real) && (
          <div className="relative hidden aspect-square w-44 shrink-0 overflow-hidden rounded-[16px] border border-line bg-sunken md:block lg:w-52">
            {made ? (
              <Image src={made} alt={type.name} fill sizes="208px" className="object-cover" priority />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={real!} alt={type.name} className="h-full w-full object-cover" />
            )}
          </div>
        )}
      </PageHead>
      <section className="shell py-8 md:py-10">
        <PartsBrowser
          initial={{ parts: parts.slice(0, 24), total: parts.length }}
          types={catalog.types}
          makers={makers.slice().sort((a, b) => a.name.localeCompare(b.name))}
          filters={{}}
          lock={{ type: slug }}
        />
        <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-ink-3">
          Not sure which {type.name.toLowerCase()} fits? Send a photo of the old one, or the number printed on it, to{" "}
          <a href={whatsappLink(askForType(type.name))} target="_blank" rel="noopener" className="font-semibold text-brass-deep underline underline-offset-2">
            our WhatsApp
          </a>
          . Left and right, front and rear, and old and new models often look alike.
        </p>
      </section>
    </PageShell>
  );
}
