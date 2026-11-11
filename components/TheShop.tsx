import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import OpenNow from "./OpenNow";
import { SHOP } from "@/lib/shop";

/** The real shop: photos from its Google Maps listing, opening hours, and where to see reviews. */
export default function TheShop() {
  return (
    <section id="shop" className="bg-graphite py-16 text-on-graphite md:py-24">
      <div className="shell grid items-center gap-10 [&>*]:min-w-0 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="flex items-center gap-2.5 text-[14px] font-medium text-on-graphite-2">
            <span className="h-px w-7 bg-brass" aria-hidden="true" />
            The shop
          </p>
          <h2 className="heading mt-4 text-[32px] md:text-[42px]">Look for the red sign on A.J.C. Bose Road</h2>
          <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-on-graphite-2">
            Radiator fans hang at the front. Inside, the racks hold switches, sensors, pumps and motors for many Indian cars. Bring your old part and we will match it at the counter.
          </p>

          <div className="mt-7 max-w-md rounded-[16px] border border-graphite-line bg-graphite-2 p-5">
            <div className="flex items-center gap-2.5 text-[15px] font-semibold">
              <Clock className="h-[18px] w-[18px] text-brass" /> Opening hours
            </div>
            <dl className="mt-3 space-y-1.5 text-[15.5px]">
              {SHOP.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-on-graphite-2">{h.days}</dt>
                  <dd className="font-semibold tabular">{h.time}</dd>
                </div>
              ))}
            </dl>
            <OpenNow onDark className="mt-4" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a href={SHOP.mapsLink} target="_blank" rel="noopener" className="press inline-flex h-11 items-center gap-1.5 rounded-[10px] bg-brass px-4 text-[15px] font-semibold text-on-brass hover:brightness-105">
              Directions <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={SHOP.mapsLink} target="_blank" rel="noopener" className="press inline-flex h-11 items-center gap-1.5 rounded-[10px] border border-graphite-line px-4 text-[15px] font-semibold text-on-graphite hover:border-on-graphite-2">
              Photos and reviews on Google <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <figure>
          <div className="grid h-[400px] grid-cols-[0.8fr_1fr] grid-rows-2 gap-2.5 sm:h-[520px] md:gap-3 lg:h-[560px]">
            <div className="relative row-span-2 overflow-hidden rounded-[16px] bg-graphite-2">
              <Image src="/img/shop/front.webp" alt="The front of Rahul Motors at night, with its lit red sign and the counter inside" fill sizes="(max-width: 1024px) 45vw, 280px" className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-[16px] bg-graphite-2">
              <Image src="/img/shop/fans.webp" alt="Radiator fan assemblies and small fans hanging at the shop front" fill sizes="(max-width: 1024px) 55vw, 340px" className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-[16px] bg-graphite-2">
              <Image src="/img/shop/stock.webp" alt="A diesel fuel pump assembly on its boxes, with the shop's labels" fill sizes="(max-width: 1024px) 55vw, 340px" className="object-cover" />
            </div>
          </div>
          <figcaption className="mt-3 text-[13px] text-on-graphite-2">Photos from the shop’s Google Maps listing.</figcaption>
        </figure>
      </div>
    </section>
  );
}
