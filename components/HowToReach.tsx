import { ArrowUpRight, Bus, Car, MapPin, TrainFront } from "lucide-react";
import { BUS_ROUTES, SHOP, directionsLink, uberLink } from "@/lib/shop";

/** Getting to the counter: one-tap Uber and Google Maps, then bus, metro and taxi. */
export default function HowToReach() {
  return (
    <div id="reach" className="grid scroll-mt-24 gap-8 rounded-[20px] border border-line bg-raised p-5 [&>*]:min-w-0 sm:p-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:p-9">
      <div>
        <h3 className="heading text-[26px] text-ink md:text-[30px]">How to reach us</h3>
        <p className="mt-2.5 text-[16px] leading-relaxed text-ink-3">
          {SHOP.address.line1}, {SHOP.address.line2}. A short walk north of the Mullick Bazar crossing.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <a href={uberLink} target="_blank" rel="noopener" className="press inline-flex h-12 items-center gap-2 rounded-[12px] bg-ink px-5 text-[15px] font-semibold text-paper">
            <Car className="h-[18px] w-[18px]" /> Book an Uber here
          </a>
          <a href={directionsLink} target="_blank" rel="noopener" className="press inline-flex h-12 items-center gap-2 rounded-[12px] border border-line-strong px-5 text-[15px] font-semibold text-ink hover:border-ink">
            <MapPin className="h-[18px] w-[18px] text-brass-deep" /> Directions <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-2.5 text-[13.5px] text-ink-3">The Uber button opens the app with the shop already set as your drop-off.</p>
      </div>

      <dl className="divide-y divide-line border-y border-line">
        <Way icon={<Bus className="h-5 w-5 text-brass-deep" />} title="By bus">
          Get off at <b className="font-semibold text-ink">Mollick Bazar Crossing</b> on A.J.C. Bose Road.
          <span className="mt-2.5 flex flex-wrap gap-1.5">
            {BUS_ROUTES.map((r) => (
              <span key={r} className="inline-flex h-7 items-center rounded-[6px] border border-line-strong bg-paper px-2 text-[13px] font-semibold text-ink tabular">
                {r}
              </span>
            ))}
          </span>
          <span className="mt-2 block text-[13px] text-ink-3">Routes change from time to time, so check before you travel.</span>
        </Way>
        <Way icon={<TrainFront className="h-5 w-5 text-brass-deep" />} title="By metro">
          Nearest station: <b className="font-semibold text-ink">Park Street</b> (Blue Line), about 1.5 km away. Take a bus or taxi along Park Street to the crossing.
        </Way>
        <Way icon={<Car className="h-5 w-5 text-brass-deep" />} title="By taxi or cab">
          Ask for <b className="font-semibold text-ink">Mullick Bazar, A.J.C. Bose Road</b>. Every Kolkata driver knows it.
        </Way>
      </dl>
    </div>
  );
}

function Way({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-x-3 gap-y-1 py-4 sm:grid-cols-[28px_110px_1fr]">
      <span className="mt-0.5">{icon}</span>
      <dt className="text-[15.5px] font-semibold text-ink">{title}</dt>
      <dd className="col-start-2 text-[15px] leading-relaxed text-ink-2 sm:col-start-3">{children}</dd>
    </div>
  );
}
