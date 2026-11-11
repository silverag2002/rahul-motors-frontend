import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import OpenNow from "./OpenNow";
import { SHOP } from "@/lib/shop";

/** The real shop: photos from its Google Maps listing, opening hours, and where to see reviews. */
export default function TheShop() {
  return (
    <section id="shop" className="border-t border-line bg-sunken py-16 text-ink md:py-24">
      <div className="shell grid items-center gap-10 [&>*]:min-w-0 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="flex items-center gap-2.5 text-[14px] font-medium text-ink-3">
            <span className="h-px w-7 bg-brass" aria-hidden="true" />
            The shop
          </p>
          <h2 className="heading mt-4 text-[32px] md:text-[42px]">Look for the red sign on A.J.C. Bose Road</h2>
          <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-ink-2">
            Radiator fans hang at the front. Inside, the racks hold switches, sensors, pumps and motors for many Indian cars. Bring your old part and we will match it at the counter.
          </p>

          <div className="mt-7 max-w-md rounded-[16px] border border-line bg-raised p-5">
            <div className="flex items-center gap-2.5 text-[15px] font-semibold">
              <Clock className="h-[18px] w-[18px] text-brass-deep" /> Opening hours
            </div>
            <dl className="mt-3 space-y-1.5 text-[15.5px]">
              {SHOP.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-ink-3">{h.days}</dt>
                  <dd className="font-semibold tabular">{h.time}</dd>
                </div>
              ))}
            </dl>
            <OpenNow className="mt-4" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a href={SHOP.mapsLink} target="_blank" rel="noopener" className="press inline-flex h-11 items-center gap-1.5 rounded-[10px] bg-brass px-4 text-[15px] font-semibold text-on-brass hover:brightness-105">
              Directions <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={SHOP.mapsLink} target="_blank" rel="noopener" className="press inline-flex h-11 items-center gap-1.5 rounded-[10px] border border-line-strong bg-raised px-4 text-[15px] font-semibold text-ink hover:border-ink">
              Photos and reviews on Google <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <figure>
          <div className="grid h-[400px] grid-cols-[0.8fr_1fr] grid-rows-2 gap-2.5 sm:h-[520px] md:gap-3 lg:h-[560px]">
            <div className="relative row-span-2 overflow-hidden rounded-[16px] bg-raised">
              <Image src="/img/shop/front.webp" alt="The front of Rahul Motors at night, with its lit red sign and the counter inside" fill sizes="(max-width: 1024px) 45vw, 280px" className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-[16px] bg-raised">
              <Image src="/img/shop/switch.webp" alt="A power window master switch on the shop’s bill book" fill sizes="(max-width: 1024px) 55vw, 340px" className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-[16px] bg-raised">
              <Image src="/img/shop/sensor.webp" alt="An oxygen sensor for a Honda CR-V with the shop’s label" fill sizes="(max-width: 1024px) 55vw, 340px" className="object-cover" />
            </div>
          </div>
          <figcaption className="mt-3 text-[13px] text-ink-3">Photos from the shop’s Google Maps listing.</figcaption>
        </figure>
      </div>
    </section>
  );
}
