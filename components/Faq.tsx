import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { FAQS } from "@/lib/faq";
import { askMessage, whatsappLink } from "@/lib/shop";

/** Short answers to what people ask most, as open/close rows. */
export default function Faq() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="questions" className="py-16 md:py-24">
      <div className="shell grid gap-8 [&>*]:min-w-0 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <h2 className="heading text-[30px] text-ink md:text-[38px]">Questions people ask</h2>
          <p className="mt-2.5 max-w-md text-[16.5px] leading-relaxed text-ink-3">Anything else, just ask. A message on WhatsApp is the quickest way.</p>
          <a
            href={whatsappLink(askMessage())}
            target="_blank"
            rel="noopener"
            className="press mt-6 inline-flex h-12 items-center gap-2 rounded-[12px] bg-whatsapp px-5 text-[15px] font-semibold text-whatsapp-ink"
          >
            <WhatsAppIcon className="h-5 w-5" /> Ask a question
          </a>
        </div>
        <div className="divide-y divide-line overflow-hidden rounded-[18px] border border-line bg-raised">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4.5 text-[16.5px] font-semibold text-ink hover:bg-sunken [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <div className="px-5 pb-5 text-[15.5px] leading-relaxed text-ink-2">
                <p>{f.a}</p>
                {f.link && (
                  <Link href={f.link.href} className="mt-2.5 inline-flex items-center gap-1.5 font-semibold text-brass-deep hover:underline">
                    {f.link.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}
