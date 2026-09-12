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
        className="absolute inset-0 rounded-full"
        style={{
          animation: "pulse-ring 2.2s ease-out infinite",
          border: "2px solid var(--whatsapp)",
        }}
      />
      <span
        className="relative flex items-center gap-2 pl-3.5 pr-4 rounded-full transition-transform group-hover:-translate-y-1"
        style={{
          background: "var(--whatsapp)",
          color: "#092416",
          boxShadow: "0 16px 34px -14px rgba(20, 80, 43, 0.65)",
          height: "48px",
        }}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold">Chat</span>
      </span>
      <span className="sr-only">WhatsApp: {CONTACT.whatsapp.number}</span>
    </a>
  );
}
