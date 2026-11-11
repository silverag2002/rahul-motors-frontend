import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import PageShell from "@/components/PageShell";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { getCatalogForPage } from "@/lib/catalog";
import { whatsappLink } from "@/lib/shop";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "How to find the right part",
  description:
    "How to check a car part before you order: read the number on the old part, count the plug pins, know left from right, old model from new. Plus what LH, RH, PTL, DSL, O/M and N/M mean.",
  alternates: { canonical: "/fit-guide" },
};

const WORDS: [string, string][] = [
  ["LH", "Left side (the passenger side in an Indian car)"],
  ["RH", "Right side (the driver’s side)"],
  ["FR, FRT", "Front"],
  ["RR", "Rear"],
  ["PTL", "Petrol"],
  ["DSL, CRDI", "Diesel"],
  ["O/M", "Old model of the car"],
  ["N/M, NM", "New model of the car"],
  ["T-2, TY 2", "Type 2: one version of this part for the car"],
  ["4 PIN", "The plug has 4 pins"],
  ["W/O", "Without (W/O FOG: for cars without fog lamps)"],
  ["AUTO", "Window switch with the one-touch AUTO button"],
  ["BS6", "For the BS6 engine (cars from about April 2020)"],
  ["ASSY", "Assembly: the complete unit"],
];

const ASK = "Hello Rahul Motors, please check which part I need. I am sending photos of the old part.\n\nCar and model:\nYear:\nPetrol or diesel:\n";

export default async function FitGuide() {
  const catalog = await getCatalogForPage();
  return (
    <PageShell catalog={catalog} whatsapp={ASK}>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { label: "Fit guide" }]}
        title="How to find the right part"
        lead="Many parts look alike but fit only one car, one side or one version. A few photos of your old part settle it. Here is what to check."
      />

      <div className="shell py-12 md:py-16">
        <ol className="grid gap-12 md:gap-16">
          <Step n={1} title="Read the number on the old part" img="/img/guide/number.webp" alt="A finger pointing at the printed label on a used fuel pump motor">
            Most parts carry a printed label, or a number moulded into the plastic. Take a clear photo of it in good light. Even a half-worn number helps us.
          </Step>
          <Step n={2} title="Count the pins on the plug" img="/img/guide/pins.webp" alt="A car wiring plug held up to show the row of metal pins inside" flip>
            Look into the plug where the wires join and count the metal pins. A 5-pin and a 6-pin switch can look the same from outside. Our part names say it, for example “18 PIN”.
          </Step>
          <Step n={3} title="Left or right, front or rear" diagram flip={false}>
            Sides are always named from the driver’s seat, facing forward. In an Indian car the driver sits on the right, so <b className="font-semibold text-ink">RH is the driver’s side</b> and LH is the passenger side. For window switches, the RH switch is usually the main one with all the buttons.
          </Step>
        </ol>

        <div className="mt-16 grid gap-4 [&>*]:min-w-0 md:mt-20 md:grid-cols-2">
          <Tip title="Old model or new model?">
            Many cars changed shape over the years, and the parts changed with them. The month and year on your RC tell us which one you have.
          </Tip>
          <Tip title="Petrol or diesel? With or without?">
            Some parts differ between petrol and diesel, or between cars with and without fog lamps or the AUTO window button. Tell us what your car has.
          </Tip>
        </div>

        <section className="mt-16 md:mt-20">
          <h2 className="heading text-[28px] text-ink md:text-[34px]">Words in our part names</h2>
          <p className="mt-2 max-w-2xl text-[16.5px] leading-relaxed text-ink-3">The shop writes part names in short form. On each part’s page we also show them in plain words.</p>
          <dl className="mt-6 grid overflow-hidden rounded-[18px] border border-line bg-raised sm:grid-cols-2">
            {WORDS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-line px-4 py-3.5 text-[15.5px] sm:[&:nth-child(odd)]:border-r">
                <dt className="font-display font-bold text-ink tabular">{k}</dt>
                <dd className="text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-16 flex flex-col items-start gap-5 rounded-[20px] bg-graphite px-6 py-8 text-on-graphite md:mt-20 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="heading text-[26px] md:text-[30px]">Still not sure? Send us the photos.</p>
            <p className="mt-1.5 text-[16px] text-on-graphite-2">The number, the plug and the whole part. We will tell you which one fits.</p>
          </div>
          <a href={whatsappLink(ASK)} target="_blank" rel="noopener" className="press inline-flex h-12 shrink-0 items-center gap-2 rounded-[12px] bg-whatsapp px-5 text-[15px] font-semibold text-whatsapp-ink">
            <WhatsAppIcon className="h-5 w-5" /> Send photos on WhatsApp
          </a>
        </div>
      </div>
    </PageShell>
  );
}

