import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT, telLink, whatsappLink, mailtoLink, buildInquiryMessage } from "@/lib/contact";

const footerLinks = [
  { href: "#catalogue", label: "All products" },
  { href: "#categories", label: "Categories" },
  { href: "#brands", label: "Brands" },
  { href: "#about", label: "Our story" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="pt-14 md:pt-20 pb-6 text-[#f4f0e6]" style={{ background: "var(--carbon)" }}>
      <div className="shell">
        <div className="grid md:grid-cols-12 gap-12 pb-14 md:pb-20">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-12 w-12 rounded-full grid place-items-center bg-[#f4f0e6] overflow-hidden">
                <Image src="/logo.webp" alt="" width={34} height={33} sizes="34px" />
              </span>
              <span>
                <span className="block font-editorial text-2xl font-bold">Rahul Motors</span>
                <span className="block mt-1 text-[9px] uppercase tracking-[.2em] text-white/45">{CONTACT.brand.tagline}</span>
              </span>
            </div>
            <p className="mt-6 max-w-[46ch] text-sm leading-7 text-white/55">Family-run automotive parts specialist. Three decades of keeping India&apos;s cars on the road.</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e2bf72]">Explore</h3>
            <nav className="mt-5 flex flex-col items-start gap-3" aria-label="Footer navigation">
              {footerLinks.map((link) => <a key={link.href} href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</a>)}
            </nav>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e2bf72]">Reach us</h3>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              {CONTACT.phones.map((phone) => <a key={phone.tel} href={telLink(phone.tel)} className="flex items-center gap-3 hover:text-white transition-colors"><Phone className="h-3.5 w-3.5 text-[#e2bf72]" /> {phone.number} <span className="text-white/30">· {phone.label}</span></a>)}
              <a href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-white transition-colors"><MessageCircle className="h-3.5 w-3.5 text-[#68dc95]" /> WhatsApp · {CONTACT.whatsapp.number}</a>
              <a href={mailtoLink("Inquiry — Rahul Motors", "")} className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="h-3.5 w-3.5 text-[#e2bf72]" /> {CONTACT.email}</a>
              <a href={CONTACT.mapsLink} target="_blank" rel="noopener" className="group flex items-center gap-3 hover:text-white transition-colors"><MapPin className="h-3.5 w-3.5 text-[#e2bf72]" /> View on Google Maps <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-[10px] uppercase tracking-[.14em] text-white/35">
          <span>© {new Date().getFullYear()} Rahul Motors</span>
          <span>{CONTACT.brand.established} · Genuine parts, real trust</span>
        </div>
      </div>
    </footer>
  );
}
