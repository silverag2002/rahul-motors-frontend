import Image from "next/image";
import WhatsAppIcon from "./WhatsAppIcon";
import { askMessage, whatsappLink } from "@/lib/shop";

const STEPS = [
  {
    img: "/img/order-photo.webp",
    alt: "A hand holding a phone, taking a photo of a window switch on the counter",
    title: "Send a photo or the part name",
    body: "WhatsApp us a photo of the old part, the number printed on it, or just your car and model. A link from this website works too.",
  },
  {
    img: "/img/counter.webp",
    alt: "An ignition coil being handed across the shop counter",
    title: "We check it fits and tell you the price",
    body: "We match it against the car, the side and the version, and reply with the price and whether it is in the shop right now.",
  },
  {
    img: "/img/delivery.webp",
    alt: "A fuel pump wrapped in bubble wrap going into a box for delivery",
    title: "Collect it, or we send it",
    body: "Pick it up at the counter in Mullick Bazar, or we pack it well and send it by courier anywhere in India.",
  },
];

export default function HowToOrder() {
  return (
    <section id="order" className="border-y border-line bg-raised py-16 md:py-24">
      <div className="shell">
        <div className="mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="heading text-[30px] text-ink md:text-[38px]">Ordering is a WhatsApp chat</h2>
            <p className="mt-2.5 text-[16.5px] leading-relaxed text-ink-3">No account and no cart. Message us the way you would talk at the counter.</p>
          </div>
          <a
            href={whatsappLink(askMessage())}
            target="_blank"
            rel="noopener"
            className="press inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-[12px] bg-whatsapp px-5 text-[15px] font-semibold text-whatsapp-ink md:self-auto"
          >
            <WhatsAppIcon className="h-5 w-5" /> Start a chat
          </a>
        </div>
        <ol className="grid gap-6 [&>*]:min-w-0 md:grid-cols-3 md:gap-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[16px] border border-line bg-sunken">
                <Image src={s.img} alt={s.alt} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
              </div>
              <div className="mt-4 flex gap-3.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brass font-display text-[15px] font-bold text-on-brass tabular">{i + 1}</span>
                <div>
                  <h3 className="text-[18px] font-semibold leading-snug text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-3">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
