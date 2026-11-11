"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import { askMessage, whatsappLink } from "@/lib/shop";

/** Round WhatsApp button in the corner; steps aside over the contact block and footer. */
export default function WhatsAppFloat({ message }: { message?: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const targets = [...document.querySelectorAll("#visit, footer")];
    if (!targets.length) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setHidden(seen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return (
    <a
      href={whatsappLink(message ?? askMessage())}
      target="_blank"
      rel="noopener"
      aria-label="Ask on WhatsApp"
      className={`press fixed right-4 bottom-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-ink shadow-[0_10px_24px_-10px_rgb(0_0_0/0.5)] transition-[opacity,transform] duration-300 md:right-6 md:bottom-6 ${hidden ? "pointer-events-none translate-y-3 opacity-0" : ""}`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
