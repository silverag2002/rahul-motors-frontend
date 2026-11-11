import { SHOP } from "./shop";

// Questions people ask at the counter and on WhatsApp. Only things the shop
// has confirmed go here.

export interface Faq {
  q: string;
  a: string;
  link?: { href: string; label: string };
}

export const FAQS: Faq[] = [
  {
    q: "When is the shop open?",
    a: `${SHOP.hours.map((h) => `${h.days}, ${h.time}`).join(". ")}.`,
  },
  {
    q: "Why are there no prices on the website?",
    a: "Prices change with the make of the part and with stock, so we give you today’s price on WhatsApp or on the phone. One message is enough.",
  },
  {
    q: "How do I know a part fits my car?",
    a: "Send us a photo of your old part and the number printed on it, or your car, model and year. We check the side, the plug and the version with you before you order.",
    link: { href: "/fit-guide", label: "How to find the right part" },
  },
  {
    q: "How can I pay?",
    a: "Any way you like: cash, UPI, card or bank transfer.",
  },
  {
    q: "Can I return or exchange a part?",
    a: "Yes, for a genuine reason. We check the part and the reason first, then return or exchange it. Ask on WhatsApp and we will tell you how.",
  },
  {
    q: "Do you send parts outside Kolkata?",
    a: "Yes. We pack the part well and send it by courier anywhere in India. Ask on WhatsApp for the charge and the time to your city.",
  },
  {
    q: "The part I need is not on the website.",
    a: "Ask anyway. The website does not show everything in the shop. Send the car and the part on WhatsApp and we will check.",
  },
  {
    q: "Can I come to the shop?",
    a: `Yes, we are at ${SHOP.address.line1}, ${SHOP.address.line2}. Bring the old part if you can; it is the quickest way to match it.`,
    link: { href: "/#visit", label: "Map and directions" },
  },
];
