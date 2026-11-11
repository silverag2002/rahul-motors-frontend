import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Camera, Phone } from "lucide-react";
import PageShell from "@/components/PageShell";
import { PartGrid } from "@/components/PartCard";
import PartGallery from "@/components/PartGallery";
import SectionHead from "@/components/SectionHead";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { fetchPartPhotos, getCatalogForPage, getCatalogOrEmpty } from "@/lib/catalog";
import { idFromPartSlug, makerHref, partHref, typeHref } from "@/lib/links";
import { SHOP, askMessage, shopCode, telLink, whatsappLink } from "@/lib/shop";
import { photoSrc, type Catalog, type Part } from "@/lib/types";

// Part pages are made the first time someone opens them, then kept for five minutes.
export const revalidate = 300;
export async function generateStaticParams() {
  return [];
}

type Params = Promise<{ slug: string }>;

function find(catalog: Catalog, slug: string): Part | undefined {
  const id = idFromPartSlug(slug);
  return id === null ? undefined : catalog.parts.find((p) => p.id === id);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const part = find(await getCatalogOrEmpty(), slug);
  if (!part) return { title: "Part not found", robots: { index: false } };
  const title = `${part.type} for ${[part.maker, part.name].filter(Boolean).join(" ")}`;
  const description = `${title}${part.partNo ? `, part no. ${part.partNo}` : ""}. At Rahul Motors, Mullick Bazar, Kolkata. Ask the price on WhatsApp; collect at the counter or get it sent across India.`;
  return {
    title,
    description,
    alternates: { canonical: partHref(part) },
    openGraph: { title: `${title} · Rahul Motors`, description, images: part.photo ? [photoSrc(part.photo, 800)] : ["/og.jpg"] },
  };
}

/** Same type for the same maker first, then the same type, then the same maker. */
function related(catalog: Catalog, part: Part): Part[] {
  const others = catalog.parts.filter((p) => p.id !== part.id);
  const rank = (p: Part) => (p.typeSlug === part.typeSlug ? 2 : 0) + (p.makerSlug && p.makerSlug === part.makerSlug ? 1 : 0) + (p.photo ? 0.5 : 0);
  return others
    .filter((p) => p.typeSlug === part.typeSlug || (p.makerSlug && p.makerSlug === part.makerSlug))
    .sort((a, b) => rank(b) - rank(a))
    .slice(0, 8);
}

export default async function PartPage({ params }: { params: Params }) {
  const { slug } = await params;
  const catalog = await getCatalogForPage();
  const part = find(catalog, slug);
  if (!part) notFound();
  const href = partHref(part);
  if (`/part/${slug}` !== href) permanentRedirect(href);

  const fetched = await fetchPartPhotos(part.id);
  const photos = fetched.length ? fetched : part.photo ? [part.photo] : [];
  const url = `${SHOP.siteUrl}${href}`;
  const ask = askMessage({ ...part, url });
  const title = `${part.type} for ${[part.maker, part.name].filter(Boolean).join(" ")}`;
  const more = related(catalog, part);

  const rows = [
    { label: "Part", value: <Link href={typeHref(part.typeSlug)} className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">{part.type}</Link> },
    part.maker && part.makerSlug ? { label: "Car maker", value: <Link href={makerHref(part.makerSlug)} className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">{part.maker}</Link> } : null,
    { label: "Model / version", value: <span className="font-semibold text-ink">{part.name}</span> },
    part.car ? { label: "Car", value: <span className="font-semibold text-ink">{part.car}</span> } : null,
    part.partNo ? { label: "Part number", value: <span className="font-semibold text-ink tabular">{part.partNo}</span> } : null,
    { label: "Shop code", value: <span className="font-semibold text-ink tabular">{shopCode(part.id)}</span> },
    { label: "Price", value: <span className="text-ink-2">On request. Ask on WhatsApp or call.</span> },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    sku: shopCode(part.id),
    mpn: part.partNo ?? undefined,
    category: part.type,
    brand: part.maker ? { "@type": "Brand", name: part.maker } : undefined,
    image: photos.slice(0, 3).map((p) => photoSrc(p, 1000)),
    url,
  };

  return (
    <PageShell catalog={catalog} whatsapp={ask}>
      <div className="shell pt-6 md:pt-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[14px] text-ink-3">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span className="text-ink-4">/</span>
          <Link href={typeHref(part.typeSlug)} className="hover:text-ink">{part.type}</Link>
          <span className="text-ink-4">/</span>
          <span className="text-ink-2" aria-current="page">{part.name}</span>
        </nav>
      </div>

      <section className="shell grid gap-8 [&>*]:min-w-0 py-6 md:py-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <PartGallery photos={photos} alt={title} />

        <div>
          <p className="text-[15px] font-semibold text-brass-deep">{part.type}</p>
          <h1 className="display mt-1.5 text-[34px] text-ink md:text-[44px]">{part.name}</h1>
          {part.maker && <p className="mt-2 text-[17px] text-ink-3">For {part.maker}</p>}

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <a href={whatsappLink(ask)} target="_blank" rel="noopener" className="press inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] bg-whatsapp text-[16px] font-semibold text-whatsapp-ink">
              <WhatsAppIcon className="h-5 w-5" /> Ask price on WhatsApp
            </a>
            <a href={telLink(SHOP.phones[0].tel)} className="press inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] border border-line-strong bg-raised text-[16px] font-semibold text-ink hover:border-ink">
              <Phone className="h-[18px] w-[18px]" /> Call {SHOP.phones[0].display}
            </a>
          </div>

          <dl className="mt-6 divide-y divide-line overflow-hidden rounded-[16px] border border-line bg-raised">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[8.5rem_1fr] gap-3 px-4 py-3.5 text-[15.5px]">
                <dt className="text-ink-3">{r.label}</dt>
                <dd className="min-w-0 break-words">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex gap-3 rounded-[16px] bg-brass-soft px-4 py-4 text-[15px] leading-relaxed text-ink-2">
            <Camera className="mt-0.5 h-5 w-5 shrink-0 text-brass-deep" />
            <p>
              <span className="font-semibold text-ink">Not sure it fits?</span> Send a photo of your old part with the WhatsApp message. We will check the side, the plug and the version with you.
            </p>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="border-t border-line py-14 md:py-20">
          <div className="shell">
            <SectionHead title="You may also need" link={{ href: typeHref(part.typeSlug), label: "See all of this part" }} />
            <PartGrid parts={more} />
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </PageShell>
  );
}
