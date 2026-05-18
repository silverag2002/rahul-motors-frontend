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
      className="fixed bottom-5 right-5 z-40 group"
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          animation: "pulse-ring 2.2s ease-out infinite",
          border: "2px solid var(--whatsapp)",
        }}
      />
      <span
        className="relative flex items-center gap-2 h-13 pl-3.5 pr-4 rounded-full transition-transform group-hover:scale-105"
        style={{
          background: "var(--whatsapp)",
          color: "#0c2415",
          boxShadow: "0 10px 30px -8px rgba(37, 211, 102, 0.5)",
          height: "52px",
        }}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold">Chat</span>
      </span>
      <span className="sr-only">WhatsApp: {CONTACT.whatsapp.number}</span>
    </a>
  );
}
