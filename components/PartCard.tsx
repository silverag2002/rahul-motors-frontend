import Link from "next/link";
import PartPhoto from "./PartPhoto";
import WhatsAppIcon from "./WhatsAppIcon";
import { partHref } from "@/lib/links";
import { SHOP, askMessage, whatsappLink } from "@/lib/shop";
import type { Part } from "@/lib/types";

export default function PartCard({ part, index = 0, hideType = false, priority = false }: { part: Part; index?: number; hideType?: boolean; priority?: boolean }) {
  const href = partHref(part);
  return (
    <article
      className="lift result-in group relative flex min-w-0 flex-col overflow-hidden rounded-[14px] border border-line bg-raised"
      style={{ "--i": index } as React.CSSProperties}
    >
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <PartPhoto photo={part.photo} alt="" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px" priority={priority} className="zoom" />
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        {!hideType && <p className="truncate text-[12.5px] font-semibold text-brass-deep">{part.type}</p>}
        <h3 className="mt-0.5 line-clamp-2 text-[15px] font-semibold leading-snug text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {part.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center gap-2 pt-3">
          <p className="min-w-0 flex-1 truncate text-[12.5px] text-ink-3">
            {[part.maker, part.partNo && `No. ${part.partNo}`].filter(Boolean).join(" · ") || "Ask us which cars it fits"}
          </p>
          <a
            href={whatsappLink(askMessage({ ...part, url: `${SHOP.siteUrl}${href}` }))}
            target="_blank"
            rel="noopener"
            aria-label={`Ask about ${part.type} ${part.name} on WhatsApp`}
            className="press relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-line text-whatsapp hover:border-whatsapp hover:bg-whatsapp hover:text-whatsapp-ink"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function PartGrid({ parts, hideType = false, eager = 0 }: { parts: Part[]; hideType?: boolean; eager?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4">
      {parts.map((p, i) => (
        <PartCard key={p.id} part={p} index={i} hideType={hideType} priority={i < eager} />
      ))}
    </div>
  );
}
