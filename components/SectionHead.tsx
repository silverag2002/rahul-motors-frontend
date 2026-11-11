import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHead({ title, lead, link }: { title: string; lead?: string; link?: { href: string; label: string } }) {
  return (
    <div className="mb-7 flex flex-col gap-3 md:mb-9 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 className="heading text-[30px] text-ink md:text-[38px]">{title}</h2>
        {lead && <p className="mt-2.5 text-[16.5px] leading-relaxed text-ink-3">{lead}</p>}
      </div>
      {link && (
        <Link href={link.href} className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-brass-deep">
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
