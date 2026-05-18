export const CONTACT = {
  phones: [
    { label: "Sales", number: "+91 82401 54155", tel: "+918240154155" },
    { label: "Service", number: "+91 90383 94734", tel: "+919038394734" },
  ],
  whatsapp: {
    number: "+91 82401 54155",
    raw: "918240154155",
  },
  email: "rahulmotors08@gmail.com",
  mapsLink: "https://maps.app.goo.gl/uDs9Hsg248Akzt6G9",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d845.3505747175014!2d88.36156583328685!3d22.548830941506473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02774aa3b3c63d%3A0x33fca4435b441b2e!2sRAHUL%20MOTORS!5e0!3m2!1sen!2sin!4v1779022219307!5m2!1sen!2sin",
  brand: {
    name: "Rahul Motors",
    tagline: "Genuine Parts. Real Trust.",
    established: "Since 1995",
  },
} as const;

export function buildInquiryMessage(opts: {
  name: string;
  brand?: string | null;
  partNo?: string | null;
  carName?: string | null;
}): string {
  const lines = [
    `Hello Rahul Motors,`,
    ``,
    `I'd like to inquire about the following part:`,
    `• Product: ${opts.name}`,
  ];
  if (opts.brand) lines.push(`• Brand: ${opts.brand}`);
  if (opts.carName) lines.push(`• Car: ${opts.carName}`);
  if (opts.partNo) lines.push(`• Part No: ${opts.partNo}`);
  lines.push(``, `Please share availability and pricing.`, `Thank you.`);
  return lines.join("\n");
}

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.whatsapp.raw}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function telLink(tel: string) {
  return `tel:${tel.replace(/\s/g, "")}`;
}
