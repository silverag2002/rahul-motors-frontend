import Image from "next/image";
import Link from "next/link";

/** The gold RM badge with the shop's name beside it. */
export default function Brand({ onDark = false, compact = false }: { onDark?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 shrink-0" aria-label="Rahul Motors, home">
      <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-graphite">
        <Image src="/mark.webp" alt="" width={30} height={29} priority sizes="30px" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[19px] font-bold tracking-[-0.02em] ${onDark ? "text-on-graphite" : "text-ink"}`}>
          Rahul Motors
        </span>
        {!compact && (
          <span className={`mt-1 block text-[12px] ${onDark ? "text-on-graphite-2" : "text-ink-3"}`}>Mullick Bazar, Kolkata</span>
        )}
      </span>
    </Link>
  );
}
