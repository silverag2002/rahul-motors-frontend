import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TYPE_PHOTOS } from "@/lib/images";
import { typeHref } from "@/lib/links";
import { photoSrc, type PartTypeSummary } from "@/lib/types";

/** Big photo tiles for the part types people ask for most. */
export default function PartTypeTiles({ types }: { types: PartTypeSummary[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 [&>*]:min-w-0 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-4">
      {types.map((t, i) => {
        const made = TYPE_PHOTOS[t.slug];
        return (
          <Link
            key={t.slug}
            href={typeHref(t.slug)}
            className="lift result-in group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-raised"
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-sunken">
              {made ? (
                <Image src={made} alt="" fill sizes="(max-width: 768px) 50vw, 400px" className="zoom object-cover" />
              ) : t.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoSrc(t.photo, 400)} alt="" loading="lazy" className="zoom h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="flex items-center justify-between gap-2 px-4 py-3.5">
              <span className="text-[16px] font-semibold leading-tight text-ink">{t.name}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-ink-4 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Other part types as simple links. */
export function MoreTypes({ types }: { types: PartTypeSummary[] }) {
  if (!types.length) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {types.map((t) => (
        <Link key={t.slug} href={typeHref(t.slug)} className="press rounded-[10px] border border-line bg-raised px-3.5 py-2 text-[15px] font-medium text-ink-2 hover:border-ink hover:text-ink">
          {t.name}
        </Link>
      ))}
      <Link href="/parts" className="press rounded-[10px] px-3.5 py-2 text-[15px] font-semibold text-brass-deep hover:underline">
        All part types →
      </Link>
    </div>
  );
}
