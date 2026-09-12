import { Clock, ShieldCheck, Truck, Wrench } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, title: "100% Genuine", body: "Direct from OEM channels and audited suppliers. No grey market, no compromises." },
  { icon: Wrench, title: "Workshop-grade", body: "Sensors, switches, ABS components—the obscure parts mechanics actually need." },
  { icon: Truck, title: "Fast dispatch", body: "Same-day for in-stock parts, shipping across India to workshops and individuals." },
  { icon: Clock, title: "30+ years strong", body: "Three decades of helping cars stay on the road. Reputation earned, part by part." },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-28 text-[#f4f0e6]" style={{ background: "var(--carbon)" }}>
      <div className="shell grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-editorial text-5xl md:text-7xl leading-[.92] tracking-[-.035em] text-balance">Trust is built one part at a time.</h2>
          <p className="mt-7 max-w-[48ch] text-sm md:text-base leading-7 text-white/60">
            A family-run automotive parts specialist serving India&apos;s mechanics, workshops and owners since 1995.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span className="font-editorial text-5xl text-[#e2bf72]">30+</span>
            <span className="max-w-32 text-[10px] uppercase tracking-[.16em] leading-5 text-white/50">Years of parts knowledge</span>
          </div>
        </div>

        <div className="lg:col-span-7 border-t border-white/15">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="grid grid-cols-[auto_1fr] sm:grid-cols-[72px_1fr] gap-5 md:gap-8 py-7 md:py-9 border-b border-white/15">
              <div className="h-11 w-11 rounded-full grid place-items-center border border-[#e2bf72]/35 text-[#e2bf72]">
                <pillar.icon className="h-4 w-4" />
              </div>
              <div className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-8">
                <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm leading-6 text-white/55">{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
