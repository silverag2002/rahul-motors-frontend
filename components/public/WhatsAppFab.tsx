"use client";

import { MessageCircle } from "lucide-react";
import { CONTACT, buildInquiryMessage, whatsappLink } from "@/lib/contact";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 group"
    >
      <span
        className="absolute inset-0"
        style={{
          animation: "pulse-ring 2.2s ease-out infinite",
          border: "2px solid var(--whatsapp)",
        }}
      />
      <span
        className="relative flex items-center gap-2 px-4 transition-transform group-hover:-translate-y-1"
        style={{
          background: "var(--ink)",
          color: "var(--bg)",
          boxShadow: "0 16px 34px -14px rgba(0, 0, 0, 0.65)",
          height: "50px",
        }}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[.14em]">Parts desk</span>
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-[var(--whatsapp)] border-2 border-[var(--bg)]" />
      </span>
      <span className="sr-only">WhatsApp: {CONTACT.whatsapp.number}</span>
    </a>
  );
}
