import Image from "next/image";
import Link from "next/link";
import { makerHref } from "@/lib/links";
import type { MakerSummary } from "@/lib/types";

/** Car makers as badges; tap one to see every part we keep for it. */
export default function MakerGrid({ makers }: { makers: MakerSummary[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 [&>*]:min-w-0 sm:grid-cols-4 sm:gap-2.5 md:grid-cols-6">
      {makers.map((m) => (
        <Link
          key={m.slug}
          href={makerHref(m.slug)}
          className="lift group flex flex-col items-center gap-2 rounded-[14px] border border-line bg-raised px-2 pt-5 pb-4 text-center"
        >
          <span className="grid h-12 w-full place-items-center px-2">
            {m.logo ? (
              <Image src={`/makers/${m.logo}`} alt="" width={120} height={48} className="h-auto max-h-12 w-auto max-w-[min(100%,112px)] object-contain dark:brightness-110" />
            ) : (
              <span className="font-display text-[22px] font-bold text-ink-3">{m.name.charAt(0)}</span>
            )}
          </span>
          <span className="text-[14px] font-semibold leading-tight text-ink">{m.name}</span>
        </Link>
      ))}
    </div>
  );
}
