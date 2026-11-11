import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "./WhatsAppIcon";
import { typeHref } from "@/lib/links";
import { whatsappLink } from "@/lib/shop";
import { SYMPTOMS } from "@/lib/symptoms";
import type { PartTypeSummary } from "@/lib/types";

/**
 * "What's wrong with the car?": start from the problem, get to the parts that
 * usually cause it. On phones the cards scroll sideways so the page stays short.
 */
export default function Symptoms({ types }: { types: PartTypeSummary[] }) {
  const byslug = new Map(types.map((t) => [t.slug, t]));
  const cards = SYMPTOMS.map((s) => ({ ...s, parts: s.types.map((slug) => byslug.get(slug)).filter((t): t is PartTypeSummary => !!t).slice(0, 3) })).filter((s) => s.parts.length);
  if (!cards.length) return null;

  return (
    <section id="problems" className="pt-16 md:pt-24">
      <div className="shell">
        <div className="mb-7 flex flex-col gap-3 md:mb-9 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="heading text-[30px] text-ink md:text-[38px]">What’s wrong with the car?</h2>
            <p className="mt-2.5 text-[16.5px] leading-relaxed text-ink-3">
              Don’t know the part’s name? Start from the problem. These are the parts that usually cause it.
            </p>
          </div>
        </div>
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-1 md:mx-auto md:grid md:w-[min(100%-3rem,1240px)] md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
        {cards.map((s) => (
          <li key={s.id} className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-[16px] border border-line bg-raised sm:w-[46%] md:w-auto">
            <div className="relative aspect-[3/2] bg-sunken">
              <Image src={s.img} alt={s.alt} fill sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 300px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-[17px] font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-3">{s.body}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {s.parts.map((t) => (
                  <Link
                    key={t.slug}
                    href={typeHref(t.slug)}
                    className="press rounded-[8px] border border-line-strong px-2.5 py-1.5 text-[13.5px] font-semibold text-ink hover:border-brass hover:bg-brass-soft"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="shell mt-5 flex flex-col gap-3 text-[14.5px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl">These are common causes, not a diagnosis. Have a mechanic check the car, then send us what they found.</p>
        <a
          href={whatsappLink("Hello Rahul Motors, my car has a problem and I need the right part.\n\nCar and model:\nWhat is wrong:\n")}
          target="_blank"
          rel="noopener"
          className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-whatsapp"
        >
          <WhatsAppIcon className="h-4 w-4" /> Describe the problem on WhatsApp
        </a>
      </div>
    </section>
  );
}
