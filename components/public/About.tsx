import { Clock, ShieldCheck, Truck, Wrench } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, title: "100% Genuine", body: "Direct from OEM channels and audited suppliers. No grey market, no compromises." },
  { icon: Wrench, title: "Workshop-grade", body: "Sensors, switches, ABS components—the obscure parts mechanics actually need." },
  { icon: Truck, title: "Fast dispatch", body: "Same-day for in-stock parts, shipping across India to workshops and individuals." },
  { icon: Clock, title: "30+ years strong", body: "Three decades of helping cars stay on the road. Reputation earned, part by part." },
];

export default function About() {
  return (
    <section id="about" className="on-accent py-16 md:py-24 border-y-2 border-[var(--rule)]">
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

        <div className="mt-14 md:mt-20 border-t border-[var(--rule)]">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="group grid grid-cols-[40px_1fr] md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.3fr)] gap-x-4 gap-y-2 md:gap-x-10 items-center px-4 sm:px-6 md:px-8 py-6 md:py-8 border-b border-[var(--rule)] transition-colors duration-200 hover:bg-[#11120f] hover:text-[#f8f6ef]">
              <span className="h-10 w-10 grid place-items-center border border-current/30 group-hover:border-[var(--accent)] transition-colors"><pillar.icon className="h-[18px] w-[18px] group-hover:text-[var(--accent)] transition-colors" /></span>
              <h3 className="font-editorial text-3xl md:text-4xl leading-none">{pillar.title}</h3>
              <p className="col-start-2 md:col-start-auto max-w-[52ch] text-sm leading-6 opacity-75 group-hover:opacity-80">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
