import { Clock, ShieldCheck, Truck, Wrench } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, title: "100% Genuine", body: "Direct from OEM channels and audited suppliers. No grey market, no compromises." },
  { icon: Wrench, title: "Workshop-grade", body: "Sensors, switches, ABS components—the obscure parts mechanics actually need." },
  { icon: Truck, title: "Fast dispatch", body: "Same-day for in-stock parts, shipping across India to workshops and individuals." },
  { icon: Clock, title: "30+ years strong", body: "Three decades of helping cars stay on the road. Reputation earned, part by part." },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 border-y-2 border-[var(--ink)] text-[var(--ink)] bg-[var(--accent)]">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-editorial text-[4.5rem] sm:text-[5.5rem] md:text-8xl leading-[.74] tracking-[-.035em]">No guesswork.<br />No grey market.</h2>
          </div>
          <div className="lg:col-span-4 grid grid-cols-[92px_1fr] gap-5 items-center">
            <div className="stamp-ring h-[92px] w-[92px] rounded-full grid place-items-center rotate-[-8deg] font-editorial text-3xl">RM</div>
            <p className="text-sm leading-6 font-medium">A family-run specialist serving India&apos;s mechanics, workshops and owners since 1995.</p>
          </div>
        </div>

        <div className="mt-14 md:mt-20 border-t border-[var(--ink)]">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="grid grid-cols-[48px_1fr] md:grid-cols-[70px_1fr_1.4fr] gap-4 md:gap-8 items-center px-0 py-6 md:py-7 border-b border-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white group">
              <pillar.icon className="h-5 w-5 group-hover:text-[var(--accent)]" />
              <h3 className="font-editorial text-3xl md:text-4xl leading-none">{pillar.title}</h3>
              <p className="col-start-2 md:col-start-auto text-xs md:text-sm leading-6 opacity-70">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
