import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";

export interface QuickLink {
  label: string;
  href: string;
}

/** Top of the home page: what the shop sells, a search, and the shop itself. */
export default function Hero({ quick }: { quick: QuickLink[] }) {
  return (
    <section className="relative bg-graphite text-on-graphite">
      <div className="shell grid items-center gap-10 [&>*]:min-w-0 py-12 md:py-16 lg:grid-cols-[1.08fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <p className="rise-late flex items-center gap-2.5 text-[14px] font-medium text-on-graphite-2">
            <span className="h-px w-7 bg-brass" aria-hidden="true" />
            Mullick Bazar, Kolkata
          </p>
          <h1 className="display rise mt-5 text-[42px] sm:text-[56px] lg:text-[66px]">
            <span>Switches, sensors</span>
            <span>and pumps for</span>
            <span className="text-brass">your car.</span>
          </h1>
          <p className="rise-late mt-6 max-w-[34rem] text-[17px] leading-relaxed text-on-graphite-2">
            Electrical and engine parts for Hyundai, Maruti, Mahindra, Honda, Tata and many more. Search by car or part, ask on WhatsApp, collect at the counter or get it sent anywhere in India.
          </p>
          <div className="rise-late relative z-20 mt-8 max-w-[36rem] text-ink">
            <SearchBox />
          </div>
          {quick.length > 0 && (
            <div className="rise-late mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-[14px]">
              <span className="mr-1.5 text-on-graphite-2">People look for</span>
              {quick.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="press rounded-[8px] border border-graphite-line px-2.5 py-1 text-on-graphite hover:border-brass hover:text-brass"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="fade-late relative">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[18px] border border-graphite-line">
            <Image
              src="/img/hero-parts.webp"
              alt="Car parts laid out on a dark mat: a window switch, an ignition coil, a fuel pump, an oxygen sensor, a fan motor, a clock spring, a relay and a blower motor"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
