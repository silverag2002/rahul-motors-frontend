import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import OpenNow from "./OpenNow";
import InquiryForm from "./InquiryForm";
import WhatsAppIcon from "./WhatsAppIcon";
import { SHOP, askMessage, mailtoLink, telLink, whatsappLink } from "@/lib/shop";

/** Address, map, every way to reach the shop, and the "can't find it" form. */
export default function VisitShop() {
  const rows = [
    { icon: <WhatsAppIcon className="h-[18px] w-[18px]" />, label: "WhatsApp", value: SHOP.whatsapp.display, href: whatsappLink(askMessage()), external: true },
    ...SHOP.phones.map((p) => ({ icon: <Phone className="h-[18px] w-[18px]" />, label: `${p.label} desk`, value: p.display, href: telLink(p.tel), external: false })),
    { icon: <Mail className="h-[18px] w-[18px]" />, label: "Email", value: SHOP.email, href: mailtoLink("Part enquiry"), external: false },
  ];
  return (
    <section id="visit" className="py-16 md:py-24">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div className="min-w-0">
          <h2 className="heading text-[30px] text-ink md:text-[38px]">Visit the counter</h2>
          <p className="mt-2.5 max-w-xl text-[16.5px] leading-relaxed text-ink-3">
            Bring the old part along if you can. We are in Mullick Bazar, Kolkata’s car parts market, on A.J.C. Bose Road.
          </p>

          <div className="mt-7 overflow-hidden rounded-[18px] border border-line bg-raised">
            <div className="flex flex-wrap items-start gap-x-3.5 gap-y-4 border-b border-line p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brass-deep" />
              <div className="min-w-[12rem] flex-1">
                <p className="text-[17px] font-semibold text-ink">{SHOP.name}</p>
                <p className="text-[15.5px] text-ink-2">{SHOP.address.line1}</p>
                <p className="text-[15.5px] text-ink-2">{SHOP.address.line2}</p>
              </div>
              <a
                href={SHOP.mapsLink}
                target="_blank"
                rel="noopener"
                className="press inline-flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] bg-ink px-3.5 text-[14px] font-semibold text-paper"
              >
                Directions <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-start gap-3.5 border-b border-line p-5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brass-deep" />
              <div className="min-w-0 flex-1">
                {SHOP.hours.map((h) => (
                  <p key={h.days} className="flex flex-wrap justify-between gap-x-4 text-[15.5px]">
                    <span className="text-ink-2">{h.days}</span>
                    <span className="font-semibold text-ink tabular">{h.time}</span>
                  </p>
                ))}
                <OpenNow className="mt-2" />
              </div>
            </div>
            <div className="relative aspect-[16/10] bg-sunken">
              <iframe
                src={SHOP.mapsEmbed}
                title="Map showing Rahul Motors in Mullick Bazar, Kolkata"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 dark:opacity-90"
              />
            </div>
          </div>

          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[18px] border border-line bg-raised">
            {rows.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target={r.external ? "_blank" : undefined}
                  rel={r.external ? "noopener" : undefined}
                  className="group flex items-center gap-3.5 px-5 py-4 hover:bg-sunken"
                >
                  <span className="text-ink-3 group-hover:text-ink">{r.icon}</span>
                  <span className="w-24 shrink-0 text-[14.5px] text-ink-3 sm:w-28">{r.label}</span>
                  <span className="min-w-0 flex-1 truncate text-[15.5px] font-semibold text-ink tabular">{r.value}</span>
                  <ArrowUpRight className="h-4 w-4 text-ink-4 group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:pt-[92px]">
          <InquiryForm />
          <div className="mt-4 hidden items-center gap-5 rounded-[18px] border border-line bg-raised p-5 md:flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/whatsapp-qr.svg" alt="QR code that opens a WhatsApp chat with Rahul Motors" width={112} height={112} className="h-28 w-28 shrink-0 rounded-[8px]" />
            <div>
              <p className="text-[16px] font-semibold text-ink">On a computer?</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-3">Scan this with your phone’s camera to chat with us on WhatsApp, then send photos of the part from your phone.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
