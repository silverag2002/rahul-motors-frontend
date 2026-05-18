"use client";

import Image from "next/image";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { CONTACT, telLink, whatsappLink, mailtoLink, buildInquiryMessage } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="pt-12 pb-6" style={{ borderTop: "1px solid var(--line)", background: "var(--bg-elev)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ background: "var(--bg-muted)" }}
              >
                <Image src="/logo.png" alt="Rahul Motors" width={28} height={28} />
              </span>
              <div>
                <div className="text-lg font-bold" style={{ color: "var(--ink)" }}>
                  Rahul Motors
                </div>
                <div className="text-xs" style={{ color: "var(--ink-faint)" }}>
                  {CONTACT.brand.tagline}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Family-run automotive parts specialist. Three decades of keeping India&apos;s cars on the road.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: "var(--ink-2)" }}>
              Shop
            </div>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#catalogue", label: "All products" },
                { href: "#categories", label: "Categories" },
                { href: "#brands", label: "Brands" },
                { href: "#about", label: "About us" },
                { href: "#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:underline underline-offset-4" style={{ color: "var(--ink-soft)" }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: "var(--ink-2)" }}>
              Reach us
            </div>
            <ul className="space-y-2.5 text-sm">
              {CONTACT.phones.map((p) => (
                <li key={p.tel}>
                  <a href={telLink(p.tel)} className="inline-flex items-center gap-2" style={{ color: "var(--ink-soft)" }}>
                    <Phone className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
                    {p.number}
                    <span style={{ color: "var(--ink-faint)" }}>· {p.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <MessageCircle className="h-3.5 w-3.5" style={{ color: "var(--whatsapp)" }} />
                  WhatsApp · {CONTACT.whatsapp.number}
                </a>
              </li>
              <li>
                <a href={mailtoLink("Inquiry — Rahul Motors", "")} className="inline-flex items-center gap-2" style={{ color: "var(--ink-soft)" }}>
                  <Mail className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mapsLink}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <MapPin className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
                  View on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs"
          style={{ borderTop: "1px solid var(--line)", color: "var(--ink-faint)" }}
        >
          <div>© {new Date().getFullYear()} Rahul Motors. All rights reserved.</div>
          <div>{CONTACT.brand.established}</div>
        </div>
      </div>
    </footer>
  );
}