function Step({ n, title, img, alt, diagram, flip, children }: { n: number; title: string; img?: string; alt?: string; diagram?: boolean; flip?: boolean; children: React.ReactNode }) {
  return (
    <li className="grid items-center gap-6 [&>*]:min-w-0 md:grid-cols-2 md:gap-12">
      <div className={flip ? "md:order-2" : ""}>
        {diagram ? (
          <div className="rounded-[18px] border border-line bg-raised p-4">
            <CarSides />
          </div>
        ) : (
          <div className="relative aspect-[3/2] overflow-hidden rounded-[18px] border border-line bg-sunken">
            <Image src={img!} alt={alt ?? ""} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
          </div>
        )}
      </div>
      <div>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brass font-display text-[16px] font-bold text-on-brass tabular">{n}</span>
        <h2 className="heading mt-4 text-[26px] text-ink md:text-[32px]">{title}</h2>
        <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-ink-2">{children}</p>
      </div>
    </li>
  );
}

function Tip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-line bg-raised p-6">
      <h3 className="text-[18px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[15.5px] leading-relaxed text-ink-3">{children}</p>
    </div>
  );
}

/** A car seen from above with the four positions the shop's names use. */
function CarSides() {
  const label = "fill-ink font-sans text-[13px] font-semibold";
  const small = "fill-ink-3 font-sans text-[11.5px]";
  return (
    <svg viewBox="0 0 360 430" role="img" aria-label="A car seen from above. Front is at the top. The driver sits on the right, so RH is the driver's side and LH is the passenger side. The four corners are FR LH, FR RH, RR LH and RR RH." className="mx-auto block h-auto w-full max-w-[380px]">
      <text x="180" y="22" textAnchor="middle" className={label}>FRONT</text>
      <path d="M180 30 l-6 8 h12 z" className="fill-ink-3" />
      {/* wheels */}
      {[
        [101, 92],
        [249, 92],
        [101, 300],
        [249, 300],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="10" height="42" rx="3" className="fill-ink-3" />
      ))}
      {/* body */}
      <rect x="111" y="46" width="138" height="344" rx="50" className="fill-sunken stroke-line-strong" strokeWidth="2" />
      <path d="M128 118 Q180 100 232 118 L224 146 Q180 136 136 146 Z" className="fill-raised stroke-line-strong" strokeWidth="1.5" />
      <path d="M134 318 Q180 328 226 318 L232 340 Q180 354 128 340 Z" className="fill-raised stroke-line-strong" strokeWidth="1.5" />
      {/* seats: driver on the right */}
      <rect x="132" y="170" width="40" height="48" rx="9" className="fill-raised stroke-line-strong" strokeWidth="1.5" />
      <rect x="188" y="170" width="40" height="48" rx="9" className="fill-brass-soft stroke-brass" strokeWidth="2" />
      <circle cx="208" cy="158" r="12" className="fill-none stroke-ink-2" strokeWidth="3" />
      <rect x="132" y="236" width="96" height="50" rx="10" className="fill-raised stroke-line-strong" strokeWidth="1.5" />
      <text x="208" y="199" textAnchor="middle" className="fill-brass-deep font-sans text-[10.5px] font-bold">Driver</text>
      {/* corner names */}
      <text x="62" y="110" textAnchor="middle" className={label}>FR LH</text>
      <text x="298" y="110" textAnchor="middle" className={label}>FR RH</text>
      <text x="62" y="318" textAnchor="middle" className={label}>RR LH</text>
      <text x="298" y="318" textAnchor="middle" className={label}>RR RH</text>
      {/* sides */}
      <text x="62" y="206" textAnchor="middle" className="fill-ink font-display text-[22px] font-bold">LH</text>
      <text x="62" y="224" textAnchor="middle" className={small}>left</text>
      <text x="62" y="238" textAnchor="middle" className={small}>passenger</text>
      <text x="298" y="206" textAnchor="middle" className="fill-brass-deep font-display text-[22px] font-bold">RH</text>
      <text x="298" y="224" textAnchor="middle" className={small}>right</text>
      <text x="298" y="238" textAnchor="middle" className={small}>driver</text>
      <text x="180" y="418" textAnchor="middle" className={label}>REAR</text>
    </svg>
  );
}
